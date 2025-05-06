import { z } from "zod";
import { DynamoDBClient, QueryCommand, ScanCommand } from "@aws-sdk/client-dynamodb";

export const GetAppointmentsQuery = z.object({
  insuredId: z.string().optional(),
})

export type GetAppointmentsQuery = z.infer<typeof GetAppointmentsQuery>;

export class GetAppointmentsQueryHandler {
  constructor(
    private readonly params: {
      dynamodbClient: DynamoDBClient;
      dynamodbTableName: string;
    },
  ) { }

  async execute(query: GetAppointmentsQuery) {
    const { dynamodbClient, dynamodbTableName } = this.params;

    const result = await dynamodbClient.send(
      query.insuredId ?
        new QueryCommand({
          TableName: dynamodbTableName,
          IndexName: "InsuredIdIndex",
          KeyConditionExpression: "insuredId = :insuredId",
          ExpressionAttributeValues: {
            ":insuredId": { S: query.insuredId || "" },
          }
        })
        : new ScanCommand({ TableName: dynamodbTableName })
    )

    return result.Items ? result.Items.map(Item => ({
      insuredId: Item.insuredId?.S || "",
      scheduleId: Item.scheduleId?.N || "",
      countryISO: Item.countryISO?.S || "",
      status: Item.status?.S || "PENDING",
    })) : [];
  }
}
