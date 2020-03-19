// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { flexCenter } from '../../global/theme';
import Header from "../header/Header";
import BottomPlayer from '../bottomPlayer/BotPlayer';


const Layout = ({ children }) => (
  <CenterContainer>
    <Header/>
    {children}
  </CenterContainer>
);

const CenterContainer = styled.div`
  ${flexCenter};
  flex-direction: column;
`;

export default Layout;
