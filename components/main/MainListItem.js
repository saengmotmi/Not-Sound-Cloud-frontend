import { useState, useEffect } from "react";
import styled, { css } from "styled-components";


const MainListItem = (props) => {

  const {song_id, song_name, song_path, small_img_url, big_img_url, artist_name} = props.data
  console.log(props.data);

  return (
    <ListItem>
      {/* <li>{song_id}</li> */}
      {/* <li>{song_path}</li> */}
      {/* <img src={small_img_url} /> */}
      <img src={big_img_url} />
      <div>{song_name}</div>
      <div>{artist_name}</div>
    </ListItem>
  );

}


export default MainListItem;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
`;