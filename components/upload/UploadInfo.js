import { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import theme from "../../global/theme";

const UploadInfo = () => {
  const a = 0;

  return (
    <>
      <div>
        upload info
        <div>상단</div>
        <div>
          바디
          <div>
            왼쪽
            <div>프로필 사진</div>
          </div>
          <div>
            오른쪽
            <input />
            <div>업로드 주소</div>
            <div>
              장르
              <div>드롭다운</div>
            </div>
            <div>additional tags</div>
            <div>
              Description
              <textarea></textarea>
            </div>
            <div>
              privacy:
              <div>라디오버튼 3개</div>
            </div>
          </div>
        </div>
        <div>
          * Required fields
          <button>Cancel</button>
          <button>Save</button>
        </div>
      </div>
    </>
  );

}


export default UploadInfo;