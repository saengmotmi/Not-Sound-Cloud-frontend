import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import theme, * as css from "../../global/theme";
import UserAvartar from "../userAvatar/UserAvatar";
const List = ({ li }) => {
  return (
    <Li>
      <UserAvartar url={li["follower_image"]} size="50px" />
      <PaddingWrap left="10px">
        <FirstLine>
          <div>
            <UserName>{li["follower_name"]}</UserName>
            {li["follower_follower_count"] > 1 && <StarIcon />}
            <span>is following you</span>
          </div>
          <div>{li.time}</div>
        </FirstLine>
        <SecondLine>
          <div>
            <FontAwesomeIcon icon={icons.faUser} />
            <span>{li["follower_follower_count"]}</span>
            <FontAwesomeIcon
              icon={icons.faAlignCenter}
              style={{ transform: "rotate(270deg)" }}
            />
            <span>{li["follower_song_count"]}</span>
          </div>
          <FollowBtn>
            <span>
              <FontAwesomeIcon
                icon={icons.faUserPlus}
                style={{ paddingRight: "6px" }}
              />
              follow back
            </span>
          </FollowBtn>
        </SecondLine>
      </PaddingWrap>
    </Li>
  );
};
export default List;
const Li = styled.li`
  cursor: pointer;
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
`;
const PaddingWrap = styled.div`
/* padding-right: ${props => props.right || "10px"}; */
padding-left: ${props => props.left || "10px"};
padding-top: ${props => props.top || "0"}; 
padding-bottom: ${props => props.bottom || "0"};
`;
const FirstLine = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
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
const UserName = styled.span`
  font-size: 14px;
  padding-right: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100px;
`;
const SecondLine = styled.p`
  width: 240px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: visible;
  height: 24px;
  font-size: 10px;
  padding-top: 3px;
  span {
    padding: 0 10px 0 5px;
  }
  div:first-child {
    display: flex;
    justify-content: flex-start;
  }
`;
const FollowBtn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  margin-left: 5px;
  border: none;
  padding: 4px;
  border-radius: 3px;
  background-color: ${theme.black};
  border: 1px solid ${theme.chacoal};
  max-width: 100px;
  &:hover {
    border: 1px solid ${theme.dGray};
  }
`;
