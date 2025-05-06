import type { EventBridgeEvent, SQSHandler } from "aws-lambda";
import { CompleteAppointmentCommand } from "../modules/appointments/commands/CompleteAppointmentCommand";
import { AppointmentEventType, AppointmentModule } from "../modules/appointments";
import { createProviders } from "../globals";

const providers = createProviders()

export const handler: SQSHandler = async (event) => {
  const Appointment = AppointmentModule(providers);

  try {
    for (const record of event.Records) {
      const payload: EventBridgeEvent<
        AppointmentEventType.APPOINTMENT_BOOKED,
        CompleteAppointmentCommand
      > = JSON.parse(record.body);

      const command = CompleteAppointmentCommand.parse(payload.detail);

      console.log("Processing completed appointment:", command);

      const result = await Appointment.Commands.CompleteAppointment(command);

      console.log("Appointment completed successfully:", result);
    }
  } catch (error) {
    console.error("Error processing completed appointment:", error);
    throw error;
  }
}