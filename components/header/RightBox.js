import React,{useState, useEffect} from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell, faEnvelope, faEllipsisH, faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import theme, * as css from '../../global/theme';
import UserAvatar from '../userAvatar/UserAvatar';
import { connect } from "react-redux";
import {
  changeNav,
  checkMessage,
  checkNoti,
  saveNotiData,
} from "../../redux/header/headerActions";
// import { CHANGE_NAV } from "../../redux/header/headerTypes";
import { TOKEN, USER_STATUS, USER_NOTIFICATION } from "../../global/api";






const RightBox = (props) => {
                              // 프롭스 디스트럭처
                              const {
                                changeNav,
                                selectNav,
                                notiChacked,
                                messageChacked,
                                notiData,
                                saveNotiData,
                                checkMessage,
                                checkNoti
                              } = props;
                              // const [massageChecked, setMassageChecked] = useState();
                              // const [followChecked, setFollowChecked] = useState();
                              const chackNavState = (e) => {
                                // 클릭한 타겟의 id를 가져와 현재 네브 상태와 비교, 같으면 네브 끄기.
                                if (parseInt(e.target.id) === selectNav) {
                                  changeNav(0);
                                } else {
                                  changeNav(parseInt(e.target.id));
                                }
                              };
                              const checkId = (id) => {
                                if (id === selectNav) {
                                  return "true";
                                } else {
                                  return "false";
                                }
                              };
                              const checkCurrentNav = (num) => {
                                if (selectNav === num) {
                                  return 0;
                                } else {
                                  return num;
                                }
                              };
                              //! 노티 데이터 펫치
                              const fetchNotiDataState = async () => {
                                const resporse = await fetch(USER_STATUS, {
                                  method: "GET",
                                  headers: {
                                    Authorization: TOKEN
                                  }
                                });
                                const result = await resporse.json();
                                console.log(result.message);
                                if ( result.message) {
                                  return saveNotiData('EMPTY_UPDATES');
                                } else {
                                        return saveNotiData(result.data);
                                      }
                              };
                              const fetchRedLight = async () => {
                                const response = await fetch(
                                  USER_NOTIFICATION,
                                  {
                                    method: "GET",
                                    headers: {
                                    Authorization: TOKEN
                                    }
                                  }
                                );
                                const result = await response.json();
                                console.log(result.data);
                                checkMessage(result.data["message_checked"]);
                                checkNoti(result.data["follow_checked"]);
                              };
  const onClickNoti = ()=>{
    fetchNotiDataState();
    changeNav(checkCurrentNav(6));
  }
                              // 팔로우 알람 내역 패치
                              useEffect(() => {
                                // 알람 불 패치
                                fetchRedLight();
                              }, []);

                              return (
                                <>
                                  <RightWrap>
                                    <Ul>
                                      <Link href="/">
                                        <Li
                                          nav
                                          on={checkId(4)}
                                          style={{}}
                                          onClick={()=>{
                                              changeNav(checkCurrentNav(4));
                                          }}>
                                          Upload
                                        </Li>
                                      </Link>
                                      <Li
                                        on={checkId(5)}
                                        onClick={() => {
                                          changeNav(checkCurrentNav(5));
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
                                      <Li // noti
                                        on={checkId(6)}
                                        onClick={onClickNoti}>
                                        {!notiChacked && <RedDot />}
                                        <MarginWrap left="15px" right="15px">
                                          <FontAwesomeIcon
                                            icon={faBell}
                                            style={{
                                              fontSize: "18px"
                                            }}
                                          />
                                        </MarginWrap>
                                      </Li>
                                      <Li // message
                                        on={checkId(7)}
                                        onClick={(e) => {
                                          // todo 클릭하면 상태 변경 post 보내기
                                          changeNav(checkCurrentNav(7));
                                        }}>
                                        {!messageChacked && <RedDot />}
                                        <MarginWrap left="15px" right="15px">
                                          <FontAwesomeIcon
                                            icon={faEnvelope}
                                            style={{
                                              fontSize: "18px"
                                            }}
                                          />
                                        </MarginWrap>
                                      </Li>
                                      <Li // dot
                                        on={checkId(8)}
                                        onClick={(e) => {
                                          changeNav(checkCurrentNav(8));
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

const RedDot = styled.div`
  border-radius: 50%;
  background-color: ${theme.deepOrange};
  width:5px;
  height:5px;
  position: absolute;
  top:10px;
  right:10px;
`;
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
position: relative;
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
    selectNav: state.selectNav,
    messageChacked: state.messageChacked,
    notiChacked: state.notiChacked,
    notiData: state.notiData
  };}


// 디스페치를 불러올때 굳이 mapDispatchToProps로 가져오지말고 connect할때 바로 연결하자.
export default connect(mapStateToProps, {
  changeNav,
  checkNoti,
  checkMessage,
  saveNotiData
})(RightBox);
