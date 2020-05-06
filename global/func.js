// import axios from 'axios'
import fetch from 'isomorphic-fetch'
import { token, chulIP, minIP } from "./env"
import theme from "./theme"
import {
  setMusicMetaList,
  regSrc,
  regCtx,
  regNode,
  setPlaying,
  setPause,
  setVolume,
  setNowSongID,
  setNowSec
} from "../redux/stream/actions";

export const mapStateToProps = (state) => {
  return {
    metaList: state.streamReducer.metaList,
    music: state.streamReducer.music,
    state: {
      volume: state.streamReducer.state.volume,
      isPlaying: state.streamReducer.state.isPlaying,
      isPause: state.streamReducer.state.isPause,
      nowSongID: state.streamReducer.state.nowSongID,
      nowSec: state.streamReducer.state.nowSec,
    },
  };
};

export const setFunc = {
  setMusicMetaList: setMusicMetaList,
  regSrc: regSrc,
  regCtx: regCtx,
  regNode: regNode,
  setPlaying: setPlaying,
  setPause: setPause,
  setVolume: setVolume,
  setNowSongID: setNowSongID,
  setNowSec: setNowSec
};

export const getMusic = async (setFunc, id = 1, sec = 1) => {
  // window 객체를 사용하기 때문에 SSR 불가능
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // const musicData = await fetch(`${minIP}/song/playview/${id}/${sec}`)
  const musicData = await fetch("http://localhost:3000/data/song.mp3");
  // const musicData = await axios.get("http://localhost:3000/data/song.mp3");
  const musicDataBuffer = await musicData.arrayBuffer();
  const decodedData = await audioCtx.decodeAudioData(musicDataBuffer);
  const source = audioCtx.createBufferSource();
  const gainNode = audioCtx.createGain();

  source.buffer = decodedData;
  source.connect(gainNode);
  gainNode.connect(audioCtx.destination); // 출력을 연결, 기본은 스피커

  setFunc.regSrc(source);
  setFunc.regCtx(audioCtx);
  setFunc.regNode(gainNode);

  console.log("ready");
};

export const getMusicMeta = async (setFunc = null, id = 1) => {
  // const metaData = await fetch(`${minIP}/song/streams/${id}`)
  const metaData = await fetch(`http://localhost:3000/data/metaTest.json`);
  const metaDataJSON = await metaData.json();

  if (setFunc) {
    setFunc.setMusicMetaList(metaDataJSON)
  } else {
    return metaDataJSON
  }
};

export const refreshMusic = async (music, setFunc, state, id=1, sec=1) => {
  state.isPlaying && music.src.stop()

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // const musicData = await fetch(`${minIP}/song/playview/${id}/${sec}`)
  const musicData = await fetch("http://localhost:3000/data/song.mp3");
  // const musicData = await axios.get("http://localhost:3000/data/song.mp3");
  const musicDataBuffer = await musicData.arrayBuffer();
  const decodedData = await audioCtx.decodeAudioData(musicDataBuffer);
  const source = audioCtx.createBufferSource();
  const gainNode = audioCtx.createGain();
  
  source.buffer = decodedData;
  source.connect(gainNode);
  gainNode.connect(audioCtx.destination); // 출력을 연결, 기본은 스피커
  
  const duration = source.buffer.duration;
  source.start(0, 0, duration);
  setFunc.setPlaying(true);
  setFunc.setPause(false);
  setFunc.setNowSongID(30);
  setFunc.regSrc(source);
  setFunc.regCtx(audioCtx);
  setFunc.regNode(gainNode);
  console.log("ready");
}

export const playMusic = (music, setFunc) => {
  const duration = music.src.buffer.duration;
  music.src.start(0, 0, duration); // setTimeout, startPoint, playTime
  setFunc.setPlaying(true)
  setFunc.setNowSongID(31);
  console.log("play");
};

export const stopMusic = (music, setFunc) => {
  music.src.stop();
  setFunc.regSrc(null);
  setFunc.regCtx(null);
  setFunc.setPlaying(false);
  setFunc.setPause(false);
  console.log("stop");
};

export const pauseMusic = (music, state, setFunc) => {
  state.isPause ? music.ctx.resume() : music.ctx.suspend();
  setFunc.setPause(!state.isPause);
  console.log("pause", state.isPause);
};

// 웨이브 그리기
export const drawWave = (data, ref, big = null) => {
  const dataUpscale = [];
  for (let idx = 0; idx < data.length; idx++) {
    if (!big ? idx % 5 !== 0 : idx % 50 !== 0) {
      dataUpscale.push(data[idx].toFixed(3));
    }
  }

  const ctxTop = ref.refTop.getContext("2d"),
    ctxOver1 = ref.refOver1.getContext("2d"),
    ctxOver2 = ref.refOver2.getContext("2d"),
    ctxBot = ref.refBot.getContext("2d");

  ctxTop.clearRect(0, 0, ref.refTop.width, ref.refTop.height);
  ctxOver1.clearRect(0, 0, ref.refOver1.width, ref.refOver1.height);
  ctxOver2.clearRect(0, 0, ref.refOver2.width, ref.refOver2.height);
  ctxBot.clearRect(0, 0, ref.refBot.width, ref.refBot.height);

  // 컨텍스트 리셋
  let i = 0;
  let j = "";

  ctxTop.fillStyle = theme.orange;
  ctxOver1.fillStyle = theme.orange;
  ctxOver2.fillStyle = theme.orange;
  ctxBot.fillStyle = "black";

  i = 0;
  j = "";

  const max = Math.max.apply(null, dataUpscale) // 최대값

  for (j of dataUpscale) {
    let scaleHeight = !big ? 100 : 200;
    let scale = scaleHeight * ((-0.5 * j) / max);
    ctxTop.fillRect(i, scaleHeight / 2, 2.2, scale); // x, y 시작점, width, height
    ctxOver1.fillRect(i, scaleHeight / 2, 2.2, scale); // x, y 시작점, width, height
    ctxOver2.fillRect(i, scaleHeight / 2, 2.2, scale); // x, y 시작점, width, height
    ctxBot.fillRect(i, 0, 2.2, scale / -2); // x, y 시작점, width, height
    i += 3;
  }
};

// 플레이어 댓글 로드
export const getComment = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", token);

  const res = await fetch(`${chulIP}/comment?song_id=3`, {
    method: "GET",
    headers: myHeaders,
  })
  const resJSON = res.json()

  setComdata(resJSON.data.comment_info);
};

// 신규 댓글 전송
export const sendComment = (comdata) => {
  const commentData = comdata;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", token);
  
  fetch(`${chulIP}/comment`, {
    method: "POST",
    body: JSON.stringify(commentData),
    headers: myHeaders,
  })
    .then((res) => res.json())
    .then((res) => console.log("Success:", JSON.stringify(res)))
    .catch((error) => console.error("Error:", error));
};

// 분/초 변환
export const convertTime = (time) => {
  let timeMinute = parseInt(time / 60)
  let timeSecond = parseInt(time % 60)

  if (timeSecond < 10) {
    timeSecond = "0" + timeSecond;
  }

  return `${timeMinute}:${timeSecond}`;
};

export const googleSDK = (googleLoginBtn) => {
  // 구글 SDK 초기 설정
  window.googleSDKLoaded = () => {
    window.gapi.load("auth2", () => {
      const auth2 = window.gapi.auth2.init({
        client_id:
          "341320998084-ol8q2551v6419v6pusj22vbb4k5cpl8v.apps.googleusercontent.com",
        scope: "profile email",
      });
      // console.log(googleLoginBtn, auth2.current);
      auth2.attachClickHandler(
        googleLoginBtn.current, // useRef랑 current!!!!!
        {},
        (googleUser) => {
          const profile = googleUser.getBasicProfile();
          console.log(profile);
          console.log(`Token || ${googleUser.getAuthResponse().id_token}`);
          setToken(googleUser.getAuthResponse().id_token);
          console.log(`ID: ${profile.getId()}`);
          console.log(`Name: ${profile.getName()}`);
          console.log(`Image URL: ${profile.getImageUrl()}`);
          console.log(`Email: ${profile.getEmail()}`);
          GoogleApiPOST(googleUser.getAuthResponse().id_token);
        },
        (error) => {
          alert(JSON.stringify(error, undefined, 2));
        }
      );
    });
  };
  // 구글 SDK 로드
  (function(d, s, id) {
    let js;
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "google-jssdk");
};

const GoogleApiPOST = (token) => {
  console.log("타입", typeof token, token);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", token);
  fetch(`${chulIP}/user/sign-up/google`, {
    method: "POST",
    headers: myHeaders,
  })
    .then((res) => res.json())
    .then((res) => console.log("Success:", JSON.stringify(res))) // 서버에서 내부 토큰 리턴
    .catch((error) => console.error("Error:", error));
};

export const funcFileUpload = (e, setIsLoaded, setFileArr) => {
  e.preventDefault();

  const getFilesArr = e.nativeEvent.target.files
    ? e.nativeEvent.target.files
    : e.nativeEvent.dataTransfer.files; // 파일, 확장자 필요
  let formData = new FormData();

  setFileArr(getFilesArr);

  for (let i = 0; i < getFilesArr.length; i++) {
    console.log(getFilesArr[i]);
    formData.append("file", getFilesArr[i]);
    // formData.append("photos", i);
  }

  fetch(`${minIP}/song/upload`, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .catch((err) => console.error("Error:", err))
    .then((res) => {
      setIsLoaded(true);
      console.log("Success:", JSON.stringify(res));
    });
};