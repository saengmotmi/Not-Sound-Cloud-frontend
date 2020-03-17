import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell, faEnvelope, faEllipsisH, faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import theme, * as css from '../../global/theme';
import UserAvatar from '../userAvatar/UserAvatar';
import { connect } from "react-redux";
import { changeNav } from "../../redux/header/headerActions";
import { CHANGE_NAV } from "../../redux/header/headerTypes";

const RightBox = props => {
  // 프롭스 디스트럭처
  const { changeNav, selectNav } = props;
    const checkId = (id) => {
      if (id === selectNav) {
        return "true";
      } else {
        return "false";
      }
    };
  return (
    <>
      <RightWrap>
        <Ul>
          <Link href="/">
            <Li
              nav
              on={checkId(4)}
              style={{}}
              onClick={() => {
                changeNav(4);
              }}>
              Upload
            </Li>
          </Link>
          <Li
            on={checkId(5)}
            onClick={() => {
              changeNav(5);
            }}>
            <MarginWrap right="8px">
              <UserAvatar size="25px" />
            </MarginWrap>
            zuzuworld
            <MarginWrap left="8px">
              <FontAwesomeIcon
                icon={faChevronDown}
                style={{
                  fontSize: "10px"
                }}
              />
            </MarginWrap>
          </Li>
          <Li
            on={checkId(6)}
            onClick={(e) => {
              changeNav(6);
              // changeNav("messages-drop-down");
            }}>
            <MarginWrap left="15px" right="15px">
              <FontAwesomeIcon
                icon={faBell}
                style={{
                  fontSize: "18px"
                }}
              />
            </MarginWrap>
          </Li>
          <Li
            on={checkId(7)}
            onClick={(e) => {
              changeNav(7);
            }}>
            <MarginWrap left="15px" right="15px">
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{
                  fontSize: "18px"
                }}
              />
            </MarginWrap>
          </Li>
          <Li
            on={checkId(8)}
            onClick={(e) => {
              changeNav(8);
            }}>
            <MarginWrap left="15px" right="15px">
              <FontAwesomeIcon
                icon={faEllipsisH}
                style={{
                  fontSize: "20px"
                }}
              />
            </MarginWrap>
          </Li>
        </Ul>
      </RightWrap>
    </>
  );
    }


// styled-components
const RightWrap = styled.div`
display:flex;
justify-content:flex-start;
`;

const Ul = styled.ul`
${css.flexCenter};
${(props) => (props.col ? 'flex-direction : column' : null)};

`;

const MarginWrap = styled.div`
margin-right: ${(props) => props.right || '10px'};
margin-left: ${(props) => props.left || '10px'};
margin-top: ${(props) => props.top || '0'};
margin-bottom: ${(props) => props.bottom || '0'};
`;

const Li = styled.li`
${css.flexCenter}
font-family:${theme.font};
color: ${(props) => (props.orange ? null : theme.gray)};
background-color : ${(props) => props.on === 'true' && theme.black};
font-size:13px;
text-align:center;
line-height:1.2em;
padding: ${(props) => (props.nav && "0 10px" )};
max-width : 100%;
height : 46px;
&:hover {
cursor:pointer;
color: ${(props) => (props.orange ? null : theme.lGray)};
color: ${(props) => props.on && theme.gray};
}
`;




const mapStateToProps = (state) => {
  return {
    selectNav: state.selectNav
  };}


// 디스페치를 불러올때 굳이 mapDispatchToProps로 가져오지말고 connect할때 바로 연결하자.
export default connect(mapStateToProps, { changeNav  })(RightBox);
