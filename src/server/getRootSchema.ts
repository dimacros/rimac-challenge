import type { APIGatewayProxyHandler } from "aws-lambda";
import { createProviders } from "../globals";
import { AppointmentModule } from "../modules/appointments";

const providers = createProviders()

export const handler: APIGatewayProxyHandler = async (_) => {
  const Appointment = AppointmentModule(providers);

  try {
    const schema = await Appointment.Queries.GetRootSchema();

    return {
      statusCode: 200,
      body: JSON.stringify(schema),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error,
        message: "Error fetching appointments"
      }),
    };
  }
};