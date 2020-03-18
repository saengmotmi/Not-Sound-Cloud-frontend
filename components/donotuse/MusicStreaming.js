import { useState, useEffect, useRef } from "react";
import {getMusicApi, getMusicInfoApi} from "../../global/func";
import BottomPlayer from "../bottomPlayer/BotPlayer";
import VisualizerComp from "../components/VisualizerComp";

const MusicStreaming = () => {
  const [musicData, setMusicData] = useState(null);
  const [music, setMusic] = useState(null); //음원 자체, true가 되면 음원이 준비 됨 => 리덕스
  const [buffer, setBuffer] = useState(""); // duration을 얻기 위함 (buffer.duration) => 리덕스
  const [duration, setDuration] = useState(0); // 특정 시점의 전체 길이 => 리덕스
  const [currentTime, setCurrentTime] = useState(0); // 전체 길이 - 지금 전체 길이 => 흠?
  const [context, setContext] = useState(null); // 일시정지에 사용
  const [isPlaying, setIsPlaying] = useState(false); // 재생 중 여부 => 리덕스
  const [isPause, setIsPause] = useState(false); // 일시 정지 여부 => 리덕스
  const [musicNum, setMusicNum] = useState(1); // 입력된 song_id
  const [currentMusicNum, setCurrentMusicNum] = useState("1"); // 재생, 파형 클릭 시점의 song_id
  const [navUp, setNavUp] = useState(""); // 하단 바 애니메이션

  useEffect(() => {
    setNavUp("botPlayer up"); // 하단바 올라오는 거
    // getMusicInfoApi();
  }, []);

  useEffect(() => {
    //buffer updated
    if (musicNum === currentMusicNum) {
      setCurrentTime(buffer.duration); //same musicNum
    } else if (musicNum !== currentMusicNum) {
      setDuration(buffer.duration); //diff musicNum
    }
  }, [buffer]);

  // play 버튼
  const musicPlay = async res => {
    // create audio context
    const getAudioContext = () => {
      AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContent = new AudioContext();
      return audioContent;
    }

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
    setCurrentMusicNum(musicNum); // 현재 재생 중인 song_id
    console.log("ready to play");

    source.start();
    setIsPlaying(true); // 플레이 시작
    console.log("start");
  };

  // stop 버튼
  const musicStop = () => {
    music.stop();
    setIsPlaying(false);
  };

  // pause 버튼
  const musicPause = () => {
    if (isPlaying && isPause) { // 곡이 재생 중이면서 일시정지 중이면 (true true)
      context.resume(); // 재생을 재개
    } else if (isPlaying && !isPause) { // 곡이 재생 중이면서 일시정지 중이 아니면 (true false)
      context.suspend(); // 재생을 일시정지
    }

    setIsPause(!isPause); // 상태 토글
  };

  // visualizer에 props로 주는 함수
  const showOffsetX = offsetX => {
    if (isPlaying) {
      getMusicApi(Math.round((offsetX / 640) * duration), musicNum, isPlaying); // 퍼센트 x 전체 길이
      console.log(Math.round((offsetX / 640) * duration) + "초 재생 요청");
    } else {
      getMusicApi(0, musicNum, isPlaying);
    }
  };

  return (
    <>
      <VisualizerComp
        musicData={musicData}
        isPlaying={isPlaying}
        isPause={isPause}
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