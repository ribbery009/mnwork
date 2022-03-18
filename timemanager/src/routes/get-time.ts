import express from 'express';
import { Time } from '@mnwork/common';

const router = express.Router();

router.get('/api/time/get-time', async (req, res) => {

    const timeList = await Time.find();
    let usersList = {};
    let newRow = {};
    let respList=[{}];
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

        let index = 0;
        usersList = timeList.map((time) => {
          var timeStart =  time.start.getFullYear()+'/'+( time.start.getMonth()+1)+'/'+ time.start.getDate();

          console.log("timeStart: ",timeStart)

          console.log("dataQuery: ",dateQuery)
          if(dateQuery === timeStart){
            newRow = time;
            respList[index]=time;
            index++;
          }


      })
    }
console.log("users: ",respList)
    // res.send(usersList ? (usersList) : ({}))
    if (!respList || respList === null) {
      res.send({})
    }


    res.send(respList)
});

export { router as getTime };
