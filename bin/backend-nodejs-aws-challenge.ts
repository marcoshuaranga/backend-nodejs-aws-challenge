#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ApiGatewayStack } from '../stack/apigateway';
import { LambdaStack } from '../stack/lambda-stack';
import { DynamoDBStack } from '../stack/dynamodb';

const app = new cdk.App();

const env = { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION };
const cacheTable = new DynamoDBStack(app, 'CacheDynamoStack', {
  env: env,
  partitionKey: { name: 'id', type: cdk.aws_dynamodb.AttributeType.STRING },
  tableName: cdk.PhysicalName.GENERATE_IF_NEEDED,
});

const singleTable = new DynamoDBStack(app, 'SingleTableStack', {
  env: env,
  partitionKey: { name: 'pk', type: cdk.aws_dynamodb.AttributeType.STRING },
  sortKey: { name: 'sk', type: cdk.aws_dynamodb.AttributeType.STRING },
  tableName: cdk.PhysicalName.GENERATE_IF_NEEDED,
});

const mainLambda = new LambdaStack(app, 'MainStack', {
  env: env,
  cacheDynamoTable: cacheTable.table,
  singleDynamoTable: singleTable.table,
  environment: {
    MOVIEDB_API_TOKEN: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZThjMWI2NjU0ZTdjNzNiNzcyNmIxMmMxNWI4OGI2NyIsIm5iZiI6MTc1NjM1NTI0NC43Mjk5OTk4LCJzdWIiOiI2OGFmZGFhYzQ2MzQwZTZjMTMwZjhmY2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.J2Vuislf3cd0ZkpdzMcN36EQRsScS-gjqNKCx9k9rcA',
  },
  entry: 'src/main.ts',
});

new ApiGatewayStack(app, 'ApiGatewayStack', {
  env: env,
  mainLambda: mainLambda.fn,
})
