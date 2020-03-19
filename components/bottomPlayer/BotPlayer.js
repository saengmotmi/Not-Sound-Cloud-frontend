import { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";


const BottomPlayer = (props) => {

  const {
    navUp,
    isPlaying,
    isPause,
    musicPause,
    getMusicApi,
    musicStop,
    buffer,
    musicNum,
    currentMusicNum,
    currentTime,
    duration
  } = props;

  return (
    <BotPlayer className={navUp}>
      <PlayButtonWrapper isPause={isPause} isPlaying={isPlaying}>
        <button className="btn-playprev" type="button" />
        <button
          className="btn-play"
          onClick={() => getMusicApi(0)}
          type="button"
        />
        <button className="btn-pause" onClick={musicPause} type="button" />
        <button className="btn-resume" onClick={musicPause} type="button" />
        <button className="btn-playnext" type="button" />
        <button className="btn-shuffle" type="button" />
        <button className="btn-repeat" type="button" />
        {/* <button onClick={musicStop} type="button" /> */}
      </PlayButtonWrapper>
      <ProgressContainer>
        <div>현재 위치 : {currentTime ? duration - currentTime : "0:00"}</div>
        <ProgressWrapper>
          <ProgressDiv></ProgressDiv>
          <ProgressDiv offsetX=""></ProgressDiv>
        </ProgressWrapper>
        <SongInfo>
          <div>전체 길이 : {duration ? duration : "0:00"}</div>
        </SongInfo>
      </ProgressContainer>
      <button className="btn-volume" type="button" />
      <div>
        <div>이미지</div>
        <div>
          <div>아티스트</div>
          <div>
            재생 중인 음악 : {currentMusicNum ? currentMusicNum : "없음"}
          </div>
        </div>
      </div>
      <div>
        <button type="button">하트</button>
        <button type="button">플레이리스트</button>
      </div>
    </BotPlayer>
  );

}

export default BottomPlayer;


const BotPlayer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: center;

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

  .btn-volume {
    border: none;
    outline: none;
    width: 24px;
    height: 48px;
    margin-left: 12px;
    background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTQgOWg0LjAwMkwxMiA1djE0Yy0yLjQ0Ni0yLjY2Ny0zLjc3OC00LTMuOTk4LTRINFY5em0xMCA0YTEgMSAwIDAgMCAwLTJWOWEzIDMgMCAwIDEgMCA2di0yem0wIDRhNSA1IDAgMCAwIDAtMTBWNWE3IDcgMCAwIDEgMCAxNHYtMnoiLz48L3N2Zz4K") no-repeat 55%;
  }
`;


const PlayButtonWrapper = styled.div`
  button {
    border: none;
    outline: none;
    width: 24px;
    height: 48px;
    margin-left: 12px;
    background: ${props =>
        (props.isPlaying === false && props.isPause === false) ||
        (props.isPlaying === true && props.isPause === true)
          ? css`url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTggNXYxNGwxMS03eiIvPjwvc3ZnPgo=")`
          : css`url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTYgMTloNFY1SDZ2MTR6bTgtMTR2MTRoNFY1aC00eiIvPjwvc3ZnPgo=")`}
      no-repeat 55%;

    &.btn-play {
      display: ${props => {
        if (props.isPlaying === false) {
          return "inline-block";
        } else if (props.isPlaying === true) {
          return "none";
        }
      }};
    }

    &.btn-pause {
      display: ${props => {
        if (props.isPlaying === true && props.isPause === false) {
          return "inline-block";
        } else {
          return "none";
        }
      }};
    }

    &.btn-resume {
      display: ${props => {
        if (props.isPlaying === true && props.isPause === true) {
          return "inline-block";
        } else {
          return "none";
        }
      }};
    }
    &.btn-playprev {
      background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTcgNmgydjEySDdWNnptMiA2bDggNlY2bC04IDZ6Ii8+PC9zdmc+Cg==")
        no-repeat 55%;
    }
    &.btn-playnext {
      background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTcgMThsOC02LTgtNnYxMnptOC0xMnYxMmgyVjZoLTJ6Ii8+PC9zdmc+Cg==")
        no-repeat 55%;
    }
    &.btn-shuffle {
      background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTEzLjU4NiAxN2wtOC04SDNWN2gzLjQxNGw4IDhIMTd2MmgtMy40MTR6TTMgMTVoMi41ODZsMi4yMDctMi4yMDcgMS40MTQgMS40MTQtMi41MDEgMi41MDEtLjI5My4yOTJIM3YtMnptMTQtNmgtMi41ODZsLTIuMjA3IDIuMjA3LTEuNDE0LTEuNDE0TDEzLjU4NiA3SDE3djJ6bTQgN2wtNCAzdi02bDQgM3ptMC04bC00IDNWNWw0IDN6Ii8+PC9zdmc+Cg==")
        no-repeat 55%;
    }
    &.btn-repeat {
      background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTEyIDhIOWE0IDQgMCAxIDAgMCA4aDZhNCA0IDAgMCAwIDIuMTA0LTcuNDAzbDEuNzctMS4xOC4wMi4wMThBNiA2IDAgMCAxIDE1IDE4SDlBNiA2IDAgMSAxIDkgNmgzVjRsNCAzLTQgM1Y4eiIvPjwvc3ZnPgo=")
        no-repeat 55%;
    }
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

`

const ProgressContainer = styled.div`
  position: relative;
  display: flex;
  width: 592px;
  height: 48px;
`;

const SongInfo = styled.div`
  font-size: 8px;
`