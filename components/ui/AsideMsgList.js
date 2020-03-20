import styled from "styled-components";
import React, {useState, useEffect} from 'react'
import theme, * as css from '../../global/theme'
import Link from "next/link";
import UserAvartar from "../userAvatar/UserAvatar";
import {USER_MESSAGE_DETAIL,} from '../../global/api'


const AsideMsgList = (props) => {
  const [selectMsg,setSelectMsg] = useState(''); // 선택된 리스트 체크
  // page/messages/index.js에서 프롭스로 값 받기
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
  const {
    id,
    key,
    userAvatarSize,
    url,
    userName,
    time,
    text,
    onClick,
    isCkecked,
  } = props;
  return (
    //! 여기 주석해제 하고 사용하기
    <Li aside isCkecked onClick={onClick} id={id + "-aside-msg-list"}>
      <UserAvartar
        url={url}
        size={userAvatarSize}
        id={id}
      />
      <PaddingWrap left="10px" id={id + "-message-padding"}>
        <FirstLine id={id + "-message-1st-line"}>
          <div id={id + "-message-d"}>
            <UserName id={id + "-message-username"}>{userName}</UserName>
            <StarIcon id={id + "-message-staricon"} />
          </div>
          <div id={id + "-message-lst-div"}>{timer(time)}</div>
        </FirstLine>
        <SecondLine id={id + "-message-2nd-line"}>
          <div id={id + "-message-2nd-line-div"}>
            <span id={id + "-message-span-2nd"}>{text}</span>
          </div>
        </SecondLine>
      </PaddingWrap>
    </Li>
  );
};

const Li = styled.li`
  cursor: pointer;
  font-family: ${theme.font};
  align-items: center;
  background-clip: red;
  justify-content: flex-start;
  z-index: 10;
  color: ${theme.lGray};
  font-size: 12px;
  font-weight: 100;
  padding: 8px 16px;
  /* margin-bottom: 10px; */
  background-color:${(props) =>
    props.isCkecked === true
      ? "none"
      : theme.lsnow};
  border-left: ${(props) =>
    props.isCkecked === true ? "none" : theme.orange + " solid 2px"};
  ${css.flexCenter};
  &:hover {
    background-color: ${theme.lsnow};
    color: ${theme.snow};
  }
`;


const PaddingWrap = styled.div`
/* padding-right: ${(props) => props.right || "10px"}; */
padding-left: ${(props) => props.left || "20px"};
padding-top: ${(props) => props.top || "0"}; 
padding-bottom: ${(props) => props.bottom || "0"};
width:260px;

`;

const FirstLine = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  /* padding-bottom: 4px; */
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
    color : ${theme.gray};
    font-size:10px;
  }
`;


const SecondLine = styled.p`
  display: flex;
  align-items: center;
  height: 24px;
  font-size: 10px;
  div {
    display: flex;
    align-items: center;
    width: 100%;
    span {
      line-height: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: ${theme.chacoal};
      font-size:11px;
      font-weight:500;
      line-height : 1.5em;
    }
  }

  div:first-child {
    display: flex;
    justify-content: flex-start;
  }
`;

const StarIcon = styled.div`
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjEycHgiIGhlaWdodD0iMTJweCIgdmlld0JveD0iMCAwIDEyIDEyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8dGl0bGU+UHJvIFN0YXI8L3RpdGxlPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9ImJ1dHRvbnMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMjQ2LjAwMDAwMCwgLTgxNS4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9IlByby1TdGFyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMjQ2LjAwMDAwMCwgODE1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTYsMTIgQzkuMzEzNzA4NSwxMiAxMiw5LjMxMzcwODUgMTIsNiBDMTIsMi42ODYyOTE1IDkuMzEzNzA4NSwwIDYsMCBDMi42ODYyOTE1LDAgMCwyLjY4NjI5MTUgMCw2IEMwLDkuMzEzNzA4NSAyLjY4NjI5MTUsMTIgNiwxMiBaIiBpZD0iT3ZhbC0xOCIgZmlsbD0iI0ZGNTUwMCI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlN0YXItMSIgZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSI2IDguMDcwMzY2MDEgMy4zNTQ5NjYzNiA5LjY0MDU3NjQ3IDQuMDMwOTY0OTEgNi42Mzk3NzgyOCAxLjcyMDI0NTY4IDQuNjA5NDIzNTMgNC43ODMwNjkzOSA0LjMyNTAzODcxIDYgMS41IDcuMjE2OTMwNjEgNC4zMjUwMzg3MSAxMC4yNzk3NTQzIDQuNjA5NDIzNTMgNy45NjkwMzUwOSA2LjYzOTc3ODI4IDguNjQ1MDMzNjQgOS42NDA1NzY0NyAiPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==");
  background-size: 15px 15px;
`;

const UserName = styled.span`
  line-height: 1.5em;
  letter-spacing:0.05em;
  font-size: 12px;
  font-weight:500;
color: ${theme.gray};
  padding-right: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 120px;
`;

export default AsideMsgList;
