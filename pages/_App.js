import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

const App = () => (
  <>
    <GlobalStyle />
    <div>Hi, app!</div>
  </>
);

export default App;
