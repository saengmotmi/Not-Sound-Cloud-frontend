// import PropTypes from 'prop-types';
import styled from "styled-components";
import { flexCenter } from "../../global/theme";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import BottomPlayer from '../bottomPlayer/BotPlayer';

const Layout = ({ children, router }) => (
  <CenterContainer>
    <Header />
    <Main>
      {!!router && router.pathname.split("/")[1] !== "detail" && <Sidebar />}
      {children}
    </Main>
    <BottomPlayer />
  </CenterContainer>
);

const CenterContainer = styled.div`
  ${flexCenter};
  flex-direction: column;
  background-color: #f2f2f2;
`;

const Main = styled.div`
  padding: 80px 0 80px 0;
  display: flex;
  flex-direction: row-reverse;
  background-color: #ffffff;
  width: 1240px;
`;

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// };
export default Layout;
