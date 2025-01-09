# Lambda function Role
resource "aws_iam_role" "lambda_role" {
  name = "lambda_role"

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      },
    ]
  })
}

#Policy to allow the lambda function to write logs

resource "aws_iam_policy" "gift_api_logs_write" {
  name = "gift_api_logs_write"

  policy = jsonencode(
    {
      Version = "2012-10-17",
      Statement = [
        {
          Effect = "Allow",
          Action = [
            "logs:CreateLogStream",
            "logs:PutLogEvents"
          ],
          Resource = "${aws_cloudwatch_log_group.gift_api_function.arn}:*"
        }
      ]
    }
  )
}

resource "aws_iam_role_policy_attachment" "gift_api_logs_write" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.gift_api_logs_write.arn
}
