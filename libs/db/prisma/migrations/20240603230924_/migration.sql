-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "cal_kind" TEXT,
    "cal_etag" TEXT,
    "cal_id" TEXT,
    "cal_status" TEXT,
    "cal_htmllink" TEXT,
    "cal_created" TEXT,
    "cal_updated" TEXT,
    "cal_summary" TEXT,
    "cal_creator" TEXT,
    "cal_organizer" TEXT,
    "cal_start_datetime" TEXT,
    "cal_start_timezone" TEXT,
    "cal_end" TEXT,
    "cal_end_timezone" TEXT,
    "cal_icaluid" TEXT,
    "cal_sequence" TEXT,
    "cal_reminders" INTEGER,
    "cal_eventtype" INTEGER,
    "cal_recurrence" INTEGER,
    "organizer_display_name" TEXT,
    "organizer_self" BOOLEAN,
    "extendedproperties_location_id" TEXT,
    "extendedproperties_realizator_id" TEXT,
    "rrule_flag" BOOLEAN NOT NULL DEFAULT false,
    "rrule" TEXT,
    "sound_engineer_id" INTEGER NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoundEngineer" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT,
    "firstname" TEXT,
    "lastname" TEXT,
    "phoneNumber" TEXT,
    "discord_login" TEXT,
    "desc" TEXT,
    "prefersTV" TEXT,
    "prefersMinimeters" TEXT,
    "prefersDPI" TEXT,
    "hidden" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "SoundEngineer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoundEngineerAvailability" (
    "id" SERIAL NOT NULL,
    "dayOfWeek" "DayOfWeek" NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "sound_engineer_id" INTEGER NOT NULL,

    CONSTRAINT "SoundEngineerAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudioLocation" (
    "id" SERIAL NOT NULL,
    "location" TEXT,
    "google_id" TEXT,
    "info" TEXT,

    CONSTRAINT "StudioLocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SoundEngineerAvailability_id_sound_engineer_id_idx" ON "SoundEngineerAvailability"("id", "sound_engineer_id");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_sound_engineer_id_fkey" FOREIGN KEY ("sound_engineer_id") REFERENCES "SoundEngineer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoundEngineerAvailability" ADD CONSTRAINT "SoundEngineerAvailability_sound_engineer_id_fkey" FOREIGN KEY ("sound_engineer_id") REFERENCES "SoundEngineer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
