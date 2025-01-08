# S3 bucket used to store the files for the frontend

resource "aws_s3_bucket" "frontend_bucket" {
  bucket = "frontend-bucket-${var.aws_account_id}"
  #TODO Setting this to true will delete all files in the bucket when the bucket is destroyed. Should only be true during dev
  force_destroy = true
}



# Cloud Front

locals {
  s3_origin_id = "S3Origin"
}

#This allow cloudfront to access the files in the S3 bucket
resource "aws_cloudfront_origin_access_control" "frontend_bucket_oac" {
  name                              = "s3-cloudfront-oac"
  description                       = "Grant cloudfront access to s3 bucket ${aws_s3_bucket.frontend_bucket.id}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

#Our cloud front that will be used to distribute the files for our website
resource "aws_cloudfront_distribution" "frontend_cloudfront" {
  comment = "Used to host the frontend for the gift registry app"

  #Where to get the files
  origin {
    domain_name              = aws_s3_bucket.frontend_bucket.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.frontend_bucket_oac.id
    origin_id                = local.s3_origin_id
  }
  default_root_object = "index.html"

  #TODO changed to use alias and acm cert for custom domain
  viewer_certificate {
    cloudfront_default_certificate = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  #TODO improve description. How files from s3 should be cached
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 300
    max_ttl                = 3600
  }

  #Varius small setting
  enabled = true
  #Makes it so TF does not wait for CF to be fully deployed
  wait_for_deployment = false
  is_ipv6_enabled     = true
  http_version        = "http2and3"
  #Runns the CF only in EU an NA to save cost
  price_class = "PriceClass_100"


}

# IAM to allow cloud front to access the bucket

#The IAM policy to allow the cloudfront service to access the bucket
data "aws_iam_policy_document" "allow_access_from_cloud_front_frontend_bucket" {
  statement {
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "${aws_s3_bucket.frontend_bucket.arn}/*",
    ]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values = [
        aws_cloudfront_distribution.frontend_cloudfront.arn,
      ]
    }
  }
  version = "2008-10-17"
}

#Creates the policy on the bucket to give Cloud front access to it
resource "aws_s3_bucket_policy" "frontend_bucket_policy" {
  bucket = aws_s3_bucket.frontend_bucket.id
  policy = data.aws_iam_policy_document.allow_access_from_cloud_front_frontend_bucket.json
}
