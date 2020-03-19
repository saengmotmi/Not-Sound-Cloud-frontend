import { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import VisualizerComp from "../components/VisualizerComp";
import BottomPlayer from "../components/bottomPlayer/BotPlayer";

const MusicStreaming = () => {
  const [music, setMusic] = useState(null); //음원 자체, true가 되면 음원이 준비 됨
  const [buffer, setBuffer] = useState(""); // duration을 얻기 위함
  const [duration, setDuration] = useState(0); // 특정 시점의 전체 길이
  const [currentTime, setCurrentTime] = useState(0); // 전체 길이 - 지금 전체 길이
  const [context, setContext] = useState(null); // 일시정지에 사용
  const [isPlaying, setIsPlaying] = useState(false); // 재생 중 여부
  const [isPause, setIsPause] = useState(false); // 일시 정지 여부
  const [musicNum, setMusicNum] = useState(1); // 입력된 song_id
  const [currentMusicNum, setCurrentMusicNum] = useState("1"); // 재생, 파형 클릭 시점의 song_id
  const [navUp, setNavUp] = useState(""); // 하단 바 애니메이션

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
  }, [buffer]);

  // 스트리밍 버튼
  const getMusicApi = async startSec => {
    // load audio file from server
    if (isPlaying) {
      await musicStop(); // 만약 재생 중이면 일단 정지
      console.log("stop");
    }
    console.log(startSec + "를 요청합니다");
    await fetch(`http://10.58.3.91:8000/song/playview/${musicNum}/${startSec}`)
      .then(res => res.arrayBuffer())
      .then(res => musicPlay(res));
  };

  const getAudioContext = () => {
    AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContent = new AudioContext();
    return audioContent;
  };

  // const startedAt = Date.now();
  // const duration = source.buffer.duration;

  // setInterval(() => {
  //   const playbackTime = (Date.now() - startedAt) / 1000;
  //   const rate = (playbackTime * 100) / duration;
  //   console.log(rate, playbackTime, duration);
  // }, 1000);

  // play 버튼
  const musicPlay = async res => {
    console.log(res);
    // create audio context
    const audioContext = getAudioContext();
    // create audioBuffer (decode audio file)
    const audioBuffer = await audioContext.decodeAudioData(res);
    // create audio source
    const source = audioContext.createBufferSource();

    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    setMusic(source);
    setBuffer(audioBuffer);
    setContext(audioContext);
    setCurrentMusicNum(musicNum);
    console.log("ready to play");

    source.start();
    setIsPlaying(true);
    console.log("start");
  };

  // stop 버튼
  const musicStop = async () => {
    music.stop();
    setIsPlaying(false);
  };

  // pause 버튼
  const musicPause = async () => {
    if (isPlaying && isPause) {
      // true true
      console.log(isPlaying, isPause);
      context.resume();
    } else if (isPlaying && !isPause) {
      // true false
      console.log(isPlaying, isPause);
      context.suspend();
    }

    // setIsPlaying(!isPlaying);
    setIsPause(!isPause);
    console.log("pause");
  };

  // visualizer에 props로 주는 함수
  const showOffsetX = offsetX => {
    console.log(offsetX);

    if (isPlaying) {
      getMusicApi(Math.round((offsetX / 640) * duration)); // 퍼센트 x 전체 길이
      console.log(Math.round((offsetX / 640) * duration) + "초 재생 요청");
    } else {
      getMusicApi(0);
    }
  };

  return (
    <>
      <VisualizerComp
        isPlaying={isPlaying}
        isPause={isPause}
        getMusicApi={getMusicApi}
        showOffsetX={showOffsetX}
        buffer={buffer}
        interval={duration ? 640 / duration : 1}
        currentMusicNum={currentMusicNum}
      ></VisualizerComp>

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
};

export default MusicStreaming;


