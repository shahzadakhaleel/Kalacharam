# Kalacharam Events

A React static website for the event management company Kalacharam Events. The site showcases premium services in Events & Echoes, Memories, and Milestones.

## Features

- React + Vite frontend
- Responsive landing page
- AWS deployment with Terraform
- CloudFront distribution for fast static delivery

## Setup

1. Install dependencies:
   ```powershell
   npm install
   ```
2. Run the site locally:
   ```powershell
   npm run dev
   ```

## Contact form email setup (AWS SES)

The **Send Message** button calls an AWS Lambda Function URL, which sends email through AWS SES to:

- `kalacharamevents@gmail.com`

Terraform provisions this automatically and outputs:

- `contact_api_url`

For local testing, set this in `.env`:

- `VITE_CONTACT_API_URL=<terraform output -raw contact_api_url>`

SES sender/recipient values are configured in Terraform variables:

- `ses_sender_email`
- `ses_recipient_email`

For better deliverability (recommended), configure domain-based sending:

- `ses_domain` (example: `kalacharam.com`)
- `ses_mail_from_subdomain` (example: `mail`)
- `route53_zone_id` (hosted zone ID for `kalacharam.com`)

When `ses_domain` and `route53_zone_id` are set, Terraform creates:

- SES domain identity
- DKIM DNS records
- MAIL FROM DNS (MX + SPF) records

## Deploy

1. Ensure AWS credentials are configured in your environment.
2. Deploy Terraform resources and upload the site:
   ```powershell
   .\deploy.ps1
   ```

## Optional custom domain

If you want to use a custom domain with Route53, set `site_domain` and `route53_zone_id` in Terraform:

```hcl
site_domain = "events.example.com"
route53_zone_id = "Z0123456789ABCDEFG"
```

Then run Terraform from the `terraform` folder before deploying.

## SES verification notes

- If SES account is in sandbox mode, recipient addresses must also be verified.
- Domain identity and DKIM improve inbox placement compared with Gmail sender identities.

## Notes

- Replace `public/logo.svg` with the provided logo image if you want the exact brand artwork.
- The Terraform config creates an S3 bucket, CloudFront distribution, and optional Route53 / ACM support for a custom domain.
