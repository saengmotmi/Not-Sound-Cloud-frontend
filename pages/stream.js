import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import theme from "../global/theme";
import VisualizerComp from '../components/VisualizerComp';

const mockData = {
  repost_id: "바다코끼리",
  repost_img_src:
    "https://i1.sndcdn.com/avatars-LFRcPhK9aBrPrGQV-O60JGw-t50x50.jpg",
  repost_time: 4, //reposted a track 4 hours ago
  post_id: "Ziiin",
  song_title: "DancingOnthetree(feat.김비노)(프라이머리-baby Remake)",
  song_img_src:
    "https://i1.sndcdn.com/artworks-bPFTZjehyPP0iCdP-FzXVUQ-t200x200.jpg",
  tag: "# Hip-hop & Rap",
  my_img_src: "https://i1.sndcdn.com/avatars-000031467940-4w3p6q-t20x20.jpg",
  play_count: 4706, // toLocaleString
  comment_count: 4
};

const datatest = [1,2,3]

const vctest = datatest.map(param => (<div><VisualizerComp key={param} play={param} {...mockData}></VisualizerComp></div> ));


const Stream = () => {
  const a = 0;

  return (
    <>
      <StreamContainer>
        <StreamLeft>
          왼쪽
          <p className="top-msg">Hear the latest posts from the people you’re following:</p>
          {vctest}
        </StreamLeft>
        <StreamRight>오른쪽</StreamRight>
      </StreamContainer>
    </>
  );
}

export default Stream;

const StreamLeft = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #f2f2f2;
  padding-right: 30px;

  .top-msg {
    color: #999;
    font-size: 18px;
    font-weight: 100;
  }
`;

const StreamRight = styled.div`


`;

const StreamContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  width: 1240px;
  margin: 0 auto;
  padding: 0 30px 0 30px;
`

const StreamBg = styled.div`
  background-color: #f2f2f2;
`;