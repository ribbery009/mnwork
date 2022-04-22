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
    const diffTime = Math.abs(endQuery.getTime() - startQuery.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    console.log("start: ", startQuery)
    console.log("end: ", endQuery)
    console.log("diffdays: ", diffDays)


    //ha nagyobb az intervallum
    if (startQuery.getFullYear() === endQuery.getFullYear() && startQuery.getMonth() === endQuery.getMonth() && startQuery.getDate() === endQuery.getDate()) {
      let start = new Date(new Date(startQuery).toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }));
      let end = new Date(new Date(endQuery).toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }));
      const time = Time.build({ start, end, name, late, late_time_min, creator, isHere, status, live_start, live_end, user_email, isFinished, isChecked });
      time.save();
      timeArray.push(time);
    } else {
      for (let index = 0; index <= diffDays; index++) {
        let start = new Date(startQuery);
        console.log("startT: ", start)
        let end = new Date(endQuery);
        end.setDate(end.getDate() - (diffDays - index));
        start.setDate(start.getDate() + index);
        console.log("startTTT: ", start)
        const time = Time.build({ start, end, name, late, late_time_min, creator, isHere, status, live_start, live_end, user_email, isFinished, isChecked });
        time.save();
        timeArray.push(time)
      }
    }



    res.status(201).send(timeArray);
  }
);

export { router as newtime };
