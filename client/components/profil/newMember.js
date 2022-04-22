import { useState, useEffect } from 'react';
import useRequest from '../../hooks/use-request';
import InputField from '../../components/inputField';
import Button from '../../components/button';
import Router from 'next/router';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CustomSelect from '../customSelect';
import _ from 'lodash';

export default ({ currentUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [rule, setRule] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [postcode, setPostCode] = useState('');




    const [id, setId] = useState(null);


    const [optionsList, setOptionList] = useState([ { name: "alkalmazott" }, { name: "manager" }, { name: "tulajdonos" }])

    const [job_title, setJobTitle] = useState("alkalmazott");

    const [defaultSelectEmail, setDefaultSelectEmail] = useState(null);


    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email,
            password,
            name,
            rule,
            phone,
            city,
            address,
            postcode,
            job_title,
            id
        },
        onSuccess: () => Router.push('/')
    });

    // useEffect(() => {
    //     setLoading(true)
    //     fetch(`/api/users/getusers`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             if (data) {
    //                 setData(data)
    //                 setLoading(false)
    //                 setInit(false)
    //                 return data
    //             }
    //         })
    // }, [])

    // useEffect(async () => {
    //     console.log("id: ", id)
    //     if (!init) {
    //         await doRequest();
    //     }
    // }, [clickEvent])

    // useEffect(() => {
    //     if (!_.isNull(defaultSelectEmail)) {
    //         data.map((user) => {
    //             console.log("user: ", user)
    //             if (user.email === defaultSelectEmail) {
    //                 setEmail(user.email)
    //                 setName(user.name)
    //                 setPhone(user.phone)
    //                 setCity(user.city)
    //                 setAddress(user.address)
    //                 setPostCode(user.postcode)
    //                 setJobTitle(user.job_title)
    //                 setRule(user.rule)
    //                 setId(user.id)
    //                 console.log("user: ", user.id)
    //             }
    //         })
    //     }

    // }, [defaultSelectEmail])

    // const clickMethod = e => {
    //     setClickValue(e.target.id)
    //     setClickEvent(!clickEvent)
    // }

    // const editMethod = e => {
    //     setClickValue(e.target.id)
    //     setClickEvent(!clickEvent)
    // }

    const onSubmit = async event => {
        event.preventDefault();
        await doRequest();
    };

    return (
        <form onSubmit={onSubmit}>
            <h3 className='form-title'>Fiók</h3>
            <div className="form-group">
                <InputField label="E-mail" value={email} onChange={e => setEmail(e.target.value)} classes="form-control" />
            </div>
            <div className="form-group">
                <InputField label="Név" value={name} onChange={e => setName(e.target.value)} classes="form-control" />
            </div>
            <div className="form-group">
                <InputField label="Város" value={city} onChange={e => setCity(e.target.value)} classes="form-control" />
            </div>
            <div className="form-group">
                <InputField label="Irányítószám" value={postcode} onChange={e => setPostCode(e.target.value)} classes="form-control" />
            </div>
            <div className="form-group">
                <InputField label="Cím" value={address} onChange={e => setAddress(e.target.value)} classes="form-control" />
            </div>
            <div className="form-group">
                <InputField label="Szerepkör" value={rule} onChange={e => setRule(e.target.value)} classes="form-control" />
            </div>
            <div className="form-group">
                <InputField label="Telefon" value={phone} onChange={e => setPhone(e.target.value)} classes="form-control teszt" />
            </div>
            <div className="form-group">
                <label>Munkakör</label>
                <CustomSelect optionsList={optionsList} setDefaultSelectText={setJobTitle} defaultSelectText={job_title} setEmail={setDefaultSelectEmail} />
            </div>
            <div className="form-group">
                <InputField label="Jelszó" value={password} onChange={e => setPassword(e.target.value)} classes="form-control" />
            </div>
            {errors}
            <div className='button-container'>
                <div className='button-wrapper'>
                    <Button id={"edit-profile"} classes="noselect" text={"Felvétel"}></Button>
                </div>
            </div>


        </form>
    );
};
