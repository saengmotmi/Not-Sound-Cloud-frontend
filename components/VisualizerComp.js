import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import theme from '../global/theme';
import VisualComment from './VisualizerComment';


const VisualizerComp = (props) => {
  const {
    repost_id,
    repost_img_src,
    repost_time,
    post_id,
    song_name,
    small_img_url,
    tag,
    my_img_src,
    play_count,
    song_path,
    comment_count,
    interval,
    isPlaying,
    isPause,
    currentMusicNum
  } = props;

  const nowPlayID = 1;

  const canvasRefTop = useRef(null);
  const canvasRefBot = useRef(null);

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

  const data = [0.015069325568668135, 0.0986801882207322, 0.11539670445859204, 0.07732765908365595, 0.05148016305434155, 0.10634254099495452, 0.1071024330073748, 0.08283768478401773, 0.05776393661364017, 0.08872800308812762, 0.12276561358799432, 0.10971316653066178, 0.05288557740821105, 0.06706831316453873, 0.12482540906224632, 0.10755971460745124, 0.12351917980976125, 0.11766009492578655, 0.1580020478707111, 0.15135310579814465, 0.13950752360051444, 0.1326353404757564, 0.14610080646230406, 0.16265329021600136, 0.178695636268408, 0.17192936725015698, 0.14680818518707683, 0.1718010558425354, 0.17058875685616823, 0.19495888506588094, 0.1615658437448651, 0.1783316040029458, 0.15507936370350353, 0.16192304828730836, 0.16639086807226897, 0.17711451429037578, 0.16262737650933418, 0.17017330802954234, 0.15614850461402427, 0.16999282707641084, 0.15965964926492077, 0.16469864883638957, 0.15851403074379028, 0.17291051131431484, 0.18084446028849363, 0.18266484026048724, 0.1843067673056374, 0.14724164886257382, 0.1809658454093968, 0.14871911804425553, 0.17063120602688744, 0.14496575068315673, 0.20856578235893522, 0.1941685001681391, 0.1863471286314149, 0.18241788914870785, 0.19516911380397572, 0.19496319763136613, 0.19288020715948614, 0.16572384094373985, 0.19115748878406513, 0.18937286085294194, 0.17065264948948913, 0.19347237601913891, 0.18788340964263828, 0.18757511272474484, 0.1904835351360017, 0.20109525386784607, 0.19822026924863248, 0.19301462978453332, 0.20971501166615739, 0.18321450749666643, 0.17441859993586414, 0.19329926271622064, 0.20769308921895605, 0.22263156041833576, 0.18358237734480715, 0.2019727294646001, 0.1993750653412889, 0.2017407367256369, 0.180695035122929, 0.18744382474440974, 0.1687606433291225, 0.13585875664111516, 0.20500416499333954, 0.21760026572068586, 0.21128374559344099, 0.21355269576647393, 0.19533995996394643, 0.21731722710953807, 0.2069576501720865, 0.24220067318259605, 0.23921964005617088, 0.24625079021913193, 0.24094205369806224, 0.23497613396213857, 0.21768488274869327, 0.22882980708732584, 0.19916791993230987, 0.1832438754736468, 0.1757215473796504, 0.2280954423268549, 0.21106579882617893, 0.22926616881470052, 0.2147287593506013, 0.20755547848069741, 0.20202937257127226, 0.2393665020927091, 0.21921446957425517, 0.23680892794494354, 0.24016547196845842, 0.236392681234738, 0.226252725111796, 0.2290056131879791, 0.21818011825710637, 0.1684796854070388, 0.17890590798835695, 0.19187043651865332, 0.22459746306489667, 0.21392717749359969, 0.2332222831702564, 0.21701275177080442, 0.21564656414607145, 0.21218813254183752, 0.24033732318269876, 0.21746664689875694, 0.22964195948027474, 0.21452443044080213, 0.23397228401262793, 0.21973703559240743, 0.22789701296927994, 0.20608076520205587, 0.24487551186842843, 0.2368564467403081, 0.24342981779147316, 0.22009977942570363, 0.23874126419530825, 0.23441781825720584, 0.21743543908950944, 0.20554818020165536, 0.23622913472536955, 0.24171336818676897, 0.23217512180933483, 0.21195910352825328, 0.22608338870861172, 0.24940452394323337, 0.2288317054678214, 0.20926767417214603, 0.2115368738336572, 0.24861636294514766, 0.23102925962152168, 0.2467312769505051, 0.2095598933861488, 0.23963600892728965, 0.23271526603472953, 0.21220240581100114, 0.20611297891264893, 0.22209113625555907, 0.21865253002250165, 0.20613549809656914, 0.220290204118472, 0.19886839663274294, 0.23372459306532453, 0.2112231404465909, 0.21993772861449618, 0.20540579079383367, 0.23732504600983742, 0.24212268167417003, 0.25425881342080836, 0.25400366987577655, 0.22939033811498385, 0.24000565095576795, 0.2299739122257757, 0.22711292795297217, 0.22710318313782962, 0.2234522154964136, 0.24483989467647338, 0.21550307511333774, 0.25076514642541997, 0.23240167155097166, 0.24301840770816444, 0.21948320831224755, 0.21142942930625386, 0.224635779413451, 0.24751966597326064, 0.23275729610293464, 0.23207025460392064, 0.23410476156764917, 0.24365326828373213, 0.223131566441249, 0.23803612488937273, 0.23594694473010686, 0.24931443190836403, 0.22349695075514459, 0.23413222516398816, 0.25427695777906195, 0.2522080888819995, 0.24326652061157092, 0.20567905172061943, 0.2235233435208846, 0.22149708788402353, 0.20082717644112383, 0.15513128803063617, 0.20759980138369272, 0.2110568258132845, 0.1615162222878039, 0.09635308009396269, 0.03526089729998284, 0.01682762004635897, 0.009071504641643986, 0.005642367412996127, 0.0022288637331284267, 0.0018511665610643799, 0.00033329276927608544, 7.61277556173603e-05];
  const dataUpscale = [];

  for (const i of data) {
    dataUpscale.push(i.toFixed(3));
  }

  

  // 음악 재생
  useEffect(() => {
    let wavePlay;

    if (nowPlayID === currentMusicNum && isPlaying && !isPause) {
      wavePlay = setInterval(() => {
        setCount(count + interval / 5);
        // console.log("count", count, "interval", interval / 5);
      }, 200);
    } else if (isPause) {
      clearInterval(wavePlay);
    }
    return () => {clearInterval(wavePlay);}; // count는 초기화 되지 않음
  }, [count, isPlaying, isPause]);
  
  // 파형 그리기
  useEffect(() => {
    const ctxTop = canvasRefTop.current.getContext('2d');
    const ctxBot = canvasRefBot.current.getContext('2d');

    let i = 0;
    let j = '';

    ctxTop.fillStyle = theme.orange;
    ctxBot.fillStyle = 'black';
    i = 0;
    j = '';

    for (j of dataUpscale) {
      ctxTop.fillRect(i, 80, 2.2, -300 * j); // x, y 시작점, width, height
      ctxBot.fillRect(i, 0, 2.2, 150 * j); // x, y 시작점, width, height
      i += 3;
    }
  }, []);

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
          props.showOffsetX(e.nativeEvent.offsetX);
        } else {
          setCanvasWidth(0);
          setCount(0);
          props.showOffsetX(0);
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
          <SongImg src={small_img_url} width="160" height="160" />
        </div>

        <div>
          <PlayerDesc>
            <PlayButton type="button">
              <div></div>
            </PlayButton>
            <div>
              <p>{post_id}</p>
              <p>{song_name}</p>
            </div>
            <div>
              <TagSpan>{tag}</TagSpan>
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
            <input value={inputID} onChange={event => typeComment(event, "id")} type="text" />
            <input value={inputComment}
              placeholder="Write a comment"
              onChange={event => typeComment(event, "comment")}
              onKeyDown={(event) => addComment(event)}
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