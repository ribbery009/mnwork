import { GoCalendar } from "react-icons/go";
import Router from 'next/router'
import { useState, useEffect } from "react";
import Table from '../../components/table/index';
import CustomSelect from "../../components/customSelect";
import { getQueryDate, activitySelector } from "../../helpers/functions";
import { AiFillDelete } from "react-icons/ai";
import useRequest from "../../hooks/use-request";
import DatePicker, { registerLocale } from 'react-datepicker';
import { timeTableColumnsGenerator } from "../../entity/columnsTimeTable";
import { FetchData } from '../../helpers/fetcData';
import { hu } from "date-fns/locale";
import { dataWrapper } from '../../helpers/dataMapper'
import CustomClipLoader from "../../components/loader";
import Button from '../../components/button';
registerLocale("hu", hu);

export default ({ currentUser }) => {

  const [list, setList] = useState("")
  const [table, setTable] = useState(null)

  const [rowId, setRowId] = useState("")
  const [isLoading, setLoading] = useState(false)
  
  const [defaultSelectTextName, setDefaultSelectTextName] = useState("Válasszon a listából");
  const [defaultSelectTextState, setDefaultSelectTextState] = useState("Válasszon a listából");

  const [defaultSelectEmail, setDefaultSelectEmail] = useState("");
  
  const [optionsList, setOptionList] = useState([{ name: "összes" }, { name: "munka" }, { name: "szabad" }, { name: "beteg" }, { name: "zárva az étterem" }, { name: "nyaralás" }, { name: "összes" }])
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(startDate.getDate() + 1)));

  const [data, setData] = useState(null)
  const [errorMessageTemplate, setErrorMessageTemplate] = useState(null)

  const [reqPending, setReqPending] = useState(false);

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

      let newData = [];
      const queryStartDate = getQueryDate(startDate);
      const queryEndDate = getQueryDate(endDate);
      let data;
      try {
        const url = `/api/time/get-time?activity=${activity}&startDate=${queryStartDate}&endDate=${queryEndDate}&email=${defaultSelectEmail}`;
        data = await FetchData(url);

        console.log("data: ", data)
        if (data && data !== "no data!" && data.length > 0) {

          let filteredList;
          if (defaultSelectTextState === "összes") {
            filteredList = dataWrapper(data, <AiFillDelete />);
          } else {
            filteredList = dataWrapper(data.filter((item) => item.status === defaultSelectTextState), <AiFillDelete />);
          }
          setList(filteredList)

        } else {
          setList("")
        }
      } catch (error) {
        setErrorMessageTemplate(<ErrorMessage message={error}></ErrorMessage>)
      }



    }
    setLoading(false)
  }

  const onSubmit = async event => {
    event.preventDefault();

    await sendRequest();
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
    setLoading(true)
    fetch(`/api/users/getusers`)
      .then((res) => res.json())
      .then((data) => {
        
        if (data) {
          
          const newList = {email: "all",job_title: "all",name: "Mindenki"}

          const newArray = [newList].concat(data)
          data.concat(newArray)
          console.log("newArray: ",newArray)
          console.log("data: ", data)
          setData(newArray)
          setLoading(false)
          return data
        }

      })
  }, [])


  useEffect(() => {
    if (list && list !== "") {
      setTable(<Table data={list} columns={timeTableColumnsGenerator(handChangeRowID)} />)
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
            <form onSubmit={onSubmit}>
              <h3 className='form-title'>Napi Beosztás</h3>
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
              <CustomSelect optionsList={data} setDefaultSelectText={setDefaultSelectTextName} defaultSelectText={defaultSelectTextName} setDefaultSelectEmail={setDefaultSelectEmail} title={"Név: "}/>
              <CustomSelect optionsList={optionsList} setDefaultSelectText={setDefaultSelectTextState} defaultSelectText={defaultSelectTextState} title={"Státusz"}/>
              {errorMessageTemplate}
              <div className='button-wrapper'>
                <Button classes="noselect" text={"Elküld"}></Button>
              </div>
              {table}

            </form>
          </div>
        </>

      ) : (<h1>Nincs megfelelő jogosultsága!</h1>)
      }</div>)
}
