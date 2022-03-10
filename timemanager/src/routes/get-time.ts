import express from 'express';
import { Time } from '@mnwork/common';

const router = express.Router();

router.get('/api/time/get-time', async (req, res) => {

    const timeList = await Time.find();
    let usersList = null;
    let newRow = null;
    if (req.query && req.query["startDate"] && req.query["endDate"]) {
      
        let start = new Date(new Date(JSON.stringify(req.query["startDate"])).toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }));
        console.log(req.query["startDate"])
        let end = new Date(new Date(JSON.stringify(req.query["endDate"])).toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }));

        usersList = timeList.map((time) => {
            if(time.start >= start && time.start <= end){
              newRow = time;
              return newRow;
            }
        })
    }
    else if (req.query && req.query["workDay"]) {
        let workDay = new Date(new Date(JSON.stringify(req.query["workDay"])).toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }));
        var dateQuery =  workDay.getFullYear()+'/'+( workDay.getMonth()+1)+'/'+ workDay.getDate();

        usersList = timeList.map((time) => {
          var timeStart =  time.start.getFullYear()+'/'+( time.start.getMonth()+1)+'/'+ time.start.getDate();
          if(dateQuery === timeStart){
            newRow = time;
            return newRow;
          }
      })
    }

    // res.send(usersList ? (usersList) : ({}))
    res.send(usersList ? usersList : {})
});

export { router as getTime };
