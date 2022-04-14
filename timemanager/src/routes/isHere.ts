import express, { Request, Response } from 'express';
import { validateRequest, BadRequestError } from '@mnwork/common';
import { Time } from '@mnwork/common';

const router = express.Router();

router.post(
  '/api/time/ishere',
  validateRequest,
  async (req: Request, res: Response) => {
    const { time_id } = req.body;
    console.log("body: ",req.body)
    console.log("time id: ",time_id)
    let existingRow = await Time.findOne({ "_id" : time_id });
    let dateNow = new Date(new Date().toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }));
    console.log("existRow: ", existingRow)
    if (existingRow && existingRow.isChecked == false && existingRow.status == "munka" && existingRow.start.getFullYear() === dateNow.getFullYear() && existingRow.start.getMonth() === dateNow.getMonth() && existingRow.start.getDate() === dateNow.getDate()) {

      existingRow.isHere = true;
      existingRow.isChecked = true;
      existingRow.isFinished = false;

      existingRow.live_start = dateNow;


      if (existingRow.start <= dateNow) {
        existingRow.late = true;
        let diffMs = dateNow.getTime() - existingRow.start.getTime();
        let diffMins = Math.round(diffMs / 60000)
        existingRow.late_time_min = diffMins;
      }
      existingRow.save();
    }
    if (!existingRow || existingRow === null) {
      throw new BadRequestError('Valami hiba történt, kérem próbálja később');
    }
    res.status(200).send(existingRow);
  }
);

export { router as isHere };