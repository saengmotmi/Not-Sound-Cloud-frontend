import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { connect } from "react-redux";
import theme, * as css from '../../global/theme';
import UserAvartar from '../userAvatar/UserAvatar';
import {
  USER_NOTIFICATION,
  TOKEN,
  USER_STATUS,
  FAMOUS,
  USER_FOLLOW
} from "../../global/api";
import {
  saveMessageData,
  changeNav
} from "../../redux/header/headerActions";
import fetch from "isomorphic-unfetch";



const Messages = (props) => {
  const { messageData, saveMessageData,changeNav } = props;

 const timer = (old) => {
   // old = 2020-03-17T11:21:23.464Z
   let year = old.slice(0, 4); // 2019
   let month = old.slice(5, 7); // 05
   let date = old.slice(8, 10); // 10
   let hour = old.slice(11, 13); // 2
   let min = old.slice(14, 16); // 18
   let sec = old.slice(17, 19); // 90

   let now = new Date();

   let nowYear = now.getFullYear(); //2020
   let nowMonth = now.getMonth() + 1; // 달 0~11달 //
   let nowDate = now.getDate(); //17
   let nowHours = now.getHours(); // 0~11시
   let nowMin = now.getMinutes(); // 0~59분
   let nowSec = now.getSeconds(); // 0~59초

   if (nowYear - Number(year) >= 1) return nowYear - year + " years ago";
   if (nowMonth - Number(month) >= 1) return nowMonth - month + " month ago";
   if (nowDate + 1 - Number(date) >= 1) return nowHours - hour + " hours ago";
   if (nowMin - Number(min) >= 1) return nowHours - hour + " hours ago";
   if (nowSec - Number(sec) >= 1) return nowHours - hour + " hours ago";
 };


  return (
    <>
      <Ul>
        {messageData ? (
          messageData.map((li) => (
            <Li>
              <UserAvartar size="42px" url={li["to_user_img"]} />
              <PaddingWrap left="10px">
                <FirstLine>
                  <div>
                    <UserName>{li["to_user_name"]}</UserName>
                    {/* {<StarIcon />} */}
                  </div>
                  <div>{timer(li["last_message_time"])}</div>
                </FirstLine>
                <SecondLine>
                  <div>
                    <span>{li["last_message"]}</span>
                  </div>
                </SecondLine>
              </PaddingWrap>
            </Li>
          ))
        ) : (
          <LoadingBox>
            <img
              src="https://a-v2.sndcdn.com/assets/images/loader-dark-45940ae3d4.gif"
              alt="loading"
            />
          </LoadingBox>
        )}
      </Ul>
      <Link href="/messages">
        <Button onClick={() => changeNav(0)}>View all notifications</Button>
      </Link>
    </>
  );
}

const LoadingBox = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
  img {
    width: 20px;
  }
`;
const FollowBtn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  margin-left: 5px;
  border: none;
  padding: 6px;
  border-radius: 3px;
  background-color: ${theme.black};
  border: 1px solid ${theme.chacoal};
  max-width: 100px;
  font
  &:hover {
    border: 1px solid ${theme.dGray};
  }
`;

const StarIcon = styled.div`
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjEycHgiIGhlaWdodD0iMTJweCIgdmlld0JveD0iMCAwIDEyIDEyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8dGl0bGU+UHJvIFN0YXI8L3RpdGxlPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9ImJ1dHRvbnMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMjQ2LjAwMDAwMCwgLTgxNS4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9IlByby1TdGFyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMjQ2LjAwMDAwMCwgODE1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTYsMTIgQzkuMzEzNzA4NSwxMiAxMiw5LjMxMzcwODUgMTIsNiBDMTIsMi42ODYyOTE1IDkuMzEzNzA4NSwwIDYsMCBDMi42ODYyOTE1LDAgMCwyLjY4NjI5MTUgMCw2IEMwLDkuMzEzNzA4NSAyLjY4NjI5MTUsMTIgNiwxMiBaIiBpZD0iT3ZhbC0xOCIgZmlsbD0iI0ZGNTUwMCI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlN0YXItMSIgZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSI2IDguMDcwMzY2MDEgMy4zNTQ5NjYzNiA5LjY0MDU3NjQ3IDQuMDMwOTY0OTEgNi42Mzk3NzgyOCAxLjcyMDI0NTY4IDQuNjA5NDIzNTMgNC43ODMwNjkzOSA0LjMyNTAzODcxIDYgMS41IDcuMjE2OTMwNjEgNC4zMjUwMzg3MSAxMC4yNzk3NTQzIDQuNjA5NDIzNTMgNy45NjkwMzUwOSA2LjYzOTc3ODI4IDguNjQ1MDMzNjQgOS42NDA1NzY0NyAiPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==");
  background-size: 15px 15px;
`;

const UserName = styled.span`
line-height:1.5em;
  font-size: 14px;
  padding-right: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100px;
`;
const FirstLine = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 280px;
  padding-bottom: 4px;
  div:first-child {
    display: flex;
    justify-content: flex-start;
    position: relative;
    top: 3px;
    span:last-child {
      position: relative;
      top: 1px;
    }
  }
  div:last-child {
    display: flex;
    justify-content: flex-end;
  }
`;

const SecondLine = styled.p`
  display: flex;
  align-items:center;
  width: 280px;
  height: 24px;
  font-size: 10px;
  div{
  display: flex;
  align-items:center;
  width:100%;
  span {
    line-height: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  }

  div:first-child {
    display: flex;
    justify-content: flex-start;
  }
`;

const PaddingWrap = styled.div`
/* padding-right: ${(props) => props.right || "10px"}; */
padding-left: ${(props) => props.left || "10px"};
padding-top: ${(props) => props.top || "0"}; 
padding-bottom: ${(props) => props.bottom || "0"};
`;
const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${theme.black};
  width: 360px;
  border-bottom: solid 1px ${theme.chacoal};
`;

const Li = styled.li`
  height: 63px;
  font-family: ${theme.font};
  display: flex;
  flex-direction: row;
  align-items: center;
  background-clip: red;
  z-index: 10;
  color: ${theme.lGray};
  font-size: 12px;
  font-weight: 100;
  width: 100%;
  padding: 10px 10px;
  ${css.flexCenter};
  &:hover {
    background-color: ${theme.chacoal};
    color: ${theme.snow};
  }
`;

const Button = styled.button`
  cursor: pointer;
  width: 100%;
  padding: 15px 0;
  font-family: ${theme.font};
  background-color: ${theme.black};
  border: none;
  color: ${theme.gray};
  font-size: 14px;
  &:hover {
    color: ${theme.snow};
    background-color: ${theme.chacoal};
  }
`;


const mapStateToProps = (state) => ({
  messageData: state.messageData,
});

export default connect(mapStateToProps, { saveMessageData,changeNav })(Messages);
