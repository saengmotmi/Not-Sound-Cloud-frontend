import { CHANGE_NAV, SEARCH_INPUT_VAL } from './headerTypes';

// 선택한 인풋 내용 변경
export const changeNav = (selectNav) => {
  return {
    type: CHANGE_NAV,
    payload: { selectNav: selectNav }
  };
};

// 검색창 인풋 내용 변경
export const  changeInputVal = (inputVal) =>{
  return {
    type: SEARCH_INPUT_VAL,
    payload: { inputVal: inputVal } // 객체로 넣지 않고 페이로드에 바로 입력받으면 파라미터의 length가 들어가네?
  };
}