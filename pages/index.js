import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { createGlobalStyle, ThemeProvider, css } from 'styled-components';
import reset from 'styled-reset';
import { Provider, connect } from 'react-redux';
import store from '../redux/store'
import theme from "../global/theme";
import Layout from '../components/layout/Layout';
import Stream from '../pages/stream'


const Home = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <div className="container">
          <Head>
            <title>SoundCloud</title>
          </Head>
          <Layout>
            <Stream />
          </Layout>
        </div>
      </ThemeProvider>
    </Provider>
  );
};

const GlobalStyle = createGlobalStyle`
  ${reset};
`;

export default Home;