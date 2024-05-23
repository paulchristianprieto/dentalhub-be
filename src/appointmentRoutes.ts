import express, { Request, Response } from "express";
import {
  createAppointment,
  deleteAppointment,
  getAppointment,
  getAppointments,
  updateAppointment,
} from "./supabaseService";
import Joi from "joi";
import { upload } from "./middlewares/multer";

const router = express.Router();

const createAppointmentSchema = Joi.object({
  userId: Joi.string().required(),
  contactNumber: Joi.string(),
  date: Joi.string(),
  startTime: Joi.string(),
  endTime: Joi.string(),
  agenda: Joi.string(),
  dentistId: Joi.string(),
});

router.get("/", async (req: Request, res: Response) => {
  const { userId, id } = req.body;

  if (id) {
    const data = await getAppointment(id);
    res.send(data);

    return;
  }

  const data = await getAppointments(userId);
  res.send(data);
});

router.put("/", async (req: Request, res: Response) => {
  const updatedData = req.body;

  const data = await updateAppointment(updatedData);
  res.send(data);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const appointmentId = req.params.id;

  try {
    const data = await deleteAppointment(appointmentId);
    res.status(200).send(data);
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).send({ error: "Failed to delete appointment" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const postData = req.body;

  const { value, error } = createAppointmentSchema.validate(postData);

  if (error) {
    return res.send(error.details);
  }

  const result = await createAppointment(value);
  res.send(result);
});

export default router;
