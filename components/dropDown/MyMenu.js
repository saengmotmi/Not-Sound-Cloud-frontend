import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import theme from '../../global/theme';

const MyMenu = ({ data }) => (
  <Ul>
    {data.map((li) => (
      <Link href={li.url} key={`${li.id}-key`}>
        <Li id={`${li.id}-my-menu-list`}>
          {
              li.icon
                && (
                <MarginWrap left="0">
                  <FontAwesomeIcon icon={icon[li.icon]} style={{ fontSize: '10px' }} />
                </MarginWrap>
                )
            }
          <span>{li.name}</span>
        </Li>
      </Link>
    ))}
  </Ul>
);

// MyMenu.propTypes = {
//   data: PropTypes.array,
// };


const MarginWrap = styled.div`
margin-right: ${(props) => props.right || '8px'};
margin-left: ${(props) => props.left || '8px'};
margin-top: ${(props) => props.top || '0'};
margin-bottom: ${(props) => props.bottom || '0'};
`;


const Ul = styled.ul`
display:flex;
flex-direction:column;
background-color:${theme.black};
position: relative;
right:0px;
`;

const Li = styled.li`
cursor: pointer;
font-family:${theme.font};
display:flex;
flex-direction:row;
align-items:center;
background-clip:red;
z-index:10;
line-height:1.3em;
padding:8px 10px;
color:${theme.lGray};
font-size:12px;
font-weight:100;
&:hover {
background-color:${theme.chacoal};
}
span {
padding-right : 10px;
}
&:nth-child(8) {
border-top: solid 1px ${theme.chacoal}
}
`;


export default MyMenu;
