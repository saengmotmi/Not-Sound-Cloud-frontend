import { useState, useEffect } from "react";
import MainListItem from "../components/main/MainListItem";
import styled, { css } from "styled-components";
import MainCategory from "../components/main/MainCategory";

const mockArr = ["Chill", "Party", "Relax", "Study", "Workout", "Sleep"]

const Home = () => {
  const [songArr, setSongArr] = useState([])

  const getDataAPI = async () => {
    const data = await fetch(`http://localhost:3000/data/homeData.json`);
    const dataJSON = await data.json();

    setSongArr(dataJSON.data)
  };

  useEffect(() => {
    getDataAPI();
  }, []);

  const listArr = [
    ["VENI RAIN — 리짓군즈 - Junk Drunk Love (rain ver.)", 36.5],
    ["SARAM12SARAM — 빗물구름태풍태양", 281],
    ["ThatBoiB — Boi B - 신사홍대압구정", 70.4],
    ["PANDA GOMM — Post Malone - Rockstar (Panda Flip)", 33.1],
    ["KHUNDIPANDA — 위조성적표 Remix (OLNL, Khundi Panda)", 24],
    ["Cubana — $on OVAN (Prod by Sundress)", 17.1],
    ["Choi — 오왼 오바도즈 (Owen Ovadoz) X 죠리 (Joe Rhee) - dear love, (interlude)", 6],
    ["밤비(bambi) — Seize the day(Prod. Grabby)(Demo ver)", 17.8],
  ];

  const cateArrMap = mockArr.map((el, idx) => {return <MainCategory key={idx} genre={el} songArr={songArr} />})
  const songListMap = listArr.map((el, idx) => {return <ListItem key={idx}><div className="songname">{el[0]}</div><div className="count">{el[1]}K</div></ListItem>})

  return (
    <HomeComp>
      <div>
        <p className="genre">SoundCloud Weekly</p>
        <p className="genre-desc">All of SoundCloud. Just for you.</p>
        <div>
          <PlayerList className="list">
            <div className="img" />
            <List>{songListMap}</List>
          </PlayerList>
          <div className="playerList-bottom">
            <div>
              <img
                src="https://i1.sndcdn.com/avatars-000031467940-4w3p6q-t50x50.jpg"
                alt=""
                width="30"
                height="30"
              />
              <span>Based on your listening history</span>
            </div>
            <div>
              <span>Go to playlist</span>
            </div>
          </div>
        </div>
      </div>
      {cateArrMap}
    </HomeComp>
  );
}


export default Home;

const HomeComp = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 30px;
  margin-right: 30px;

  .genre {
    font-size: 24px;
    line-height: 29.9px;

    &-desc {
      font-size: 14px;
      line-height: 19.6px;
      color: #999;
      margin-top: 10px;
      margin-bottom: 24px;
    }
  }

  .playerList-bottom {
    padding-bottom: 15px;
    border-bottom: 1px solid #f2f2f2;
    margin-bottom: 34px;
    color: #999;
    font-size: 14px;

    display: flex;
    justify-content: space-between;

    div:nth-of-type(1) {
      display: flex;
      flex-direction: row;
      align-items: center;

      img {
        margin-right: 8px;
        border-radius: 50%;
      }
    }

    div:nth-of-type(2) {
      color: #333;
      height: 26px;
      border: 1px solid #e5e5e5;
      border-radius: 3px;
      padding: 2px 11px 2px 10px;

      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
`;

const PlayerList = styled.div`
  display: flex;
  width: 819px;
  height: 220px;
  margin-bottom: 34px;
  color: #ffffff;

  background: linear-gradient(
    135deg,
    rgb(228, 220, 195) 0%,
    rgb(162, 135, 113) 100%
  );

  .img {
    background-image: url("https://i1.sndcdn.com/artworks-000300073014-ey0r1d-t200x200.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    width: 180px;
    height: 180px;
    margin: 20px;
  }
`;

const List = styled.div`
  overflow-y: scroll;
  width: 593px;
  height: 180px;
  margin-top: 20px;
`

const ListItem = styled.div`
  height: 39px;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
  color: #ffffff;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .songname {
    font-size: 14px;
  }

  .count {
    font-size: 11px;
  }
`;