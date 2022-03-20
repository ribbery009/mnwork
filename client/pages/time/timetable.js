import { GoCalendar } from "react-icons/go";
import { useState, useEffect } from "react";
import Table from '../../components/table/index';
import CustomSelect from "../../components/customSelect";
import { timeNow } from "../../helpers/functions";
import { AiFillDelete } from "react-icons/ai";
import useRequest from "../../hooks/use-request";
import DatePicker, { registerLocale } from 'react-datepicker';
import Button from '../../components/button';

import { hu } from "date-fns/locale";


registerLocale("hu", hu);

export default ({ currentUser }) => {

  const [data, setData] = useState("")
  const [list, setList] = useState("")


  const [rowId, setRowId] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [showOptionListState, setShowOptionListState] = useState(false);
  const [defaultSelectTextState, setDefaultSelectTextState] = useState("Válasszon a listából");
  const [optionsList, setOptionList] = useState([{ name: "összes" }, { name: "munka" }, { name: "szabad" }, { name: "beteg" }, { name: "zárva az étterem" }, { name: "nyaralás" }])
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(startDate.getDate() + 1)));

  const [lastQueryStart, setLastQueryStart] = useState("");
  const [lastQueryEnd, setLastQueryEnd] = useState("");
  const [lastActivity, setLastActivity] = useState("");

  const [date, setDate] = useState(new Date().getFullYear() + '-' + (new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-' + new Date().getDate());
  const [successQuery, setSuccesQuery] = useState(false);

  const { doRequest, errors } = useRequest({
    url: '/api/time/delete',
    method: 'post',
    body: {
      user_id: rowId
    },
    onSuccess: () => Router.push('/')
  });


  const sendRequest = () => {

    setLoading(true)
    if (defaultSelectTextState !== "Válasszon a listából") {
      const activity = activitySelector(defaultSelectTextState)
      let newData =[];
      const queryStartDate = startDate.getFullYear() + '-' + (startDate.getMonth() + 1 < 10 ? "0" + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + '-' + startDate.getDate()
      const queryEndDate = endDate.getFullYear() + '-' + (endDate.getMonth() + 1 < 10 ? "0" + (endDate.getMonth() + 1) : (endDate.getMonth() + 1)) + '-' + endDate.getDate()


      // IF It is same then last query
      if(queryStartDate !== lastQueryStart && lastQueryEnd !== queryEndDate && lastActivity !== defaultSelectTextState){
        setLastQueryStart(queryStartDate);
        setLastQueryEnd(queryEndDate);
        setLastActivity(defaultSelectTextState);

      try {
        fetch(`/api/time/get-time?activity=${activity}&startDate=${queryStartDate}&endDate=${queryEndDate}`)
          .then(res => {
        
            if (!res.ok) {
              throw new Error(`Error status: ${res.status}`);
            }
            return res.json()
          })
          .then(data => {

            if (data && data !== "no data!" && data.length >0) {
             
        
              data.map((user, index) => {
                if (user) {
                  const startT = timeNow(user.start);
                  const endT = timeNow(user.end);

                  newData[index] = {
                    id: index,
                    timeId: user.id,
                    name: user.name,
                    start: startT,
                    end: endT,
                    status: user.status,
                    delete: <AiFillDelete />,
                    email: user.user_email
                  };
                }

              })

              setSuccesQuery(true)
              setData(newData)
              setList(newData)

            }else{
              setSuccesQuery(true)
              setData("")
              setList("")
            }

          })
      } catch (error) {
        console.log(error.message)
      }
    }

    else if(queryStartDate === lastQueryStart && lastQueryEnd === queryEndDate && lastActivity !== defaultSelectTextState){
    
      data.map((user, index) => {
        if (user && defaultSelectTextState === "összes" || defaultSelectTextState ===user.status) {
          const startT = timeNow(user.start);
          const endT = timeNow(user.end);

          newData[index] = {
            id: index,
            timeId: user.id,
            name: user.name,
            start: startT,
            end: endT,
            status: user.status,
            delete: <AiFillDelete />,
            email: user.user_email
          };

        
        }

      })

      setList(newData)
    }

  }

  setLoading(false)
  }

  const handleDelete = (row, e) => {
    e.preventDefault();
    setRowId(row.timeId)
    doRequest()
    console.log(row)
  }
  const columns = [
    {
      name: 'Név',
      selector: row => row.name,
    },
    {
      name: 'Kezdés',
      selector: row => row.start,
    },
    {
      name: 'Vége',
      selector: row => row.end,
    },
    {
      name: 'Státusz',
      selector: row => row.status,
    },
    {
      name: ' ',
      ignoreRowClick: true,
      cell: row => <button className="delete-button" onClick={e => handleDelete(row, e)}>{row.delete}</button>
    },

  ];

  useEffect(() => {
    sendRequest()
  }, [defaultSelectTextState])

let table;
  if(data && data !=="" && list && list !==""){
    table = <Table data={list} columns={columns} />
  }

  console.log(list)
  return (
    <div className="page">
      {currentUser ? (<div className='authWrapper timetable'>
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
      ) : (<h1>Nincs megfelelő jogosultsága!</h1>)
      }</div>)
}

const activitySelector = (query) => {
  const result = [];
  switch (query) {
    case "munka":
      result.push(query)
      break;
    case "szabad":
      result.push(query)
      break;
    case "zárva az étterem":
      result.push(query)
      break;
    case "összes":
      result.push(query)
      break;
    case "beteg":
      result.push(query)
      break;
    case "nyaralás":
      result.push(query)
      break;

    default:
      break;
  }

  return result;
}