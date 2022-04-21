import express from 'express';
import { Time } from '@mnwork/common';

const router = express.Router();

router.get('/api/time/activemembers', async (req, res) => {

    const timeList = await Time.find();
    let usersList = {
        activeList: new Array(),
        lateList: new Array(),
    };
    // var activeList = new Array();
    // var lateList = new Array();


    let timeNow = new Date(new Date().toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }));
    // var dateQuery = queryStart.getFullYear() + '/' + (queryStart.getMonth() + 1) + '/' + queryStart.getDate();

    console.log("timeNow: ", timeNow.toDateString())
    timeList.map((time) => {
        const timeStart = new Date(new Date(time.start).toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }));

        const timeEnd = new Date(new Date(time.end).toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }));

        console.log("timeStart: ", timeStart.toDateString())
        console.log("equal: ", timeStart.toDateString() === timeNow.toDateString())
        if (timeNow.toDateString() === timeStart.toDateString() && timeNow.toDateString() === timeEnd.toDateString() && time.isHere && time.status === "munka") {
            usersList.activeList.push(time);
            // activeList.push(time);
        }

        if (((timeNow.toDateString() === timeStart.toDateString() && timeNow.toDateString() === timeEnd.toDateString()) && (time.status === "munka") && (time.start < timeNow) && (time.live_end.getTime() === time.live_start.getTime()) && (time.late == false) && (time.late_time_min === 0)) || (timeNow.toDateString() === timeStart.toDateString() && timeNow.toDateString() === timeEnd.toDateString() && time.status === "munka" && time.late == true && time.late_time_min > 0)) {
            usersList.lateList.push(time);
            // lateList.push(time);
        }

    })


    // res.send(usersList ? (usersList) : ({}))
    if (!usersList || (usersList.activeList === null && usersList.lateList === null) || (usersList.lateList.length == 0 && usersList.activeList.length == 0)) {
        res.send("no data");
    } else {
        res.status(201).send(usersList)

    }


});

export { router as getActiveMembers };
