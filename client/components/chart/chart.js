import { useEffect, useRef } from "react";
import { Chart } from "chart.js";
import { timeNow } from "../../helpers/functions";
import 'chartjs-adapter-moment';
import moment from "moment";
import {Line} from 'react-chartjs-2';
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

export default function Bar({dataList}) {
  const canvasEl = useRef(null);

  const colors = {
    purple: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)"
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)"
    }
  };

  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d");
    // const ctx = document.getElementById("myChart");

    const gradient = ctx.createLinearGradient(0, 16, 0, 600);
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(0.65, colors.purple.quarter);
    gradient.addColorStop(1, colors.purple.zero);

    const weight = dataList.map(item => new Date(new Date(item.start).toLocaleString("hu-HU", { timeZone: "Europe/Budapest" })));
    const labels = dataList.map(item => item.name);
    
    const data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: gradient,
          label: "Kezdési idő",
          // data: dataList.map(item => new Date(new Date(item.start).toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }))),
          data: 1,
          fill: true,
          borderWidth: 2,
          borderColor: colors.purple.default,
          pointBackgroundColor: colors.purple.default,
          pointRadius: 3
        },
        {
          backgroundColor: gradient,
          label: "Zárási idő",
          // data: dataList.map(item => new Date(new Date(item.end).toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }))),
          data:12,
          fill: true,
          borderWidth: 2,
          borderColor: colors.purple.default,
          pointBackgroundColor: colors.purple.default,
          pointRadius: 3
        }
      ]
    };
    const config = {
      type: "bar",
      data: data,
      options: {
        animations: {
          tension: {
            duration: 6000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
          }
        },
        scales: {
          y: { // defining min and max so hiding the dataset does not change scale range
            type: 'time',
            time: {
          
              displayFormat: {
                hour:'HH'
              
              }
            
            },
            ticks: {
              // forces step size to be 50 units
              stepSize: 1
            }
          },
         
          
        }
      }
    }

    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  });

  return (
    <>
      <span>Napi munkanap</span>
      <canvas ref={canvasEl} width="400" height="400" />
    </>
  );
}