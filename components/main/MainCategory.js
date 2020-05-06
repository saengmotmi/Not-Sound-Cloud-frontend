import { useState, useEffect } from 'react';
import MainCateItem from "./MainCateItem";
import styled, { css, keyframes } from "styled-components";

const MainCategory = ({
  genre = "Chill",
  genDesc = "Popular playlists from the SoundCloud community",
  songArr = [],
}) => {

  const [lngLi, setLngLi] = useState(0)
  const [offsetX, setOffsetX] = useState(0);
  const [page, setPage] = useState(0)
  const [btnOn, setBtnOn] = useState([false, true])

  useEffect(() => {
    setLngLi(songArr.length)
  }, [songArr])

  const calcLngLi = (lng, direction) => {
    let q = parseInt(lng) / 4, // 몫
        r = lng % 4, // 나머지
        d = direction === "right" ? -1 : 1;

    if (d < 0) {
      if (page < q - 2) {
        setOffsetX(offsetX - 4 * 192);
        setPage(page + 1);
        setBtnOn(r !== 0 ? [true, true] : [true, false]);
      } else {
        setOffsetX(offsetX - r * 192 + 71);
        setBtnOn([true, false])
      }
    } else {
      if (page > q - 2) {
        setOffsetX(offsetX + 4 * 192);
        setPage(page - 1);
        setBtnOn(offsetX === -768 ? [false, true] : [true, true]);
      } else {
        setOffsetX(offsetX + r * 192 - 71);
        setPage(0);
        setBtnOn([false, true]);
      }
    }
  }

  const songArrMap = songArr.length !== 0 && songArr.map((el, idx) => {
    return <MainCateItem key={idx} {...el} />
  })

  return (
    <>
      <Category>
        <p className="genre">{genre}</p>
        <p className="genre-desc">{genDesc}</p>
        <ListWrapper>
          <BtnLeft btnOn={btnOn} onClick={() => calcLngLi(lngLi, "left")}>
            <Btn>
              <BtnShapeLeft />
            </Btn>
          </BtnLeft>
          <BtnRight btnOn={btnOn} onClick={() => calcLngLi(lngLi, "right")}>
            <Btn>
              <BtnShapeRight />
            </Btn>
          </BtnRight>
          <div className="hidden">
            <Ul offsetX={offsetX}>{songArr.length !== 0 && songArrMap}</Ul>
          </div>
        </ListWrapper>
      </Category>
    </>
  );
};

export default MainCategory

const Category = styled.div`
  width: 819px;
  border-bottom: 1px solid #f2f2f2;
  margin-bottom: 34px;

  .hidden {
    overflow: hidden;
  }
`;

const ListWrapper = styled.div`
  position: relative;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;

  padding: 0;
  margin: 0;
  margin-left: ${({ offsetX }) => {
    return offsetX;
  }}px;

  transition: margin-left 0.7s ease-in-out;
`;

const BtnLayer = styled.div`
  height: 172px;

  position: absolute;
  top: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    div{
      border-color: #f50;

    }
  }

  z-index: 2;
`;

const Btn = styled.div`
  width: 32px;
  height: 32px;

  background-color: #fff;

  border: 1px solid #e5e5e5;
  border-radius: 3px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnShape = styled.div`
  border-right: 1px solid #333;
  border-bottom: 1px solid #333;

  width: 6px;
  height: 6px;
`;

const BtnLeft = styled(BtnLayer.withComponent("div"))`
  left: -10px;
  display: ${(props) => (props.btnOn[0] ? "flex" : "none")};
`;

const BtnRight = styled(BtnLayer.withComponent("div"))`
  right: -10px;
  display: ${(props) => (props.btnOn[1] ? "flex" : "none")};
`;

const BtnShapeLeft = styled(BtnShape.withComponent("div"))`
  transform: rotate(-225deg);
`;

const BtnShapeRight = styled(BtnShape.withComponent("div"))`
  transform: rotate(-45deg);
`;