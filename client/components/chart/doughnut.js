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

export default function ChartComponent({ dataList,name,status,labels }) {

    

    useEffect(() => {
        if (dataList) {
            let arrayList = [{}];
            let index = 0;
            const late = dataList.map(item => {
                if (!arrayList.includes({ email: item.email, name: item.name })) {
                    return item;
                }
            }
            )

            console.log("late: ", late);

            dataList.map(item => console.log("Date: ", moment(new Date(new Date(item.start).toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }))).format('YYYY MM DD hh:mm')))

            setData(data)
        }
    }, [])


    const data = {
        backgroundColor: [
            "rgb(2, 88, 255)",
            "rgb(249, 151, 0)",
            "rgb(255, 199, 0)",
            "rgb(32, 214, 152)",
        ],
        labels: [labels.map((month) => {return month})],
        datasets: [
            {
                label: status,
                data: [300, 50, 100, 300],
                backgroundColor: [
                    "rgb(2, 88, 255)",
                    "rgb(249, 151, 0)",
                    "rgb(255, 199, 0)",
                    "rgb(32, 214, 152)",
                ],
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

    console.log(dataList)
    return (
        <Doughnut data={data} height={50} width={50} optios={options} />
    )
}
