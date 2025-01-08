# Used to get the zone ID from route53
data "aws_route53_zone" "example" {
  name         = var.domain
  private_zone = false
}

# ACM cert records
resource "aws_route53_record" "frontend_acm" {
  for_each = {
    for dvo in aws_acm_certificate.frontend.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.example.zone_id
}

# Cloud Front

resource "aws_route53_record" "frontend_cloudfront" {
  # For each here to create records for both IPv4 A and IPv6 AAAA
  for_each = {
    for type in ["A", "AAAA"] : type => type
  }

  allow_overwrite = true
  name            = var.domain
  type            = each.value
  zone_id         = data.aws_route53_zone.example.zone_id

  alias {
    name                   = aws_cloudfront_distribution.frontend_cloudfront.domain_name
    zone_id                = aws_cloudfront_distribution.frontend_cloudfront.hosted_zone_id
    evaluate_target_health = false
  }
}
