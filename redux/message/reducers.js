import { MSG_TO_USER_ID, MSG_RELOAD_DATA } from "./types";



const initState = {
  sendMsgUserId : {},
  reloadMsgData : []
};



const messageReducer = (state = initState, action) => {
  switch (action.type) {
    case MSG_TO_USER_ID:
      return {
        ...state,
        sendMsgUserId: action.payload.sendMsgUserId
      };

    case MSG_RELOAD_DATA:
      return {
        ...state,
        reloadMsgData: action.payload.reloadMsgData
      };
    default :
    return state;
  }
}


export default messageReducer