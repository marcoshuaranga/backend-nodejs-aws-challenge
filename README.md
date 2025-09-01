# Backend Node.js AWS Challenge

## Requirements

- **Node.js** v20 or newer
- **AWS CDK** v2
- **AWS Cli**
- **npm** (for package management)

## Features

- AWS Lambda functions (Node.js, TypeScript)
- API Gateway (REST API)
- DynamoDB for caching, history, db
- Swagger/OpenAPI documentation

## Quick Start

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/backend-nodejs-aws-challenge.git
   cd backend-nodejs-aws-challenge
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up AWS credentials**
   - Configure your AWS CLI `aws configure` or set environment variables:
   ```
   export AWS_ACCESS_KEY_ID=your-access-key
   export AWS_SECRET_ACCESS_KEY=your-secret-key
   export AWS_DEFAULT_REGION=us-east-1
   ```

4. **Deploy the stack**
   ```sh
   npx cdk deploy --all
   ```

5. **Access the API documentation**
   - Swagger UI is deployed at:  
     [https://vs2vtevevj.execute-api.us-east-1.amazonaws.com](https://vs2vtevevj.execute-api.us-east-1.amazonaws.com)

6. **Test the API**
   - Use Swagger UI or tools like Postman/curl to interact with endpoints.

## Project Structure
- `bin/` — CDK app entry point
- `src/` — Lambda source code and routes
  - `app/` - Application logic, queries, and service integrations (e.g., data fetching, business logic)
  - `packages/` - Shared utilities, helpers, and custom hooks used across the project
  - `routes/` - API route definitions and request/response schemas
- `stack/` — CDK stack definitions

## Useful Commands

- **Synthesize CloudFormation template:**  
  ```sh
  npx cdk synth
  ```
- **Destroy the stack:**  
  ```sh
  npx cdk destroy --all
  ```
