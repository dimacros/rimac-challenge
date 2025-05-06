import type { APIGatewayProxyHandler } from "aws-lambda";
import { CreateAppointmentCommand } from "../modules/appointments/commands/CreateAppointmentCommand";
import { AppointmentModule } from "../modules/appointments";
import { createProviders } from "../globals";

const providers = createProviders()

export const handler: APIGatewayProxyHandler = async (event) => {
  const Appointment = AppointmentModule(providers);

  try {
    const payload = JSON.parse(event.body || "{}");
    const command = CreateAppointmentCommand.parse(payload);

    await Appointment.Commands.CreateAppointment(command);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Appointment created successfully",
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error,
        message: "Error creating appointment",
      }),
    };
  }
};