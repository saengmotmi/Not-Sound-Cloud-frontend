import React from 'react';
import styled from 'styled-components';
import theme, * as css from '../../global/theme';
import { changeInputVal, changeNav } from "../../redux/header/headerActions";
import { connect } from "react-redux";

const SearchInput = ({ inputVal, changeInputVal, selectNav, changeNav }) => (
    <SearchInputContainer>
      <Label htmlFor="search-input" />
      <Input
        placeholder="search!"
        onFocus={() => changeNav(9)}
        onChange={(e) => {
          let value = e.target.value;
          changeInputVal(value);
        }}
        value={inputVal}
        key={"search-input"}
      />
    </SearchInputContainer>
)

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
  top:-1px;
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
