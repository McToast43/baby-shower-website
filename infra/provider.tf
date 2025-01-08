terraform {
  required_version = ">= 1.10.0"

  required_providers {
    aws = { source = "hashicorp/aws", version = "5.82.0" }
  }

  backend "s3" {
    bucket         = "tf-state-980921758625"
    key            = "gift-registry-app/tfstate"
    region         = "eu-central-1"
    dynamodb_table = "tf-state-gift-registry-app"
    encrypt        = true
    //TODO try moving state to a seperate aws account and assume a role that can access it
    //TODO try HCL/terraform cloud 
  }
}

//Main provider
provider "aws" {
  region = "eu-west-1"

}

//Provider for us-east-1 used only for ACM in cloud front
provider "aws" {
  alias  = "us-east-1"
  region = "us-east-1"
}