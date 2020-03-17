import React,{useState, useEffect} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import theme, * as css from "../../global/theme";
import { connect } from "react-redux";
import UserAvatar from '../userAvatar/UserAvatar'



const SearchDropdown = ({inputVal}) => {
  const data = [
    {
      url: "https://i1.sndcdn.com/artworks-000242629294-7fotrp-t120x120.jpg",
      cate: "artist",
      name: "Aekasora",
      id: "1"
    },
    {
      url: "https://i1.sndcdn.com/artworks-000242629294-7fotrp-t120x120.jpg",
      cate: "artist",
      name: "Awake The Rapper",
      id: "2"
    },
    {
      url: "https://i1.sndcdn.com/artworks-000242629294-7fotrp-t120x120.jpg",
      cate: "artist",
      name: "August",
      id: "3"
    },
    {
      url: "https://i1.sndcdn.com/artworks-000242629294-7fotrp-t120x120.jpg",
      cate: "playlist",
      name: "Atwood - We Get",
      id: "4"
    },
    {
      url: "https://i1.sndcdn.com/artworks-000242629294-7fotrp-t120x120.jpg",
      cate: "playlist",
      name: "Whiskey And Morphine",
      id: "5"
    },
    { cate: "song", name: "Aucustic", id: "6" },
    { cate: "song", name: "aster", id: "7" },
    { cate: "song", name: "ash island", id: "8" },
    { cate: "song", name: "ariana grande", id: "9" },
    { cate: "song", name: "asmr", id: "10" },
    { cate: "song", name: "hello~~~", id: "11" },
    { cate: "song", name: "hello~~~", id: "12" },
    { cate: "song", name: "hello~~~", id: "13" },
    { cate: "song", name: "hello~~~", id: "14" },
    { cate: "song", name: "hello~~~", id: "15" },
    { cate: "song", name: "hello~~~", id: "16" },
    { cate: "song", name: "hello~~~", id: "17" }
  ];
  return (
    inputVal.length > 0 && (
      <>
        <SearchValue>
          <p>Search for "{inputVal}"</p>
        </SearchValue>
        <Ul>
          {/* // 데이터 목록중 최상 10 까지만 arr로 묶기 */}
          {data &&
            data
              .filter((_, idx) => idx < 10)
              .map((li, idx) => {
                if (li.cate ==='artist') {
                  return (
                    <Link href="/" key={idx + "-key-id-"}>
                      <Li>
                        <div>
                          <UserAvatar url={li.url} size="20px"/>
                          <span>{li.name + idx}</span>
                        </div>
                        <span>
                          <FontAwesomeIcon
                            icon={icon.faUser}
                            style={{ fontSize: "15px" }}
                          />
                        </span>
                      </Li>
                    </Link>
                  );
                } else if (li.cate ==='playlist') {
                  return (
                    <Link href="/" key={idx + "-key-id-"}>
                      <Li>
                        <div>
                          <UserAvatar url={li.url} size="20px" rect={true} />
                          <span>{li.name + idx}</span>
                        </div>
                        <span>
                          <FontAwesomeIcon
                            icon={icon.faRecordVinyl}
                            style={{ fontSize: "15px" }}
                          />
                        </span>
                      </Li>
                    </Link>
                  );
                } else if ( li.cate ==='song') {
                  return (
                    <Link href="/" key={idx + "-key-id-"}>
                      <Li>
                        <div>
                          <SearchIcon size="20px"/>
                          <span>{li.name + idx}</span>
                        </div>
                      </Li>
                    </Link>
                  );
                }})}
        </Ul>
      </>
    )
  );
};


const SearchValue = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 15px 15px;
  font-family: ${theme.font};
  background-color: ${theme.black};
  border: none;
  color: ${theme.gray};
  font-size: 16px;
  &:hover {
    color: ${theme.snow};
    background-color: ${theme.chacoal};
  }
`;



const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${theme.black};
  width: 518px;
  border-bottom: solid 1px ${theme.chacoal};
`;

const Li = styled.li`
  color: ${theme.lGray};
  font-family: ${theme.font};
  font-weight: 100;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content:space-between;
  min-width: 100%;
  padding: 12px 15px;
  div {
    display: flex;
    justify-content : center;
    text-align:center;
    span {
      margin-left: 10px;
    }
  }
`;
const SearchIcon = styled.div`
  /* background-color: red; */
  background-size: ${(props) => props.size || "10px"};
  width: 20px !important;
  height: 20px !important;
  ${css.searchIcon}
`;


const mapStateToProps = (state) => {
  return {
    inputVal : state.inputVal
  }
}
export default connect(mapStateToProps)(SearchDropdown);
