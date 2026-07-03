resource "random_id" "bucket_id" {
  byte_length = 4
}

resource "aws_s3_bucket" "website" {
  bucket = "kalacharam-events-${random_id.bucket_id.hex}"
  acl    = "public-read"

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

  zone_id = data.aws_route53_zone.selected[0].zone_id
  name    = aws_acm_certificate.website[0].domain_validation_options[0].resource_record_name
  type    = aws_acm_certificate.website[0].domain_validation_options[0].resource_record_type
  records = [aws_acm_certificate.website[0].domain_validation_options[0].resource_record_value]
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
