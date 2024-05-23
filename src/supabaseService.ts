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
      .select(
        `
        id,
        user_id,
        contact_number,
        date,
        start_time,
        end_time,
        agenda,
        dentists (
          id,
          name
        )
      `
      )
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

export async function getAppointment(id: string) {
  try {
    let { data: appointments, error } = await supabase
      .from("appointments")
      .select(
        `
        id,
        user_id,
        contact_number,
        date,
        start_time,
        end_time,
        agenda,
        dentists (
          id,
          name
        )
      `
      )
      .eq("id", id);

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

interface UpdateAppointmentSchema {
  id: string;
  userId?: string;
  contactNumber?: string;
  agenda?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  dentistId?: string;
}

export async function updateAppointment(data: UpdateAppointmentSchema) {
  try {
    const { data: resultData, error } = await supabase
      .from("appointments")
      .update({
        user_id: data.userId,
        contact_number: data.contactNumber,
        agenda: data.agenda,
        date: data.date,
        start_time: data.startTime,
        end_time: data.endTime,
        dentist_id: data.dentistId,
      })
      .eq("id", data.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return resultData;
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw error;
  }
}

export async function deleteAppointment(id: string) {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error deleting appointment:", error);
    throw error;
  }
}
