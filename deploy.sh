#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

echo "Installing dependencies..."
npm install

echo "Building React site..."
npm run build

cd terraform
echo "Initializing Terraform..."
terraform init -input=false

echo "Applying Terraform resources..."
terraform apply -auto-approve

BUCKET=$(terraform output -raw bucket_name)
CLOUDFRONT=$(terraform output -raw cloudfront_domain)
cd "$ROOT_DIR"

echo "Syncing site assets to S3..."
aws s3 sync "$ROOT_DIR/dist" "s3://$BUCKET" --delete --acl public-read

echo "Deployment complete. Visit: https://$CLOUDFRONT"
