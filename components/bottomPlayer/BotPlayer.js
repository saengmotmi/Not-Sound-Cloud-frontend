import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";

const BottomPlayer = (props) => {

  const {navUp, isPlaying, musicPlay, musicPause} = props

  return (
      <BotPlayer className={navUp}>
        <PlayButtonWrapper isPlaying={isPlaying}>
          <button onClick={musicPlay} type="button" />
          {/* <button onClick={musicStop} type="button">
            stop
          </button> */}
          <button onClick={musicPause} type="button">
            {/* {isPlaying ? "suspend" : "resume"} */}
          </button>
        </PlayButtonWrapper>
        <ProgressWrapper>
          <ProgressDiv></ProgressDiv>
          <ProgressDiv offsetX=""></ProgressDiv>
        </ProgressWrapper>
      </BotPlayer>
  );
}


export default BottomPlayer;


const PlayButtonWrapper = styled.div`
  button {
    width: 24px;
    height: 48px;
    margin-left: 12px;
    background: ${props =>
        props.isPlaying
          ? css`url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTYgMTloNFY1SDZ2MTR6bTgtMTR2MTRoNFY1aC00eiIvPjwvc3ZnPgo=")`
          : css`url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTggNXYxNGwxMS03eiIvPjwvc3ZnPgo=")`}
      no-repeat 55%;
  }
`;

const BotPlayer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;

  bottom: -48px;
  z-index: 1000;
  background-color: yellow;
  width: 100%;
  height: 48px;
  transition: bottom 1s;

  background-color: #f2f2f2;

  &.up {
    bottom: 0;
  }
`;

const ProgressDiv = styled.div`
  width: 472px;
  height: 1px;
  background-color: #ccc;
  margin: 13px 20px 0 0;
  /* padding: 10px 0; */
  position: absolute;

  ${props => {
    props.offsetX &&
      css`
        width: ${props.offsetX};
      `;
  }}
`;

const ProgressWrapper = styled.div`
  position: relative;
`;