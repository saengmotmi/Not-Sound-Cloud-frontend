import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import theme from '../global/theme';
import VisualComment from '../components/VisualizerComment';


const Visualizer = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const canvasRefTop = useRef(null);
  const canvasRefBot = useRef(null);
  const canvasRefOver1 = useRef(null);
  const canvasRefOver2 = useRef(null);

  const [canvasWidth, setCanvasWidth] = useState(0);
  const [count, setCount] = useState(0);
  const [inputID, setInputID] = useState('');
  const [inputComment, setInputComment] = useState('');
  const [comdata, setComdata] = useState([
    {
      created_at: 1,
      user_name: "민또",
      content: "좋아요",
      position: 100,
      song_id: 3
    },
    {
      created_at: 2,
      user_name: "광또",
      content: "좋아요",
      position: 300,
      song_id: 3
    }
  ]);

// song_id, user_id(토큰), content, position

  useEffect(() => {
    getComment();
  },[])

  const turnModalOn = () => {
    setModalVisible(!modalVisible);
    console.log(modalVisible);
  };

  // 테스트 데이터
  const data = [0.015069325568668135, 0.0986801882207322, 0.11539670445859204, 0.07732765908365595, 0.05148016305434155, 0.10634254099495452, 0.1071024330073748, 0.08283768478401773, 0.05776393661364017, 0.08872800308812762, 0.12276561358799432, 0.10971316653066178, 0.05288557740821105, 0.06706831316453873, 0.12482540906224632, 0.10755971460745124, 0.12351917980976125, 0.11766009492578655, 0.1580020478707111, 0.15135310579814465, 0.13950752360051444, 0.1326353404757564, 0.14610080646230406, 0.16265329021600136, 0.178695636268408, 0.17192936725015698, 0.14680818518707683, 0.1718010558425354, 0.17058875685616823, 0.19495888506588094, 0.1615658437448651, 0.1783316040029458, 0.15507936370350353, 0.16192304828730836, 0.16639086807226897, 0.17711451429037578, 0.16262737650933418, 0.17017330802954234, 0.15614850461402427, 0.16999282707641084, 0.15965964926492077, 0.16469864883638957, 0.15851403074379028, 0.17291051131431484, 0.18084446028849363, 0.18266484026048724, 0.1843067673056374, 0.14724164886257382, 0.1809658454093968, 0.14871911804425553, 0.17063120602688744, 0.14496575068315673, 0.20856578235893522, 0.1941685001681391, 0.1863471286314149, 0.18241788914870785, 0.19516911380397572, 0.19496319763136613, 0.19288020715948614, 0.16572384094373985, 0.19115748878406513, 0.18937286085294194, 0.17065264948948913, 0.19347237601913891, 0.18788340964263828, 0.18757511272474484, 0.1904835351360017, 0.20109525386784607, 0.19822026924863248, 0.19301462978453332, 0.20971501166615739, 0.18321450749666643, 0.17441859993586414, 0.19329926271622064, 0.20769308921895605, 0.22263156041833576, 0.18358237734480715, 0.2019727294646001, 0.1993750653412889, 0.2017407367256369, 0.180695035122929, 0.18744382474440974, 0.1687606433291225, 0.13585875664111516, 0.20500416499333954, 0.21760026572068586, 0.21128374559344099, 0.21355269576647393, 0.19533995996394643, 0.21731722710953807, 0.2069576501720865, 0.24220067318259605, 0.23921964005617088, 0.24625079021913193, 0.24094205369806224, 0.23497613396213857, 0.21768488274869327, 0.22882980708732584, 0.19916791993230987, 0.1832438754736468, 0.1757215473796504, 0.2280954423268549, 0.21106579882617893, 0.22926616881470052, 0.2147287593506013, 0.20755547848069741, 0.20202937257127226, 0.2393665020927091, 0.21921446957425517, 0.23680892794494354, 0.24016547196845842, 0.236392681234738, 0.226252725111796, 0.2290056131879791, 0.21818011825710637, 0.1684796854070388, 0.17890590798835695, 0.19187043651865332, 0.22459746306489667, 0.21392717749359969, 0.2332222831702564, 0.21701275177080442, 0.21564656414607145, 0.21218813254183752, 0.24033732318269876, 0.21746664689875694, 0.22964195948027474, 0.21452443044080213, 0.23397228401262793, 0.21973703559240743, 0.22789701296927994, 0.20608076520205587, 0.24487551186842843, 0.2368564467403081, 0.24342981779147316, 0.22009977942570363, 0.23874126419530825, 0.23441781825720584, 0.21743543908950944, 0.20554818020165536, 0.23622913472536955, 0.24171336818676897, 0.23217512180933483, 0.21195910352825328, 0.22608338870861172, 0.24940452394323337, 0.2288317054678214, 0.20926767417214603, 0.2115368738336572, 0.24861636294514766, 0.23102925962152168, 0.2467312769505051, 0.2095598933861488, 0.23963600892728965, 0.23271526603472953, 0.21220240581100114, 0.20611297891264893, 0.22209113625555907, 0.21865253002250165, 0.20613549809656914, 0.220290204118472, 0.19886839663274294, 0.23372459306532453, 0.2112231404465909, 0.21993772861449618, 0.20540579079383367, 0.23732504600983742, 0.24212268167417003, 0.25425881342080836, 0.25400366987577655, 0.22939033811498385, 0.24000565095576795, 0.2299739122257757, 0.22711292795297217, 0.22710318313782962, 0.2234522154964136, 0.24483989467647338, 0.21550307511333774, 0.25076514642541997, 0.23240167155097166, 0.24301840770816444, 0.21948320831224755, 0.21142942930625386, 0.224635779413451, 0.24751966597326064, 0.23275729610293464, 0.23207025460392064, 0.23410476156764917, 0.24365326828373213, 0.223131566441249, 0.23803612488937273, 0.23594694473010686, 0.24931443190836403, 0.22349695075514459, 0.23413222516398816, 0.25427695777906195, 0.2522080888819995, 0.24326652061157092, 0.20567905172061943, 0.2235233435208846, 0.22149708788402353, 0.20082717644112383, 0.15513128803063617, 0.20759980138369272, 0.2110568258132845, 0.1615162222878039, 0.09635308009396269, 0.03526089729998284, 0.01682762004635897, 0.009071504641643986, 0.005642367412996127, 0.0022288637331284267, 0.0018511665610643799, 0.00033329276927608544, 7.61277556173603e-05];
  const dataUpscale = [];

  for (const i of data) {
    dataUpscale.push(i.toFixed(3));
  }

  // 음악 재생
  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
      // console.log(count);
    }, 200);
    return () => clearInterval(id);
  }, [count]);

  // 파형 그리기
  useEffect(() => {
    const ctxTop = canvasRefTop.current.getContext('2d'); // 왜 null이 떴지?
    const ctxBot = canvasRefBot.current.getContext('2d');
    const ctxOver1 = canvasRefOver1.current.getContext("2d");
    const ctxOver2 = canvasRefOver2.current.getContext("2d");

    let i = 0;
    let j = '';

    ctxTop.fillStyle = theme.orange;
    ctxBot.fillStyle = 'black';
    ctxOver1.fillStyle = theme.orange;
    ctxOver2.fillStyle = theme.orange;

    i = 0;
    j = '';

    for (j of dataUpscale) {
      ctxTop.fillRect(i, 80, 2.2, -300 * j); // x, y 시작점, width, height
      ctxOver1.fillRect(i, 80, 2.2, -300 * j); // x, y 시작점, width, height
      ctxOver2.fillRect(i, 80, 2.2, -300 * j); // x, y 시작점, width, height
      ctxBot.fillRect(i, 0, 2.2, 150 * j); // x, y 시작점, width, height
      i += 3;
    }
  }, []);

  // 댓글 그리기
  const commentArr = comdata.map((param, idx) => (
    <VisualComment
      key={idx}
      user_name={param.user_name}
      content={param.content}
      position={param.position}
      src=""
    />
  ));

  // 댓글 추가 state 갱신
  const typeComment = (e, isInput) => {
    isInput === 'id' ? setInputID(e.target.value) : setInputComment(e.target.value);
  };

const getComment = () => {
  // http://10.58.1.163:8000/comment?song_id=3
    const myHeaders = new Headers();
    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDl9.1YoohK-pr62d_0Y7qrrRHyv03rar0DMn8eqZeG81u9s";
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);
    fetch("http://10.58.1.163:8000/comment/3", {
      method: "GET",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(res => setComdata(res.data.comment_info));
      // .then(res => console.log(res.data.comment_info));
  }

  const sendComment = (msg) => {
    // const commentData = msg;
    console.log(msg);
    const myHeaders = new Headers();
    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDl9.1YoohK-pr62d_0Y7qrrRHyv03rar0DMn8eqZeG81u9s";
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);
    fetch("http://10.58.1.163:8000/comment/3", {
      method: "POST",
      body: JSON.stringify(msg),
      headers: myHeaders
    })
      .then(res => res.json())
      .then(res => console.log("Success:", JSON.stringify(res)))
      .catch(error => console.error("Error:", error));
  };

  // 댓글 추가
  const addComment = () => {
    const tempData = {
      content: inputComment,
      position: count,
      song_id: 3 };
    // setComdata(tempData);
    sendComment(tempData);
    setInputID('');
    setInputComment('');
  };

  const onCanvasMove = (e) => {
    setCanvasWidth(e.nativeEvent.offsetX);
  };

  const onCanvasClick = (e, pos) => {
    if (e.nativeEvent.offsetX < 640) {
      if (pos === 'top') {
        console.log(`${Math.ceil(e.nativeEvent.offsetX / 640 * 100)}%`);

        setCanvasWidth(e.nativeEvent.offsetX);
        setCount(e.nativeEvent.offsetX);
      } else if (pos === 'bot') {
        console.log('bot'); // 댓글을 어떻게든 해야지
      }
    }
  };

  return (
    <>
      <button type="button" onClick={getComment}>
        고고
      </button>
      <div style={{ position: "relative", height: "140px" }}>
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
        <OverDivWrapper
          isPlay={count}
          mouseOn="y"
          widthProps={`${canvasWidth}`}
        >
          <OverDiv ref={canvasRefOver2} width="640" height="80" />
        </OverDivWrapper>
        <OverDivWrapper mouseOn="n" widthProps={`${canvasWidth}`}>
          <OverDiv ref={canvasRefOver1} width="640" height="80" />
        </OverDivWrapper>
        {commentArr}
      </div>
      <input onChange={(event) => typeComment(event, 'id')} type="text" />
      <input onChange={(event) => typeComment(event, 'comment')} type="text" />
      <button onClick={addComment} type="button">send</button>
    </>
  );
};

export default Visualizer;

const OverDiv = styled.canvas`
  /* background-color: salmon; */
  /* opacity: ${props => (props.mouseOn === "y" ? 0.8 : 0.8)}; */
  
  position: absolute;
  top: 0;
  left: 0;
  width: 640px;
  height: 80px;
`;

const OverDivWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => {
    if (props.mouseOn === "y") {
      return props.isPlay;
    }
    if (props.mouseOn === "n") {
      return props.widthProps;
    }
  }}px;
  height: 80px;
  overflow: hidden;
  background-color: transparent;
  z-index: ${props => (props.mouseOn === "y" ? -1 : -2)};
`;

const Canvas = styled.canvas`
  position: absolute;
  overflow: hidden;
  z-index: 10;
  top: ${(props) => (props.posId === 'wave-top' ? 0 : 80)}px;
`;
