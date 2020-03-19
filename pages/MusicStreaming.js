import { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import Visualizer from "../pages/Visualizer";
import VisualizerComp from "../components/VisualizerComp";
import BottomPlayer from "../components/bottomPlayer/BotPlayer";

const MusicStreaming = () => {
  const [readyMusic, setReadyMusic] = useState(null);
  const [music, setMusic] = useState(null);
  const [buffer, setBuffer] = useState("");
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [context, setContext] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [musicNum, setMusicNum] = useState(1);
  const [currentMusicNum, setCurrentMusicNum] = useState("1");
  const [navUp, setNavUp] = useState("");
  const [childOffsetX, setChildOffsetX] = useState(1);

  useEffect(() => {
    setNavUp("botPlayer up"); // 하단바 올라오는 거
  }, []);

  useEffect(() => {
    //buffer updated
    if (musicNum === currentMusicNum) {
      setCurrentTime(buffer.duration); //same musicNum
    } else if (musicNum !== currentMusicNum) {
      setDuration(buffer.duration); //diff musicNum
    }
  }, [buffer])

  // 스트리밍 버튼
  const getMusicApi = async (startSec) => {
    // load audio file from server
    if (isPlaying) {
      await musicStop(); // 만약 재생 중이면 일단 정지
      console.log("stop");
    }
    console.log(startSec + "를 요청합니다");
    await fetch(`http://10.58.3.91:8000/song/playview/${musicNum}/${startSec}`)
      .then(res => res.arrayBuffer())
      .then(res => musicPlay(res));
  }

  const getAudioContext = () => {
    AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContent = new AudioContext();
    return audioContent;
  };

    // setTimeout(() => {
    //   source.stop();
    //   console.log("stop");
    // }, 17000);

    // const startedAt = Date.now();
    // const duration = source.buffer.duration;

    // setInterval(() => {
    //   const playbackTime = (Date.now() - startedAt) / 1000;
    //   const rate = (playbackTime * 100) / duration;
    //   console.log(rate, playbackTime, duration);
    // }, 1000);
    
  // play 버튼
  const musicPlay = async (res) => {
    console.log(res);
        // create audio context
    const audioContext = getAudioContext();
    // create audioBuffer (decode audio file)
    const audioBuffer = await audioContext.decodeAudioData(res);
    // create audio source
    const source = audioContext.createBufferSource();

    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    setReadyMusic(audioContext.destination);
    setMusic(source);
    setBuffer(audioBuffer);
    setContext(audioContext);
    setCurrentMusicNum(musicNum);
    console.log("ready to play");

    source.start();
    setIsPlaying(true);
    console.log("start");
  }

  // stop 버튼
  const musicStop = async () => {
    music.stop();
    setIsPlaying(false);
  };

  // pause 버튼
  const musicPause = async () => {
    if (isPlaying === true && isPause === true) {
      console.log(isPlaying, isPause);
      context.resume();
    } else if (isPlaying === true && isPause === false) {
      console.log(isPlaying, isPause);
      context.suspend();
    }
    
    // setIsPlaying(!isPlaying);
    setIsPause(!isPause);
    console.log("pause");
    
  }

  // visualizer에 props로 주는 함수
  const showOffsetX = offsetX => {
    setChildOffsetX(offsetX);
    console.log(offsetX);

    if (isPlaying) {
      getMusicApi(Math.round((offsetX / 640) * duration)); // 퍼센트 x 전체 길이
      console.log(Math.round((offsetX / 640) * duration) + "초 재생 요청");
    } else {
      getMusicApi(0);
    }
  }

  return (
    <>
      <VisualizerComp
        isPlaying={isPlaying}
        getMusicApi={getMusicApi}
        showOffsetX={showOffsetX}
        buffer={buffer}
        interval={duration ? 640 / duration : 1}
      ></VisualizerComp>
      {/* <button onClick={() => getMusicApi(childOffsetX)} type="button">
        초기화
      </button> */}
      {/* <div>duration {buffer && buffer.duration}</div> */}
      {/* <div>
        childOffsetX{" "}
        {childOffsetX &&
          childOffsetX +
            " " +
            (childOffsetX / 640) * 100 + "%" +
            " " +
            parseInt((childOffsetX / 640) * buffer.duration)}{" "}
      </div> */}
      <input type="text" onChange={event => setMusicNum(event.target.value)} />

      <BottomPlayer
        navUp={navUp}
        isPlaying={isPlaying}
        isPause={isPause}
        musicPause={musicPause}
        getMusicApi={getMusicApi}
        musicStop={musicStop}
        buffer={buffer}
        musicNum={musicNum}
        currentMusicNum={currentMusicNum}
        currentTime={currentTime}
        duration={duration}
        interval={duration ? 640 / duration : 1}
      ></BottomPlayer>
    </>
  );
}

export default MusicStreaming;


