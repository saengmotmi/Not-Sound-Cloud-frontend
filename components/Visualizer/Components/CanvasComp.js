import React, { useState, useRef, useEffect } from "react";
import styled from 'styled-components'
import { getMusic, getMusicMeta, refreshMusic, playMusic, stopMusic } from "../../../global/func";
import { setNowSec } from "../../../redux/stream/actions";

const CanvasComp = ({
  canvasRefTop,
  canvasRefOver1,
  canvasRefOver2,
  canvasRefBot,
  music,
  setFunc,
  state,
  metaData,
  commentArr,
}) => {
  const [mousePos, setMousePos] = useState(0);
  const [offsetX, setOffsetX] = useState(0);

  // ????
  useEffect(() => {
    let wavePlay;
    if (metaData && music.src && state.nowSongID === metaData.song_id) {
      if (state.isPlaying && state.isPause === false) {
        let duration = music.src.buffer.duration;
        let interval = 640 / duration;

        wavePlay = setInterval(() => {
          console.log("go interval");
          setOffsetX(offsetX + interval);
          setFunc.setNowSec(
            parseInt(music.src.buffer.duration * (offsetX / 640) + 1)
          );

          if (offsetX >= 640) {
            console.log("stop interval");
            stopMusic(music, setFunc);
            setMousePos(0);
            setOffsetX(0);
            setFunc.setNowSec(0)
            clearInterval(wavePlay);
          }
        }, 1000);
      } else if (state.isPlaying && state.isPause === true) {
        console.log("pause interval");
        clearInterval(wavePlay);
      }
      return () => {
        clearInterval(wavePlay);
      };
    }
  }, [
    offsetX,
    state.nowSongID,
    state.isPlaying,
    state.isPause,
    metaData,
    music.src,
  ]);

  const onCanvasMove = (e) => {
    setMousePos(e.nativeEvent.offsetX);
  };

  const onCanvasClick = (e, pos) => {
    const offsetClick = e.nativeEvent.offsetX;

    if (offsetClick < 640) {
      if (pos === "top" && offsetClick < 640) {
        const secCalc =
          music.src &&
          parseInt(music.src.buffer.duration * (offsetClick / 640));
        console.log("song_id", metaData.song_id);
        console.log("sec", secCalc);
        setOffsetX(offsetClick);

        refreshMusic(music, setFunc, state);
      } else if (pos === "bot") {
        console.log("bot"); // 댓글을 어떻게든 해야지
      }
    }
  };

  return (
    <CanvasContainer>
      <Canvas
        posId="wave-top"
        onMouseMove={onCanvasMove}
        onClick={(event) => onCanvasClick(event, "top")}
        width="640"
        height="80"
        ref={canvasRefTop}
      />
      <Canvas
        posId="wave-bot"
        onMouseMove={onCanvasMove}
        onClick={(event) => onCanvasClick(event, "bot")}
        width="640"
        height="60"
        ref={canvasRefBot}
      />
      <OverDivWrapper playPos={offsetX} mouseOn="y" widthProps={`${mousePos}`}>
        <OverDiv ref={canvasRefOver2} width="640" height="50" />
      </OverDivWrapper>
      <OverDivWrapper mouseOn="n" widthProps={`${mousePos}`}>
        <OverDiv ref={canvasRefOver1} width="640" height="50" />
      </OverDivWrapper>
      {commentArr}
    </CanvasContainer>
  );
};

export default CanvasComp;

const CanvasContainer = styled.div`
  position: relative;
  height: 100px;
`;

const Canvas = styled.canvas`
  position: absolute;
  overflow: hidden;
  top: ${(props) => (props.posId === "wave-top" ? 0 : 50)}px;
  z-index: 10;

  opacity: 0.7;
`;

const OverDiv = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 640px;
  height: 50px;
`;

const OverDivWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => {
    if (props.mouseOn === "y") {
      return props.playPos;
    }
    if (props.mouseOn === "n") {
      return props.widthProps;
    }
  }}px;
  height: 80px;
  overflow: hidden;
  opacity: 0.8;
  /* background-color: transparent; */
  z-index: ${(props) => (props.mouseOn === "y" ? 5 : 6)};
`;