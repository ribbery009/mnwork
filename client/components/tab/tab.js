import * as React from 'react';
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


        let monthData;
        let rgbArray = [];
        if (!_.isNull(list)) {

            if(status === "mindegyik"){

            }else{
                monthData = getChartsData(list, chartLabels);
            }

            for (let index = 0; index < chartLabels.length; index++) {
                const element = getRandomRgb();
                rgbArray.push(element)
            }


        }

        setChartComponent(<ChartComponent dataList={monthData} labels={chartLabels} colors={rgbArray} />)

    }, [list])


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const allName = (name === "Mindenki");
    //MEgnézem, hogy a startDate és endDate =? a mai nappal és a következő nappal

    const today = new Date();
    const nextDay = new Date(new Date().setDate(startDate.getDate() + 1));

    const isTodayProp = (startDate.getFullYear() === today.getFullYear() && startDate.getMonth() === today.getMonth() && startDate.getDate() === today.getDate()) && (endDate.getFullYear() === nextDay.getFullYear() && endDate.getMonth() === endDate.getMonth() && endDate.getDate() === nextDay.getDate())

    //min 1 hónap differencia
    const isMonthDiff = (startDate.getFullYear() === endDate.getFullYear() && startDate.getMonth() !== endDate.getMonth());

    //2 dátum különbsége
    const diff = monthDiff(startDate, endDate);

    return (
        <>
            {!(_.isNull(chartComponent)) && chartComponent}
        </>
    );
};