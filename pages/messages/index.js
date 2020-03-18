import Head from "next/head";
import React from 'react'
import styled, { createGlobalStyle } from "styled-components";
import theme, { flexCenter } from '../../global/theme';
import { Provider } from "react-redux";
import store from '../../redux/store';
import fetch from 'isomorphic-unfetch';
import reset from "styled-reset";
import Layout from "../../components/layout/Layout";
import SectionMsgList from "../../components/ui/SectionMsgList";
import AsideMsgList from "../../components/ui/AsideMsgList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";




const Messages = () => {
  const msgPageAsideData = [
    {
      from_user_id: 117,
      from_user_name: "heechul",
      to_user_id: 1,
      to_user_name: "ITZY (있지)",
      last_message:
        "you may want to try this songyou may want to try this songyou may want to try this songyou may want to try this song",
      last_message_time: "2020-03-16T15:30:59.705Z",
      message_id: 43
    },
    {
      from_user_id: 1,
      from_user_name: "ITZY (있지)",
      to_user_id: 117,
      to_user_name: "heechul",
      last_message: "what are you up to",
      last_message_time: "2020-03-18T10:27:46.329Z",
      message_id: 45
    }
  ];


  return (
    <Provider store={store}>
      <GlobalStyle />
      <Head></Head>
      <Layout>
        <MessagesWrap>
          <MessagesContainer>
            <Aside>
              <h1>Messages</h1>
              <NewMessageBtn>New message</NewMessageBtn>
              <MsgListWrap>
                <AsideMsgList />
                {/* {msgPageAsideData.map((li)=>{
                <AsideMsgList
                  key={li["message_id"]}
                  userAvatarSize={"42px"}
                  userName={li["from_user_name"]}
                  time={li["last_message_time"]}
                  text={li["last_message"]}
                  // ! 라우터 > 쿼리파라미터 어떻게 할지 상의하기
                />;
              }
              )} */}
              </MsgListWrap>
            </Aside>
            <Section>
              <Headline>
                <h2>{"User Name"}</h2>
                <Warp>
                  <RedDotOnoffBtn>Mark as unread</RedDotOnoffBtn>
                  <DelBrn>
                    <FontAwesomeIcon icon={faTrash} />
                  </DelBrn>
                </Warp>
              </Headline>
              <MegSectionList>
                {/* 여기 메세지 맵 돌리기 */}
                <SectionMsgList />
              </MegSectionList>
              <SendMsgWrap>
                <label htmlFor="messageinput">
                  Write your message and add tracks
                </label>
                <MsgInputWrap>
                  <textarea name="messageinput"></textarea>
                  <BtnWrap>
                    <MsgBtn>Add Track</MsgBtn>
                    <MsgBtn orange>Send</MsgBtn>
                  </BtnWrap>
                </MsgInputWrap>
              </SendMsgWrap>
            </Section>
          </MessagesContainer>
        </MessagesWrap>
      </Layout>
    </Provider>
  );
}
const MsgBtn = styled.div`
  font-family: ${theme.font};
  background-color: ${(props) => (props.orange ? theme.orange : null)};
  font-size: 12px;
  border-radius: 3px;
  border: ${(props) => (props.orange ? 'none' : '1px solid '+theme.lGray )};
  color: ${(props) => (props.orange ? "#fff" : theme.chacoal)};
  padding: 5px 12px;
`;
const BtnWrap = styled.div`
    display: flex;
    justify-content: space-between;
    border-left:1px solid ${theme.lGray};
    border-right:1px solid ${theme.lGray};
    border-bottom:1px solid ${theme.lGray};
    position:relative;
    top:-2px;
    padding: 10px;
`;

const MsgInputWrap = styled.div`
  textarea {
    padding: 15px;
    font-family: ${theme.font};
    font-size: 12px;
    letter-spacing: 0.01em;
    color: ${theme.chacoal};
    width: 100%;
    height: 150px;
    margin-top: 10px;
    border-radius: 5px 5px 0 0;
    border: 1px solid ${theme.lGray};
    &:focus {
      border: 1px solid ${theme.lGray};
      outline: none;
    }
  }
`;
const SendMsgWrap = styled.div`
  padding-left: 52px;
  margin-top: 20px;
  label {
    font-size: 12px;
    font-family: ${theme.font};
    letter-spacing: 0.01em;
    color : ${theme.chacoal};
    &::after{
      content : ' *';
      color : ${theme.deepOrange};
    }
  }
`;
const MegSectionList = styled.div`
  border-bottom: 1px dashed ${theme.snow};
`;

const Warp = styled.div`
display: flex;
justify-content:flex-start;
flex-direction: row;
`;
const DelBrn = styled.div`
border-radius:4px;
border : 1px solid ${theme.snow};
padding:5px 7px;
font-size : 11px;
margin-left: 5px;
`;
const RedDotOnoffBtn = styled.div`
  padding: 5px 7px;
  border: 1px solid ${theme.snow};
  font-family: ${theme.font};
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.05em;
  border-radius: 4px;
  color: ${theme.chacoal};
`;

const Headline = styled.div`
display : flex;
  justify-content: space-between;
  padding: 10px 0 50px;
  h2 {

    font-family: ${theme.font};
    font-size: 25px;
    font-weight: 600;
    /* letter-spacing: 0.05em; */
  }
`;

const MsgListWrap = styled.div`
  margin-top: 50px;
`;

const GlobalStyle = createGlobalStyle`
  ${reset};
`;
const NewMessageBtn = styled.span`
font-family:${theme.font};
background-color: ${theme.orange};
font-size: 12px;
border-radius:3px;
border : none;
color:#FFF;
padding : 5px 10px;
margin-bottom : 100px;
`;

const Aside = styled.div`
  width: 350px;
  border-right: 0.1px solid ${theme.lsnow};
  /* display: flex; */
  /* flex-direction:column; */

  h1 {
    font-family: ${theme.font};
    font-size: 30px;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding-bottom: 30px;
    line-height: 1.3em;
  }
`;


const Section = styled.div`
  width: 100%;
  margin-left:25px;
  
`;
const MessagesWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: ${theme.lsnow};
`;

const MessagesContainer = styled.div`
padding-top:75px;
padding : 75px 30px 0 30px;
width : 1240px;
background-color:#fff;
display:flex;
justify-content:flex-start;
`;

export default Messages;