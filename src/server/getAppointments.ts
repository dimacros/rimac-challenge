import type { APIGatewayProxyHandler } from "aws-lambda";
import { GetAppointmentsQuery } from "../modules/appointments/queries/GetAppointmentsQuery";
import { AppointmentModule } from "../modules/appointments";
import { createProviders } from "../globals";

const providers = createProviders()

export const handler: APIGatewayProxyHandler = async (event) => {
  const Appointment = AppointmentModule(providers);

  try {
    const query = GetAppointmentsQuery.parse(event.queryStringParameters ?? {});
    const items = await Appointment.Queries.GetAppointments(query);

    return {
      statusCode: 200,
      body: JSON.stringify(items),
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