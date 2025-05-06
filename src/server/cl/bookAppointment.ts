import type { SQSHandler, SNSMessage } from "aws-lambda";
import { BookAppointmentCommand } from "../../modules/appointments/commands/BookAppointmentCommand";
import { createProviders } from "../../globals";
import { AppointmentModule } from "../../modules/appointments";

const providers = createProviders()

export const handler: SQSHandler = async (event) => {
  const Appointment = AppointmentModule(providers);

  try {
    for (const record of event.Records) {
      const payload: SNSMessage = JSON.parse(record.body);
      const command = BookAppointmentCommand.parse(JSON.parse(payload.Message));

      await Appointment.Commands.BookAppointment(command);
      console.log("Chilean appointment booked successfully:", command);
    }
  } catch (error) {
    console.error("Error processing Chilean appointment:", error);
    throw error;
  }
};