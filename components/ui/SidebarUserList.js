import styled from "styled-components";
import theme, * as css from "../../global/theme";
import Link from "next/link";
import UserAvartar from "../userAvatar/UserAvatar";
import FollowBtn from "./FollowBtn";
import {FAMOUS} from '../../global/api'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignCenter, faUser, } from "@fortawesome/free-solid-svg-icons";




const SidebarUserList = ({
  key,
  url,
  toFollowCount,
  songCount,
  userName,
  time,
}) => {
  // page/messages/index.js에서 프롭스로 값 받기

  return (
    <Link href="/" key={key} id={key + "-aside-list-id"}>
      <Li>
        <UserAvartar size="42px" url={url} />
        <PaddingWrap left="10px">
          <FirstLine>
            <FirstDiv>
              <UserName>{userName}</UserName>
              { toFollowCount > FAMOUS && <StarIcon />}
            </FirstDiv>
          </FirstLine>
          <SecondLine>
            <SecondIconBox>
              <span>
                <FontAwesomeIcon icon={faUser} />
              </span>
              <span>{toFollowCount}</span>
              <span>
                <FontAwesomeIcon
                  icon={faAlignCenter}
                  style={{
                    transform: "rotate(270deg)"
                  }}
                />
              </span>
              <span>{songCount}</span>
            </SecondIconBox>
            {/*팔로우 버튼 클릭하면 이벤트. 해당 id 값을 보낸당! */}
            <BtnWrap>
              <FollowBtn />
            </BtnWrap>
          </SecondLine>
        </PaddingWrap>
      </Li>
    </Link>
  );
};
const BtnWrap = styled.div`

`;

const Li = styled.li`
  cursor: pointer;
  font-family: ${theme.font};
  align-items: center;
  justify-content: flex-start;
  z-index: 10;
  color: ${theme.lGray};
  font-size: 12px;
  font-weight: 100;
  padding: 8px 0;
  /* margin-bottom: 10px; */
  ${css.flexCenter};
`;

const PaddingWrap = styled.div`
/* padding-right: ${(props) => props.right || "10px"}; */
padding-left: ${(props) => props.left || "20px"};
padding-top: ${(props) => props.top || "0"}; 
padding-bottom: ${(props) => props.bottom || "0"};
width:230px;

`;

const FirstLine = styled.p`
  height: 18px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  /* padding-bottom: 4px; */
  div:first-child {
    display: flex;
    justify-content: flex-start;
    position: relative;
    span:last-child {
      display: inline-block;
      line-height: 1.8em;
      position: relative;
    }
  }
  div:last-child {
    display: flex;
    justify-content: flex-end;
    color: ${theme.chacoal};
    font-size: 10px;
  }
`;

const FirstDiv = styled.div`
  display: flex;
  flex-direction:row;
  span:last-child {
    display: inline-block;
    line-height: 1.8em;
    position: relative;
  }
`;


const SecondLine = styled.div`
  height : 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 24px;
  font-size: 10px;
  div {
    /* min - width : 80px; */
  }
`;

const SecondDiv = styled.div`
display : flex;
    justify-content: space-between;
    align-items: center;
`;
const SecondIconBox = styled.div`
height : 20px;
display:flex;
align-items:center;
padding-right: 10px;
color: ${theme.gray};

span { 
color: ${theme.dGray};
padding-right: 5px;
line-height: 14px;
font-size: 11px;
font-weight: 500;
line-height: 1.5em;
&:nth-child(even) {
  padding-right: 15px;
}
}

`;
  
const FollowBtnWrap = styled.div`
`;
const StarIcon = styled.div`
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjEycHgiIGhlaWdodD0iMTJweCIgdmlld0JveD0iMCAwIDEyIDEyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8dGl0bGU+UHJvIFN0YXI8L3RpdGxlPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9ImJ1dHRvbnMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMjQ2LjAwMDAwMCwgLTgxNS4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9IlByby1TdGFyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMjQ2LjAwMDAwMCwgODE1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTYsMTIgQzkuMzEzNzA4NSwxMiAxMiw5LjMxMzcwODUgMTIsNiBDMTIsMi42ODYyOTE1IDkuMzEzNzA4NSwwIDYsMCBDMi42ODYyOTE1LDAgMCwyLjY4NjI5MTUgMCw2IEMwLDkuMzEzNzA4NSAyLjY4NjI5MTUsMTIgNiwxMiBaIiBpZD0iT3ZhbC0xOCIgZmlsbD0iI0ZGNTUwMCI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlN0YXItMSIgZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSI2IDguMDcwMzY2MDEgMy4zNTQ5NjYzNiA5LjY0MDU3NjQ3IDQuMDMwOTY0OTEgNi42Mzk3NzgyOCAxLjcyMDI0NTY4IDQuNjA5NDIzNTMgNC43ODMwNjkzOSA0LjMyNTAzODcxIDYgMS41IDcuMjE2OTMwNjEgNC4zMjUwMzg3MSAxMC4yNzk3NTQzIDQuNjA5NDIzNTMgNy45NjkwMzUwOSA2LjYzOTc3ODI4IDguNjQ1MDMzNjQgOS42NDA1NzY0NyAiPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==");
  background-size: 15px 15px;
  background-repeat: no-repeat;
  width : 15px;
  height: 15px;
`;

const UserName = styled.span`
  line-height: 1.5em;
  letter-spacing: 0.05em;
  font-size: 12px;
  font-weight: 500;
  color: ${theme.chacoal};
  padding-right: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100px;
`;

export default SidebarUserList;
