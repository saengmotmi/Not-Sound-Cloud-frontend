import PropTypes from 'prop-types';
import styled from 'styled-components';
import { flexCenter } from '../../global/theme';


const Layout = ({ children }) => (
  <CenterContainer>
    {children}
  </CenterContainer>
);

const CenterContainer = styled.div`
${flexCenter};
`;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
