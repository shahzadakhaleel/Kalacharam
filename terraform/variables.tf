variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
  default     = "ap-south-1"
}

variable "aws_profile" {
  description = "AWS CLI profile used by Terraform"
  type        = string
  default     = "madrasfarmers"
}

variable "site_domain" {
  description = "Optional custom domain name for the CloudFront distribution"
  type        = string
  default     = null
}

variable "route53_zone_id" {
  description = "Optional Route53 hosted zone ID for DNS validation and record creation"
  type        = string
  default     = "Z100111625V799ECZEL2H"
}

variable "ses_domain" {
  description = "SES sender domain for domain identity verification (set with route53_zone_id)"
  type        = string
  default     = "kalacharam.com"
}

variable "ses_mail_from_subdomain" {
  description = "Subdomain prefix used for SES MAIL FROM (e.g., mail => mail.kalacharam.com)"
  type        = string
  default     = "mail"
}

variable "ses_sender_email" {
  description = "Verified SES sender email address"
  type        = string
  default     = "no-reply@kalacharam.com"
}

variable "ses_recipient_email" {
  description = "Recipient email address for contact form submissions"
  type        = string
  default     = "kalacharamevents@gmail.com"
}
