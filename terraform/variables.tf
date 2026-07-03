variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
  default     = "us-east-1"
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
