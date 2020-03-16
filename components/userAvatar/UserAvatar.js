import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as css from '../../global/theme';

const UserAvartar = ({ size, url, rect }) => {
  // componentDidMount
  useEffect(() => {}, []);

  return (
    <UserAvartarWrap size={size} rect={rect}>
      <UserPic url={url} />
    </UserAvartarWrap>
  );
};

const UserAvartarWrap = styled.div`
width :${(props) => props.size || '50px'};
height :${(props) => props.size || '50px'};
border-radius: ${(props)=> props.rect ? '0%' : '50%' };
overflow:hidden;
`;

const UserPic = styled.div`
  ${css.userPic};
  background-image: url(${(props) =>
    props.url ||
    "https://i1.sndcdn.com/artworks-000242629294-7fotrp-t120x120.jpg"});
  width: 100%;
  height: 100%;
`;

export default UserAvartar;
