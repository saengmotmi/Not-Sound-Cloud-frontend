import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';

// visualizerComp에 병합 예정
const VisualComment = (props) => {
  const { user_name, src, content, position } = props;

  return (
    <CommentDiv position={position}>
      <img
        src="https://i1.sndcdn.com/avatars-000031467940-4w3p6q-t20x20.jpg"
        alt=""
      />
      <p>
        <Id>{user_name}</Id>
        <Comment>{content}</Comment>
      </p>
    </CommentDiv>
  );
};

export default VisualComment;


const CommentDiv = styled.div`
  position: absolute;
  top: 80px;
  z-index: 18;
  left: ${(props) => props.position}px;
`;

const Id = styled.span`
  background-color: white;
  font-size: 8px;
`;

const Comment = styled.span`
  background-color: white;
  font-size: 8px;
  color: orange
`;
