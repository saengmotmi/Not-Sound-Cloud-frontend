import { css } from 'styled-components';

const theme = {
  yellowOrange: "#ff6e00",
  orange: "#f50",
  deepOrange: "#fc361d",
  black: "#111",
  chacoal: "#333",
  dGray: "#777",
  gray: "#999",
  lGray: "#ccc",
  snow: "#e5e5e5",
  lsnow: "#F2F2F2",
  fontGlobal: "Roboto,'Noto Sans KR', , sans-serif",
  font: "Roboto,'Noto Sans KR', sans-serif"
};


export const searchIcon = css`
background-image: url("https://a-v2.sndcdn.com/assets/images/search-dbfe5cbb.svg");
width:15px;
height:15px;
`;

export const cloudLogo = css`
background-image:  url("https://a-v2.sndcdn.com/assets/images/header/cloud@2x-e5fba4606d.png");
background-repeat : no-repeat;
height:46px;
width:69px;
`;

export const userPic = css`
background-image:  url("https://i1.sndcdn.com/artworks-000242629294-7fotrp-t120x120.jpg");
background-repeat : no-repeat;
background-position:center;
background-size:cover;
`;

export const flexCenter = css`
display:flex;
justify-content:center;
align-items:center;
`;

export default theme;
