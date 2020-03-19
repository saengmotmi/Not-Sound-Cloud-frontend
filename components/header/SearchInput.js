import React, {useRef} from 'react';
import styled from 'styled-components';
import theme, * as css from '../../global/theme';
import { changeInputVal, changeNav } from "../../redux/header/headerActions";
import { connect } from "react-redux";

const SearchInput = ({ inputVal, changeInputVal, selectNav, changeNav }) => {
  const inputRef = useRef(null);
  const onKeyDown =(e)=>{
    // console.log(e.key)
    if (e.key === "Enter") {
      changeInputVal('');
      // 검색결과 페이지로 이동..해야하는데 그런페이지 없음..ㅠ
      changeNav(0);
      // 선택네브 없도록 변경!
    }
  }


  const onClickSearchIcon = ()=> {
    inputRef.current.focus();
  }
  return (
    <SearchInputContainer>
      <Label htmlFor="search-input" onClick={onClickSearchIcon} />
      <Input
        placeholder="search!"
        onFocus={() => changeNav(9)}
        onKeyDown={onKeyDown}
        onChange={(e) => {
          let value = e.target.value;
          changeInputVal(value);
        }}
        value={inputVal}
        key={"search-input"}
        ref={inputRef}
      />
    </SearchInputContainer>
  );
};

const SearchInputContainer = styled.div`
${css.flexCenter}
width:100%;
position:relative;
`;
const Label = styled.label`
position:absolute;
top:35%;
right:20px;
${css.searchIcon}
color:${theme.dGray};

`;

const Input = styled.input`
  font-family:${theme.font};
  font-size:14px;
border-radius: 3px;
border: none;
padding: 5px 7px;
width:100%;
margin: 0px 10px;
background-color:${theme.snow};
transition: .2s background-color ease-in-out;
&::placeholder{
  font-family:${theme.font};
  font-size:14px;
  position: relative;
  top:1px;
  color:${theme.gray};
}
&:focus {
  background-color:#fff;
transition: .2s background-color ease-in-out;
}
`;

const mapStateToProps = (state)=>{
  return {
    selectNav: state.selectNav,
    inputVal: state.inputVal
  };}



export default connect(mapStateToProps, { changeNav, changeInputVal })(
  SearchInput
);
