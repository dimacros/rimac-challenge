import { z } from "zod";
import { PutItemCommand, type DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import type { AppConfig } from "../../shared/config";

export const CreateAppointmentCommand = z.object({
  insuredId: z.string(),
  scheduleId: z.number().positive(),
  countryISO: z.enum(["PE", "CL"])
})

export type CreateAppointmentCommand = z.infer<typeof CreateAppointmentCommand>;

export class CreateAppointmentCommandHandler {
  constructor(
    private readonly params: {
      dynamodbClient: DynamoDBClient;
      dynamodbTableName: string;
      snsClient: SNSClient;
      topics: AppConfig["aws"]["topics"];
    },
  ) { }

  async execute(command: CreateAppointmentCommand) {
    const { dynamodbClient, dynamodbTableName, snsClient, topics } = this.params;

    await dynamodbClient.send(new PutItemCommand({
      TableName: dynamodbTableName,
      Item: {
        insuredId: { S: command.insuredId },
        scheduleId: { N: command.scheduleId.toString() },
        countryISO: { S: command.countryISO },
        status: { S: "PENDING" },
      },
    }));

    await snsClient.send(new PublishCommand({
      TopicArn: command.countryISO === "PE" ? topics.peruvianAppointmentCreated : topics.chileanAppointmentCreated,
      Message: JSON.stringify(command),
    }));
  }
}
