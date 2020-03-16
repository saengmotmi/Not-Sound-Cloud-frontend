import React from 'react';
import Head from 'next/head';
import styled, { createGlobalStyle, ThemeProvider, css } from 'styled-components';
import reset from 'styled-reset';
import { Provider } from 'react-redux';
import store from '../redux/store';
import theme from '../global/theme';
import Header from '../components/header/Header';
import Layout from '../components/layout/Layout';
import Stream from '../pages/stream'

const Home = () => (
  <Provider store={store}>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <div className="container">
        <Head>
          <title>SoundCloud</title>
          <link rel="icon" href="https://a-v2.sndcdn.com/assets/images/sc-icons/favicon-2cadd14bdb.ico" />
          <link href="https://fonts.cdnfonts.com/css/interstate-2" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap" rel="stylesheet" />
          <link
            rel="icon"
            href="https://a-v2.sndcdn.com/assets/images/sc-icons/favicon-2cadd14bdb.ico"
          />
          <link
            rel="stylecheet"
            href="https://fonts.cdnfonts.com/css/interstate-2"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap"
          />
        </Head>
        <Layout>
          <Stream />
        </Layout>
      </div>
    </ThemeProvider>
  </Provider>
);

const GlobalStyle = createGlobalStyle`
    font-family: ${theme.fontGlobal};
    ${reset};
  `;

export default Home;
