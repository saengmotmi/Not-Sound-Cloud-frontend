import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import styled from 'styled-components';
// import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import theme, * as css from '../../global/theme';
import { changeNav } from '../../redux/header/headerActions';

const LeftBox = ({ selectNav, changeNav }) => {
  // state

  const [navList, setNavList] = useState([]); // 네브 목록 목데이터 저장
  const refSelecNav = useRef(); // 레퍼런스 사용.
  // mock data fetch
  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/data/nav.json");
    const result = await response.json();
    return setNavList(result.data);
  };

  // componentDidMount
  useEffect(() => {
    fetchData();
  }, []);

  const checkId=(id)=>{
    if (id===selectNav){
      return "true"
    } else {
      return "false"
    }
  }
  const checkCurrentNav = (num) => {
    if (selectNav === num) {
      return 0;
    } else {
      return num;
    }
  };
  return (
    <LeftWrap>
      <Ul>
        <Link href="/">
          <LogoBox
            orange={theme.yellowOrange}
            deepOrange={theme.deepOrange}
            onClick={() => changeNav(checkCurrentNav(0))}>
            <Logo />
          </LogoBox>
        </Link>
        {navList.map((li) => (
          <Link href={li.url} key={`${li.id}-navlist`}>
            <Li
              on={checkId(li.id)}
              onClick={(e) => {
                changeNav(li.id);
              }}>
              {li.name}
            </Li>
          </Link>
        ))}
      </Ul>
    </LeftWrap>
  );
};


// styled-components
const LeftWrap = styled.div`
display:flex;
justify-content:flex-start;
`;

const LogoBox = styled.div`
${css.flexCenter};
cursor:pointer;
background-image : linear-gradient(#ff6e00,#fc361d);
width: 69px;
height : 46px;
border:none;
`;
const Logo = styled.div`
${css.cloudLogo};
background-size: 48px;
background-position: 13px 11px;
width:100%;
height :100%;
`;

const Ul = styled.ul`
display:flex;
`;

const Li = styled.li`
${css.flexCenter}
font-family:${theme.font};
color: ${(props) => (props.orange ? null : theme.gray)};
background-color : ${(props) => props.on === "true" && theme.black};
font-size:13px;
text-align:center;
padding: 7px 0 10px 0;
width: 104px;
border-right: 1px solid ${theme.black};
max-width : 100%;
&:hover {
cursor:pointer;
color: ${(props) => (props.orange ? null : theme.lGray)};
color: ${(props) => props.on === "true" && theme.gray};
}
`;


const mapStateToProps = (state) => ({
  selectNav: state.selectNav
});


export default connect(mapStateToProps, { changeNav })(LeftBox);
