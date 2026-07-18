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
  default     = null
}

variable "ses_sender_email" {
  description = "Verified SES sender email address"
  type        = string
  default     = "kalacharamevents@gmail.com"
}

variable "ses_recipient_email" {
  description = "Recipient email address for contact form submissions"
  type        = string
  default     = "kalacharamevents@gmail.com"
}
