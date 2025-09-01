
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { HttpApi, HttpAuthorizer, HttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';

interface ApiGatewayStackProps extends cdk.StackProps {
  mainLambda: NodejsFunction;
}

export class ApiGatewayStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id, props);

    const api = new HttpApi(this, 'NodejsAwsAppStack', {
      description: 'API Gateway for Node.js AWS Challenge',
    });

    // add proxy integration for main lambda
    api.addRoutes({
      path: '/{proxy+}',
      methods: [HttpMethod.ANY],
      integration: new HttpLambdaIntegration('MainIntegration', props.mainLambda),
    });

    api.addStage('dev', {
      stageName: 'dev',
      autoDeploy: true,
      description: 'Development stage',
    });

    new cdk.CfnOutput(this, 'ApiEndpoint', {
      value: api.apiEndpoint,
      description: 'The endpoint of the API Gateway',
    });
  }
}
