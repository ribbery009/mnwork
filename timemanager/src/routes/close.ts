import express, { Request, Response } from 'express';
import { validateRequest } from '@mnwork/common';
import { Time } from '../models/time';

const router = express.Router();

router.post(
  '/api/time/close',
  validateRequest,
  async (req: Request, res: Response) => {
    const { user_id } = req.body;
    let existingRow = await Time.findOne({ user_id });


if(existingRow){
    let dateNow = new Date(new Date().toLocaleString("hu-HU", {timeZone: "Europe/Budapest"}));
    existingRow.isHere = false;
    existingRow.live_end = dateNow ;
    existingRow.status = "finish";
    existingRow.save();
}
   
    res.status(201).send(existingRow? (existingRow) : ({}));
  }
);

export { router as isHere };