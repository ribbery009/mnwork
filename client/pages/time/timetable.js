import { GoCalendar } from "react-icons/go";
import { useState, useEffect } from "react";
import Table from '../../components/table/index';
import CustomSelect from "../../components/customSelect";
import { timeNow } from "../../helpers/functions";
import { AiFillDelete } from "react-icons/ai";
import useRequest from "../../hooks/use-request";

export default ({ currentUser }) => {

  const [data, setData] = useState([])
  const [list, setList] = useState([])
  const [rowId, setRowId] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [showOptionListState, setShowOptionListState] = useState(false);
  const [defaultSelectTextState, setDefaultSelectTextState] = useState("Válasszon a listából");
  const [optionsList, setOptionList] = useState([{ name: "összes" }, { name: "munka" }, { name: "szabad" }, { name: "beteg" }, { name: "zárva az étterem" }, { name: "nyaralás" }])

  const [date, setDate] = useState(new Date().getFullYear() + '-' + (new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-' + new Date().getDate());

  const { doRequest, errors } = useRequest({
    url: '/api/time/delete',
    method: 'post',
    body: {
      user_id: rowId
    },
    onSuccess: () => Router.push('/')
  });


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
    setLoading(true)
    fetch(`/api/time/get-time?workDay=${date}`)
      .then((res) => res.json())
      .then((data) => {

        let newData = [{}];
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

        if (newData) {
          setData(newData)
        }

        setLoading(false)
      })
  }, [])

  useEffect(() => {
    filterData(data);
  }, [defaultSelectTextState])

  useEffect(() => {
    doRequest()
  }, [rowId])

  const filterData = (newData) => {
    console.log("newData: ", newData)
    if (newData) {

      let newData2 = [];
      setList(newData2)
      let i = 0;
      newData.map((time, index) => {

        if (defaultSelectTextState === "összes") {
          newData2[index] = time;
        }
        else if (time.status === defaultSelectTextState) {
          newData2[i] = time;
          i++;
        }
      })

      if (newData2.length > 0) {
        setList(newData2)
      }

    }
  }

  return (
    <div className="page">
      {currentUser ? (data ? (<div className='authWrapper timetable'>
        <form>
          <h3 className='form-title'>Napi Beosztás</h3><CustomSelect optionsList={optionsList} showOptionList={showOptionListState} setShowOptionList={setShowOptionListState} setDefaultSelectText={setDefaultSelectTextState} defaultSelectText={defaultSelectTextState} />
          {list.length > 0 ? (<Table data={list} columns={columns} />) : (null)}
        </form>
      </div>) : (<h1>A mai napra nincs elérhető beosztás.</h1>)
      ) : (<h1>You are NOT signed in</h1>)
      }</div>)
}