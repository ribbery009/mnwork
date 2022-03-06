import express, { Request, Response } from 'express';
import { validateRequest } from '@mnwork/common';
import { Time } from '../models/time';

const router = express.Router();

router.post(
  '/api/time/ishere',
  validateRequest,
  async (req: Request, res: Response) => {
    const { user_id } = req.body;
    let existingRow = await Time.findOne({ user_id });


if(existingRow){
    let dateNow = new Date(new Date().toLocaleString("hu-HU", {timeZone: "Europe/Budapest"}));
    existingRow.isHere = true;
    existingRow.live_start = dateNow;
    if(existingRow.start <= dateNow){
        existingRow.late=true;
        let diffMs = dateNow.getTime() - existingRow.start.getTime(); 
        let diffMins = Math.round(diffMs / 60000)
        existingRow.late_time_min=diffMins;
    }
    existingRow.save();
}
   
    res.status(201).send(existingRow? (existingRow) : ({}));
  }
);

export { router as isHere };