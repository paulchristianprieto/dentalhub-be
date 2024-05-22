import { createClient } from "@supabase/supabase-js";
import { CreateAppointmentSchema } from "./types";
import { snakeToCamel } from "./utils";

const projectUrl = process.env.PROJECT_URL || "";
const publicKey = process.env.PUBLIC_KEY || "";

const supabase = createClient(projectUrl, publicKey);

export async function getAppointments(userId: string) {
  
  try {
    let { data: appointments, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("user_id", userId);


    if (error) {
      return error;
    }

    const result = snakeToCamel(appointments);

    return result;
  } catch (error) {
    return error;
  }
}

export async function createAppointment(data: CreateAppointmentSchema) {
  try {
    const { data: resultData, error } = await supabase
      .from("appointments")
      .insert([
        {
          user_id: data?.userId,
          contact_number: data?.contactNumber,
          agenda: data?.agenda,
          date: data?.date,
          start_time: data?.startTime,
          end_time: data?.endTime,
          dentist_id: data?.dentistId,
        },
      ])
      .select();

    return resultData;
  } catch (error) {
    return error;
  }
}
