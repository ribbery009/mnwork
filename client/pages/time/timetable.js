import Router from 'next/router'
import { useState, useEffect } from "react";
import Table from '../../components/table/index';
import CustomSelect from "../../components/customSelect";
import { getQueryDate, activitySelector, getChartsData, getNamesAndEmails } from "../../helpers/functions";
import { AiFillDelete } from "react-icons/ai";
import useRequest from "../../hooks/use-request";
import DatePicker, { registerLocale } from 'react-datepicker';
import { timeTableColumnsGenerator } from "../../entity/columnsTimeTable";
import { FetchData } from '../../helpers/fetcData';

import { dataWrapper } from '../../helpers/dataMapper';
import TabComponent from '../../components/tab/tab'
import CustomClipLoader from "../../components/loader";
import Button from '../../components/button';
import ErrorMessage from '../../components/error/template';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import useFetch from "../../hooks/use-fetch";
import NoData from "../../components/svg/no-data"
import _ from 'lodash';
import { hu } from "date-fns/locale";
registerLocale("hu", hu);


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default ({ currentUser }) => {

  const [list, setList] = useState(null)
  const [table, setTable] = useState(null)
  const [tabComponent, setTabsComponent] = useState(null)

  const [rowId, setRowId] = useState("")
  const [isLoading, setLoading] = useState(false)

  const [defaultSelectTextName, setDefaultSelectTextName] = useState("Válasszon a listából");
  const [defaultSelectTextState, setDefaultSelectTextState] = useState("Válasszon a listából");

  const [defaultSelectEmail, setDefaultSelectEmail] = useState("");

  const [optionsList, setOptionList] = useState([ { name: "munka" }, { name: "szabad" }, { name: "beteg" }, { name: "zárva az étterem" }, { name: "nyaralás" }, { name: "késés" }])
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(startDate.getDate() + 1)));

  const [data, setData] = useState(null)
  const [errorMessageTemplate, setErrorMessageTemplate] = useState(null)

  let [color, setColor] = useState("#ffffff");

  const [users] = useFetch("/api/users/getusers");

  const { doRequest, errors } = useRequest({
    url: '/api/time/delete',
    method: 'post',
    body: {
      user_id: rowId
    },
    onSuccess: () => Router.push('/')
  });


  const sendRequest = async () => {

    setLoading(true)

    if (defaultSelectTextState !== "Válasszon a listából") {
      const activity = activitySelector(defaultSelectTextState)
      const queryStartDate = getQueryDate(startDate);
      const queryEndDate = getQueryDate(endDate);

      try {

        const url = `/api/time/get-time?activity=${activity}&startDate=${queryStartDate}&endDate=${queryEndDate}&email=${defaultSelectEmail}`;
        setList(null)
        const data = await FetchData(url);

        if (data && data !== "no data" && data.length > 0) {

          let filteredList;
          if (defaultSelectTextState === "késés") {
            filteredList = dataWrapper(data.filter((item) => item.late == true), <AiFillDelete />);
          } else {
            filteredList = dataWrapper(data.filter((item) => item.status === defaultSelectTextState), <AiFillDelete />);
          }
          setList(filteredList)

        } else {
          setList('no data')
        }

      } catch (error) {
        console.log(error)
        setErrorMessageTemplate(<ErrorMessage message={error}></ErrorMessage>)
      }



    }
    setLoading(false)
  }

  const onSubmit = event => {
    event.preventDefault();

    sendRequest();
  };

  const handChangeRowID = (row, e) => {
    e.preventDefault();
    setRowId(row.timeId)
    console.log(row.timeId)
  }

  const handleDelete = () => {
    try {
      doRequest()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    if (users) {
      const filteredList = getNamesAndEmails(users);
      setData(filteredList)
    }

  }, [users])


  useEffect(() => {
    if (!(_.isNull(list)) && list !== "no data") {
      console.log("list: ", list)
      setTable(<Table data={list} columns={timeTableColumnsGenerator(handChangeRowID)} />)
      setTabsComponent(<TabComponent list={list} startDate={startDate} endDate={endDate} name={defaultSelectTextName} status={defaultSelectTextState} />)
    }
    else if (list !== "no data") {

    }
    else {
      setTable(null)
      setTabsComponent(null)
    }
  }, [list])

  useEffect(() => {
    if (rowId !== "") {
      handleDelete()
    }
  }, [rowId])

console.log("activity: ",defaultSelectTextState)
  return (
    <div className="page">
      {currentUser ? (
        <>
          <div className='authWrapper timetable'>
            <div className='timeTable-wrapper'>
              <form onSubmit={onSubmit}>
                <h3 className='form-title'>Beosztás</h3>
                <div className="calendar-wrapper">
                  <div className="start-time">
                    <label>Kezdés</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="yyyy-MM-dd'"
                      locale="hu"
                    />
                  </div>
                  <div className="end-time">
                    <label>Zárás</label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      locale="hu"
                      dateFormat="yyyy-MM-dd'"
                    />
                  </div>
                </div>
                <CustomSelect optionsList={data} setDefaultSelectText={setDefaultSelectTextName} defaultSelectText={defaultSelectTextName} setEmail={setDefaultSelectEmail} title={"Név: "} />
                <CustomSelect optionsList={optionsList} setDefaultSelectText={setDefaultSelectTextState} defaultSelectText={defaultSelectTextState} title={"Státusz"} />
                {errorMessageTemplate}
                <div className='button-wrapper'>
                  <Button classes="noselect" text={"Küldés"}></Button>
                </div>
                {table}
              </form>

              <div className="charts-wrapper">
                {(!(_.isNull(list)) && list !== "no data") && <TabComponent list={list} startDate={startDate} endDate={endDate} name={defaultSelectTextName} status={defaultSelectTextState} />}
                {(_.isNull(list)) && <h3>Kérem válassza ki a szükséges paramétereket.</h3>}
                <ClipLoader color={color} loading={isLoading} css={override} size={150} />
                {(list === "no data") &&
                  <>
                    <h3>Nincs visszatérő adat!</h3>
                    <NoData />
                  </>
                }

              </div>
            </div>
          </div>
        </>

      ) : (<h1>Nincs megfelelő jogosultsága!</h1>)
      }</div>)
}
