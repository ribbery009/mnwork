import { useState, useEffect } from "react";
import { hu } from "date-fns/locale";
import TabComponent from '../../components/tab/tabHereLate'

import { css } from "@emotion/react";
import useFetch from "../../hooks/use-fetch";
import NoData from "../../components/svg/no-data"
import _ from 'lodash';



const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default ({ currentUser }) => {

    const [list, setList] = useState(null)


    const [startDate, setStartDate] = useState(new Date());



    const [activeMembers] = useFetch("/api/time/activemembers");

    useEffect(() => {

        if (activeMembers) {

            setList(activeMembers)
        }

    }, [activeMembers])


    useEffect(() => {
        if (!(_.isNull(list)) && list !== "no data") {

        }
        else if (list !== "no data") {

        }
        else {
            setTabsComponent(null)
        }
    }, [list])



    return (
        <div className="page">
            {currentUser ? (
                <>
                    <div className='authWrapper timetable'>
                        <div className='timeTable-wrapper'>

                            <div className="charts-wrapper">
                                <TabComponent list={list} />

                            </div>
                        </div>
                    </div>
                </>

            ) : (<h1>Nincs megfelelő jogosultsága!</h1>)
            }</div>)
}
