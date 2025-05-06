import { EventBridgeClient } from "@aws-sdk/client-eventbridge";
import { createConfig } from "./modules/shared/config";
import { createDbClient } from "./modules/shared/db";
import { SNSClient } from "@aws-sdk/client-sns";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export type Providers = ReturnType<typeof createProviders>;

export function createProviders() {
  const config = createConfig(process.env);

  return {
    config,
    chileanDbClient: createDbClient({
      connection: {
        connectionString: config.chileanDb.connectionString,
      }
    }),
    peruvianDbClient: createDbClient({
      connection: {
        connectionString: config.peruvianDb.connectionString,
      }
    }),
    eventBridgeClient: new EventBridgeClient(),
    dynamodbClient: new DynamoDBClient({
      region: config.aws.region,
    }),
    snsClient: new SNSClient()
  }
}