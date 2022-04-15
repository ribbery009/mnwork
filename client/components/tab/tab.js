import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useEffect } from 'react';


export default function TabComponent({ data, columns, paginationProp, startDate, endDate, list, name }) {

    const [value, setValue] = React.useState(0);
    const [navigator, setTabNavigator] = React.useState(0);

    useEffect(() => {

        const today = new Date();
        const nextDay = new Date(new Date().setDate(startDate.getDate() + 1));
        const allName = (name === "Mindenki");
        //MEgnézem, hogy a startDate és endDate =? a mai nappal és a következő nappal
        const isTodayProp = (startDate.getFullYear() === today.getFullYear() && startDate.getMonth() === today.getMonth() && startDate.getDate() === today.getDate()) && (endDate.getFullYear() === nextDay.getFullYear() && endDate.getMonth() === endDate.getMonth() && endDate.getDate() === nextDay.getDate())
        console.log("todayProp: ", isTodayProp)
        console.log("name: ", name)
        setTabNavigator(<Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                <Tab label="Késés" />
                {isTodayProp && <Tab label="Itt van" />}
                <Tab label="Betegség" />
                <Tab label="Szabadság" />
                <Tab label="Munka" />
                {!allName && <Tab label="Összes" />}
            </Tabs>
        </Box>)
    }, [list])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>

            {navigator}
            {value}
        </>
    );
};