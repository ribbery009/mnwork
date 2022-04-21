import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import ChartComponent from '../chart/doughnut';
import { monthDiff, getChartsLabels, getChartsData, getRandomRgb,getChartsLabelsByNames } from '../../helpers/functions';
import _ from 'lodash';
export default function TabComponent({ data, columns, paginationProp, startDate, endDate, list, name, status }) {

    const [value, setValue] = React.useState(0);
    const [chartComponentActive, setChartComponentActive] = React.useState(null);
    const [chartComponentLate, setChartComponentLate] = React.useState(null);
    const [navigator, setTabNavigator] = React.useState(0);
    const [today, setToday] = React.useState(new Date(new Date().toLocaleString("hu-HU", { timeZone: "Europe/Budapest" })));

    useEffect(() => {


        let chartLabelsLate = null;
        let chartLabelsActive = null;

        let lateData = [];
        let activeData = [];

        let rgbArrayLate = [];
        let rgbArrayActive = [];


        if (!_.isNull(list) && !_.isNull(list.lateList) && list.lateList.length > 0) {
            console.log("late: ",list.lateList)
            chartLabelsLate = getChartsLabelsByNames(list.lateList);
            // lateData = getChartsDataByNames(list, chartLabelsLate);
            for (let index = 0; index < chartLabelsLate.length; index++) {
                const element = getRandomRgb();
                rgbArrayLate.push(element);
                lateData.push(1);
            }

            setChartComponentLate(<ChartComponent dataList={lateData} labels={chartLabelsLate} colors={rgbArrayLate} />)

        }

        if (!_.isNull(list) && !_.isNull(list.activeList) && list.activeList.length > 0) {
            console.log("active: ",list.activeList)
            chartLabelsActive = getChartsLabelsByNames(list.activeList);
            // activeData = getChartsDataByNames(list, chartLabelsActive);

            for (let index = 0; index < chartLabelsActive.length; index++) {
                const element = getRandomRgb();
                rgbArrayActive.push(element)
                activeData.push(1);
            }

            setChartComponentActive(<ChartComponent dataList={activeData} labels={chartLabelsActive} colors={rgbArrayActive} />)
        }

    }, [list])


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                    <Tab label="Késés" />
                    <Tab label="Itt van" />

                </Tabs>
            </Box>

            
            {value === 0 ? (!_.isNull(chartComponentLate) ? chartComponentLate : <p>üres</p>) : (null)}
            {value === 1 ? (!_.isNull(chartComponentActive) ? chartComponentActive : <p>üres</p>) : (null)}
            
        </>
    );
};