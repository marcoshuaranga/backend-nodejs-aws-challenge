import * as cdk from 'aws-cdk-lib';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export interface DynamoDBStackProps extends cdk.StackProps {
  tableName: string;
}

export class DynamoDBStack extends cdk.Stack {
  public readonly table: Table;

  constructor(scope: Construct, id: string, props: DynamoDBStackProps) {
    super(scope, id, props);

    this.table = new Table(this, props.tableName, {
      partitionKey: { name: 'id', type: AttributeType.STRING },
    });
  }
}