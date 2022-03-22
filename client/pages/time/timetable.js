//NEM működik a megjelenítés


import { GoCalendar } from "react-icons/go";
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

registerLocale("hu", hu);

export default ({ currentUser }) => {

  const [list, setList] = useState("")
  const [table, setTable] = useState(null)

  const [rowId, setRowId] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [showOptionListState, setShowOptionListState] = useState(false);
  const [defaultSelectTextState, setDefaultSelectTextState] = useState("Válasszon a listából");
  const [optionsList, setOptionList] = useState([{ name: "összes" }, { name: "munka" }, { name: "szabad" }, { name: "beteg" }, { name: "zárva az étterem" }, { name: "nyaralás" }])
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(startDate.getDate() + 1)));

  const [successQuery, setSuccesQuery] = useState(false);

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
        const url = `/api/time/get-time?activity=${activity}&startDate=${queryStartDate}&endDate=${queryEndDate}`;
        data = await FetchData(url);

        console.log("data: ", data)
        if (data && data !== "no data!" && data.length > 0) {

          let filteredList;
          if (defaultSelectTextState === "összes") {
            filteredList = dataWrapper(data, <AiFillDelete />);
          } else {
            filteredList = dataWrapper(data.filter((item) => item.status === defaultSelectTextState), <AiFillDelete />);
          }
          setSuccesQuery(true)
          setList(filteredList)

        } else {
          setSuccesQuery(true)
          setList("")
        }
      } catch (error) {
        console.log(error.message)
      }



    }
    setLoading(false)
  }

  const handleDelete = async (row, e) => {
    setRowId(row.timeId)
    await doRequest()
  }

  useEffect(() => {
    if (list && list !== "") {
      setTable(<Table data={list} columns={timeTableColumnsGenerator(handleDelete)} />)
    }
  }, [list])

  useEffect(() => {
    sendRequest()
  }, [defaultSelectTextState])

  return (
    <div className="page">
      {currentUser ? (
        <>
          <CustomClipLoader loading={isLoading}></CustomClipLoader>
          <div className='authWrapper timetable'>
            <form>
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
              <CustomSelect optionsList={optionsList} showOptionList={showOptionListState} setShowOptionList={setShowOptionListState} setDefaultSelectText={setDefaultSelectTextState} defaultSelectText={defaultSelectTextState} />
              {table}

            </form>
          </div>
        </>

      ) : (<h1>Nincs megfelelő jogosultsága!</h1>)
      }</div>)
}
