import { z } from "zod";
import { UpdateItemCommand, type DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const CompleteAppointmentCommand = z.object({
  insuredId: z.string(),
  scheduleId: z.number().positive(),
  countryISO: z.enum(["PE", "CL"])
})

export type CompleteAppointmentCommand = z.infer<typeof CompleteAppointmentCommand>;

export class CompleteAppointmentCommandHandler {
  constructor(
    private readonly params: {
      dynamodbClient: DynamoDBClient;
      dynamodbTableName: string;
    },
  ) { }

  async execute(command: CompleteAppointmentCommand) {
    const { dynamodbClient, dynamodbTableName } = this.params;

    const result = await dynamodbClient.send(new UpdateItemCommand({
      TableName: dynamodbTableName,
      Key: {
        scheduleId: { N: command.scheduleId.toString() },
        countryISO: { S: command.countryISO },
      },
      UpdateExpression: "SET #status = :status",
      ExpressionAttributeNames: {
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":status": { S: "COMPLETED" },
      },
      ReturnValues: "ALL_NEW",
    }));

    return result;
  }
}