import { useState, useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import InputField from '../../components/inputField';
import Button from '../../components/button';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password
    },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = async event => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-wrapper col'>
          <div className='authWrapper'>
            <form onSubmit={onSubmit}>
              <h3 className='form-title'>Bejelentkezés</h3>
              <div className="form-group">
                <InputField label="E-mail" value={email} onChange={e => setEmail(e.target.value)} classes="form-control teszt" />
              </div>
              <div className="form-group">
                <InputField label="Jelszó" value={password} onChange={e => setPassword(e.target.value)} classes="form-control" />
              </div>
              {errors}
              <div className='button-wrapper'>
              <Button classes="noselect" text={"Tovább"}></Button>
              </div>
              
            </form>



          </div>
        </div>
      </div>
    </div>

  );
};
