import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as css from '../../global/theme';

const UserAvartar = ({ size }) => {
  // componentDidMount
  useEffect(() => {
  }, []);

  return (
    <UserAvartarWrap size={size}>
      <UserPic />
    </UserAvartarWrap>
  );
};

const UserAvartarWrap = styled.div`
width :${(props) => props.size || '50px'};
height :${(props) => props.size || '50px'};
border-radius:50%;
overflow:hidden;
`;

const UserPic = styled.div`
${css.userPic};
width:100%;
height:100%;
`;

export default UserAvartar;
