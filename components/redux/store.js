import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import headerReducer from './header/headerReducer';

const store = createStore(
  headerReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);
export default store;


// 로그인 유저 정보
// - 유저 아바타
// - 유저 네임

// 해더바 상태
// - 현재 선택 페이지
// - 현재 팝업 오픈 : off / 유저메뉴 / 3닷메뉴 / 알림목록 / 메세지목록
// -
