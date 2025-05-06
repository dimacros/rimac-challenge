import type { Providers } from "../../globals";
import { BookAppointmentCommand, BookAppointmentCommandHandler } from "./commands/BookAppointmentCommand";
import { CompleteAppointmentCommand, CompleteAppointmentCommandHandler } from "./commands/CompleteAppointmentCommand";
import { CreateAppointmentCommand, CreateAppointmentCommandHandler } from "./commands/CreateAppointmentCommand";
import { GetAppointmentsQuery, GetAppointmentsQueryHandler } from "./queries/GetAppointmentsQuery";
import { GetRootSchemaQueryHandler } from "./queries/GetRootSchemaQuery";

export enum AppointmentEventType {
  APPOINTMENT_BOOKED = "appointmentBooked",
}

export const AppointmentModule = (providers: Providers) => ({
  Commands: {
    BookAppointment: (command: BookAppointmentCommand) => {
      const dynamicDb = {
        PE: providers.peruvianDbClient,
        CL: providers.chileanDbClient,
      }

      const commandHandler = new BookAppointmentCommandHandler({
        dbClient: dynamicDb[command.countryISO],
        eventBridgeClient: providers.eventBridgeClient,
        eventBridgeSource: providers.config.aws.eventBridge.sources.appointmentService,
      })

      return commandHandler.execute(command);
    },
    CreateAppointment: (command: CreateAppointmentCommand) => {
      const commandHandler = new CreateAppointmentCommandHandler({
        dynamodbClient: providers.dynamodbClient,
        dynamodbTableName: providers.config.aws.dynamoDb.tables.appointments,
        snsClient: providers.snsClient,
        topics: providers.config.aws.topics,
      })

      return commandHandler.execute(command);
    },
    CompleteAppointment: (command: CompleteAppointmentCommand) => {
      const commandHandler = new CompleteAppointmentCommandHandler({
        dynamodbClient: providers.dynamodbClient,
        dynamodbTableName: providers.config.aws.dynamoDb.tables.appointments,
      })

      return commandHandler.execute(command);
    },
  },
  Queries: {
    GetAppointments: (query: GetAppointmentsQuery) => {
      const queryHandler = new GetAppointmentsQueryHandler({
        dynamodbClient: providers.dynamodbClient,
        dynamodbTableName: providers.config.aws.dynamoDb.tables.appointments,
      })

      return queryHandler.execute(query);
    },
    GetRootSchema: () => {
      const queryHandler = new GetRootSchemaQueryHandler({
        chileanDbClient: providers.chileanDbClient,
        peruvianDbClient: providers.peruvianDbClient,
      })

      return queryHandler.execute();
    }
  }
})