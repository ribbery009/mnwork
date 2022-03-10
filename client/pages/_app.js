import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/partials/header';
import Sidebar from '../components/sidebar';
import '../assets/styles/main.scss'
import  HambContextProvider  from '../components/context/hamburgerContext'; 

import MainPanel from '../components/mainPanel';

const AppComponent = ({ Component, pageProps, currentUser }) => {

  return (
    
      <div className='wrapper'>
        <HambContextProvider>
        <Sidebar currentUser={currentUser} />
        <MainPanel>
          <Header currentUser={currentUser} />
          <Component {...pageProps} />
        </MainPanel>
        </HambContextProvider>
      </div>
  
  );
};


AppComponent.getInitialProps = async appContext => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    
  }

  return {
    pageProps,
    ...data
  };


};

export default AppComponent;
