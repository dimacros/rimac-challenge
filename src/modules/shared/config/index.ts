import { z } from "zod";

const configSchema = z.object({
  aws: z.object({
    region: z.string().default("us-east-1"),
    accessKeyId: z.string(),
    secretAccessKey: z.string(),
    dynamoDb: z.object({
      tables: z.object({
        appointments: z.string().default("appointments"),
      }),
    }),
    topics: z.object({
      peruvianAppointmentCreated: z.string().default("peruvian-appointment-created"),
      chileanAppointmentCreated: z.string().default("chilean-appointment-created"),
    }),
    eventBridge: z.object({
      sources: z.object({
        appointmentService: z.string().default("medical-center-service"),
      }),
    })
  }),
  peruvianDb: z.object({
    connectionString: z.string(),
    poolSize: z.number().default(1),
  }),
  chileanDb: z.object({
    connectionString: z.string(),
    poolSize: z.number().default(1),
  }),
})

export type AppConfig = z.infer<typeof configSchema>

export const createConfig = (env: NodeJS.ProcessEnv) => {
  return configSchema.parse({
    aws: {
      region: env.AWS_REGION || "us-east-1",
      accessKeyId: env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY || "",
      dynamoDb: {
        tables: {
          appointments: env.DYNAMODB_TABLE_APPOINTMENTS || "appointments",
        }
      },
      topics: {
        peruvianAppointmentCreated: env.SNS_TOPIC_PERUVIAN_APPOINTMENT_CREATED || "peruvian-appointment-created",
        chileanAppointmentCreated: env.SNS_TOPIC_CHILEAN_APPOINTMENT_CREATED || "chilean-appointment-created",
      },
      eventBridge: {
        sources: {
          appointmentService: env.EVENTBRIDGE_SOURCE_APPOINTMENT_SERVICE || "medical-center-service",
        }
      }
    },
    peruvianDb: {
      connectionString: env.DATABASE_PE_CONNECTION_STRING || "",
      poolSize: parseInt(env.DATABASE_POOL_SIZE || "1", 10),
    },
    chileanDb: {
      connectionString: env.DATABASE_CL_CONNECTION_STRING || "",
      poolSize: parseInt(env.DATABASE_POOL_SIZE || "1", 10),
    },
  } satisfies AppConfig);
}