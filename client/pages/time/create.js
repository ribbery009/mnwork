import { useState, useEffect } from "react";
import useRequest from "../../hooks/use-request";
import Button from '../../components/button';
import CustomSelect from "../../components/customSelect";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default ({ currentUser }) => {

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [optionsList, setOptionList] = useState([{ name: "munka"}, {name: "szabad"}, {name: "beteg"}, {name: "zárva az étterem"}, {name: "nyaralás" }])

  const { doRequest, errors } = useRequest({
    url: '/api/time/ishere',
    method: 'post',
    body: {

    },
    // onSuccess: () => Router.push('/')
  });


  const onSubmit = async event => {
    event.preventDefault();

    await doRequest();
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
        Betöltés...
      </div>
    )
  }

  console.log(data)
console.log(optionsList)
  return currentUser ? (
    <div className='container'>
      <div className='row'>
        <div className='col-wrapper col'>
          <div className='authWrapper'>
            <form onSubmit={onSubmit}>
              <h3 className='form-title'>Beosztás Készítő</h3>
              <div className="form-group">
                <label>Név és E-mail</label>
                <CustomSelect optionsList={data} />
              </div>
              <div className="form-group">
                <label>Állapot</label>
                <CustomSelect optionsList={optionsList} />
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
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
              </div>
              <div className="form-group">
                <label>Zárás</label>
                <DatePicker
                  selected={time}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </div>

              {errors}
              <div className='button-wrapper'>
                <Button classes="noselect" text={"Elküld"}></Button>
              </div>

            </form>



          </div>
        </div>
      </div>
    </div>


  ) : (<h1>No Data</h1>);
}