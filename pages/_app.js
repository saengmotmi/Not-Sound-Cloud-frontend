import Head from "next/head";
import { createGlobalStyle, ThemeProvider, css } from "styled-components";
import reset from "styled-reset";
import { Provider, connect } from "react-redux";
import store from "../redux/store";
import theme from "../global/theme";
import Layout from "../components/layout/Layout";
import { getMusic, getMusicMeta } from "../global/func";

const App = ({Component, pageProps, router}) => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <div className="container">
          <Head>
            <title>SoundCloud</title>
            <script
              src="https://apis.google.com/js/platform.js?onload=init"
              async
              defer
            />
            <meta
              name="google-signin-client_id"
              content="341320998084-ol8q2551v6419v6pusj22vbb4k5cpl8v.apps.googleusercontent.com"
            />
            <link
              rel="icon"
              href="https://a-v2.sndcdn.com/assets/images/sc-icons/favicon-2cadd14bdb.ico"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap"
              rel="stylesheet"
            />
          </Head>
          <Layout router={router}>
            <Component {...pageProps} />
          </Layout>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

App.getInitialProps = async () => {
  return { pageProps: await getMusicMeta() };
};

const GlobalStyle = createGlobalStyle`
  ${reset};
`;

export default App