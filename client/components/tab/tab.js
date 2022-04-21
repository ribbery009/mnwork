import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import ChartComponent from '../chart/doughnut';
import { monthDiff, getChartsLabels, getChartsData, getRandomRgb } from '../../helpers/functions';
import _ from 'lodash';
export default function TabComponent({ data, columns, paginationProp, startDate, endDate, list, name, status }) {

    const [value, setValue] = React.useState(0);
    const [chartComponent, setChartComponent] = React.useState(null);
    const [navigator, setTabNavigator] = React.useState(0);

    useEffect(() => {


        //labels
        const chartLabels = getChartsLabels(startDate, diff);

        console.log("chartLabels: ",chartLabels)
        let monthData;
        let rgbArray = [];
        if (!_.isNull(list)) {
            console.log("List: ",list)
console.log(status)
            if(status === "mindegyik"){

            }else{
                monthData = getChartsData(list, chartLabels);
            }

            for (let index = 0; index < chartLabels.length; index++) {
                const element = getRandomRgb();
                rgbArray.push(element)
            }


        }
        console.log("dataList: ",monthData);
        setChartComponent(<ChartComponent dataList={monthData} labels={chartLabels} colors={rgbArray} />)

    }, [list])

    
    useEffect(() => {

console.log("status: ",status)
    }, [status])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log(status)
    const allName = (name === "Mindenki");
    //MEgnézem, hogy a startDate és endDate =? a mai nappal és a következő nappal

    const today = new Date();
    const nextDay = new Date(new Date().setDate(startDate.getDate() + 1));

    const isTodayProp = (startDate.getFullYear() === today.getFullYear() && startDate.getMonth() === today.getMonth() && startDate.getDate() === today.getDate()) && (endDate.getFullYear() === nextDay.getFullYear() && endDate.getMonth() === endDate.getMonth() && endDate.getDate() === nextDay.getDate())

    //min 1 hónap differencia
    const isMonthDiff = (startDate.getFullYear() === endDate.getFullYear() && startDate.getMonth() !== endDate.getMonth());

    //2 dátum különbsége
    const diff = monthDiff(startDate, endDate);

    console.log(chartComponent)
    return (
        <>

            <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {(isMonthDiff & status == "késés") && <Tab label="Késés" />}
                    {isTodayProp & (status == "Itt van") && <Tab label="Itt van" />}
                    {isMonthDiff & (status == "beteg") && <Tab label="Betegség" />}
                    {isMonthDiff & (status == "szabad") && <Tab label="Szabadság" />}
                    {isMonthDiff & (status == "munka") && <Tab label="Munka" />}
                    {isMonthDiff & (status == "zárva az étterem") && <Tab label="Munka" />}
                    {allName && <Tab label="Összes" />}
                </Tabs>
            </Box>
            {!(_.isNull(chartComponent)) && chartComponent}
        </>
    );
};