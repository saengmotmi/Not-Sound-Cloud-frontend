import {
  CHANGE_NAV,
  SEARCH_INPUT_VAL,
  MESSAGE_CHECKED,
  NOTI_CHECKED,
  MESSAGE_DATA,
  NOTI_DATA
} from "./headerTypes";

// 선택한 네브 변경
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

// 메세지 빨간불 온오프
export const checkMessage = (val) => {
  return {
    type: MESSAGE_CHECKED,
    payload: { messageChacked: val }
  };
};

// 팔로워 빨간불 온오프
export const checkNoti = (val) => {
  return {
    type: NOTI_CHECKED,
    payload: { notiChacked: val }
  };
}

// 새로운 메세지 데이터 저장
export const saveMessageData = (data) => {
  return {
    type: NOTI_CHECKED,
    payload: { messageData: data }
  };
}

// 노티알람 내역 데이터 저장
export const saveNotiData = (data) => {
  return {
    type: NOTI_DATA,
    payload: { notiData: data }
  };
};

