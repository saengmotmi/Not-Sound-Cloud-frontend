import { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import theme from "../../global/theme";


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
    duration,
    setVolume,
    currentNowTime
  } = props;

  const [isMouseIn, setIsMouseIn] = useState(false);
  const [isMouseInClass, setIsMouseInClass] = useState(null);
  const [volumeOffset, setVolumeOffset] = useState(10);

  const toggleVolume = () => {
    setIsMouseIn(!isMouseIn);
    isMouseIn
      ? setIsMouseInClass(null)
      : setIsMouseInClass("volume-show");
    
    console.log(isMouseIn, isMouseInClass);
  }

  const checkVolumeOffsetY = (e) => {
    const offsetY = e.nativeEvent.offsetY;
    console.log(offsetY);

    if (offsetY < 100 && offsetY > 10) {
      setVolumeOffset(e.nativeEvent.offsetY);

      // 10~110
      setVolume(e.nativeEvent.offsetY);
    }
  }

  const convertTime = (time) => {
    let timeMinute = Math.ceil(time / 60);
    let timeSecond = (time % 60).toFixed(0);

    if (timeSecond < 10) {
      timeSecond = "0" + timeSecond;
    }

    return `${timeMinute}:${timeSecond}`
  }

  return (
    <BotPlayer className={navUp}>
      <PlayButtonWrapper isPause={isPause} isPlaying={isPlaying}>
        <button
          onClick={() => {
            musicStop();
            getMusicApi(currentMusicNum - 1, 0);
          }}
          className="btn-playprev"
          type="button"
        />
        <button
          className="btn-play"
          onClick={() => {
            musicStop();
            getMusicApi(currentMusicNum, 0);
          }}
          type="button"
        />
        <button className="btn-pause" onClick={musicPause} type="button" />
        <button className="btn-resume" onClick={musicPause} type="button" />
        <button
          onClick={() => getMusicApi(currentMusicNum + 1, 0)}
          className="btn-playnext"
          type="button"
        />
        <button className="btn-shuffle" type="button" />
        <button className="btn-repeat" type="button" />
        {/* <button onClick={musicStop} type="button" /> */}
      </PlayButtonWrapper>
      <ProgressContainer>
        <div className="time-count">
          <span>
            {duration
              ? convertTime(duration - currentTime + currentNowTime)
              : "0:00"}
            {console.log(duration, currentTime, currentNowTime)}
          </span>
        </div>
        <ProgressWrapper>
          <ProgressDiv></ProgressDiv>
          <ProgressDiv
            offsetX={duration ? (duration - currentTime + currentNowTime)/ duration * 472 : 0}
          ></ProgressDiv>
        </ProgressWrapper>
        <div className="time-count">
          <span>{duration ? convertTime(duration) : "0:00"}</span>
        </div>
      </ProgressContainer>
      <VolumeDiv onMouseEnter={toggleVolume} onMouseLeave={toggleVolume}>
        <button className="btn-volume" type="button" />
        <VolumePopup isMouseIn={isMouseIn}>
          <VolumeOverflow
            volumeOffset={volumeOffset}
            onClick={event => checkVolumeOffsetY(event)}
            className={isMouseInClass}
          >
            <div></div>
            <div></div>
            <div></div>
          </VolumeOverflow>
        </VolumePopup>
      </VolumeDiv>
      <SongInfo>
        <img src="" alt="" />
        <div>
          <div>
            <span id="artist">아티스트</span>
          </div>
          <div>
            <span>{currentMusicNum ? "곡 제목" : "없음"}</span>
          </div>
        </div>
      </SongInfo>
      <RightDiv>
        <button type="button" />
        <button type="button" />
      </RightDiv>
    </BotPlayer>
  );

}

export default BottomPlayer;


const BotPlayer = styled.div`
  margin: 0 auto;
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: center;

  bottom: -48px;
  background-color: yellow;
  width: 100%;
  height: 48px;
  transition: bottom 1s;
  background-color: #f2f2f2;
  z-index: 100;

  border-top: 1px solid #cecece;

  &.up {
    bottom: 0;
  }

  .btn-volume {
    border: none;
    outline: none;
    width: 24px;
    height: 48px;
    margin-left: 12px;
    background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZmlsbD0iIzMzMyIgZD0iTTQgOWg0LjAwMkwxMiA1djE0Yy0yLjQ0Ni0yLjY2Ny0zLjc3OC00LTMuOTk4LTRINFY5em0xMCA0YTEgMSAwIDAgMCAwLTJWOWEzIDMgMCAwIDEgMCA2di0yem0wIDRhNSA1IDAgMCAwIDAtMTBWNWE3IDcgMCAwIDEgMCAxNHYtMnoiLz48L3N2Zz4K")
      no-repeat 55%;
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
  height: 2px;
  background-color: #ccc;
  /* padding: 10px 0; */
  position: absolute;
  top: 23px;

  ${props => {console.log("오프셋", props.offsetX)}}
  ${props => {
    return props.offsetX
      ? css`
          width: ${props.offsetX + "px"};
          background-color: #f50;
          z-index: 1000;
        `
      : css`width: 472px;`
  }}
`;

const ProgressWrapper = styled.div`
  position: relative;
  width: 472px;
  height: 48px;

  display: flex;
  align-items: center;

  /* height: 13px;
  margin: 13px 10px 0 10px; */
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  width: 592px;
  height: 48px;

  .time-count {
    font-size: 11px;
    margin: 0 10px;

    &:nth-child(1) {
      color: ${theme.orange};
      margin-left: 40px;
    }
  }

  
`;

const RightDiv = styled.div`
  button {
    border: none;
    outline: none;

    width: 24px;
    height: 48px;

    &:nth-child(1) {
      background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+DQogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjAuMyAoNzg5MSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+DQogICAgPHRpdGxlPnN0YXRzX2xpa2VzX2dyZXk8L3RpdGxlPg0KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPg0KICAgIDxkZWZzLz4NCiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBza2V0Y2g6dHlwZT0iTVNQYWdlIj4NCiAgICAgICAgPHBhdGggZD0iTTEwLjgwNDk4MTgsMyBDOC43ODQ3MTU3OSwzIDguMDAwNjUyODUsNS4zNDQ4NjQ4NiA4LjAwMDY1Mjg1LDUuMzQ0ODY0ODYgQzguMDAwNjUyODUsNS4zNDQ4NjQ4NiA3LjIxMjk2Mzg3LDMgNS4xOTYwNDQ5NCwzIEMzLjQ5NDMxMzE4LDMgMS43NDgzNzQsNC4wOTU5MjY5NCAyLjAzMDA4OTk2LDYuNTE0MzA1MzIgQzIuMzczNzI3NjUsOS40NjY3Mzc3NSA3Ljc1NDkxOTE3LDEyLjk5Mjg3MzggNy45OTMxMDk1OCwxMy4wMDEwNTU3IEM4LjIzMTI5OTk4LDEzLjAwOTIzNzggMTMuNzMwOTgyOCw5LjI3ODUzNzggMTMuOTgxNDU5LDYuNTAxMjQwNSBDMTQuMTg3ODY0Nyw0LjIwMDk3MDIzIDEyLjUwNjcxMzYsMyAxMC44MDQ5ODE4LDMgWiIgaWQ9IkltcG9ydGVkLUxheWVycyIgZmlsbD0icmdiKDI1NSwgODUsIDApIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIi8+DQogICAgPC9nPg0KPC9zdmc+DQo=")
        no-repeat 55%;
    }
    &:nth-child(2) {
      background: url("https://www.pngfind.com/pngs/m/294-2942312_soundcloud-icon-source-playlist-white-icon-transparent-hd.png")
        no-repeat 55%;
      background-size: 15px 15px;
    }
  }
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 296px;

  font-size: 11px;
  line-height: 17px;

  img {
    width: 30px;
    height: 30px;

    border: 1px solid black;

    margin: 0 10px 0 20px;
  }

  span {
    text-align: left;

    &#artist {
      color: #999;
    }
  }

  div {
    display: flex;
    flex-direction: column;
  }
`;

const VolumeDiv = styled.div`
  position: relative;
`


const VolumePopup = styled.div`
  width: 30px;
  height: 150px;

  position: absolute;

  bottom: 0px;
  left: 10px;

  display: ${props => props.isMouseIn ? "inline-block" : "none"}
`


const VolumeOverflow = styled.div`
  overflow: hidden;

  background-color: #eee;

  /* border: 1px solid black; */
  border-style: solid;
  border-width: 1px;
  border-color: transparent transparent #ccc #ccc;
  box-shadow: -1px 1px 2px rgba(0, 0, 0, 0.1);

  width: 30px;
  height: 118px;
  position: absolute;

  bottom: 30px;

  div {
    /* transition:  */

    :nth-child(1) {
      top: ${props => props.volumeOffset}px;
      left: 10px;
      width: 8px;
      height: 8px;
      border: none;
      border-radius: 50%;
      background-color: #f50;
      position: absolute;
      z-index: 1;
    }
    :nth-child(2) {
      top: ${props => props.volumeOffset}px;
      left: 13px;
      width: 2px;
      height: ${props => 100 - props.volumeOffset}px;
      border: none;
      background-color: #f50;
      position: absolute;
      z-index: 1;
    }
    :nth-child(3) {
      top: 10px;
      left: 13px;
      width: 2px;
      height: 90px;
      border: none;
      background-color: gray;
      position: absolute;
    }
  }
`;