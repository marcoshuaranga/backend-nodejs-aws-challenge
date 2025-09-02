import * as cdk from 'aws-cdk-lib';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export interface DynamoDBStackProps extends cdk.StackProps {
  tableName: string;
  partitionKey: { name: string; type: AttributeType };
  sortKey?: { name: string; type: AttributeType };
}

export class DynamoDBStack extends cdk.Stack {
  public readonly table: Table;

  constructor(scope: Construct, id: string, props: DynamoDBStackProps) {
    super(scope, id, props);

    this.table = new Table(this, id, {
      tableName: props.tableName,
      partitionKey: props.partitionKey,
      sortKey: props.sortKey,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }
}