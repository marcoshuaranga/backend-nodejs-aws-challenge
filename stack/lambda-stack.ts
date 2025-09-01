import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Architecture, Runtime, Tracing } from 'aws-cdk-lib/aws-lambda';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';

export interface LambdaStackProps extends cdk.StackProps {
  entry: string;

  environment?: {
    [key: string]: string;
  };
}

export class LambdaStack extends cdk.Stack {
  public readonly fn: NodejsFunction;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);
    this.fn = new NodejsFunction(this, `${id}-LambdaFunction`, {
      memorySize: 128,
      timeout: cdk.Duration.seconds(15),
      runtime: Runtime.NODEJS_20_X,
      architecture: Architecture.X86_64,
      entry: props.entry,
      functionName: cdk.PhysicalName.GENERATE_IF_NEEDED,
      handler: 'handler',
      bundling: {
        bundleAwsSDK: false,
        forceDockerBundling: false,
        externalModules: [],
        minify: false,
        sourceMap: true,
      },
      logGroup: new LogGroup(this, `${id}-LambdaLogGroup`, {
        retention: RetentionDays.ONE_DAY,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      }),
      tracing: Tracing.ACTIVE,
      environment: props?.environment,
    });
  }
}
