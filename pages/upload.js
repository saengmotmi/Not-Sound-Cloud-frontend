import { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import UploadInfo from '../components/upload/UploadInfo'
import theme from '../global/theme';
import { funcFileUpload } from "../global/func";

const Upload = () => {
  const fileInput = useRef(null);
  const [fileArr, setFileArr] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const dragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("event");
  }

  const uploadFiles = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(e.nativeEvent.dataTransfer.files);
    funcFileUpload(e, setIsLoaded, setFileArr);
  }

  return (
    <UploadComp>
      <DivWarpTop>
        <UsedWrapper>
          <div>33% of free uploads used</div>
          <UsedProgress>
            <ProgBar />
          </UsedProgress>
          <div>
            <span className="blue">Try Pro Unlimited</span> for unlimited
            uploads.
          </div>
        </UsedWrapper>
        <TryProBtn>
          <div>Try Pro Unlimited</div>
        </TryProBtn>
      </DivWarpTop>

      <DivWarpBot
        onDragOver={dragOver}
        onDragLeave={dragOver}
        onDrop={uploadFiles}
      >
        {!isLoaded ? (
          <BeforeLoad>
            <p>Drag and drop your tracks & albums here</p>
            <FileInput>
              <input
                ref={fileInput}
                onChange={(e) => funcFileUpload(e, setIsLoaded, setFileArr)}
                type="file"
                accept="picture/*"
                multiple
              />
              or choose files to upload
            </FileInput>
            <label>
              <input name="multiSelect" type="checkbox" />
              Make a playlist when multiple files are selected
            </label>
            <label htmlFor="radio">
              <input name="radio" type="radio" />
              Public
            </label>
            <label>
              <input name="radio" type="radio" />
              Private
            </label>
          </BeforeLoad>
        ) : (
          <UploadInfo />
        )}

        <Footer>
          <div>
            <div>
              <span className="blue">Supported file types and sizes</span> ⁃{" "}
              <span className="blue">Upload troubleshooting tips</span> ⁃
              <span className="blue">Copyright FAQs</span>
            </div>
            <div>
              By uploading, you confirm that your sounds comply with our{" "}
              <span className="blue">Terms of Use</span> and you don't infringe
              anyone else's rights.
            </div>
            <div>
              Legal ⁃ Privacy ⁃ Cookies ⁃ Imprint ⁃ Creator Resources ⁃ Blog ⁃
              Charts ⁃ Popular searches
            </div>
            <div>
              <span className="blue">Language:</span> English (US)
            </div>
          </div>
        </Footer>
      </DivWarpBot>
    </UploadComp>
  );
};

export default Upload;

const UploadComp = styled.div`
  display: flex;
  flex-direction: column;
`;


const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 800px;
  border: 1px solid ${theme.lGray};
  /* padding: 100px 0 100px 0; */

  p:first-child {
    font-size: 22px;
  }

  .blue {
    color: #38d;
    cursor: pointer;
    &:hover {
      color: #333333
    }
  }
`;

const BeforeLoad = styled.div``;

const DivWarpTop = styled(DivWrapper.withComponent("div"))`
  padding: 20px;
  margin-bottom: 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DivWarpBot = styled(DivWrapper.withComponent("div"))`
  padding: 100px 0 100px 0;
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

const UsedWrapper = styled.div`
  width: 410px;
`;


const UsedProgress = styled.div`
  position: relative;
  width: 100%;
  height: 4px;
  border-radius: 4px;

  background-color: #e5e5e5;
`;

const ProgBar = styled(UsedProgress.withComponent("div"))`
  width: 33%;
  height: 4px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #f50;
`;

const TryProBtn = styled.div`
  border: 1px solid #f50;
  border-radius: 3px;
  color: #f50;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px 15px;
  font-size: 16px;

  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #f50;
  }
`;

const Footer = styled.div`
  font-size: 12px;
  
  div {
    margin-bottom: 10px;

    &:nth-child(2) {
      padding-bottom: 10px;
      border-bottom: 1px solid #e5e5e5;
    }
  }
`