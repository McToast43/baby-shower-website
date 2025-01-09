# Zip file with the placeholder code
data "archive_file" "lambda_placeholder_function_js" {
  type             = "zip"
  source_file      = "placeholderLambdaFunction/index.mjs"
  output_file_mode = "0666"
  output_path      = ".terraform/zips/lambda_placeholder_function_js"
}

# Function, ignore changes to the file
resource "aws_lambda_function" "gift_api_function" {
  function_name = "gift_api_function"
  role          = aws_iam_role.lambda_role.arn
  filename      = data.archive_file.lambda_placeholder_function_js.output_path
  handler       = "index.handler"

  runtime       = "nodejs22.x"
  architectures = ["arm64"]
  package_type  = "Zip"
}

# Cloud watch logs group
resource "aws_cloudwatch_log_group" "gift_api_function" {
  name              = "/aws/lambda/${aws_lambda_function.gift_api_function.function_name}"
  retention_in_days = 60
}

#Dynamo DB 
resource "aws_dynamodb_table" "gift_app" {
  name         = "gift_app"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "pk"
  range_key    = "sk"

  attribute {
    name = "pk"
    type = "S"
  }

  attribute {
    name = "sk"
    type = "S"
  }

  point_in_time_recovery {
    enabled = true
  }
  #Putting a limit in throughput to the DB to limit potential cost.
  on_demand_throughput {
    max_read_request_units  = 10
    max_write_request_units = 20
  }

  deletion_protection_enabled = false #TODO Enable for production
}
