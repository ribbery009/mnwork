import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/partials/header';
import Sidebar from '../components/sidebar';

import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import createEmotionCache from '../utility/createEmotionCache';
import lightTheme from '../styles/theme/lightTheme';

import "react-datepicker/dist/react-datepicker.css";
import '../assets/styles/main.scss'
import HambContextProvider from '../components/context/hamburgerContext';

import MainPanel from '../components/mainPanel';

const clientSideEmotionCache = createEmotionCache();

const AppComponent = ({ Component, pageProps, currentUser, emotionCache = clientSideEmotionCache }) => {

  return (

    <div className='wrapper'>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <HambContextProvider>
            <Sidebar currentUser={currentUser} />
            <MainPanel>
              <Header currentUser={currentUser} />
              <Component {...pageProps} currentUser={currentUser} />
            </MainPanel>
          </HambContextProvider>
        </ThemeProvider>
      </CacheProvider>
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
