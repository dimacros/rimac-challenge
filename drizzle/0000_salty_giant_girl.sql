CREATE TABLE "hc_appointments" (
	"appointment_id" serial PRIMARY KEY NOT NULL,
	"schedule_id" integer NOT NULL,
	"insured_id" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "hc_appointments_schedule_id_unique" UNIQUE("schedule_id")
);
--> statement-breakpoint
CREATE TABLE "hc_doctor_schedules" (
	"doctor_schedule_id" serial PRIMARY KEY NOT NULL,
	"center_id" integer NOT NULL,
	"specialty_id" integer NOT NULL,
	"doctor_id" integer NOT NULL,
	"start_time" date NOT NULL,
	"end_time" date NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "hc_doctor_specialties" (
	"doctor_specialty_id" serial PRIMARY KEY NOT NULL,
	"doctor_id" integer NOT NULL,
	"center_id" integer NOT NULL,
	"specialty_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "hc_doctors" (
	"doctor_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "hc_insureds" (
	"id" serial PRIMARY KEY NOT NULL,
	"insured_id" varchar,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone_number" varchar(20) NOT NULL,
	"address" varchar(255) NOT NULL,
	"brithdate" date NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "hc_insureds_insured_id_unique" UNIQUE("insured_id")
);
--> statement-breakpoint
CREATE TABLE "hc_medical_centers" (
	"center_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "hc_specialties" (
	"specialty_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "hc_appointments" ADD CONSTRAINT "hc_appointments_schedule_id_hc_doctor_schedules_doctor_schedule_id_fk" FOREIGN KEY ("schedule_id") REFERENCES "public"."hc_doctor_schedules"("doctor_schedule_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hc_appointments" ADD CONSTRAINT "hc_appointments_insured_id_hc_insureds_insured_id_fk" FOREIGN KEY ("insured_id") REFERENCES "public"."hc_insureds"("insured_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hc_doctor_schedules" ADD CONSTRAINT "hc_doctor_schedules_center_id_hc_medical_centers_center_id_fk" FOREIGN KEY ("center_id") REFERENCES "public"."hc_medical_centers"("center_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hc_doctor_schedules" ADD CONSTRAINT "hc_doctor_schedules_specialty_id_hc_specialties_specialty_id_fk" FOREIGN KEY ("specialty_id") REFERENCES "public"."hc_specialties"("specialty_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hc_doctor_schedules" ADD CONSTRAINT "hc_doctor_schedules_doctor_id_hc_doctors_doctor_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."hc_doctors"("doctor_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hc_doctor_specialties" ADD CONSTRAINT "hc_doctor_specialties_doctor_id_hc_doctors_doctor_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."hc_doctors"("doctor_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hc_doctor_specialties" ADD CONSTRAINT "hc_doctor_specialties_center_id_hc_medical_centers_center_id_fk" FOREIGN KEY ("center_id") REFERENCES "public"."hc_medical_centers"("center_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hc_doctor_specialties" ADD CONSTRAINT "hc_doctor_specialties_specialty_id_hc_specialties_specialty_id_fk" FOREIGN KEY ("specialty_id") REFERENCES "public"."hc_specialties"("specialty_id") ON DELETE no action ON UPDATE no action;