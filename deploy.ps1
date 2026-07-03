Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Push-Location $root

Write-Host 'Installing dependencies...'
npm install

Write-Host 'Building React site...'
npm run build

Push-Location "$root\terraform"
Write-Host 'Initializing Terraform...'
terraform init -input=false
Write-Host 'Applying Terraform resources...'
terraform apply -auto-approve

$bucket = terraform output -raw bucket_name
$cloudfront = terraform output -raw cloudfront_domain
Pop-Location

Write-Host 'Syncing site assets to S3...'
aws s3 sync "$root\dist" "s3://$bucket" --delete --acl public-read

Write-Host "Deployment complete. Website available at https://$cloudfront"
Pop-Location
