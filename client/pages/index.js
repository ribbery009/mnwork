import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  return(<div className='page'>
  {currentUser ?  (<h1>Ön be van jelentkezve.</h1>) : (<h1>Nincs bejelentkezve.</h1>)}
    </div>)
  
};

LandingPage.getInitialProps = async context => {

  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');

  return data;
};

export default LandingPage;
