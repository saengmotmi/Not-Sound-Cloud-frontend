import React, { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../../global/theme";
import { connect } from "react-redux";
import SectionMsgList from "../../components/ui/SectionMsgList";
import AsideMsgList from "../../components/ui/AsideMsgList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  USER_MESSAGE,
  TOKEN,
  HEE_IP,
  USER_MESSAGE_UPDATE
} from "../../global/api";
// import fetch from "isomorphic-unfetch";




const MessageSection = ({
  asideData,
  reloadMsgData,
  userData,
  setReloadMsgData
}) => {
        const [sendMsgUserId, setSendMsgUserId] = useState([]); //sendMsgUserId["to_user_id"]
        const [checkInput, setCheckInput] = useState(false);
        const [messageInput, setMessageInput] = useState("");
        // console.log(userData['user_name']);
        const handleMessageInput = (e) => {
          setMessageInput(e.target.value);
        };
      
        const sendMassage = () => {
          fetch(USER_MESSAGE, {
            method: "POST",
            headers: { Authorization: TOKEN },
            body: JSON.stringify({
              to_user_id: sendMsgUserId["to_user_id"],
              content: messageInput
            })
          })
            .then((res) => res.json())
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        };

        const reloadData = () => {
          fetch(`${USER_MESSAGE_UPDATE}${sendMsgUserId["to_user_id"]}`, {
            method: "GET",
            headers: { Authorization: TOKEN }
          })
            .then((res) => res.json())
            .then((res) => setReloadMsgData(res["message_details"]));
        };

        const handleSendBtn = async (e) => {
          setCheckInput(true);
          if (messageInput.length > 3) {
            await sendMassage();
            await reloadData();
            await setMessageInput("");
            await setCheckInput(false);
          }
        };

        const handleOnClickListBtn = async (e) => {
        let messageId = parseInt(e.target.id);
        let obj = asideData.filter((li) => li["message_id"] === messageId);
          await setSendMsgUserId(obj[0]); // 유저 오브제 넣음~
        //! 글릭하면 팻치해서 옆 메세지 내역 변경하기!
          await reloadData();
        };
        useEffect(() => {}, [sendMsgUserId]);
        useEffect(() => {}, [sendMsgUserId]);

        useEffect(() => {
          setSendMsgUserId(asideData[0]);
          // console.log(asideData[0]["message_id"]);
        }, []);
        // console.log(reloadMsgData);
        return (
          <MessagesWrap>
            <MessagesContainer>
              <Aside>
                <h1>Messages</h1>
                <NewMessageBtn>New message</NewMessageBtn>
                <MsgListWrap>
                  {/* <AsideMsgList /> */}
                  {asideData.map((li) => {
                    let id = li["message_id"];
                    return (
                      <AsideMsgList
                        key={id}
                        id={id}
                        userAvatarSize={"42px"}
                        url={
                          li["from_user_name"] !== userData["user_name"]
                            ? li["from_user_img"]
                            : li["to_user_img"]
                        }
                        userName={
                          li["from_user_name"] !== userData["user_name"]
                            ? li["from_user_name"]
                            : li["to_user_name"]
                        }
                        time={li["last_message_time"]}
                        text={li["last_message"]}
                        isCkecked={li["is_checked"]}
                        onClick={handleOnClickListBtn}
                        // ! 라우터 > 쿼리파라미터 어떻게 할지 상의하기
                      />
                    );
                  })}
                </MsgListWrap>
              </Aside>
              <Section>
                <Headline>
                  <h2>{sendMsgUserId["to_user_name"]}</h2>
                  <Warp>
                    <RedDotOnoffBtn>Mark as unread</RedDotOnoffBtn>
                    <DelBrn>
                      <FontAwesomeIcon icon={faTrash} />
                    </DelBrn>
                  </Warp>
                </Headline>
                <MegSectionList>
                  {/* 여기 메세지 맵 돌리기 */}
                  {reloadMsgData.map((li) => {
                    return (
                      <SectionMsgList
                        key={li["message_id"]}
                        userName={li["from_user_name"]}
                        userId={li["from_user_id"]}
                        url={li["from_user_img"]}
                        userAvatarSize={"42px"}
                        text={li.content}
                        isChecked={li["is_checked"]}
                        time={li["created_at"]}
                        song={li["song"]}
                      />
                    );
                  })}
                </MegSectionList>
                <SendMsgWrap>
                  <label htmlFor="messageinput">
                    Write your message and add tracks
                  </label>
                  <MsgInputWrap>
                    <Textarea
                      color={
                        messageInput.length < 3 && checkInput
                          ? theme.deepOrange
                          : false
                      }
                      name="messageinput"
                      value={messageInput}
                      onChange={handleMessageInput}
                    />
                    <BtnWrap>
                      <MsgBtn>Add Track</MsgBtn>
                      {messageInput.length < 3 && checkInput ? (
                        <p>Enter a message.</p>
                      ) : null}
                      <MsgBtn orange onClick={handleSendBtn}>
                        Send
                      </MsgBtn>
                    </BtnWrap>
                  </MsgInputWrap>
                </SendMsgWrap>
              </Section>
            </MessagesContainer>
          </MessagesWrap>
        );
      };

const MsgBtn = styled.div`
  cursor: pointer;
  font-family: ${theme.font};
  background-color: ${(props) => (props.orange ? theme.orange : null)};
  font-size: 12px;
  border-radius: 3px;
  border: ${(props) => (props.orange ? "none" : "1px solid " + theme.lGray)};
  color: ${(props) => (props.orange ? "#fff" : theme.chacoal)};
  padding: 5px 12px;
`;
const BtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  border-left: 1px solid ${theme.lGray};
  border-right: 1px solid ${theme.lGray};
  border-bottom: 1px solid ${theme.lGray};
  position: relative;
  top: -2px;
  padding: 10px;
  p {
    color: ${theme.deepOrange};
    font-family: ${theme.font};
    font-size: 12px;
    font-weight: 500;
    line-height: 1.2em;
    position: relative;
    top: 2px;
  }
`;

const MsgInputWrap = styled.div`
  }
`;
const Textarea = styled.textarea`
  padding: 15px;
  font-family: ${theme.font};
  font-size: 12px;
  letter-spacing: 0.01em;
  color: ${theme.chacoal};
  width: 100%;
  height: 150px;
  margin-top: 10px;
  border-radius: 5px 5px 0 0;
  line-height:1.8em;
  border: 1px solid ${(props) => props.color || theme.lGray};
  &:focus {
    border: 1px solid ${(props) => props.color || theme.lGray};
    outline: none;
  }
`;

const SendMsgWrap = styled.div`
  padding-left: 52px;
  margin-top: 20px;
  label {
    font-size: 12px;
    font-family: ${theme.font};
    letter-spacing: 0.01em;
    color: ${theme.chacoal};
    &::after {
      content: " *";
      color: ${theme.deepOrange};
    }
  }
`;
const MegSectionList = styled.div`
  border-bottom: 1px dashed ${theme.snow};
`;

const Warp = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
`;
const DelBrn = styled.div`
  border-radius: 4px;
  border: 1px solid ${theme.snow};
  padding: 5px 7px;
  font-size: 11px;
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
  display: flex;
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
  /* border:1px solid ${theme.snow}; */
`;


const NewMessageBtn = styled.span`
  font-family: ${theme.font};
  background-color: ${theme.orange};
  font-size: 12px;
  border-radius: 3px;
  border: none;
  color: #fff;
  padding: 5px 10px;
  margin-bottom: 100px;
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
  margin-left: 25px;
`;
const MessagesWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: ${theme.lsnow};
`;

const MessagesContainer = styled.div`
  padding-top: 75px;
  padding: 75px 30px 0 30px;
  width: 1240px;
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
`;




const mapStateToProps = (state) => ({
  userData: state.userData
});

export default connect(mapStateToProps,null)(MessageSection);