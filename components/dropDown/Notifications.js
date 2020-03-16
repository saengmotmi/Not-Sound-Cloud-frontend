import React from 'react';
// import PropTypes from 'prop-types';
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
            <PaddingWrap left="10px">
              <FirstLine>
                <div>
                  <UserName>{li.userId}</UserName>
                  <StarIcon />
                  <span>is following you</span>
                </div>
                <div>{li.time}</div>
              </FirstLine>
              <SecondLine>
                <div>
                  <FontAwesomeIcon icon={icon.faUser} />
                  <span>
                    {li.userFallowers}
                  </span>
                  <FontAwesomeIcon icon={icon.faAlignCenter} style={{ transform: 'rotate(270deg)' }} />
                  <span>
                    {li.userTrack}
                  </span>
                </div>
                <FollowBtn>
                  <span>
                    <FontAwesomeIcon icon={icon.faUserPlus} style={{ paddingRight: '6px' }} />
                    follow back
                  </span>
                </FollowBtn>
              </SecondLine>
            </PaddingWrap>
          </Li>
        </Link>
      ))}
    </Ul>
    <Button>View all notifications</Button>
  </>
);

const FollowBtn = styled.div`
    cursor: pointer;
    display:flex;
    justify-content:flex-end;
    margin-left: 5px;
    border:none;
    padding:6px;
    border-radius:3px;
    background-color:${theme.black};
    border: 1px solid ${theme.chacoal};
    max-width:100px;
    &:hover {
    border: 1px solid ${theme.dGray};
    }
`;

const StarIcon = styled.div`
background-image:url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjEycHgiIGhlaWdodD0iMTJweCIgdmlld0JveD0iMCAwIDEyIDEyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8dGl0bGU+UHJvIFN0YXI8L3RpdGxlPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9ImJ1dHRvbnMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMjQ2LjAwMDAwMCwgLTgxNS4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9IlByby1TdGFyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMjQ2LjAwMDAwMCwgODE1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTYsMTIgQzkuMzEzNzA4NSwxMiAxMiw5LjMxMzcwODUgMTIsNiBDMTIsMi42ODYyOTE1IDkuMzEzNzA4NSwwIDYsMCBDMi42ODYyOTE1LDAgMCwyLjY4NjI5MTUgMCw2IEMwLDkuMzEzNzA4NSAyLjY4NjI5MTUsMTIgNiwxMiBaIiBpZD0iT3ZhbC0xOCIgZmlsbD0iI0ZGNTUwMCI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlN0YXItMSIgZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSI2IDguMDcwMzY2MDEgMy4zNTQ5NjYzNiA5LjY0MDU3NjQ3IDQuMDMwOTY0OTEgNi42Mzk3NzgyOCAxLjcyMDI0NTY4IDQuNjA5NDIzNTMgNC43ODMwNjkzOSA0LjMyNTAzODcxIDYgMS41IDcuMjE2OTMwNjEgNC4zMjUwMzg3MSAxMC4yNzk3NTQzIDQuNjA5NDIzNTMgNy45NjkwMzUwOSA2LjYzOTc3ODI4IDguNjQ1MDMzNjQgOS42NDA1NzY0NyAiPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==');
background-size: 15px 15px;
`;

const UserName = styled.span`
font-size: 14px;
padding-right:5px;
text-overflow: ellipsis;
white-space: nowrap;
overflow:hidden;
max-width:100px;
`;
const FirstLine = styled.p`
display:flex;
justify-content:space-between;
align-items:baseline;
width:280px;
padding-bottom:8px;
div:first-child {
  display:flex;
  justify-content:flex-start;
    position: relative;
    top:3px;
  span:last-child {
    position: relative;
    top:1px;
  }
}
div:last-child {
  display:flex;
  justify-content:flex-end;
}
`;


const SecondLine = styled.p`
display:flex;
justify-content:space-between;
align-items:center;
text-overflow: ellipsis;
white-space: nowrap;
overflow:hidden;
width:280px;
font-size:10px;
span {
  padding:0 10px 0 5px;
}
div:first-child {
  display:flex;
  justify-content:flex-start;
}

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
border-bottom: solid 1px ${theme.chacoal};
`;

const Li = styled.li`
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
padding: 10px 10px;
${css.flexCenter};
`;

const Button = styled.button`
cursor: pointer;
width:100%;
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
