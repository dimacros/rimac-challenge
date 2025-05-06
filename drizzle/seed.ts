import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../src/modules/shared/db/schema';

const dbPe = drizzle<typeof schema>(process.env.DATABASE_PE_CONNECTION_STRING!);
const dbCl = drizzle<typeof schema>(process.env.DATABASE_CL_CONNECTION_STRING!);

async function seedDatabase(db: typeof dbPe | typeof dbCl) {
  await db.insert(schema.medicalCenters).values([
    {
      centerId: 1,
      name: 'Centro Médico A',
      address: 'Calle 123, Ciudad',
      phone: '1234567890',
    },
    {
      centerId: 2,
      name: 'Centro Médico B',
      address: 'Avenida 456, Ciudad',
      phone: '0987654321',
    },
  ]);

  await db.insert(schema.specialties).values([
    {
      specialtyId: 1,
      name: 'Cardiología',
    },
    {
      specialtyId: 2,
      name: 'Pediatría',
    },
    {
      specialtyId: 3,
      name: 'Dermatología',
    },
    {
      specialtyId: 4,
      name: 'Ginecología',
    }
  ]);

  await db.insert(schema.doctors).values([
    {
      doctorId: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'jhon@rimac.com',
    },
    {
      doctorId: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@rimac.com',
    },
  ]);

  await db.insert(schema.doctorSpecialties).values([
    {
      doctorId: 1,
      centerId: 1,
      specialtyId: 1,
    },
    {
      doctorId: 1,
      centerId: 1,
      specialtyId: 2,
    },
    {
      doctorId: 2,
      centerId: 2,
      specialtyId: 3,
    },
    {
      doctorId: 2,
      centerId: 2,
      specialtyId: 4,
    },
  ]);

  await db.insert(schema.doctorSchedules).values([
    {
      doctorId: 1,
      centerId: 1,
      specialtyId: 1,
      startTime: new Date('2025-06-10T09:00:00Z').toISOString(),
      endTime: new Date('2025-06-10T10:00:00Z').toISOString(),
    },
    {
      doctorId: 1,
      centerId: 1,
      specialtyId: 2,
      startTime: new Date('2025-06-10T11:00:00Z').toISOString(),
      endTime: new Date('2025-06-10T12:00:00Z').toISOString(),
    },
    {
      doctorId: 2,
      centerId: 2,
      specialtyId: 3,
      startTime: new Date('2025-06-10T13:00:00Z').toISOString(),
      endTime: new Date('2025-06-10T14:00:00Z').toISOString(),
    },
    {
      doctorId: 2,
      centerId: 2,
      specialtyId: 4,
      startTime: new Date('2025-06-10T15:00:00Z').toISOString(),
      endTime: new Date('2025-06-10T16:00:00Z').toISOString(),
    },
    {
      doctorId: 1,
      centerId: 1,
      specialtyId: 1,
      startTime: new Date('2025-06-11T09:00:00Z').toISOString(),
      endTime: new Date('2025-06-11T10:00:00Z').toISOString(),
    },
    {
      doctorId: 1,
      centerId: 1,
      specialtyId: 2,
      startTime: new Date('2025-06-11T11:00:00Z').toISOString(),
      endTime: new Date('2025-06-11T12:00:00Z').toISOString(),
    },
    {
      doctorId: 2,
      centerId: 2,
      specialtyId: 3,
      startTime: new Date('2025-06-11T13:00:00Z').toISOString(),
      endTime: new Date('2025-06-11T14:00:00Z').toISOString(),
    },
    {
      doctorId: 2,
      centerId: 2,
      specialtyId: 4,
      startTime: new Date('2025-06-11T15:00:00Z').toISOString(),
      endTime: new Date('2025-06-11T16:00:00Z').toISOString(),
    }
  ]);

  await db.insert(schema.insureds).values([
    {
      insuredId: '00001',
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@gmail.com',
      phoneNumber: '1234567890',
      address: 'Calle 123, Ciudad',
      brithdate: new Date('1990-01-01').toISOString(),
    },
    {
      insuredId: '00002',
      firstName: 'Bob',
      lastName: 'Smith',
      email: 'bob.smit@gmail.com',
      phoneNumber: '1234567890',
      address: 'Calle 123, Ciudad',
      brithdate: new Date('1990-01-01').toISOString(),
    },
    {
      insuredId: '00003',
      firstName: 'test',
      lastName: 'test',
      email: 'test.test@gmail.com',
      phoneNumber: '1234567890',
      address: 'Calle 123, Ciudad',
      brithdate: new Date('1990-01-01').toISOString(),
    },
  ]);
}

Promise.all([
  seedDatabase(dbPe),
  seedDatabase(dbCl),
]).catch(console.error)