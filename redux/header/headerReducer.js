import {
  CHANGE_NAV,
  SEARCH_INPUT_VAL,
  MESSAGE_CHECKED,
  NOTI_CHECKED,
  MESSAGE_DATA,
  NOTI_DATA,
  USER_DATA
} from "./headerTypes";

const initState = {
  selectNav: {},
  inputVal: "",
  messageChacked: true,
  notiChacked: true,
  messageData: [],
  notiData: [],
  // userData:{}
  userData: {
    user_id: 117,
    user_name: "",
    user_image:
      "https://image.bugsm.co.kr/album/images/50/203046/20304638.jpg?version=20200208002354.0"
  }
};

const headerReduder = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_NAV:
      return {
        ...state,
        selectNav: action.payload.selectNav
      };
    case SEARCH_INPUT_VAL:
      return {
        ...state,
        inputVal: action.payload.inputVal,
        inputlength: action.payload.length
      };
    case MESSAGE_CHECKED:
      return {
        ...state,
        messageChacked: action.payload.messageChacked
      };

    case NOTI_CHECKED:
      return {
        ...state,
        notiChacked: action.payload.notiChacked
      };
    case MESSAGE_DATA:
      return {
        ...state,
        messageData: action.payload.messageData
      };

    case NOTI_DATA:
      return {
        ...state,
        notiData: action.payload.notiData
      };

    case USER_DATA:
      return {
        ...state,
        userData: action.payload.userData
      };

    default:
      return state;
  }
};


export default headerReduder;
