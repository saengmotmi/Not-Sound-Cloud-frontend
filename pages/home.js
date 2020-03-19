import { useState, useEffect } from "react";
import MainListItem from "../components/main/MainListItem";
import styled, { css } from "styled-components";


const Home = () => {

  const [homeData, setHomeData] = useState(null);
  const [home1, setHome1] = useState("");
  const [home2, setHome2] = useState("");
  const [home3, setHome3] = useState("");

  const loadInitView = () => {
    fetch("http://10.58.3.91:8000/song/home/1")
      .then(res => res.json())
      .then(res => setHomeData(res.song));
  }

  useEffect(() => {
    loadInitView();
  },[])

  useEffect(() => {
    console.log(homeData);
    
    const mapChill = homeData && homeData[0].Chill.map((param, idx) => {
      return <MainListItem key={idx} data={param} />;
    });

    const mapWeWork =
      homeData &&
      homeData[1].WeWork.map((param, idx) => {
        return (
          <MainListItem key={idx} data={param} />
        );
      });

    const mapGracefulRain =
      homeData &&
      homeData[2].GracefulRain.map((param, idx) => {
        return <MainListItem key={idx} data={param} />;
      });

    setHome1(mapChill);
    setHome2(mapWeWork);
    setHome3(mapGracefulRain);
    
  }, [homeData])

  return (
    <>
      <div>hi</div>
      <CategoryList>
        <p>chill</p>
        {home1}
      </CategoryList>
      <CategoryList>
        <p>wework</p>
        {home2}
      </CategoryList>
      <CategoryList>
        <p>GracefulRain</p>
        {home3}
      </CategoryList>
    </>
  );

}


export default Home;

const CategoryList = styled.div`
  display: flex;
  flex-direction: row;
`;