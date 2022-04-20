import { useState, useEffect } from 'react';
import useRequest from '../../hooks/use-request';
import InputField from '../../components/inputField';
import Button from '../../components/button';
import Router from 'next/router';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


export default ({ currentUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [rule, setRule] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [postcode, setPostCode] = useState('');
    const [job_title, setJobTitle] = useState('');
    const [id, setId] = useState(null);

    const [data, setData] = useState(null)
    const [init, setInit] = useState(false)
    const { doRequest, errors } = useRequest({
        url: '/api/users/useredit',
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

    useEffect(() => {

        fetch(`/api/users/getuser?_id=${currentUser.id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setData(data)
                    setEmail(data.email)
                    setName(data.name)
                    setPhone(data.phone)
                    setCity(data.city)
                    setAddress(data.address)
                    setPostCode(data.postcode)
                    setJobTitle(data.job_title)
                    setRule(data.rule)
                    setId(data.id)
                    setInit(false)
                    return data
                }

            })
    }, [])


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
                <InputField label="Munkakör" value={job_title} onChange={e => setJobTitle(e.target.value)} classes="form-control" />
            </div>
            <div className="form-group">
                <InputField label="Jelszó" value={password} onChange={e => setPassword(e.target.value)} classes="form-control" />
            </div>
            {errors}
            <div className='button-container'>
                <div className='button-wrapper'>
                    <Button classes="noselect" text={"Mentés"}></Button>
                </div>
            </div>


        </form>
    );
};
