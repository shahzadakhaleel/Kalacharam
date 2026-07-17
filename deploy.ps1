Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Push-Location $root

$env:AWS_PROFILE = 'kalacharamdeveloper'
Remove-Item Env:AWS_ACCESS_KEY_ID -ErrorAction SilentlyContinue
Remove-Item Env:AWS_SECRET_ACCESS_KEY -ErrorAction SilentlyContinue
Remove-Item Env:AWS_SESSION_TOKEN -ErrorAction SilentlyContinue

function Assert-LastExitCode {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Step
    )

    if ($LASTEXITCODE -ne 0) {
        throw "$Step failed with exit code $LASTEXITCODE"
    }
}

Write-Host 'Installing dependencies...'
npm install --legacy-peer-deps
Assert-LastExitCode -Step 'npm install'

Push-Location "$root\terraform"
Write-Host 'Initializing Terraform...'
terraform init -input=false
Assert-LastExitCode -Step 'terraform init'
Write-Host 'Applying Terraform resources...'
terraform apply -auto-approve
Assert-LastExitCode -Step 'terraform apply'

$bucket = terraform output -raw bucket_name
Assert-LastExitCode -Step 'terraform output bucket_name'
$cloudfront = terraform output -raw cloudfront_domain
Assert-LastExitCode -Step 'terraform output cloudfront_domain'
$contactApi = terraform output -raw contact_api_url
Assert-LastExitCode -Step 'terraform output contact_api_url'
Pop-Location

$env:VITE_CONTACT_API_URL = $contactApi
Write-Host "Using contact API URL: $contactApi"

Write-Host 'Building React site...'
npm run build
Assert-LastExitCode -Step 'npm run build'

Write-Host 'Syncing site assets to S3...'
aws s3 sync "$root\dist" "s3://$bucket" --delete
Assert-LastExitCode -Step 'aws s3 sync'

Write-Host "Deployment complete. Website available at https://$cloudfront"
Pop-Location
