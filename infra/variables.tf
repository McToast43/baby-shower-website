variable "aws_account_id" {
  type        = string
  description = "The ID of your AWS account"

  validation {
    condition     = can(regex("^[0-9]{12}$", var.aws_account_id))
    error_message = "The aws_account_id must be a 12 digit number."
  }
}

# variable "route53_zone_id" {
#   type        = string
#   description = "The ID of the Route53 zone"
# }

# variable "domain" {
#   type        = string
#   description = "The domain name for your Route53 zone"

#   validation {
#     condition     = can(regex("^((?:([a-z0-9]\\.|[a-z0-9][a-z0-9\\-]{0,61}[a-z0-9])\\.)+)([a-z0-9]{2,63}|(?:[a-z0-9][a-z0-9\\-]{0,61}[a-z0-9]))\\.?$", var.domain))
#     error_message = "The domain name must be a valid domain, e.g., example.com"
#   }
# }