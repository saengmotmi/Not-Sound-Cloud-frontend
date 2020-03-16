import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import theme, * as css from '../../global/theme';
import UserAvartar from '../userAvatar/UserAvatar';


const Notifications = ({ data }) => (
  <>
    <Ul>
      {data && data.map((li) => (
        <Link href="/">
          <Li>
            <UserAvartar size="42px" />
            <PaddingWrap top="10px" bottom="10px">
              <TextWrap>
                <UserName>{li.userId}</UserName>
                <span>{li.time}</span>
              </TextWrap>
              <TextWrap>{li.message}</TextWrap>
            </PaddingWrap>
          </Li>
        </Link>
      ))}
    </Ul>
    <Button>View all notifications</Button>
  </>
);


const UserName = styled.span`
width:100px;
font-size: 14px;
`;


const TextWrap = styled.p`
display:flex;
justify-content:space-between;
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
overflow:hidden;
width:280px;

span:last-child {
font-size:12px;
text-align:right;
font-weight:200;
}
`;

const PaddingWrap = styled.div`
/* padding-right: ${(props) => props.right || '10px'}; */
padding-left: ${(props) => props.left || '10px'};
padding-top: ${(props) => props.top || '0'}; 
padding-bottom: ${(props) => props.bottom || '0'};
`;
const Ul = styled.ul`
display:flex;
flex-direction:column;
justify-content:flex-start;
background-color:${theme.black};
width :360px;
`;

const Li = styled.li`
line-height:1.5em;
font-family:${theme.font};
display:flex;
flex-direction:row;
align-items:center;
background-clip:red;
z-index:10;
color:${theme.lGray};
font-size:12px;
font-weight:100;
width:100%;
${css.flexCenter}
&:hover {
background-color:${theme.chacoal};
}
${TextWrap}:hover {
  color:${theme.snow}
}
`;

const Button = styled.button`
width:100%;
border-top:solid 1px ${theme.chacoal};
padding: 13px;
font-family:${theme.font};
background-color:${theme.black};
border:none;
color:${theme.gray};
font-size: 14px;
&:hover{
  color:${theme.snow};
  background-color: ${theme.chacoal};
}
`;

export default Notifications;
