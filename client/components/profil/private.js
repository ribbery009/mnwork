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
    const [job_title, setJobTitle] = useState('');

    const [isLoading, setLoading] = useState(false);
    const [deleteValue, setDeleteValue] = useState(false);
    const [clickValue, setClickValue] = useState("");

    const [clickEvent, setClickEvent] = useState(false);

    const [data, setData] = useState(null);
    const [init, setInit] = useState(true);

    const [id, setId] = useState(null);


    const [showOptionListName, setShowOptionListName] = useState(false);
    const [defaultSelectTextName, setDefaultSelectTextName] = useState("Válasszon a listából");

    const [defaultSelectEmail, setDefaultSelectEmail] = useState(null);


    const { doRequest, errors } = useRequest({
        url: clickValue === "delete-profile" ? '/api/users/delete' : clickValue === "edit-profile" && '/api/users/useredit',
        method: 'post',
        body: clickValue === "delete-profile" ? (!(_.isNull(id)) && { id: id }) : clickValue === "edit-profile" && {
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
        setLoading(true)
        fetch(`/api/users/getusers`)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setData(data)
                    setLoading(false)
                    setInit(false)
                    return data
                }
            })
    }, [])

    useEffect(async () => {
        console.log("id: ", id)
        if (!init) {
            await doRequest();
        }
    }, [clickEvent])

    useEffect(() => {
        if (!_.isNull(defaultSelectEmail)) {
            data.map((user) => {
                console.log("user: ", user)
                if (user.email === defaultSelectEmail) {
                    setEmail(user.email)
                    setName(user.name)
                    setPhone(user.phone)
                    setCity(user.city)
                    setAddress(user.address)
                    setPostCode(user.postcode)
                    setJobTitle(user.job_title)
                    setRule(user.rule)
                    setId(user.id)
                    console.log("user: ", user.id)
                }
            })
        }

    }, [defaultSelectEmail])

    const clickMethod = e => {
        setClickValue(e.target.id)
        setClickEvent(!clickEvent)
    }

    const editMethod = e => {
        setClickValue(e.target.id)
        setClickEvent(!clickEvent)
    }

    return (
        <form>
            <h3 className='form-title'>Fiók</h3>
            <div className="form-group">
                <label>Név és E-mail</label>
                <CustomSelect optionsList={data} setShowOptionList={setShowOptionListName} setDefaultSelectText={setDefaultSelectTextName} showOptionList={showOptionListName} defaultSelectText={defaultSelectTextName} setEmail={setDefaultSelectEmail} />
            </div>
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
                    <Button id={"delete-profile"} classes="noselect" clickFunction={clickMethod} text={"Törlés"} type={"button"}></Button>
                </div>
                <div className='button-wrapper'>
                    <Button id={"edit-profile"} classes="noselect" clickFunction={editMethod} text={"Mentés"} type={"button"}></Button>
                </div>
            </div>


        </form>
    );
};
