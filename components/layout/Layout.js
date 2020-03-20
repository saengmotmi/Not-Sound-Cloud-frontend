// import PropTypes from 'prop-types';
import styled from "styled-components";
import { flexCenter } from "../../global/theme";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
const Layout = ({ children }) => (
  <CenterContainer>
    <Header />
    <Main>
      {/* <Sidebar /> */}
      {children}
    </Main>
  </CenterContainer>
);
const CenterContainer = styled.div`
  ${flexCenter};
  flex-direction: column;
`;
const Main = styled.div`
  margin-top: 0px;
  display: flex;
  flex-direction: row;

`;
// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// };
export default Layout;
