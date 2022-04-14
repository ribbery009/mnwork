import { useState, useEffect } from "react";
import { timeNow } from "../../helpers/functions";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import useRequest from '../../hooks/use-request';
import Router from 'next/router';
import { getQueryDate, activitySelector } from "../../helpers/functions";


export default ({ currentUser }) => {

    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [date, setDate] = useState(new Date().getFullYear() + '-' + (new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-' + new Date().getDate());
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(new Date().setDate(startDate.getDate() + 1)));
    const [open, setOpen] = useState(false);

    const { doRequest, errors } = useRequest({
        url: '/api/time/close',
        method: 'post',
        body: {
            time_id:data[0]?.id
        },
        onSuccess: () => Router.push('/')
    });

    const hereFunc = async (e) => {
        e.preventDefault();
        await doRequest();
    }
    const onOpenModal = (e) => {
        e.preventDefault();
        setOpen(true);
    };

    const onCloseModal = () => {
        setOpen(false);
    };

    useEffect(() => {
        setLoading(true)
        const queryStartDate = getQueryDate(startDate);
        const queryEndDate = getQueryDate(endDate);
        fetch(`/api/time/get-time?activity=munka&startDate=${queryStartDate}&endDate=${queryEndDate}&email=${currentUser.email}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                let usersList = data.map((user, index) => {
                    console.log("currentU: ", currentUser)
                    console.log(user)
                    let newData = {};
                    if (user) {
                        newData = user;
                    }



                    return newData
                })

                setData(usersList)
                setLoading(false)
            })
    }, [])

    console.log(data[0]?.status === "munka") && (data[0]?.isChecked) && !(data[0]?.isFinished)
    console.log(data[0])
    return currentUser ? (
        (data[0]?.status === "munka") && (data[0]?.isChecked) && !(data[0]?.isFinished)?
            (<div className='authWrapper'>
                <form>

                    <div>
                        <h3 className='form-title'>Kijelentkezés</h3>
                        <button onClick={onOpenModal}>Tovább</button>
                        <Modal open={open} onClose={onCloseModal}>
                            <p>
                                A művelet nem visszavonható. Biztosan folytatja?
                            </p>
                            <button onClick={hereFunc}>Igen</button>
                        </Modal>
                    </div>
                </form>
            </div>) : (
            <div className="page">
            <h1>Önnek nincs teendője.</h1>
            </div>)) : (<h1>Nincs bejelentkezve.</h1>)
}