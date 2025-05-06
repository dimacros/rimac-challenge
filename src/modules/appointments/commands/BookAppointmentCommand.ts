import { z } from "zod";
import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import { DbClient } from "../../shared/db";
import { AppointmentEventType } from "..";
import * as schema from "../../shared/db/schema";

export const BookAppointmentCommand = z.object({
  insuredId: z.string(),
  scheduleId: z.number().positive(),
  countryISO: z.enum(["PE", "CL"])
})

export type BookAppointmentCommand = z.infer<typeof BookAppointmentCommand>;

export class BookAppointmentCommandHandler {
  constructor(
    private readonly params: {
      dbClient: DbClient;
      eventBridgeClient: EventBridgeClient;
      eventBridgeSource: string;
    }
  ) { }

  async execute(command: BookAppointmentCommand) {
    const { dbClient, eventBridgeClient, eventBridgeSource } = this.params;

    await dbClient.insert(schema.appointments).values({
      insuredId: command.insuredId,
      scheduleId: command.scheduleId,
    }).onConflictDoNothing()

    await eventBridgeClient.send(
      new PutEventsCommand({
        Entries: [
          {
            Source: eventBridgeSource,
            DetailType: AppointmentEventType.APPOINTMENT_BOOKED,
            Detail: JSON.stringify(command),
          },
        ],
      })
    );
  };
}
