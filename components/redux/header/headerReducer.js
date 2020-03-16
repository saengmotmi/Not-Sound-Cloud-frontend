import { CHANGE_NAV } from './headerTypes';

const initState = {
  selectNav: {}
};

const headerReduder = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_NAV:
      return {
        ...state,
        selectNav: action.payload.selectNav
      };
    default:
      return state;
  }
};


export default headerReduder;
