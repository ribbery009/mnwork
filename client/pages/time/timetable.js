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
import { hu } from "date-fns/locale";
import { dataWrapper } from '../../helpers/dataMapper';
import TabComponent from '../../components/tab/tab'
import CustomClipLoader from "../../components/loader";
import Button from '../../components/button';
import ErrorMessage from '../../components/error/template';
import useFetch from "../../hooks/use-fetch";
import axios from 'axios';
import _ from 'lodash';
registerLocale("hu", hu);

export default ({ currentUser }) => {

  const [list, setList] = useState(null)
  const [table, setTable] = useState(null)
  const [tabComponent, setTabsComponent] = useState(null)

  const [rowId, setRowId] = useState("")
  const [isLoading, setLoading] = useState(false)

  const [defaultSelectTextName, setDefaultSelectTextName] = useState("Válasszon a listából");
  const [defaultSelectTextState, setDefaultSelectTextState] = useState("Válasszon a listából");

  const [defaultSelectEmail, setDefaultSelectEmail] = useState("");

  const [optionsList, setOptionList] = useState([{ name: "mindegyik" }, { name: "munka" }, { name: "szabad" }, { name: "beteg" }, { name: "itt van" }, { name: "zárva az étterem" }, { name: "nyaralás" }, { name: "késés" }])
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(startDate.getDate() + 1)));

  const [data, setData] = useState(null)
  const [errorMessageTemplate, setErrorMessageTemplate] = useState(null)



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
        const data = await FetchData(url);

        if (data && data !== "no data" && data.length > 0) {

          let filteredList;
          if (defaultSelectTextState === "mindegyik") {
            filteredList = dataWrapper(data, <AiFillDelete />);
          } else {
            filteredList = dataWrapper(data.filter((item) => item.status === defaultSelectTextState), <AiFillDelete />);
          }
          setList(filteredList)

        } else {
          setList(null)
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
    if (!(_.isNull(list))) {
      console.log("list: ", list)
      setTable(<Table data={list} columns={timeTableColumnsGenerator(handChangeRowID)} />)
      setTabsComponent(<TabComponent list={list} startDate={startDate} endDate={endDate} name={defaultSelectTextName} status={defaultSelectTextState} />)
    } else {
      setTable(null)
      setTabsComponent(null)
    }
  }, [list])

  useEffect(() => {
    if (rowId !== "") {
      handleDelete()
    }
  }, [rowId])


  return (
    <div className="page">
      {currentUser ? (
        <>
          <CustomClipLoader loading={isLoading}></CustomClipLoader>
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
                  <Button classes="noselect" text={"Elküld"}></Button>
                </div>
                {table}
              </form>

              <div className="charts-wrapper">
                {!(_.isNull(list)) && <TabComponent list={list} startDate={startDate} endDate={endDate} name={defaultSelectTextName} status={defaultSelectTextState} />}
              </div>
            </div>
          </div>
        </>

      ) : (<h1>Nincs megfelelő jogosultsága!</h1>)
      }</div>)
}
