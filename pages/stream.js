import React, { useState, useRef, useEffect } from "react";
import styled, {
  createGlobalStyle,
  ThemeProvider,
} from "styled-components";
import VisualizerCompStream from '../components/Visualizer/VisualizerCompStream';
import Layout from "../components/layout/Layout";
import theme from "../global/theme";
import BottomPlayer from "../components/bottomPlayer/BotPlayer";
import store from "../redux/store";
import { Provider, connect } from "react-redux";
import reset from "styled-reset";

// const song = {
//   repost_id: "바다코끼리",
//   repost_img_src:
//     "https://i1.sndcdn.com/avatars-LFRcPhK9aBrPrGQV-O60JGw-t50x50.jpg",
//   repost_time: 4, //reposted a track 4 hours ago
//   post_id: "Ziiin",
//   song_name: "DancingOnthetree(feat.김비노)(프라이머리-baby Remake)",
//   small_img_url:
//     "https://i1.sndcdn.com/artworks-bPFTZjehyPP0iCdP-FzXVUQ-t200x200.jpg",
//   tag: "# Hip-hop & Rap",
//   my_img_src: "https://i1.sndcdn.com/avatars-000031467940-4w3p6q-t20x20.jpg",
//   play_count: 4706, // toLocaleString
//   comment_count: 4,
//   song_path: "2.mp3"
// };

const datatest = [26, 25, 24, 23, 22, 21]

const Stream = () => {
  const [musicData, setMusicData] = useState(null);
  const [music, setMusic] = useState(null); //음원 자체, true가 되면 음원이 준비 됨
  const [musicVolume, setMusicVolume] = useState(null); //음원 자체, true가 되면 음원이 준비 됨

  const [buffer, setBuffer] = useState(""); // duration을 얻기 위함
  const [duration, setDuration] = useState(0); // 특정 시점의 전체 길이
  const [currentTime, setCurrentTime] = useState(0); // 전체 길이 - 지금 전체 길이
  const [currentNowTime, setCurrentNowTime] = useState(0); // 전체 길이 - 지금 전체 길이

  const [context, setContext] = useState(null); // 일시정지에 사용
  const [isPlaying, setIsPlaying] = useState(false); // 재생 중 여부
  const [isPause, setIsPause] = useState(false); // 일시 정지 여부
  const [musicNum, setMusicNum] = useState(1); // 입력된 song_id, 이제 사용하면 안됨
  const [currentMusicNum, setCurrentMusicNum] = useState("1"); // 재생, 파형 클릭 시점의 song_id
  const [navUp, setNavUp] = useState(""); // 하단 바 애니메이션

  useEffect(() => {
    setNavUp("botPlayer up"); // 하단바 올라오는 거
    // getMusicApi(1, 0);
  }, []);

  // useEffect(() => {
  //   console.log(currentNowTime)
  //   const addCountNow = setInterval(() => {
  //     setCurrentNowTime(duration - currentTime+1);
  //   }, 1000);
  //   return () => {setCurrentNowTime(0); clearInterval(addCountNow)}
  // },[buffer, currentNowTime, duration, currentTime])

  useEffect(() => {
    //buffer updated
    console.log("music, curruent", musicNum, currentMusicNum)
    if (musicNum === currentMusicNum) {
      setCurrentTime(buffer.duration); //same musicNum
    } else if (musicNum !== currentMusicNum) {
      setDuration(buffer.duration); //diff musicNum
    }
  }, [buffer]);

  // 스트리밍 버튼
  const getMusicApi = async (id, startSec) => {
    // load audio file from server
    if (isPlaying) {
      await musicStop(); // 만약 재생 중이면 일단 정지
      console.log("stop");
    }
    console.log(startSec + "를 요청합니다");
    await fetch(`http://10.58.3.91:8000/song/playview/${id}/${startSec}`)
      .then(res => res.arrayBuffer())
      .then(res => musicPlay(id, res));

    await getMusicInfoApi();
  };

  const getMusicInfoApi = () => {
    console.log(currentMusicNum)
    fetch(`http://10.58.3.91:8000/song/play/${currentMusicNum}`)
      .then(res => res.json())
      .then(res => setMusicData(res.song[0]));
  };

  const setVolume = (offsetY) => {
    console.log("child", offsetY);
    musicVolume.gain.value = 1.5;
  }

  // play 버튼
  const musicPlay = async (id, res) => {
    console.log(id, res);

    // create audio context
    const getAudioContext = () => {
      AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContent = new AudioContext();
      return audioContent;
    };

    const audioContext = getAudioContext();
    // create audioBuffer (decode audio file)
    const audioBuffer = await audioContext.decodeAudioData(res);
    // create audio source
    const audioGain = audioContext.createGain();
    const source = audioContext.createBufferSource();

    source.buffer = audioBuffer;
    source.connect(audioGain); // source or music.gain.value = 볼륨값
    ;
    source.connect(audioContext.destination);
    
    
    console.log("music, curruent", musicNum, currentMusicNum)

    if (id === currentMusicNum) {
      setCurrentTime(buffer.duration); //same musicNum
    } else if (id !== currentMusicNum) {
      setDuration(buffer.duration); //diff musicNum
    }
    
    setMusic(source);
    setBuffer(audioBuffer);
    setMusicVolume(audioGain.connect(audioContext.destination));
    setContext(audioContext);
    // setCurrentTime(audioContext);
    setCurrentMusicNum(id); // 현재 재생 중인 song_id
    console.log("ready to play");

    source.start();
    setIsPlaying(true); // 플레이 시작
    console.log("start");
  };

  // stop 버튼
  const musicStop = async () => {
    music.stop();
    setCurrentNowTime(0);
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
  const showOffsetX = (id, offsetX) => {
    console.log(offsetX);

    if (isPlaying) {

      if (id === currentMusicNum) {
        getMusicApi(id, Math.round((offsetX / 640) * duration)); // 퍼센트 x 전체 길이
        console.log(Math.round((offsetX / 640) * duration) + "초 재생 요청");
      } else if (id !== currentMusicNum) {
        getMusicApi(id, 0)
      }
    } else if (!isPlaying) {
      getMusicApi(id, 0);
    }
  };

  const vctest = datatest.map(param => (
    <div key={param}>
      <VisualizerCompStream
        musicData={musicData}
        isPlaying={isPlaying}
        isPause={isPause}
        getMusicApi={getMusicApi}
        showOffsetX={showOffsetX}
        buffer={buffer}
        interval={duration ? 640 / duration : 1}
        currentMusicNum={currentMusicNum}
        play={param}
        setMusicNum={setMusicNum}
        currentNowTime={currentNowTime}
        setCurrentNowTime={setCurrentNowTime}
        // {...song}
      ></VisualizerCompStream>
    </div>
  ));

  return (
    <>
      <Provider store={store}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Layout>
            <StreamContainer>
              <StreamLeft>
                왼쪽
                <p className="top-msg">
                  Hear the latest posts from the people you’re following:
                </p>
                {vctest}
              </StreamLeft>
              <StreamRight>오른쪽</StreamRight>
            </StreamContainer>
            <BottomPlayer
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
              navUp={navUp}
              setVolume={setVolume}
              currentNowTime={currentNowTime}
            />
          </Layout>
        </ThemeProvider>
      </Provider>
    </>
  );
};


const GlobalStyle = createGlobalStyle`
  font-family: ${theme.fontGlobal};
  ${reset};
`;


export default Stream;

const StreamLeft = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #f2f2f2;
  padding-right: 30px;
  margin: 46px 0 48px 0;

  .top-msg {
    color: #999;
    font-size: 18px;
    font-weight: 100;
  }
`;

const StreamRight = styled.div`


`;

const StreamContainer = styled.div`
  background-color: white;
  width: 1240px;
  margin: 0 auto;
  padding: 0 30px 0 30px;
`;

const StreamBg = styled.div`
  background-color: #f2f2f2;
`;