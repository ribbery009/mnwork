import { useState, useEffect } from 'react';
import useRequest from '../../hooks/use-request';
import InputField from '../../components/inputField';
import Button from '../../components/button';
import Router from 'next/router';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import axios from 'axios';
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
    const [isEmployer, setEmployer] = useState((currentUser.job === "alkalmazott") && true)


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

    useEffect(async () => {
        try {
            const response = await axios.get(`/api/users/getuser?_id=${currentUser.id}`);
        
            if (response.data) {
                setData(response.data)
                setEmail(response.data.email)
                setName(response.data.name)
                setPhone(response.data.phone)
                setCity(response.data.city)
                setAddress(response.data.address)
                setPostCode(response.data.postcode)
                setJobTitle(response.data.job_title)
                setRule(response.data.rule)
                setId(response.data.id)
                setInit(false)
                return data
            }
          } catch (err) {
            console.log(err);
          }

       
    }, [])


    const onSubmit = async event => {
        event.preventDefault();
        await doRequest();
    };

    return (
        <form onSubmit={onSubmit}>
            <h3 className='form-title'>Fiók</h3>
            <div className="form-group">
                <InputField label="E-mail" value={email} onChange={e => setEmail(e.target.value)} classes="form-control" read={isEmployer}/>
            </div>
            <div className="form-group">
                <InputField label="Név" value={name} onChange={e => setName(e.target.value)} classes="form-control" read={isEmployer}/>
            </div>
            <div className="form-group">
                <InputField label="Város" value={city} onChange={e => setCity(e.target.value)} classes="form-control" read={isEmployer}/>
            </div>
            <div className="form-group">
                <InputField label="Irányítószám" value={postcode} onChange={e => setPostCode(e.target.value)} classes="form-control" read={isEmployer}/>
            </div>
            <div className="form-group">
                <InputField label="Cím" value={address} onChange={e => setAddress(e.target.value)} classes="form-control" read={isEmployer}/>
            </div>
            <div className="form-group">
                <InputField label="Szerepkör" value={rule} onChange={e => setRule(e.target.value)} classes="form-control" read={isEmployer}/>
            </div>
            <div className="form-group">
                <InputField label="Telefon" value={phone} onChange={e => setPhone(e.target.value)} classes="form-control teszt" read={isEmployer}/>
            </div>
            {((currentUser) && (currentUser.job === "manager" || currentUser.job === "tulajdonos")) && <div className="form-group">
                <InputField label="Munkakör" value={job_title} onChange={e => setJobTitle(e.target.value)} classes="form-control" read={isEmployer}/>
            </div>}
            <div className="form-group">
                <InputField label="Jelszó" value={password} onChange={e => setPassword(e.target.value)} classes="form-control" read={isEmployer}/>
            </div>
            {errors}
            <div className='button-container'>
                <div className='button-wrapper'>
                    <Button classes="noselect" text={"Módosít"}></Button>
                </div>
            </div>


        </form>
    );
};
