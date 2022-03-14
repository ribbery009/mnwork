import { GoCalendar } from "react-icons/go";
import { useState, useEffect } from "react";
import Table from '../../components/table/index';
import { timeNow } from "../../helpers/functions";
export default ({ currentUser }) => {

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [date, setDate] = useState(new Date().getFullYear() + '-' + (new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-' + new Date().getDate());

  const columns = [
    {
        name: 'Title',
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
];

  useEffect(() => {
    setLoading(true)
    fetch(`/api/time/get-time?workDay=${date}`)
      .then((res) => res.json())
      .then((data) => {
        let usersList = data.map((user,index) =>{
let newData =null;
          if(user){

            const startT = timeNow(user.start);
            const endT = timeNow(user.end);
  
            newData = {
              id:index,
                name: user.name,
                start: startT,
                end: endT
            };
          }
         
      return newData
      })

      if(!usersList){
        setData(usersList)
      }
       
        setLoading(false)
      })
  }, [])
console.log(data)
  return (
  <div className="page">
{currentUser ? ( data ? (<div className='authWrapper'>
      <form>
        <h3 className='form-title'>Napi Beosztás</h3>
        <Table data={data} columns={columns}/>
      </form>
    </div>):(<h1>A mai napra nincs elérhető beosztás.</h1>)
    ) : (<h1>You are NOT signed in</h1>)
  }</div>)
}