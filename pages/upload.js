import { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import theme from '../global/theme';

const Upload = () => {
  const fileInput = useRef(null);
  const [fileArr, setFileArr] = useState([]);
  // const myHeaders = new Headers();
  // const token =
  //       "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDl9.1YoohK-pr62d_0Y7qrrRHyv03rar0DMn8eqZeG81u9s";
  //     myHeaders.append("Content-Type", "application/json");
  //     myHeaders.append("Authorization", token);

  const funcFileUpload = (e) => {
    e.preventDefault();

    const getFilesArr = (e.nativeEvent.target.files ? e.nativeEvent.target.files : e.nativeEvent.dataTransfer.files); // 파일, 확장자 필요
    let formData = new FormData();

    setFileArr(getFilesArr);

    for (let i=0; i < getFilesArr.length; i++) {
      console.log(getFilesArr[i]);
      formData.append("file", getFilesArr[i]);
      // formData.append("photos", i);
      console.log(formData); // formData는 console에 안찍혀요
    }

    console.log("formData", formData);

    fetch("http://10.58.6.235:8000/song/upload", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .catch(error => console.error("Error:", error))
      .then(response => console.log("Success:", JSON.stringify(response)));
  };

  // const getRecommendUser = () => {
  //   const myHeaders = new Headers();
  //   const token =
  //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDl9.1YoohK-pr62d_0Y7qrrRHyv03rar0DMn8eqZeG81u9s";
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append(
  //     "Authorization", token);
  //       fetch("http://10.58.1.163:8000/user/recommendation", {
  //         method: "GET",
  //         headers: myHeaders
  //       })
  //         .then(res => res.json())
  //         .then(res => console.log(res));
  // }

  //   const sendMessage = () => {
  //     const commentData = {
  //       to_user_id: 90,
  //       content: "hi 말고 다른거",
  //       song_id: 2
  //     };
  //     const myHeaders = new Headers();
  //     const token =
  //       "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDl9.1YoohK-pr62d_0Y7qrrRHyv03rar0DMn8eqZeG81u9s";
  //     myHeaders.append("Content-Type", "application/json");
  //     myHeaders.append("Authorization", token);
  //     fetch("http://10.58.1.163:8000/user/message", {
  //       method: "POST",
  //       body: JSON.stringify(commentData),
  //       headers: myHeaders
  //     })
  //       .then(res => res.json())
  //       .then(res => console.log("Success:", JSON.stringify(res)))
  //       .catch(error => console.error("Error:", error));
  //   };

  //   const getMessageNav = () => {target
  //       "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDl9.1YoohK-pr62d_0Y7qrrRHyv03rar0DMn8eqZeG81u9s";
  //     myHeaders.append("Content-Type", "application/json");
  //     myHeaders.append("Authorization", token);
  //     fetch("http://10.58.1.163:8000/user/message", {
  //       method: "GET",
  //       headers: myHeaders
  //     })
  //       .then(res => res.json())
  //       .then(res => console.log("Success:", JSON.stringify(res)))
  //       .catch(error => console.error("Error:", error));
  //   };

  //   const getMessageAllToUser = () => {target
  //     const myHeaders = new Headers();
  //     const token =
  //       "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDl9.1YoohK-pr62d_0Y7qrrRHyv03rar0DMn8eqZeG81u9s";
  //     myHeaders.append("Content-Type", "application/json");
  //     myHeaders.append("Authorization", token);
  //     fetch("http://10.58.1.163:8000/user/message?to_user=90", {
  //       method: "GET",
  //       headers: myHeaders
  //     })
  //       .then(res => res.json())
  //       .then(res => console.log("Success:", JSON.stringify(res)))
  //       .catch(error => console.error("Error:", error));
  //   };

const dragOver = (e) => {
  e.stopPropagation();
  e.preventDefault();
  console.log("event");
}

const uploadFiles = (e) => {
  e.stopPropagation();
  e.preventDefault();
  console.log(e.nativeEvent.dataTransfer.files);
  funcFileUpload(e);

}

  return (
    <>
      <div>사용 용량</div>
      {/* <button type="button" onClick={getRecommendUser}>
        추천 유저
      </button>
      <button type="button" onClick={sendMessage}>
        메시지 전송
      </button>
      <button type="button" onClick={getMessageNav}>
        메시지 Nav
      </button>
      <button type="button" onClick={getMessageAllToUser}>
        메시지 All
      </button> */}
      <DivWrapper onDragOver={dragOver} onDragLeave={dragOver} onDrop={uploadFiles} >
        <p>Drag and drop your tracks & albums here</p>
        <FileInput>
          <input
            ref={fileInput}
            onChange={funcFileUpload}
            type="file"
            accept="picture/*"
            multiple
          />
          or choose files to upload
        </FileInput>
        <label htmlFor="multiSelect">
          <input name="multiSelect" type="checkbox" />
          <span>Make a playlist when multiple files are selected</span>
        </label>
        <label htmlFor="radio">
          <input name="radio" type="radio" />
          Public
          <input name="radio" type="radio" />
          Private
        </label>
      </DivWrapper>
    </>
  );
};

export default Upload;


const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 800px;
  border: 1px solid ${theme.lGray};
  padding: 100px 0 100px 0;

  p:first-child{
    font-size: 22px;
  }
`;

const FileInput = styled.label`
  width: 300px;
  height: 40px;
  background-color: ${theme.orange};
  color: white;
  border: none;
  border-radius: 3px;
  outline: none;
  text-align: center;
  display: table-cell;
  padding: 10px 15px 10px 15px;
  font-size: 16px;
  line-height: 16px;

  input {
    width: 0px;
    height: 0px;
  }

`;
