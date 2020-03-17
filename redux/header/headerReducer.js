import { CHANGE_NAV, SEARCH_INPUT_VAL } from "./headerTypes";

const initState = {
  selectNav: {},
  inputVal : ''
};

const headerReduder = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_NAV:
      return {
        ...state,
        selectNav: action.payload.selectNav
      };
    case SEARCH_INPUT_VAL :
      return {
        ...state,
        inputVal: action.payload.inputVal,
        inputlength: action.payload.length
      };

    default:
      return state;
  }
};


export default headerReduder;
