import { pgTable, varchar, integer, date, serial, timestamp } from "drizzle-orm/pg-core";

export const medicalCenters = pgTable("hc_medical_centers", {
  centerId: serial("center_id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const specialties = pgTable("hc_specialties", {
  specialtyId: serial("specialty_id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const doctors = pgTable("hc_doctors", {
  doctorId: serial("doctor_id").primaryKey(),
  firstName: varchar("name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const doctorSpecialties = pgTable("hc_doctor_specialties", {
  doctorSpecialtyId: serial("doctor_specialty_id").primaryKey(),
  doctorId: integer("doctor_id")
    .notNull()
    .references(() => doctors.doctorId),
  centerId: integer("center_id")
    .notNull()
    .references(() => medicalCenters.centerId),
  specialtyId: integer("specialty_id")
    .notNull()
    .references(() => specialties.specialtyId),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const doctorSchedules = pgTable("hc_doctor_schedules", {
  scheduleId: serial("doctor_schedule_id").primaryKey(),
  centerId: integer("center_id")
    .notNull()
    .references(() => medicalCenters.centerId),
  specialtyId: integer("specialty_id")
    .notNull()
    .references(() => specialties.specialtyId),
  doctorId: integer("doctor_id")
    .notNull()
    .references(() => doctors.doctorId),
  startTime: date("start_time").notNull(),
  endTime: date("end_time").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const insureds = pgTable("hc_insureds", {
  id: serial("id").primaryKey(),
  insuredId: varchar("insured_id").unique(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  brithdate: date("brithdate").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const appointments = pgTable("hc_appointments", {
  appointmentId: serial("appointment_id").primaryKey(),
  scheduleId: integer("schedule_id")
    .unique()
    .notNull()
    .references(() => doctorSchedules.scheduleId),
  insuredId: varchar("insured_id")
    .notNull()
    .references(() => insureds.insuredId),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});