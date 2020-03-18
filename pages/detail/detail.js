import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import theme from "../../global/theme";
import Sidebar from "../../components/layout/Layout"
import { connect } from "react-redux";
import { mapStateToProps } from "../../global/func";
import TitleBar from "../../components/sidebar/TitleBar";
import List from "../../components/sidebar/List";
import VisualizerCompDetail from "../../components/Visualizer/VisualizerCompDetail";

const mock = [
  {
    follower_name: "Conan Gray",
    follower_id: 26,
    follower_follower_count: 1,
    follower_song_count: 1,
    follower_image:
      "https://image.bugsm.co.kr/album/images/50/9459/945912.jpg?version=20200123100025.0",
    follow_at: "2020-03-18T08:27:17.784Z",
    is_checked: false,
    mutual_follow: true,
  },
  {
    follower_name: "ITZY (있지)",
    follower_id: 27,
    follower_follower_count: 1,
    follower_song_count: 1,
    follower_image:
      "https://image.bugsm.co.kr/album/images/50/203110/20311029.jpg?version=20200309180004.0",
    follow_at: "2020-03-18T08:27:24.143Z",
    is_checked: false,
    mutual_follow: true,
  },
];

const Detail = ({ metaList, state, music, arrNum = 0 }) => {

  const [comdata, setComdata] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    getComment();
  }, [metaList])

  const getComment = async () => {
    const data = await fetch(`http://localhost:3000/data/comment.json`);
    const dataJSON = await data.json();

    setComdata(dataJSON.data);
  };

  // 댓글 추가
  const addComment = (e) => {
    if (e.keyCode === 13) {
      const tempData = [...comdata];
      tempData.push({ user_id: "오종", content: comment, position: 820 * (state.nowSec / music.src.buffer.duration) });
      setComdata(tempData);
      setComment("");
    }
  };

  const typeComment = (e) => {
    setComment(e.target.value);
  };

  const bottomComment = comdata.map((el, idx) => {
    return (
      <div className="comment-item" key={idx}>
        <div className="comment-item-prof">
          <div className="comment-item-prof-image" />
          <div>
            <div className="comment-item-prof-id">{el.user_id}</div>
            <div className="comment-item-prof-content">{el.content}</div>
          </div>
        </div>
        <div>
          <span>6 days ago</span>
        </div>
      </div>
    );
  })

  return (
    <DetailBg>
      <DetailContainer>
        <div>
          <DetailPlayerContainer>
            <div>
              <PlayerDesc>
                <PlayerBtn>
                  <div />
                </PlayerBtn>
                <PlayerArtiTitle>
                  <div>
                    <span className="player-artist">
                      {metaList.song && metaList.song[arrNum].artist_name}
                    </span>
                  </div>
                  <div>
                    <span className="player-title">
                      {metaList.song && metaList.song[arrNum].song_name}
                    </span>
                  </div>
                </PlayerArtiTitle>
                <DaysTag>
                  <div>6 days ago</div>
                  <div># Souletiquette</div>
                </DaysTag>
              </PlayerDesc>
              <PlayerWave>
                <canvas width="820" height="100"></canvas>
                <VisualizerCompDetail
                  comdata={comdata}
                  metaData={metaList.song && metaList.song[arrNum]}
                />
              </PlayerWave>
            </div>
            <div>
              <PlayerImg
                src={metaList.song && metaList.song[arrNum].big_img_url}
              />
            </div>
          </DetailPlayerContainer>
        </div>
        <DetailBotContainer>
          <div className="dbc-left">
            <ReactionContainer>
              <ReactionTop>
                <img />
                <div>
                  <input
                    value={comment}
                    onChange={(event) => typeComment(event, "comment")}
                    onKeyDown={(event) => addComment(event)}
                    type="text"
                    placeholder="Write a comment"
                  />
                </div>
              </ReactionTop>
              <ReactionBot>
                <ReactionBtn>
                  <button>Like</button>
                  <button>Repost</button>
                  <button>Share</button>
                  <button>Add to Next Up</button>
                  <button>More</button>
                </ReactionBtn>
                <ReactionCount>
                  <img />
                  <span>3000</span>
                  <img />
                  <span>4</span>
                  <img />
                  <span>9</span>
                </ReactionCount>
              </ReactionBot>
            </ReactionContainer>
            <DetailBotLeft>
              <ProfileImg>
                <img className="prof-img" />
                <div>{metaList.song && metaList.song[arrNum].artist_name}</div>
                <div>
                  <img />
                  <span>37K</span>
                  <img />
                  <span>320</span>
                </div>
              </ProfileImg>
              <DescComment>
                <div className="bot-desc">
                  desc the vibes are pure and blissful, the passion is heartfelt
                  and the feelings? we are sure they are mutual. we hope this
                  brand new Souletiquette Radio 133 enlightens the aura that
                  surrounds your presence. we are now LIVE on the Official
                  Souletiquette Website. ➲ www.souletiquette.ie
                </div>
                <div className="bot-comment">
                  <div className="bot-comment-count">
                    <img />
                    <span>30 Comments</span>
                  </div>
                  <div className="bot-comment-list">{bottomComment}</div>
                </div>
              </DescComment>
            </DetailBotLeft>
          </div>
          <div>
            {/* <Sidebar /> */}
            <TitleBar
              icon={"faUser"}
              text={"Who to follow"}
              btnIcon={"faRedoAlt"}
              btnText={"Refresh"}
            />
            <div>
              {mock.map((li, idx) => {
                return <List key={idx} li={li} />;
              })}
            </div>
          </div>
        </DetailBotContainer>
      </DetailContainer>
    </DetailBg>
  );
};


export default connect(mapStateToProps)(Detail);

const DetailBg = styled.div`
  background-color: #f2f2f2;

  .comment-item {
    display: flex;
    justify-content: space-between;
    align-content: center;

    &-prof {
      display: flex;
      align-items: center;

      &-image {
        background-image: url("https://i1.sndcdn.com/avatars-000638276574-cm8lz5-t50x50.jpg");
        background-size: cover;
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

      &-id {
        color: #999;
        font-size: 12px;
      }

      &-content {
        color: #333;
        font-size: 12px;
      }
    }
  }
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  margin: 0 auto;
  width: 1240px;

`;

const DetailPlayerContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px;

  background: linear-gradient(
    135deg,
    rgb(216, 203, 208) 0%,
    rgb(108, 116, 124) 100%
  );
`;

const PlayerDesc = styled.div`
  display: flex;
  flex-direction: row;
`

const PlayerArtiTitle = styled.div`
  width: 575px;
  div{
    margin-bottom: 5px;
  }

  span {
    color: #cccccc;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 2px 7px 3px;
  }
  .player-title {
    color: #ffffff;
    padding: 4px 7px;
    margin-top: 10px;
    font-size: 24px;
    line-height: 37px;
  }
`;

const DaysTag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  div {
    background-color: #999;
    color: #fff;
    border-radius: 20px;
    padding: 0 7px;
    font-size: 16px;
    margin-bottom: 16px;
  }
`

const PlayerBtn = styled.div`
  background-color: ${theme.orange};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;

  div {
    background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE4cHgiIGhlaWdodD0iMjlweCIgdmlld0JveD0iMCAwIDE4IDI5IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4yLjIgKDk5ODMpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPlBsYXkgNjA8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBza2V0Y2g6dHlwZT0iTVNQYWdlIj4KICAgICAgICA8ZyBpZD0iYnV0dG9ucyIgc2tldGNoOnR5cGU9Ik1TQXJ0Ym9hcmRHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE2NjUuMDAwMDAwLCAtODE4LjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNMTY2NSw4NDcgTDE2NjkuMTUzODUsODMyLjUgTDE2NjUsODE4IEwxNjgzLDgzMi41IEwxNjY1LDg0NyBaIiBpZD0iUGxheS02MCIgc2tldGNoOnR5cGU9Ik1TU2hhcGVHcm91cCI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+")
      no-repeat;
    background-size: auto auto;
    background-position: center;
    width: 18px;
    height: 29px;
  }
`;

const PlayerImg = styled.div`
  background: url(${({src}) => src ? src : "https://i1.sndcdn.com/artworks-BVfJyPmoUciZ1Xe7-7W3ajw-t500x500.jpg"})
    no-repeat;
  background-size: 340px;

  width: 340px;
  height: 340px;
`;

const PlayerWave = styled.div`
  width: 820px;
  height: 100px;
`

const DetailBotContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 30px 0 30px;
  .dbc-left {
    border-right: 1px solid #f2f2f2;
  }
`;

const ReactionContainer = styled.div`
  padding: 20px 30px 5px 0;
`;

const ReactionTop = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  border-radius: 4px;

  img {
    background: url("https://i1.sndcdn.com/avatars-000031467940-4w3p6q-t50x50.jpg")
      no-repeat;
    background-size: 40px 40px;
    width: 40px;
    height: 40px;
  }

  div {
    background-color: #f2f2f2;
    padding: 5px;
    border: 1px solid #e5e5e5;

    input {
      outline: none;
      border: 1px solid #e5e5e5;
      width: 765px;
      height: 27px;

      padding-left: 7px;
    }
  }
`;

const ReactionBot = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #f2f2f2;
  margin-bottom: 20px;
  padding-bottom: 20px;
`;

const ReactionBtn = styled.div`
  button {
    background-color: white;
    outline: none;
    border-radius: 5px;
    border: 1px solid #cccccc;
    width: auto;
    height: 26px;
    padding: 0 10px 0 25px;
    margin-right: 5px;
    font-size: 14px;

    &:nth-child(1) {
      background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+DQogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjAuMyAoNzg5MSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+DQogICAgPHRpdGxlPnN0YXRzX2xpa2VzX2dyZXk8L3RpdGxlPg0KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPg0KICAgIDxkZWZzPjwvZGVmcz4NCiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBza2V0Y2g6dHlwZT0iTVNQYWdlIj4NCiAgICAgICAgPHBhdGggZD0iTTEwLjgwNDk4MTgsMyBDOC43ODQ3MTU3OSwzIDguMDAwNjUyODUsNS4zNDQ4NjQ4NiA4LjAwMDY1Mjg1LDUuMzQ0ODY0ODYgQzguMDAwNjUyODUsNS4zNDQ4NjQ4NiA3LjIxMjk2Mzg3LDMgNS4xOTYwNDQ5NCwzIEMzLjQ5NDMxMzE4LDMgMS43NDgzNzQsNC4wOTU5MjY5NCAyLjAzMDA4OTk2LDYuNTE0MzA1MzIgQzIuMzczNzI3NjUsOS40NjY3Mzc3NSA3Ljc1NDkxOTE3LDEyLjk5Mjg3MzggNy45OTMxMDk1OCwxMy4wMDEwNTU3IEM4LjIzMTI5OTk4LDEzLjAwOTIzNzggMTMuNzMwOTgyOCw5LjI3ODUzNzggMTMuOTgxNDU5LDYuNTAxMjQwNSBDMTQuMTg3ODY0Nyw0LjIwMDk3MDIzIDEyLjUwNjcxMzYsMyAxMC44MDQ5ODE4LDMgWiIgaWQ9IkltcG9ydGVkLUxheWVycyIgZmlsbD0iIzAwMDAwMCIgc2tldGNoOnR5cGU9Ik1TU2hhcGVHcm91cCI+PC9wYXRoPg0KICAgIDwvZz4NCjwvc3ZnPg0K")
        no-repeat 5px 50%;
    }
    &:nth-child(2) {
      background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+DQogIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4wLjMgKDc4OTEpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPg0KICA8dGl0bGU+c3RhdHNfcmVwb3N0PC90aXRsZT4NCiAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogIDxkZWZzLz4NCiAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+DQogICAgPGcgaWQ9InJlcG9zdC0iIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIGZpbGw9InJnYigzNCwgMzQsIDM0KSI+DQogICAgICA8cGF0aCBkPSJNMiw2IEwyLDExLjAwMDM4NSBDMiwxMi4xMDQ3NDE5IDIuOTAxOTUwMzYsMTMgNC4wMDg1MzAyLDEzIEwxMC45OTU3MzQ5LDEzIEwxMC45OTU3MzQ5LDEzIEwxMCwxMyBMMTAsMTMgTDgsMTEgTDQsMTEgTDQsNiBMMy41LDYgTDYsNiBMMywzIEwwLDYgTDIsNiBMMiw2IFogTTYsMyBMNS4wMDQyNjUxLDMgTDExLjk5MTQ2OTgsMyBDMTMuMDk4MDQ5NiwzIDE0LDMuODk1MjU4MTIgMTQsNC45OTk2MTQ5OCBMMTQsMTAgTDEyLDEwIEwxMiw1IEw4LDUgTDYsMyBaIE0xNiwxMCBMMTAsMTAgTDEzLDEzIEwxNiwxMCBaIiBpZD0iUmVjdGFuZ2xlLTQzIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIi8+DQogICAgPC9nPg0KICA8L2c+DQo8L3N2Zz4NCg==")
        no-repeat 5px 50%;
    }
    &:nth-child(3) {
      background: url("https://a-v2.sndcdn.com/assets/images/share-e2febe1d.svg")
        no-repeat 5px 50%;
    }
    &:nth-child(4) {
      background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMGgyMHYyMEgweiIvPgogICAgICAgIDxwYXRoIGZpbGw9InJnYigzNCwgMzQsIDM0KSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNNCA5aDEwdjJINFY5em0wIDRoMTB2Mkg0di0yem0wLThoOHYySDRWNXptMTAtNGw0IDMtNCAzVjF6Ii8+CiAgICA8L2c+Cjwvc3ZnPgo=")
        no-repeat 5px 50%;
    }
    &:nth-child(5) {
      background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE0cHgiIGhlaWdodD0iNHB4IiB2aWV3Qm94PSIwIDAgMTQgNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICA8dGl0bGU+bW9yZTwvdGl0bGU+CiAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9InJnYigzNCwgMzQsIDM0KSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIyIi8+CiAgICA8Y2lyY2xlIGN4PSI3IiBjeT0iMiIgcj0iMiIvPgogICAgPGNpcmNsZSBjeD0iMTIiIGN5PSIyIiByPSIyIi8+CiAgPC9nPgo8L3N2Zz4K")
        no-repeat 5px 50%;
    }
  }
`;

const ReactionCount = styled.div`

  img {
    width: 16px;
    height: 16px;

    :nth-of-type(1) {
      background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+DQogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjAuMyAoNzg5MSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+DQogICAgPHRpdGxlPnN0YXRzX3BsYXkgNDwvdGl0bGU+DQogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogICAgPGRlZnMvPg0KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHNrZXRjaDp0eXBlPSJNU1BhZ2UiPg0KICAgICAgICA8ZyBpZD0ic3RhdHNfcGxheS0iIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIGZpbGw9InJnYigxNTMsIDE1MywgMTUzKSI+DQogICAgICAgICAgICA8cGF0aCBkPSJNNCwxMyBMNCwzIEwxMyw4IEw0LDEzIFoiIGlkPSJzdGF0c19wbGF5LTMiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiLz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg0K")
        no-repeat 100% 100%;
    }
    :nth-of-type(2) {
      background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+DQogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjAuMyAoNzg5MSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+DQogICAgPHRpdGxlPnN0YXRzX2xpa2VzX2dyZXk8L3RpdGxlPg0KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPg0KICAgIDxkZWZzLz4NCiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBza2V0Y2g6dHlwZT0iTVNQYWdlIj4NCiAgICAgICAgPHBhdGggZD0iTTEwLjgwNDk4MTgsMyBDOC43ODQ3MTU3OSwzIDguMDAwNjUyODUsNS4zNDQ4NjQ4NiA4LjAwMDY1Mjg1LDUuMzQ0ODY0ODYgQzguMDAwNjUyODUsNS4zNDQ4NjQ4NiA3LjIxMjk2Mzg3LDMgNS4xOTYwNDQ5NCwzIEMzLjQ5NDMxMzE4LDMgMS43NDgzNzQsNC4wOTU5MjY5NCAyLjAzMDA4OTk2LDYuNTE0MzA1MzIgQzIuMzczNzI3NjUsOS40NjY3Mzc3NSA3Ljc1NDkxOTE3LDEyLjk5Mjg3MzggNy45OTMxMDk1OCwxMy4wMDEwNTU3IEM4LjIzMTI5OTk4LDEzLjAwOTIzNzggMTMuNzMwOTgyOCw5LjI3ODUzNzggMTMuOTgxNDU5LDYuNTAxMjQwNSBDMTQuMTg3ODY0Nyw0LjIwMDk3MDIzIDEyLjUwNjcxMzYsMyAxMC44MDQ5ODE4LDMgWiIgaWQ9IkltcG9ydGVkLUxheWVycyIgZmlsbD0icmdiKDE1MywgMTUzLCAxNTMpIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIi8+DQogICAgPC9nPg0KPC9zdmc+DQo=")
        no-repeat 100% 100%;
    }
    :nth-of-type(3) {
      background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+DQogIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4wLjMgKDc4OTEpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPg0KICA8dGl0bGU+c3RhdHNfcmVwb3N0PC90aXRsZT4NCiAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogIDxkZWZzLz4NCiAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+DQogICAgPGcgaWQ9InJlcG9zdC0iIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIGZpbGw9InJnYigxNTMsIDE1MywgMTUzKSI+DQogICAgICA8cGF0aCBkPSJNMiw2IEwyLDExLjAwMDM4NSBDMiwxMi4xMDQ3NDE5IDIuOTAxOTUwMzYsMTMgNC4wMDg1MzAyLDEzIEwxMC45OTU3MzQ5LDEzIEwxMC45OTU3MzQ5LDEzIEwxMCwxMyBMMTAsMTMgTDgsMTEgTDQsMTEgTDQsNiBMMy41LDYgTDYsNiBMMywzIEwwLDYgTDIsNiBMMiw2IFogTTYsMyBMNS4wMDQyNjUxLDMgTDExLjk5MTQ2OTgsMyBDMTMuMDk4MDQ5NiwzIDE0LDMuODk1MjU4MTIgMTQsNC45OTk2MTQ5OCBMMTQsMTAgTDEyLDEwIEwxMiw1IEw4LDUgTDYsMyBaIE0xNiwxMCBMMTAsMTAgTDEzLDEzIEwxNiwxMCBaIiBpZD0iUmVjdGFuZ2xlLTQzIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIi8+DQogICAgPC9nPg0KICA8L2c+DQo8L3N2Zz4NCg==")
        no-repeat 100% 100%;
    }
  }
`;

const DetailBotLeft = styled.div`
  display: flex;
  flex-direction: row;
`

const ProfileImg = styled.div`
  width: 150px;

  .prof-img {
    background: url("https://i1.sndcdn.com/avatars-000631523748-6rq6yo-t120x120.jpg")
      no-repeat;
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  div {
    img {

    }
    span {

    }
  }
`;

const DescComment = styled.div`
  display: flex;
  flex-direction: column;

  width: 670px;

  .bot-desc {
  }

  .bot-comment {
    &-count {
      border-bottom: 1px solid #f2f2f2;
      margin-top: 20px;
      padding-bottom: 7px;
    }
    &-list {
      padding-top: 7px;
    }
  }
`;
