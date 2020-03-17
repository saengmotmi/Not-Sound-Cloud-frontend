import { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import theme from "../global/theme";
import BottomPlayer from "../components/bottomPlayer/BotPlayer";

const MusicStreaming = () => {
  const [resMusic, setResMusic] = useState(null);
  const [readyMusic, setReadyMusic] = useState(null);
  const [music, setMusic] = useState(null);
  const [buffer, setBuffer] = useState(null);
  const [context, setContext] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);
  const [startedAt, setStartedAt] = useState(null);
  const [musicNum, setMusicNum] = useState(1);
  const [navUp, setNavUp] = useState(null);

  useEffect(() => {
    getMusicApi();
  },[music]);

  useEffect(() => {
    setNavUp("up");
  }, []);

  const getMusicApi = async () => {
      // load audio file from server
    const res = await fetch(`http://10.58.3.91:8000/song/playview/${musicNum}/1`)
      .then(res => res.arrayBuffer())
      .then(res => setResMusic(res))
      .then(console.log('done'));
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
  // }

  const musicPlay = async () => {
    console.log(resMusic);
        // create audio context
    const audioContext = getAudioContext();
    // create audioBuffer (decode audio file)
    const audioBuffer = await audioContext.decodeAudioData(resMusic);
    // create audio source
    const source = audioContext.createBufferSource();

    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    setReadyMusic(audioContext.destination);
    setMusic(source);
    setBuffer(audioBuffer);
    setContext(audioContext);
    console.log("done");

    source.start();
    setIsPlaying(true);
    console.log("start");
  }

  const musicStop = async () => {
    music.stop();
    setIsPlaying(false);
  };

  const musicPause = async () => {
    isPlaying ? context.suspend() : context.resume();
    setIsPlaying(!isPlaying);
  }

  return (
    <>
      <button onClick={getMusicApi} type="button">
        스트리밍
      </button>
      <div>duration {buffer && buffer.duration}</div>
      <div>startedAt {startedAt} </div>
      <div>rate </div>
      <div>currentTime {currentTime && currentTime} </div>
      <input type="text" onChange={event => setMusicNum(event.target.value)} />
      <BottomPlayer navUp={navUp} isPlaying={isPlaying} musicPlay={musicPlay} musicPause={musicPause} />
    </>
  );
}

export default MusicStreaming;

