import express, { Request, Response } from 'express';
import { validateRequest,BadRequestError } from '@mnwork/common';
import { Time } from '@mnwork/common';
const Mongoose = require('mongoose');
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
  '/api/time/delete',
  validateRequest,
  async (req: Request, res: Response) => {

    const { user_id } = req.body;
    const articleID = Mongoose.Types.ObjectId(user_id);

    console.log(articleID);
  let timeHelper = null;
    if(articleID){
      await Time.deleteOne({ _id: articleID});

      // If no error
      res.status(200).json("ok");
      
    }else{  
    throw new BadRequestError('Missing User ID request.');
    }
    

  console.log(timeHelper)
if(timeHelper != null){
    res.status(201).send("Successfull delete!");
}else{
    res.status(201).send({});
}
  
  }
);

export { router as deleteTime };
