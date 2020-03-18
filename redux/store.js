import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const store = createStore(
  rootReducer,
  // composeWithDevTools(applyMiddleware(thunk, logger))
);
export default store;


// 로그인 유저 정보
// 유저 아바타
// 유저 네임

// 해더바
// selectNav : 현재 선택된 네비게이션
// inputVal : 검색창 인풋내용
// messageChacked : 메세지 알람 빨간불 on/off
// notiChacked : 나를 팔로잉한사람 알람 빨간불 on/off

