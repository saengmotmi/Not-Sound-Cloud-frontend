import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import theme from "../global/theme";
import VisualComment from "../components/VisualizerComment";

const Visualizer = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const canvasRefTop = useRef(null);
  const canvasRefBot = useRef(null);
  const canvasRefOver1 = useRef(null);
  const canvasRefOver2 = useRef(null);

  console.log("hi");

  const [canvasWidth, setCanvasWidth] = useState(0);
  const [count, setCount] = useState(0);
  const [inputID, setInputID] = useState("");
  const [inputPW, setInputPW] = useState("");
  const [inputComment, setInputComment] = useState("");
  const [comdata, setComdata] = useState([
    {
      created_at: 1,
      user_name: "민또",
      content: "좋아요",
      position: 100,
      song_id: 3,
    },
    {
      created_at: 2,
      user_name: "광또",
      content: "좋아요",
      position: 300,
      song_id: 3,
    },
  ]);

  // song_id, user_id(토큰), content, position

  useEffect(() => {
    getComment();
  }, []);

  const turnModalOn = () => {
    setModalVisible(!modalVisible);
    console.log(modalVisible);
  };
  const data = []; // 잠시 없애놓음
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
    const ctxTop = canvasRefTop.current.getContext("2d"); // 왜 null이 떴지?
    const ctxBot = canvasRefBot.current.getContext("2d");
    const ctxOver1 = canvasRefOver1.current.getContext("2d");
    const ctxOver2 = canvasRefOver2.current.getContext("2d");

    let i = 0;
    let j = "";

    ctxTop.fillStyle = theme.orange;
    ctxBot.fillStyle = "black";
    ctxOver1.fillStyle = theme.orange;
    ctxOver2.fillStyle = theme.orange;

    i = 0;
    j = "";

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
    isInput === "id"
      ? setInputID(e.target.value)
      : setInputComment(e.target.value);
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
      headers: myHeaders,
    })
      .then(res => res.json())
      .then(res => setComdata(res.data.comment_info));
    // .then(res => console.log(res.data.comment_info));
  };

  const sendComment = msg => {
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
      headers: myHeaders,
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
      song_id: 3,
    };
    // setComdata(tempData);
    sendComment(tempData);
    setInputID("");
    setInputComment("");
  };

  const onCanvasMove = e => {
    setCanvasWidth(e.nativeEvent.offsetX);
  };

  const onCanvasClick = (e, pos) => {
    if (e.nativeEvent.offsetX >= 640) return;
    if (pos !== "bot") return;

    console.log(`${Math.ceil((e.nativeEvent.offsetX / 640) * 100)}%`);

    setCanvasWidth(e.nativeEvent.offsetX);
    setCount(e.nativeEvent.offsetX);
  };

  return (
    <>
      <button type="button" onClick={getComment}>
        고고
      </button>
      <CanvasWrapper>
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
      </CanvasWrapper>
      <input onChange={event => typeComment(event, "id")} type="text" />
      <input onChange={event => typeComment(event, "comment")} type="text" />
      <button onClick={addComment} type="button">
        send
      </button>
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
  top: ${props => (props.posId === "wave-top" ? 0 : 80)}px;
`;

const CanvasWrapper = styled.div`
  position: "relative";
  height: "140px";
`;
