import { useState, useEffect } from "react";
import useRequest from "../../hooks/use-request";
import Button from '../../components/button';
import CustomSelect from "../../components/customSelect";
import DatePicker, { registerLocale } from 'react-datepicker';
import Router from "next/router";
import { hu } from "date-fns/locale";
registerLocale("hu", hu);

export default ({ currentUser }) => {

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [time, setEndDate] = useState(new Date());
  const [optionsList, setOptionList] = useState([{ name: "munka" }, { name: "szabad" }, { name: "beteg" }, { name: "zárva az étterem" }, { name: "nyaralás" }])

  const [showOptionListName, setShowOptionListName] = useState(false);
  const [defaultSelectTextName, setDefaultSelectTextName] = useState("Válasszon a listából");

  const [showOptionListState, setShowOptionListState] = useState(false);
  const [defaultSelectTextState, setDefaultSelectTextState] = useState("Válasszon a listából");


  const [defaultSelectEmail, setDefaultSelectEmail] = useState("");

  const { doRequest, errors } = useRequest({
    url: '/api/time/newtime',
    method: 'post',
    body: {
      startDate: startDate, endDate: time, name_and_email: defaultSelectTextName + "-" + defaultSelectEmail, creator: currentUser.id, status: defaultSelectTextState
    },
    onSuccess: () => Router.push('/')
  });


  const onSubmit = async event => {
    event.preventDefault();

    if (startDate && time && defaultSelectTextName && defaultSelectEmail && defaultSelectTextState) {
      await doRequest();
    }

  };

  useEffect(() => {
    setLoading(true)
    fetch(`/api/users/getusers`)
      .then((res) => res.json())
      .then((data) => {

        if (data) {
          setData(data)
          setLoading(false)
          return data
        }

      })
  }, [])

  if (isLoading) {
    return (
      <div className="page">
        Betöltés........
      </div>
    )
  }

  console.log(currentUser)

  return currentUser ? (
    (currentUser.job === "manager" || currentUser.job === "tulajdonos") &&
    <div className='container'>
      <div className='row'>
        <div className='col-wrapper col'>
          <div className='authWrapper'>
            <form onSubmit={onSubmit}>
              <h3 className='form-title'>Beosztás Készítő</h3>
              <div className="form-group">
                <label>Név és E-mail</label>
                <CustomSelect optionsList={data} setShowOptionList={setShowOptionListName} setDefaultSelectText={setDefaultSelectTextName} showOptionList={showOptionListName} defaultSelectText={defaultSelectTextName} setEmail={setDefaultSelectEmail} />
              </div>
              <div className="form-group">
                <label>Állapot</label>
                <CustomSelect optionsList={optionsList} showOptionList={showOptionListState} setShowOptionList={setShowOptionListState} setDefaultSelectText={setDefaultSelectTextState} defaultSelectText={defaultSelectTextState} />
              </div>
              <div className="form-group">
                <label>Kezdés</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="yyyy MMMM d, h:mm aa"
                  locale="hu"
                />
              </div>
              <div className="form-group">
                <label>Zárás</label>
                <DatePicker
                  selected={time}
                  onChange={(date) => setEndDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="yyyy MMMM d, h:mm aa"
                  locale="hu"
                />
              </div>

              {errors}
              <div className='button-wrapper'>
                <Button classes="noselect" text={"Küldés"}></Button>
              </div>

            </form>



          </div>
        </div>
      </div>
    </div>


  ) : (<h1>No Data</h1>);
}