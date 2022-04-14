import express, { Request, Response } from 'express';
import { validateRequest } from '@mnwork/common';
import { Time } from '@mnwork/common';

const router = express.Router();

router.post(
  '/api/time/close',
  validateRequest,
  async (req: Request, res: Response) => {
    const { time_id } = req.body;
    let existingRow = await Time.findOne({ "_id": time_id });

    let dateNow = new Date(new Date().toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }));
    if (existingRow && existingRow.isFinished == false && existingRow.isChecked == true && existingRow.status == "munka" && existingRow.start.getFullYear() === dateNow.getFullYear() && existingRow.start.getMonth() === dateNow.getMonth() && existingRow.start.getDate() === dateNow.getDate()) {
      let dateNow = new Date(new Date().toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }));
      existingRow.isHere = false;
      existingRow.live_end = dateNow;
      existingRow.isFinished = true;
      existingRow.save();
    }

    res.status(201).send(existingRow ? (existingRow) : ({}));
  }
);

export { router as close };