import Head from 'next/head';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import theme from '../global/theme';

const GlobalStyle = createGlobalStyle`
  ${reset}
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR:100,300,400,500,700,900|Roboto:100,300,400,500,700,900&display=swap&subset=korean');
`;

const Home = () => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>

      <div className="container">
        <Head>
          <title>SoundCloud</title>
          <link rel="icon" href="https://a-v2.sndcdn.com/assets/images/sc-icons/favicon-2cadd14bdb.ico" />
        </Head>

        <main>
          <Text>
            헬로우~
          </Text>
        </main>

      </div>

    </ThemeProvider>
  </>
);

const Text = styled.div`
font-family : 'Roboto';
color: ${theme.orange};
`;

export default Home;
