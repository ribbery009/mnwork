import { Doughnut } from 'react-chartjs-2';
import { Chart } from "chart.js";
import moment from 'moment';
import {
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
} from 'chart.js';
import { useEffect, useState } from 'react';

Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
);
moment.locale();

export default function ChartComponent({ dataList,name,status,labels,colors }) {

    
console.log("colors: ",colors)

console.log("colors: ",dataList)


    const data = {
        backgroundColor: colors.map((color) => {return color}),
        labels: labels.map((month) => {return month}),
        datasets: [
            {
                label: status,
                data: dataList && dataList.map(num => {return num}),
                backgroundColor: colors.map((color) => {return color}),
                hoverOffset: 4,
            }
        ]
    };

    const options = {
        elements: {
            arc: {
                weight: 0.5,
                borderWidth: 3,
            },
        },
        cutout: 150,
    }

    return (
        <Doughnut data={data} height={50} width={50} optios={options} />
    )
}
