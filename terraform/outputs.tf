output "bucket_name" {
  description = "Name of the S3 website bucket"
  value       = aws_s3_bucket.website.id
}

output "cloudfront_domain" {
  description = "The CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.website.domain_name
}

output "website_url" {
  description = "The public website URL via CloudFront"
  value       = "https://${aws_cloudfront_distribution.website.domain_name}"
}

output "contact_api_url" {
  description = "Public function URL for contact form email submissions"
  value       = aws_lambda_function_url.contact_email.function_url
}

output "ses_sender_identity_arn" {
  description = "SES sender identity ARN"
  value       = local.use_ses_domain ? aws_ses_domain_identity.sender_domain[0].arn : aws_sesv2_email_identity.sender[0].arn
}

output "ses_recipient_identity_arn" {
  description = "SES recipient identity ARN"
  value       = aws_sesv2_email_identity.recipient.arn
}

output "ses_domain_identity" {
  description = "SES domain identity used for deliverability"
  value       = local.use_ses_domain ? aws_ses_domain_identity.sender_domain[0].domain : null
}

output "ses_mail_from_domain" {
  description = "SES MAIL FROM domain"
  value       = local.use_ses_domain ? aws_ses_domain_mail_from.sender_domain[0].mail_from_domain : null
}
