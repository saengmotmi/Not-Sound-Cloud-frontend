import { MSG_TO_USER_ID, MSG_RELOAD_DATA } from "./types";





export const setMsgToUserId = (id) => {
  return {
    type: MSG_TO_USER_ID,
    payload: {
      sendMsgUserId: id
    }
  };
}


export const reloadMsgData = (data) => {
  return {
    type: MSG_RELOAD_DATA,
    payload: {
      reloadMsgData : data
    }
  };
}