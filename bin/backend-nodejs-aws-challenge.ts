#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ApiGatewayStack } from '../stack/apigateway';
import { LambdaStack } from '../stack/lambda-stack';
import { DynamoDBStack } from '../stack/dynamodb';

const app = new cdk.App();

const env = { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION };
const _ = new DynamoDBStack(app, 'CacheDynamoStack', {
  tableName: 'CacheTable',
});

const mainLambda = new LambdaStack(app, 'MainStack', {
  environment: {
    DYNAMODB_TABLE_NAME: 'CacheTable',
    MOVIEDB_API_TOKEN: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZThjMWI2NjU0ZTdjNzNiNzcyNmIxMmMxNWI4OGI2NyIsIm5iZiI6MTc1NjM1NTI0NC43Mjk5OTk4LCJzdWIiOiI2OGFmZGFhYzQ2MzQwZTZjMTMwZjhmY2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.J2Vuislf3cd0ZkpdzMcN36EQRsScS-gjqNKCx9k9rcA',
  },
  entry: 'src/main.ts',
  env: env,
});

new ApiGatewayStack(app, 'ApiGatewayStack', {
  mainLambda: mainLambda.fn,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  }
})
