resource "random_id" "bucket_id" {
  byte_length = 4
}

resource "aws_s3_bucket" "website" {
  bucket = "kalacharam-events-${random_id.bucket_id.hex}"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  tags = {
    Name        = "Kalacharam Events Website"
    Environment = "Production"
  }
}

resource "aws_s3_bucket_public_access_block" "website" {
  bucket                  = aws_s3_bucket.website.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = true
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.website.id

    # This forces Terraform to turn off the block BEFORE trying to attach the policy
  depends_on = [aws_s3_bucket_public_access_block.website]
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = ["s3:GetObject"]
        Resource  = ["${aws_s3_bucket.website.arn}/*"]
      }
    ]
  })
}

locals {
  use_custom_domain = var.site_domain != null && var.route53_zone_id != null
  use_ses_domain    = var.ses_domain != null && var.route53_zone_id != null
}

data "aws_route53_zone" "selected" {
  count   = local.use_custom_domain ? 1 : 0
  zone_id = var.route53_zone_id
}

resource "aws_acm_certificate" "website" {
  count             = local.use_custom_domain ? 1 : 0
  domain_name       = var.site_domain
  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  count = local.use_custom_domain ? 1 : 0

  # domain_validation_options is a set; use one() instead of index access.
  # This supports current AWS provider behavior and avoids Invalid index errors.
  # For this setup, we request exactly one certificate domain.
  zone_id = data.aws_route53_zone.selected[0].zone_id
  name    = one(aws_acm_certificate.website[0].domain_validation_options).resource_record_name
  type    = one(aws_acm_certificate.website[0].domain_validation_options).resource_record_type
  records = [one(aws_acm_certificate.website[0].domain_validation_options).resource_record_value]
  ttl     = 300
}

resource "aws_acm_certificate_validation" "website" {
  count = local.use_custom_domain ? 1 : 0

  certificate_arn         = aws_acm_certificate.website[0].arn
  validation_record_fqdns = [aws_route53_record.cert_validation[0].fqdn]
}

resource "aws_cloudfront_distribution" "website" {
  enabled             = true
  default_root_object = "index.html"

  origin {
    domain_name = aws_s3_bucket.website.website_endpoint
    origin_id   = "S3WebsiteOrigin"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  default_cache_behavior {
    target_origin_id       = "S3WebsiteOrigin"
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  aliases = local.use_custom_domain ? [var.site_domain] : []

  viewer_certificate {
    cloudfront_default_certificate = !local.use_custom_domain
    acm_certificate_arn           = local.use_custom_domain ? aws_acm_certificate_validation.website[0].certificate_arn : null
    ssl_support_method            = local.use_custom_domain ? "sni-only" : null
    minimum_protocol_version      = local.use_custom_domain ? "TLSv1.2_2021" : null
  }

  price_class = "PriceClass_100"

  tags = {
    Name = "Kalacharam Events CDN"
  }
}

resource "aws_route53_record" "cloudfront_alias" {
  count = local.use_custom_domain ? 1 : 0

  zone_id = data.aws_route53_zone.selected[0].zone_id
  name    = var.site_domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}

data "archive_file" "contact_email_lambda_zip" {
  type        = "zip"
  source_file = "${path.module}/lambda/send_email.py"
  output_path = "${path.module}/lambda/send_email.zip"
}

resource "aws_iam_role" "contact_email_lambda_role" {
  name = "kalacharam-contact-email-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role_policy" "contact_email_lambda_policy" {
  name = "kalacharam-contact-email-lambda-policy"
  role = aws_iam_role.contact_email_lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Effect = "Allow"
        Action = [
          "ses:SendEmail",
          "ses:SendRawEmail"
        ]
        Resource = "*"
      }
    ]
  })
}

resource "aws_lambda_function" "contact_email" {
  function_name    = "kalacharam-contact-email"
  role             = aws_iam_role.contact_email_lambda_role.arn
  handler          = "send_email.lambda_handler"
  runtime          = "python3.12"
  filename         = data.archive_file.contact_email_lambda_zip.output_path
  source_code_hash = data.archive_file.contact_email_lambda_zip.output_base64sha256
  timeout          = 15

  environment {
    variables = {
      FROM_EMAIL = var.ses_sender_email
      TO_EMAIL   = var.ses_recipient_email
    }
  }

  depends_on = [aws_iam_role_policy.contact_email_lambda_policy]
}

resource "aws_lambda_function_url" "contact_email" {
  function_name      = aws_lambda_function.contact_email.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = false
    allow_origins     = ["*"]
    allow_methods     = ["POST"]
    allow_headers     = ["content-type"]
  }
}

resource "aws_lambda_permission" "contact_email_public_url" {
  statement_id           = "AllowPublicFunctionUrlInvoke"
  action                 = "lambda:InvokeFunctionUrl"
  function_name          = aws_lambda_function.contact_email.function_name
  principal              = "*"
  function_url_auth_type = "NONE"
}

resource "aws_lambda_permission" "contact_email_public_function_invoke" {
  statement_id  = "AllowPublicFunctionInvokeViaUrl"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact_email.function_name
  principal     = "*"
}

resource "aws_sesv2_email_identity" "sender" {
  count          = local.use_ses_domain ? 0 : 1
  email_identity = var.ses_sender_email
}

resource "aws_sesv2_email_identity" "recipient" {
  email_identity = var.ses_recipient_email
}

resource "aws_ses_domain_identity" "sender_domain" {
  count  = local.use_ses_domain ? 1 : 0
  domain = var.ses_domain
}

resource "aws_route53_record" "ses_verification" {
  count   = local.use_ses_domain ? 1 : 0
  zone_id = var.route53_zone_id
  name    = "_amazonses.${var.ses_domain}"
  type    = "TXT"
  ttl     = 600
  records = [aws_ses_domain_identity.sender_domain[0].verification_token]
}

resource "aws_ses_domain_identity_verification" "sender_domain" {
  count  = local.use_ses_domain ? 1 : 0
  domain = aws_ses_domain_identity.sender_domain[0].id

  depends_on = [aws_route53_record.ses_verification]
}

resource "aws_ses_domain_dkim" "sender_domain" {
  count  = local.use_ses_domain ? 1 : 0
  domain = aws_ses_domain_identity.sender_domain[0].domain
}

resource "aws_route53_record" "ses_dkim" {
  count   = local.use_ses_domain ? 3 : 0
  zone_id = var.route53_zone_id
  name    = "${element(aws_ses_domain_dkim.sender_domain[0].dkim_tokens, count.index)}._domainkey.${var.ses_domain}"
  type    = "CNAME"
  ttl     = 600
  records = ["${element(aws_ses_domain_dkim.sender_domain[0].dkim_tokens, count.index)}.dkim.amazonses.com"]
}

resource "aws_ses_domain_mail_from" "sender_domain" {
  count                = local.use_ses_domain ? 1 : 0
  domain               = aws_ses_domain_identity.sender_domain[0].domain
  mail_from_domain     = "${var.ses_mail_from_subdomain}.${var.ses_domain}"
  behavior_on_mx_failure = "UseDefaultValue"
}

resource "aws_route53_record" "ses_mail_from_mx" {
  count   = local.use_ses_domain ? 1 : 0
  zone_id = var.route53_zone_id
  name    = aws_ses_domain_mail_from.sender_domain[0].mail_from_domain
  type    = "MX"
  ttl     = 600
  records = ["10 feedback-smtp.${var.aws_region}.amazonses.com"]
}

resource "aws_route53_record" "ses_mail_from_txt" {
  count   = local.use_ses_domain ? 1 : 0
  zone_id = var.route53_zone_id
  name    = aws_ses_domain_mail_from.sender_domain[0].mail_from_domain
  type    = "TXT"
  ttl     = 600
  records = ["v=spf1 include:amazonses.com -all"]
}
