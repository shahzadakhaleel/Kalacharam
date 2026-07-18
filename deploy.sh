#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

export AWS_PROFILE="madrasfarmers"
unset AWS_ACCESS_KEY_ID
unset AWS_SECRET_ACCESS_KEY
unset AWS_SESSION_TOKEN

echo "Installing dependencies..."
npm install

cd terraform
echo "Initializing Terraform..."
terraform init -input=false

echo "Applying Terraform resources..."
terraform apply -auto-approve

BUCKET=$(terraform output -raw bucket_name)
CLOUDFRONT=$(terraform output -raw cloudfront_domain)
CONTACT_API_URL=$(terraform output -raw contact_api_url)
cd "$ROOT_DIR"

export VITE_CONTACT_API_URL="$CONTACT_API_URL"

echo "Building React site..."
npm run build

echo "Syncing site assets to S3..."
aws s3 sync "$ROOT_DIR/dist" "s3://$BUCKET" --delete

echo "Deployment complete. Visit: https://$CLOUDFRONT"
