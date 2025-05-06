import { DbClient } from "../../shared/db";
import * as schema from "../../shared/db/schema";

export class GetRootSchemaQueryHandler {
  constructor(
    private readonly params: {
      peruvianDbClient: DbClient;
      chileanDbClient: DbClient;
    },
  ) { }

  async execute() {
    const { chileanDbClient, peruvianDbClient } = this.params;

    const cl = {
      medicalCenters: await chileanDbClient.select().from(schema.medicalCenters),
      specialties: await chileanDbClient.select().from(schema.specialties),
      doctors: await chileanDbClient.select().from(schema.doctors),
      doctorSpecialties: await chileanDbClient.select().from(schema.doctorSpecialties),
      doctorSchedules: await chileanDbClient.select().from(schema.doctorSchedules),
    }

    const pe = {
      medicalCenters: await peruvianDbClient.select().from(schema.medicalCenters),
      specialties: await peruvianDbClient.select().from(schema.specialties),
      doctors: await peruvianDbClient.select().from(schema.doctors),
      doctorSpecialties: await peruvianDbClient.select().from(schema.doctorSpecialties),
      doctorSchedules: await peruvianDbClient.select().from(schema.doctorSchedules),
    }

    return {
      cl,
      pe,
    }
  }
}