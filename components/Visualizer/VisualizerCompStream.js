import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import theme from '../../global/theme';
import VisualComment from './VisualizerComment';


const VisualizerComp = (props) => {
  const {
    repost_id,
    repost_img_src,
    repost_time,
    post_id,
    // song_name,
    small_img_url,
    tag,
    my_img_src,
    play_count,
    // song_path,
    comment_count,

    interval,
    isPlaying,
    isPause,
    currentMusicNum,
    // musicData,
    play
  } = props;

  const nowPlayID = 1;

  const canvasRefTop = useRef(null);
  const canvasRefBot = useRef(null);

  const [musicData, setMusicData] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [count, setCount] = useState(0);
  const [inputID, setInputID] = useState('');
  const [inputComment, setInputComment] = useState('');
  const [comdata, setComdata] = useState([
    {
      user_id: '김민규',
      content: '좋아요',
      position: 100,
    },
    {
      user_id: '김광훈',
      content: '좋아요',
      position: 400,
    },
  ]);

  useEffect(() => {
    // getMusicApi(0);
    getMusicApi(play);
  }, []);

  // 스트리밍 버튼
  const getMusicApi = async startSec => {
    if (isPlaying) {
      await props.musicStop(); // 만약 재생 중이면 일단 정지
    }
    await fetch(`http://10.58.3.91:8000/song/playview/${play}/${startSec}`)
      .then(res => res.arrayBuffer())
      // .then(res => props.musicPlay(res));
    // await getMusicInfoApi(play);
  };

  const getMusicInfoApi = (play) => {
    fetch(`http://10.58.3.91:8000/song/play/${play}`)
      .then(res => res.json())
      .then(res => setMusicData(res.song[0]));
  };

  // 파형 그리기
  useEffect(() => {
    console.log("useEffect", musicData);
    let data;
    
    if (musicData) {
      data = musicData.wave_data;
    } else {
      data = [0.015069325568668135, 0.0986801882207322, 0.11539670445859204];
    }

    const dataUpscale = [];

    console.log(data);
    for (let idx=0; idx < data.length; idx++) {
      if (idx % 5 !== 4) {
        dataUpscale.push(data[idx].toFixed(3));
      }
    }

    const ctxTop = canvasRefTop.current.getContext("2d");
    const ctxBot = canvasRefBot.current.getContext("2d");

    ctxTop.clearRect(0, 0, canvasRefTop.current.width, canvasRefTop.current.height);
    ctxBot.clearRect(0, 0, canvasRefBot.current.width, canvasRefBot.current.height);
    // cttTop.beginPath

    // 컨텍스트 리셋

    let i = 0;
    let j = "";

    ctxTop.fillStyle = theme.orange;
    ctxBot.fillStyle = "black";
    i = 0;
    j = "";

    for (j of dataUpscale) {
      ctxTop.fillRect(i, 80, 2.2, -1 * j); // x, y 시작점, width, height
      ctxBot.fillRect(i, 0, 2.2, 0.5 * j); // x, y 시작점, width, height
      i += 3;
    }
  }, [musicData]);

  // 음악 재생
  useEffect(() => {
    let wavePlay;

    if (play === currentMusicNum && isPlaying && !isPause) {
      wavePlay = setInterval(() => {
        setCount(count + interval / 5);
        // console.log("count", count, "interval", interval / 5);
      }, 200);
    } else if ( (play !== currentMusicNum) || isPause || count >= 640) {
      clearInterval(wavePlay);
      setCanvasWidth(0);
      setCount(0);

      if (count >= 640) {
        getMusicApi(play - 1, 0);
      }
    }
    return () => {clearInterval(wavePlay);}; // count는 초기화 되지 않음
  }, [count, isPlaying, isPause]);


  // 댓글 그리기
  const commentArr = comdata.map((param, idx) => <VisualComment key={idx} user_id={param.user_id} content={param.content} position={param.position} src="" />);

  // 댓글 추가 state 갱신
  const typeComment = (e, isInput) => {
    isInput === 'id' ? setInputID(e.target.value) : setInputComment(e.target.value);
  };

  // 댓글 추가
  const addComment = (e) => {
    if (e.keyCode === 13) {
      const tempData = [...comdata];
      tempData.push({ user_id: "오종", content: inputComment, position: count });
      setComdata(tempData);
      setInputID("");
      setInputComment("");
    }
  };

  const onCanvasMove = (e) => {
    setCanvasWidth(e.nativeEvent.offsetX);
  };

  const onCanvasClick = (e, pos) => {
    if (e.nativeEvent.offsetX < 640) {
      if (pos === 'top') {
        console.log(e.nativeEvent.offsetX, `${Math.round(e.nativeEvent.offsetX / 640 * 100)}%`);

        if (props.isPlaying) {
          setCanvasWidth(e.nativeEvent.offsetX);
          setCount(e.nativeEvent.offsetX);
          props.showOffsetX(play, e.nativeEvent.offsetX);
        } else {
          setCanvasWidth(0);
          setCount(0);
          props.showOffsetX(play, 0);
        }

      } else if (pos === 'bot') {
        console.log('bot'); // 댓글을 어떻게든 해야지
      }
    }
  };

  return (
    <>
      <div>
        <ProfContainer>
          <ProfImg src={repost_img_src} width="30" height="30" />
          <span>{repost_id}</span>
          <div className="prof-repost" />
          <span>reposted a track {repost_time} hours ago</span>
        </ProfContainer>
      </div>
      <VisualizerContainer>
        <div>
          <SongImg
            src={musicData ? musicData.big_img_url : small_img_url}
            width="160"
            height="160"
          />
        </div>

        <div>
          <PlayerDesc>
            <PlayButton type="button">
              <div></div>
            </PlayButton>
            <div>
              <p>{musicData ? musicData.artist_name : post_id}</p>
              <p>{musicData ? musicData.song_name : "제목"}</p>
            </div>
            <div>
              <TagSpan>{musicData ? "#" + musicData.song_tag : tag}</TagSpan>
            </div>
          </PlayerDesc>

          <CanvasContainer>
            <Canvas
              posId="wave-top"
              onMouseMove={onCanvasMove}
              onClick={event => onCanvasClick(event, "top")}
              width="640"
              height="80"
              ref={canvasRefTop}
            />
            <Canvas
              posId="wave-bot"
              onMouseMove={onCanvasMove}
              onClick={event => onCanvasClick(event, "bot")}
              width="640"
              height="60"
              ref={canvasRefBot}
            />
            <OverDiv isPlay={count} mouseOn="y" widthProps={`${canvasWidth}`} />
            <OverDiv mouseOn="n" widthProps={`${canvasWidth}`} />
            {commentArr}
          </CanvasContainer>
          <CommentContainer>
            <img src={my_img_src} />
            <input
              value={inputID}
              onChange={event => typeComment(event, "id")}
              type="text"
            />
            <input
              value={inputComment}
              placeholder="Write a comment"
              onChange={event => typeComment(event, "comment")}
              onKeyDown={event => addComment(event)}
              type="text"
            />
            {/* <button onClick={addComment} type="button">
              send
            </button> */}
          </CommentContainer>
          <BottomContainer>
            <AcitonBtn>
              <button type="buttons">309</button>
              <button type="buttons">56</button>
              <button type="buttons">Share</button>
              <button type="buttons">More</button>
            </AcitonBtn>
            <PlayCount>
              <div className="play-img"></div>
              {/* <span>{play_count.toLocaleString()}</span> */}
              <div className="cmnt-img"></div>
              <span>{comment_count}</span>
            </PlayCount>
          </BottomContainer>
        </div>
      </VisualizerContainer>
    </>
  );
};

export default VisualizerComp;


const VisualizerContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Canvas = styled.canvas`
  position: absolute;
  overflow: hidden;
  top: ${props => (props.posId === "wave-top" ? 0 : 80)}px;
  z-index: 10;
`;

const OverDiv = styled.div`
  background-color: salmon;
  opacity: ${(props) => (props.mouseOn === 'y' ? 0.3 : 0.2)};
  z-index: ${(props) => (props.mouseOn === 'y' ? 5 : 6)};
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => {
    if (props.mouseOn === 'y') {
      return props.isPlay;
    } if (props.mouseOn === 'n') {
      return props.widthProps;
    }
  }}px;
  height: 80px;
`;

const CanvasContainer = styled.div`
  position: relative;
  height: 140px;
`;

const PlayerDesc = styled.div`
  display: flex;
  align-items: center;
  /* height: 36px; */

  div {
    p {
      margin: 0;
      width: 520px;
      margin-bottom: 6px;

      &:first-child {
        color: #999;
        font-size: 12px;
        font-weight: 100;
        line-height: 16px;
      }
      &:last-child {
        color: #333;
        font-size: 15px;
        line-height: 18px;
      }
    }
  }
`;

const CommentContainer = styled.div`
  position: relative;
  background-color: #f2f2f2;
  border-radius: 3px;
  padding: 5px;
  font-size: 12px;
  color: #333;

  input {
    &:nth-child(2) {
      width: 50px;
      height: 15px;
      display: none;
    }
    &:nth-child(3) {
      width: 612px;
      height: 20px;
      padding: 5px;
      border: 1px solid #e5e5e5;
    }
  }
`;

const ProfContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 12px;
  overflow: hidden;

  .prof-repost {
    background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+DQogIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4wLjMgKDc4OTEpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPg0KICA8dGl0bGU+c3RhdHNfcmVwb3N0PC90aXRsZT4NCiAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogIDxkZWZzLz4NCiAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+DQogICAgPGcgaWQ9InJlcG9zdC0iIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIGZpbGw9InJnYigxNTMsIDE1MywgMTUzKSI+DQogICAgICA8cGF0aCBkPSJNMiw2IEwyLDExLjAwMDM4NSBDMiwxMi4xMDQ3NDE5IDIuOTAxOTUwMzYsMTMgNC4wMDg1MzAyLDEzIEwxMC45OTU3MzQ5LDEzIEwxMC45OTU3MzQ5LDEzIEwxMCwxMyBMMTAsMTMgTDgsMTEgTDQsMTEgTDQsNiBMMy41LDYgTDYsNiBMMywzIEwwLDYgTDIsNiBMMiw2IFogTTYsMyBMNS4wMDQyNjUxLDMgTDExLjk5MTQ2OTgsMyBDMTMuMDk4MDQ5NiwzIDE0LDMuODk1MjU4MTIgMTQsNC45OTk2MTQ5OCBMMTQsMTAgTDEyLDEwIEwxMiw1IEw4LDUgTDYsMyBaIE0xNiwxMCBMMTAsMTAgTDEzLDEzIEwxNiwxMCBaIiBpZD0iUmVjdGFuZ2xlLTQzIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIi8+DQogICAgPC9nPg0KICA8L2c+DQo8L3N2Zz4NCg==")
      no-repeat;
    background-size: 16px;
    width: 16px;
    height: 16px;
    margin: 0 2px 0 5px;
  }

  span {
    display: inline-block;
    font-size: 12px;

    &:nth-child(2) {
      color: #333;
    }
    &:nth-child(4) {
      color: #999;
    }
  }
`;

const ProfImg = styled.img`
  border-radius: 50%;
  margin-right: 8px;
  
`

const SongImg = styled.img`
  border: 1px solid ${theme.lGray};
  margin-right: 15px;
`;

const TagSpan = styled.div`
  background-color: #999;
  border-radius: 20px;
  color: white;
  font-size: 12px;
  font-weight: 100;
  line-height: 16px;
  cursor: pointer;
  padding: 0 6px;
`

const PlayButton = styled.button`
  background-color: ${theme.orange};
  outline: none;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 5px;

  div {
    /* background: ${props =>
      props.play === 1
        ? css`url("data:image/svg+xml;base64,pd94bwwgdmvyc2lvbj0ims4wiiblbmnvzgluzz0ivvrgltgiihn0yw5kywxvbmu9im5vij8+cjxzdmcgd2lkdgg9ijhwecigagvpz2h0psixmnb4iib2awv3qm94psiwidagocaxmiigdmvyc2lvbj0ims4xiib4bwxucz0iahr0cdovl3d3dy53my5vcmcvmjawmc9zdmciihhtbg5zonhsaw5rpsjodhrwoi8vd3d3lnczlm9yzy8xotk5l3hsaw5riib4bwxuczpza2v0y2g9imh0dha6ly93d3cuym9ozw1pyw5jb2rpbmcuy29tl3nrzxrjac9ucyi+ciagica8is0tiedlbmvyyxrvcjogu2tldgnoidmumi4yicg5otgzksatigh0dha6ly93d3cuym9ozw1pyw5jb2rpbmcuy29tl3nrzxrjacatlt4kicagidx0axrszt5qyxvzzsayodwvdgl0bgu+ciagica8zgvzyz5dcmvhdgvkihdpdgggu2tldgnoljwvzgvzyz4kicagidxkzwzzpjwvzgvmcz4kicagidxniglkpsjqywdllteiihn0cm9rzt0ibm9uzsigc3ryb2tllxdpzhropsixiibmawxspsjub25liibmawxslxj1bgu9imv2zw5vzgqiihnrzxrjadp0exblpsjnu1bhz2uipgogicagicagidxniglkpsjidxr0b25ziibza2v0y2g6dhlwzt0itvnbcnrib2fyzedyb3vwiib0cmfuc2zvcm09inryyw5zbgf0zsgtmty4os4wmdawmdasic04oteumdawmdawksigzmlsbd0ii0zgrkzgrii+ciagicagicagicagidxwyxroigq9ik0xnjk0ldg5msbmmty5ncw5mdmgtde2otcsotaziewxnjk3ldg5msbmmty5ncw4otegwibnmty4osw4otegtde2odksotaziewxnjkyldkwmybmmty5miw4otegtde2odksodkxifoiiglkpsjqyxvzzs0yocigc2tldgnoonr5cgu9ik1tu2hhcgvhcm91cci+pc9wyxropgogicagicagidwvzz4kicagidwvzz4kpc9zdmc+") no-repeat ;`
        : css`url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjhweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgOCAxNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuMi4yICg5OTgzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5QbGF5IDI4PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9ImJ1dHRvbnMiIHNrZXRjaDp0eXBlPSJNU0FydGJvYXJkR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNjUzLjAwMDAwMCwgLTg5MC4wMDAwMDApIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPHBhdGggZD0iTTE2NTMsOTA0IEwxNjU0Ljg0NjE1LDg5NyBMMTY1Myw4OTAgTDE2NjEsODk3IEwxNjUzLDkwNCBaIiBpZD0iUGxheS0yOCIgc2tldGNoOnR5cGU9Ik1TU2hhcGVHcm91cCI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+")
      no-repeat;`}  */
    
    background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjhweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgOCAxNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuMi4yICg5OTgzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5QbGF5IDI4PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9ImJ1dHRvbnMiIHNrZXRjaDp0eXBlPSJNU0FydGJvYXJkR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNjUzLjAwMDAwMCwgLTg5MC4wMDAwMDApIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPHBhdGggZD0iTTE2NTMsOTA0IEwxNjU0Ljg0NjE1LDg5NyBMMTY1Myw4OTAgTDE2NjEsODk3IEwxNjUzLDkwNCBaIiBpZD0iUGxheS0yOCIgc2tldGNoOnR5cGU9Ik1TU2hhcGVHcm91cCI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+") no-repeat;
    position: absolute;

    width: 8px;
    height: 14px;
  }
`;

const AcitonBtn = styled.div`
  button {
    border: none;
    outline: none;
    margin-right: 5px;
    padding: 2px 9px 2px 24px;
    border: 1px solid ${theme.lGray};
    border-radius: 3px;
    font-size: 11px;
    color: #333;

    &:nth-child(1) {
      background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+DQogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjAuMyAoNzg5MSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+DQogICAgPHRpdGxlPnN0YXRzX2xpa2VzX2dyZXk8L3RpdGxlPg0KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPg0KICAgIDxkZWZzLz4NCiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBza2V0Y2g6dHlwZT0iTVNQYWdlIj4NCiAgICAgICAgPHBhdGggZD0iTTEwLjgwNDk4MTgsMyBDOC43ODQ3MTU3OSwzIDguMDAwNjUyODUsNS4zNDQ4NjQ4NiA4LjAwMDY1Mjg1LDUuMzQ0ODY0ODYgQzguMDAwNjUyODUsNS4zNDQ4NjQ4NiA3LjIxMjk2Mzg3LDMgNS4xOTYwNDQ5NCwzIEMzLjQ5NDMxMzE4LDMgMS43NDgzNzQsNC4wOTU5MjY5NCAyLjAzMDA4OTk2LDYuNTE0MzA1MzIgQzIuMzczNzI3NjUsOS40NjY3Mzc3NSA3Ljc1NDkxOTE3LDEyLjk5Mjg3MzggNy45OTMxMDk1OCwxMy4wMDEwNTU3IEM4LjIzMTI5OTk4LDEzLjAwOTIzNzggMTMuNzMwOTgyOCw5LjI3ODUzNzggMTMuOTgxNDU5LDYuNTAxMjQwNSBDMTQuMTg3ODY0Nyw0LjIwMDk3MDIzIDEyLjUwNjcxMzYsMyAxMC44MDQ5ODE4LDMgWiIgaWQ9IkltcG9ydGVkLUxheWVycyIgZmlsbD0icmdiKDM0LCAzNCwgMzQpIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIi8+DQogICAgPC9nPg0KPC9zdmc+DQo=")
        no-repeat;
      background-size: 16px 16px;
      background-position: 4px;
    }
    &:nth-child(2) {
      background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+DQogIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4wLjMgKDc4OTEpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPg0KICA8dGl0bGU+c3RhdHNfcmVwb3N0PC90aXRsZT4NCiAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogIDxkZWZzLz4NCiAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+DQogICAgPGcgaWQ9InJlcG9zdC0iIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIGZpbGw9InJnYigzNCwgMzQsIDM0KSI+DQogICAgICA8cGF0aCBkPSJNMiw2IEwyLDExLjAwMDM4NSBDMiwxMi4xMDQ3NDE5IDIuOTAxOTUwMzYsMTMgNC4wMDg1MzAyLDEzIEwxMC45OTU3MzQ5LDEzIEwxMC45OTU3MzQ5LDEzIEwxMCwxMyBMMTAsMTMgTDgsMTEgTDQsMTEgTDQsNiBMMy41LDYgTDYsNiBMMywzIEwwLDYgTDIsNiBMMiw2IFogTTYsMyBMNS4wMDQyNjUxLDMgTDExLjk5MTQ2OTgsMyBDMTMuMDk4MDQ5NiwzIDE0LDMuODk1MjU4MTIgMTQsNC45OTk2MTQ5OCBMMTQsMTAgTDEyLDEwIEwxMiw1IEw4LDUgTDYsMyBaIE0xNiwxMCBMMTAsMTAgTDEzLDEzIEwxNiwxMCBaIiBpZD0iUmVjdGFuZ2xlLTQzIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIi8+DQogICAgPC9nPg0KICA8L2c+DQo8L3N2Zz4NCg==")
        no-repeat;
      background-size: 16px 16px;
      background-position: 4px 50%;
    }
    &:nth-child(3) {
      background: url("https://a-v2.sndcdn.com/assets/images/share-e2febe1d.svg")
        no-repeat;
      background-size: 16px 16px;
      background-position: 4px;
    }
    &:nth-child(4) {
      background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE0cHgiIGhlaWdodD0iNHB4IiB2aWV3Qm94PSIwIDAgMTQgNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICA8dGl0bGU+bW9yZTwvdGl0bGU+CiAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9InJnYigzNCwgMzQsIDM0KSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIyIi8+CiAgICA8Y2lyY2xlIGN4PSI3IiBjeT0iMiIgcj0iMiIvPgogICAgPGNpcmNsZSBjeD0iMTIiIGN5PSIyIiByPSIyIi8+CiAgPC9nPgo8L3N2Zz4K")
        no-repeat;
      background-size: 16px 16px;
      background-position: 4px;
    }
  }
`;

const PlayCount = styled.div`
  display: flex;
  justify-content: flex-end;

  span {
    color: #999;
    font-size: 11px;
    margin-right: 5px;
  }

  .play-img {
    width: 16px;
    height: 12px;
    background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+DQogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjAuMyAoNzg5MSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+DQogICAgPHRpdGxlPnN0YXRzX3BsYXkgNDwvdGl0bGU+DQogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogICAgPGRlZnMvPg0KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHNrZXRjaDp0eXBlPSJNU1BhZ2UiPg0KICAgICAgICA8ZyBpZD0ic3RhdHNfcGxheS0iIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIGZpbGw9InJnYigxNTMsIDE1MywgMTUzKSI+DQogICAgICAgICAgICA8cGF0aCBkPSJNNCwxMyBMNCwzIEwxMyw4IEw0LDEzIFoiIGlkPSJzdGF0c19wbGF5LTMiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiLz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg0K")
      no-repeat;
    background-size: 16px 16px;
  }

  .cmnt-img {
    width: 16px;
    height: 12px;
    background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+DQogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjAuMyAoNzg5MSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+DQogICAgPHRpdGxlPnN0YXRzX2NvbW1lbnQ8L3RpdGxlPg0KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPg0KICAgIDxkZWZzLz4NCiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBza2V0Y2g6dHlwZT0iTVNQYWdlIj4NCiAgICAgICAgPGcgaWQ9InN0YXRzX2NvbW1lbnQiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIGZpbGw9InJnYigxNTMsIDE1MywgMTUzKSI+DQogICAgICAgICAgICA8cGF0aCBkPSJNNC45OTk2MTQ5OCwzIEMzLjg5NTI1ODEyLDMgMywzLjg4NjU1NDg0IDMsNS4wMDU5MTkwNSBMMyw3Ljk5NDA4MDk1IEMzLDkuMTAxOTE5NDUgMy44ODc0MzMyOSwxMCA0Ljk5OTYxNDk4LDEwIEwxMS4wMDAzODUsMTAgQzEyLjEwNDc0MTksMTAgMTMsOS4xMTM0NDUxNiAxMyw3Ljk5NDA4MDk1IEwxMyw1LjAwNTkxOTA1IEMxMywzLjg5ODA4MDU1IDEyLjExMjU2NjcsMyAxMS4wMDAzODUsMyBMNC45OTk2MTQ5OCwzIFogTTUsMTAgTDUsMTMgTDgsMTAgTDUsMTAgWiIgaWQ9IlJlY3RhbmdsZS00MiIgc2tldGNoOnR5cGU9Ik1TU2hhcGVHcm91cCIvPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+DQo=")
      no-repeat;
    background-size: 16px 16px;
  }
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 36px;
`;