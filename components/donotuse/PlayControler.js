import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from '@fortawesome/free-solid-svg-icons'

const PlayControler = ()=>{
  return (
    <PlayControlerContainer>
      <Btn>
        <FontAwesomeIcon icon={icon.faPlay} style={{ fontSize: "24px" }} />
      </Btn>
    </PlayControlerContainer>
  );
}


const PlayControlerContainer = styled.div`
`;
const BtnWrap = styled.div`
`;
const Btn = styled.span`
background-color:red;
background-position:center;
background-size: cover;
`;

export default PlayControler
