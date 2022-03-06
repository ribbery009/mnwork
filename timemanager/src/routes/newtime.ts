import express, { Request, Response } from 'express';
import { validateRequest } from '@mnwork/common';
import { Time } from '../models/time';

const router = express.Router();

router.post(
  '/api/time/newtime',
  validateRequest,
  async (req: Request, res: Response) => {
    const { start,end,name,user_id,late_time_min,late,creator,isHere,status,live_start,live_end} = req.body;
    const time = Time.build({start,end,name,user_id,late_time_min,late,creator,isHere,status,live_start,live_end});
    
    time.save();
    console.log(time)
    res.status(201).send(time);
  }
);

export { router as newtime };
