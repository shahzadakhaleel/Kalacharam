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

## Notes

- Replace `public/logo.svg` with the provided logo image if you want the exact brand artwork.
- The Terraform config creates an S3 bucket, CloudFront distribution, and optional Route53 / ACM support for a custom domain.
