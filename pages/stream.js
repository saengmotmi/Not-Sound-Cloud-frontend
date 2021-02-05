import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import VisualizerCompStream from '../components/Visualizer/VisualizerCompStream';
import theme from "../global/theme";
import { song, minIP } from "../global/env";
import { getMusic, getMusicMeta, mapStateToProps, setFunc } from "../global/func";

const datatest = [31, 25, 24, 23, 22, 21]

const Stream = ({ metaList, song, ...setFunc }) => {
  
  useEffect(() => {
    // setNavUp("botPlayer up"); // 하단바 올라오는 거
    setFunc.setMusicMetaList({song: song});
  }, []);

  const visualCompMap = datatest.map((param,idx) => (
    <div key={param}>
      <VisualizerCompStream
        metaData={metaList.song && metaList.song[idx]}
        arrIdx={idx}
      ></VisualizerCompStream>
    </div>
  ));

  return (
    <>
      <StreamContainer>
        <StreamLeft>
          <p className="top-msg">
            Hear the latest posts from the people you’re following:
          </p>
          {visualCompMap}
        </StreamLeft>
        <StreamRight />
      </StreamContainer>
    </>
  );
};

export default connect(mapStateToProps, {...setFunc})(Stream);

const StreamLeft = styled.div`
  p {
    font-family: ${theme.font};
    margin-bottom: 20px;
  }

  display: flex;
  flex-direction: column;
  border-right: 1px solid #f2f2f2;
  /* padding-right: 30px; */
  /* margin: 46px 0 48px 0; */

  .top-msg {
    color: #999;
    font-size: 18px;
    font-weight: 100;
  }
`;

const StreamRight = styled.div`
  margin-top: 50px;

`;

const StreamContainer = styled.div`
  background-color: white;
  /* width: 1240px; */
  margin: 0 auto;
  /* padding: 0 30px 0 30px; */
  display: flex;
  flex-direction: row;

  /* margin-top: 30px; */
`;

const StreamBg = styled.div`
  background-color: #f2f2f2;
`;