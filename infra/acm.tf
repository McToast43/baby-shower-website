resource "aws_acm_certificate" "frontend" {
  #Needs to use the us_east_1 provider since global certs used by cloud front can only be created there
  provider = aws.us_east_1

  domain_name       = var.domain
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

#Validates that the cert has been created. We always use this when refering to the certs ARN
resource "aws_acm_certificate_validation" "frontend" {
  provider = aws.us_east_1

  certificate_arn         = aws_acm_certificate.frontend.arn
  validation_record_fqdns = [for record in aws_route53_record.frontend_acm : record.fqdn]
}
