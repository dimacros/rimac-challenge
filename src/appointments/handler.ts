import type { APIGatewayProxyHandler, SQSHandler } from "aws-lambda";
import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import { SNSClient, PublishBatchCommand } from "@aws-sdk/client-sns";
import { randomUUID } from "node:crypto";

const snsClient = new SNSClient();
const eventBridgeClient = new EventBridgeClient();

export const getAppointments: APIGatewayProxyHandler = async (event) => {
  try {
    // Logic to fetch appointments
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "List of appointments", data: [] }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error fetching appointments", error }),
    };
  }
};

export const createAppointment: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    // Logic to create an appointment
    const command = new PublishBatchCommand({
      TopicArn: process.env.PERUVIAN_APPOINTMENT_TOPIC_ARN,
      PublishBatchRequestEntries: [{
        Id: randomUUID(),
        Message: JSON.stringify(body),
        MessageAttributes: {
          appointmentId: {
            DataType: 'String',
            StringValue: body.appointmentId,
          },
          appointmentType: {
            DataType: 'String',
            StringValue: body.appointmentType,
          },
        },
      }]
    });

    await snsClient.send(command);

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Appointment created successfully", data: body }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error creating appointment", error }),
    };
  }
};

export const bookPeruvianAppointment: SQSHandler = async (event) => {
  try {
    for (const record of event.Records) {
      const messageBody = JSON.parse(record.body);
      // Logic to process Peruvian appointment booking
      console.log("Processing Peruvian appointment:", messageBody);
    }

    const command = new PutEventsCommand({
      Entries: [
        {
          Source: "appointments",
          DetailType: "PeruvianAppointment",
          Detail: JSON.stringify({ message: "Chilean appointment booked", data: [] }),
        },
      ],
    })

    await eventBridgeClient.send(command);

    return;
  } catch (error) {
    console.error("Error processing Peruvian appointment:", error);
    throw error;
  }
};

// Handler for SQS - Book Chilean Appointment
export const bookChileanAppointment: SQSHandler = async (event) => {
  try {
    for (const record of event.Records) {
      const messageBody = JSON.parse(record.body);
      // Logic to process Chilean appointment booking
      console.log("Processing Chilean appointment:", messageBody);
    }

    const command = new PutEventsCommand({
      Entries: [
        {
          Source: "appointments",
          DetailType: "ChileanAppointment",
          Detail: JSON.stringify({ message: "Chilean appointment booked", data: [] }),
        },
      ],
    })

    await eventBridgeClient.send(command);
    return;
  } catch (error) {
    console.error("Error processing Chilean appointment:", error);
    throw error;
  }
};

// Handler for SQS - Complete Appointment
export const completeAppointment: SQSHandler = async (event) => {
  try {
    for (const record of event.Records) {
      const messageBody = JSON.parse(record.body);
      // Logic to complete an appointment
      console.log("Completing appointment:", messageBody);
    }
    return;
  } catch (error) {
    console.error("Error completing appointment:", error);
    throw error;
  }
};