import React, {useState, useEffect} from 'react'
import styled, {css} from 'styled-components'
import theme from '../../global/theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import TitleBar from './TitleBar'
import List from "./List";

const mock = [
    {
      follower_name: "Conan Gray",
      follower_id: 26,
      follower_follower_count: 1,
      follower_song_count: 1,
      follower_image:
        "https://image.bugsm.co.kr/album/images/50/9459/945912.jpg?version=20200123100025.0",
      follow_at: "2020-03-18T08:27:17.784Z",
      is_checked: false,
      mutual_follow: true
    },
    {
      follower_name: "ITZY (있지)",
      follower_id: 27,
      follower_follower_count: 1,
      follower_song_count: 1,
      follower_image:
        "https://image.bugsm.co.kr/album/images/50/203110/20311029.jpg?version=20200309180004.0",
      follow_at: "2020-03-18T08:27:24.143Z",
      is_checked: false,
      mutual_follow: true
    }
];


function Sidebar() {

  return (
    <AsideContainer>
      <TitleBar
        icon={"faUser"}
        text={"Who to follow"}
        btnIcon={"faRedoAlt"}
        btnText={"Refresh"}
      />
      {mock.map((li)=>{
return <List li={li} />;
      })}
    </AsideContainer>
  );
}

const AsideContainer = styled.div`
  width: 300px;
  height: 100%;
  /* background-color: yellow; */
  /* border : 1px solid ${theme.orange}; */
`;


export default Sidebar;

