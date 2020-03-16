// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { flexCenter } from '../../global/theme';
import Header from "../header/Header";


const Layout = ({ children }) => (
  <CenterContainer>
    <Header/>
    {children}
  </CenterContainer>
);

const CenterContainer = styled.div`
${flexCenter};
`;

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default Layout;
