import Head from 'next/head';
import styled, { createGlobalStyle, ThemeProvider, css } from 'styled-components';
import reset from 'styled-reset';
import theme from '../global/theme';
import SignModal from '../components/SignModal';

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

// @import url('https://fonts.cdnfonts.com/css/interstate-2');
// const flexCenter = css`
//   display: flex;
//   justify-contents: center;
// `;

const Home = () => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>

      <div className="container">
        <Head>
          <title>SoundCloud</title>
          <link rel="icon" href="https://a-v2.sndcdn.com/assets/images/sc-icons/favicon-2cadd14bdb.ico" />
          <link href="https://fonts.cdnfonts.com/css/interstate-2" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap" rel="stylesheet" />
          <script src="https://apis.google.com/js/platform.js" async defer />
          <meta name="google-signin-client_id" content="774415266464-sglb6tricktd8bcc556bn9ucc2offgr1.apps.googleusercontent.com" />
        </Head>

        <main>
          <Text>
            <span>
              헬로우~
            </span>
            <div>hi</div>
          </Text>
          <SignModal />

        </main>
      </div>

    </ThemeProvider>
  </>
);


const Text = styled.div`
  font-family : 'Interstate';
  color: ${theme.orange};
`;

export default Home;
