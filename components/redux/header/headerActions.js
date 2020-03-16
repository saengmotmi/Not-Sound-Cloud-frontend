import { CHANGE_NAV } from './headerTypes';


export const changeNav = (selectNav) => {
  return {
    type: CHANGE_NAV,
    payload: { selectNav: selectNav }
  };
};

export default changeNav;
