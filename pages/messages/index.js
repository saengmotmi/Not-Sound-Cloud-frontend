import Head from "next/head";
import React,{useState} from 'react'
import { createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import store from '../../redux/store';
import fetch from "isomorphic-unfetch";
import reset from "styled-reset";
import Layout from "../../components/layout/Layout";
import {
  USER_MESSAGE,
  TOKEN,
  USER_MESSAGE_DETAIL_1ST,
} from "../../global/api";
import MessageSection from "../../components/messageSection/MessageSection";
const Messages = (props) => {


const { asideData, sectionData } = props;
  const [reloadMsgData, setReloadMsgData] = useState(sectionData);
// console.log('어싸이드데이터',asideData);
// console.log("섹션데이터", sectionData);
  return (
    // <Provider store={store}>
      // <GlobalStyle />
      // {/* <Head></Head> */}
      // {/* <Layout> */}
        <MessageSection
          asideData={asideData}
          reloadMsgData={reloadMsgData}
          setReloadMsgData={setReloadMsgData}
        />
      // {/* </Layout> */}
    // </Provider>
  );
}

const GlobalStyle = createGlobalStyle`
  ${reset};
`;

const fetchSideMsgList = async () => {
  const res = await fetch(USER_MESSAGE, {
    headers: { Authorization: TOKEN }
  });
  const json = await res.json();
  return json.data
}

const fetchSectionMsgList = async () => {
  const res = await fetch(USER_MESSAGE_DETAIL_1ST, {
    headers: { Authorization: TOKEN }
  });
  const json = await res.json();
  // console.log(json)
  return json["latest_message_details"];
}

Messages.getInitialProps = async () => {
  const asideData = await fetchSideMsgList();
  const sectionData = await fetchSectionMsgList();
  // console.log (asideData)
  // console.log (sectionData)
  return { asideData: asideData, sectionData: sectionData };
};


export default Messages;