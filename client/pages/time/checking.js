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
        url: '/api/time/ishere',
        method: 'post',
        body: {
            time_id: data[0]?.id
        },
        onSuccess: () => Router.push('/')
    });

    const hereFunc = async (e) => {
        e.preventDefault();
        onCloseModal();
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

        if (currentUser?.email) {
            fetch(`/api/time/get-time?activity=munka&startDate=${queryStartDate}&endDate=${queryEndDate}&email=${currentUser.email}`)
                .then((res) => res.json())
                .then((data) => {
                    let usersList = data.map((user, index) => {
                        let newData = {};
                        if (user) {
                            newData = user;
                        }



                        return newData
                    })

                    setData(usersList)
                    setLoading(false)
                })
        }


    }, [])

    return currentUser ? (
        (data[0]?.status === "munka") & !(data[0]?.isChecked) ?
            (<div className='authWrapper'>
                <form>

                    <div>
                        <h3 className='form-title'>Bejelentkezik?</h3>
                        <button onClick={onOpenModal}>ITT VAGYOK</button>
                        <Modal open={open} onClose={onCloseModal}>
                            <p>
                                A művelet nem visszavonható. Biztosan folytatja?
                            </p>
                            <button onClick={hereFunc}>ITT VAGYOK</button>
                        </Modal>
                    </div>
                </form>
            </div>) : (
                <div className="page">
                    <h1>Önnek nincs teendője.</h1>
                </div>)) : (<h1>Nincs bejelentkezve.</h1>)
}