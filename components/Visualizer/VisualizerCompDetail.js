import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link'
import styled, { css } from 'styled-components';
import theme from '../../global/theme';
import { drawWave, mapStateToProps, setFunc, getMusic, refreshMusic, stopMusic, playMusic } from "../../global/func";
import { chulIP, minIP, token, songInit } from "../../global/env";
import VisualComment from './VisualizerComment';
import CanvasComp from "./Components/CanvasCompDetail";
import { connect } from 'react-redux';

const VisualizerCompDetail = ({ music, metaData, arrIdx, state, comdata, ...setFunc }) => {

  const canvasRefTop = useRef(null),
    canvasRefOver1 = useRef(null),
    canvasRefOver2 = useRef(null),
    canvasRefBot = useRef(null);

  // stream 리스트가 바뀔 때 웨이브 렌더
  useEffect(() => {
    let data;
    const ref = {
      refTop: canvasRefTop.current,
      refOver1: canvasRefOver1.current,
      refOver2: canvasRefOver2.current,
      refBot: canvasRefBot.current
    }
    !!metaData ? (data = metaData.wave_data) : (data = [0.1, 0.1, 0.1]);

    metaData && drawWave(data, ref, "big");
    
  }, [metaData]);

  // 댓글 그리기
  const commentArr = comdata.map((param, idx) => <VisualComment key={idx} user_id={param.user_id} content={param.content} position={param.position} src="" big="big" />);

  return (
    <CanvasComp
      canvasRefTop={canvasRefTop}
      canvasRefOver1={canvasRefOver1}
      canvasRefOver2={canvasRefOver2}
      canvasRefBot={canvasRefBot}
      music={music}
      setFunc={setFunc}
      state={state}
      metaData={metaData}
      commentArr={commentArr.length !== 0 && commentArr}
    />
  );
};

export default connect(mapStateToProps, {...setFunc})(VisualizerCompDetail);