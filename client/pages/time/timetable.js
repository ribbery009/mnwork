import { GoCalendar } from "react-icons/go";
import { useState,useEffect } from "react";
import Table from '../../components/table/index'
export default ({ currentUser }) => {

    const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [date, setDate] = useState(new Date().getFullYear()+'-'+(new Date().getMonth()+1 < 10 ? "0"+ (new Date().getMonth()+1) : (new Date().getMonth()+1))+'-'+new Date().getDate());

  
    useEffect(() => {
        setLoading(true)
        fetch(`/api/time/get-time?workDay=${date}`)
          .then((res) => res.json())
          .then((data) => {

            console.log(data)
            setData(data)
            setLoading(false)
          })
      }, [])

      console.log(data)
    return (
        <div className='authWrapper'>
            <form>
                <h3 className='form-title'>Bejelentkezés</h3>
<Table/>


            </form>



        </div>
    )
}