import express, { Request, Response } from 'express';
import { validateRequest } from '@mnwork/common';
import { Time } from '@mnwork/common';

const router = express.Router();
/*
status=
-work
-working
-off
-sick
-closed restaurant
-holiday

 start: Date;
    end: Date;
    live_start: Date;
    live_end: Date;
    name: string;
    user_email: string;
    creator: string;
    late: boolean;
    late_time_min: number;
    isHere: boolean;
    status: string;
*/
router.post(
  '/api/time/newtime',
  validateRequest,
  async (req: Request, res: Response) => {

    const { startDate, endDate, name_and_email, creator, status } = req.body;
    const late_time_min = 0;
    const late = false;
    const isHere = false;
    const isFinished = false;
    const isChecked = false;
    const live_start = new Date();
    const live_end = new Date();
    const timeArray = new Array();
    const helper = name_and_email.split("-");
    const name = helper[0];
    const user_email = helper[1];

    const startQuery = new Date(new Date(startDate).toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }));
    const endQuery = new Date(new Date(endDate).toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }));

    startQuery.setHours(0,0,0);
    endQuery.setHours(0,0,0);
    const diffDays = Math.floor((endQuery.getTime() - startQuery.getTime())/(24*3600*1000));


    //ha egyenlőek a napok
    if (startQuery.getFullYear() === endQuery.getFullYear() && startQuery.getMonth() === endQuery.getMonth() && startQuery.getDate() === endQuery.getDate()) {
      let start = new Date(new Date(startDate).toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }));
      let end = new Date(new Date(endDate).toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }));
      const time = Time.build({ start, end, name, late, late_time_min, creator, isHere, status, live_start, live_end, user_email, isFinished, isChecked });
      time.save();
      timeArray.push(time);
    } else {
      for (let index = 0; index <= diffDays; index++) {
        let start = new Date(new Date(startDate).toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }));
        let end = new Date(new Date(endDate).toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }));
        end.setDate(end.getDate() - (diffDays - index));
        start.setDate(start.getDate() + index);
        const time = Time.build({ start, end, name, late, late_time_min, creator, isHere, status, live_start, live_end, user_email, isFinished, isChecked });
        time.save();
        timeArray.push(time)
      }
    }



    res.status(201).send(timeArray);
  }
);

export { router as newtime };
