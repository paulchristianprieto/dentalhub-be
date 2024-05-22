import express, { Request, Response } from "express";
import { createAppointment, getAppointments } from "./supabaseService";
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
  const { userId } = req.body;
  const data = await getAppointments(userId);
  res.send(data);
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
