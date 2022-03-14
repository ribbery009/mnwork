import express, { Request, Response } from 'express';
import { validateRequest,BadRequestError } from '@mnwork/common';
import { Time } from '@mnwork/common';
import { date } from 'yup';

const router = express.Router();

router.post(
  '/api/time/ishere',
  validateRequest,
  async (req: Request, res: Response) => {
    const { user_id } = req.body;
    console.log(req.body)
    console.log(user_id)
    let existingRow = await Time.findOne({ user_id });
    let dateNow = new Date(new Date().toLocaleString("hu-HU", {timeZone: "Europe/Budapest"}));

if(existingRow && existingRow.start.getFullYear() === dateNow.getFullYear() && existingRow.start.getMonth() === dateNow.getMonth() && existingRow.start.getDate() === dateNow.getDate()){
    
    existingRow.isHere = true;
    existingRow.status = "working";
    existingRow.live_start = dateNow;
    if(existingRow.start <= dateNow){
        existingRow.late=true;
        let diffMs = dateNow.getTime() - existingRow.start.getTime(); 
        let diffMins = Math.round(diffMs / 60000)
        existingRow.late_time_min=diffMins;
    }
    existingRow.save();
}
if (!existingRow || existingRow === null) {
  throw new BadRequestError('Invalid credentials');
}
    res.status(200).send(existingRow);
  }
);

export { router as isHere };