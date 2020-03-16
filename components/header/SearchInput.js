import React from 'react';
import styled from 'styled-components';
import theme, * as css from '../../global/theme';

const SearchInput = () => (
  <SearchInputContainer>
    <Label htmlFor="search-input" />
    <Input id="search-input" placeholder="search!" />
  </SearchInputContainer>
);

const SearchInputContainer = styled.div`
${css.flexCenter}
width:100%;
position:relative;
`;
const Label = styled.label`
position:absolute;
top:28%;
right:15px;
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

export default SearchInput;
