import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import theme from "../../global/theme";
const TitleBar = ({ icon, text, btnIcon, btnText }) => {
  return (
    <>
      <TitleBarContainer>
        <Left>
          <span>
            <FontAwesomeIcon icon={icons[icon]} style={{ width: "12px" }} />
          </span>
          <span>{text}</span>
        </Left>
        <Right>
          <span>{btnIcon && <FontAwesomeIcon icon={icons[btnIcon]} />}</span>
          <span>{btnText}</span>
        </Right>
      </TitleBarContainer>
    </>
  );
};
export default TitleBar;
const TitleBarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px ${theme.snow};
  padding-bottom: 7px;
`;
const Left = styled.div`
  &:first-child {
    color: ${theme.gray};
  }
  span:last-child {
    font-family: ${theme.font};
    font-size: 13px;
    margin-left: 8px;
  }
`;
const Right = styled.div`
  color: ${theme.gray};
  font-family: ${theme.font};
  font-size: 13px;
  margin-left: 8px;
  span:first-child {
    padding-right: 5px;
  }
`;
