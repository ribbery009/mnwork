import { useState, useEffect } from 'react';
import useRequest from '../../hooks/use-request';
import InputField from '../../components/inputField';
import Button from '../../components/button';
import Router from 'next/router';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import PublicEditor from '../../components/profil/public';
import PrivateEditor from '../../components/profil/private'

export default ({ currentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(currentUser.password);
  const [name, setName] = useState('');
  const [rule, setRule] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostCode] = useState('');
  const [job_title, setJobTitle] = useState('');

  const [isLoading, setLoading] = useState(false);
  const [deleteValue, setDeleteValue] = useState(false);
  const [data, setData] = useState("false");
  const [init, setInit] = useState(true);


  const [value, setValue] = useState(0);

  const { doRequest, errors } = useRequest({
    url: deleteValue ? '/api/users/delete' : '/api/users/useredit',
    method: 'post',
    body: deleteValue ? (currentUser.id) : {
      email,
      password,
      name,
      rule,
      phone,
      city,
      address,
      postcode,
      job_title
    },
    onSuccess: () => Router.push('/')
  });

  const handleChange = (event, newValue) => {
    console.log("newValue", newValue)
    setValue(newValue);
  };

  useEffect(() => {
    setLoading(true)
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
          setLoading(false)
          setInit(false)
          return data
        }

      })
  }, [])

  useEffect(async () => {
    if (!init) {
      await doRequest();
    }
  }, [deleteValue])


  const onSubmit = async event => {
    event.preventDefault();
    console.log(event)
    setDeleteValue(false);
  };

  const clickMethod = e => {
    setDeleteValue(true);
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-wrapper col'>
          <div className='authWrapper'>

            <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >

                <Tab label="Saját profil" />
                <Tab label="Munkatársak" />

              </Tabs>
            </Box>
            {value == 0 ? <PublicEditor currentUser={currentUser} /> : <PrivateEditor />}



          </div>
        </div>
      </div>
    </div>
  );
};
