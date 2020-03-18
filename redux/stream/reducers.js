const initState = {
  metaList: {},
  music: {},
  state: {
    volume: 0,
    isPause: false,
    isPlaying: false,
    nowSongID: 0,
    nowSec: 0
  },
};


const streamReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_NOW_SONG_ID":
      return { ...state, state: { ...state.state, nowSongID: action.payload } };
    case "SET_PLAYING":
      return { ...state, state: { ...state.state, isPlaying: action.payload } };
    case "SET_PAUSE":
      return { ...state, state: { ...state.state, isPause: action.payload } };
    case "SET_VOLUME":
      return { ...state, state: { ...state.state, volume: action.payload } };
    case "SET_NOW_SEC":
      return { ...state, state: { ...state.state, nowSec: action.payload } };
    case "MUSIC_METADATA":
      return { ...state, metaList: action.payload };
    case "REGISTER_SOURCE":
      return { ...state, music: { ...state.music, src: action.payload } };
    case "REGISTER_CONTEXT":
      return { ...state, music: { ...state.music, ctx: action.payload } };
    case "REGISTER_NODE":
      return { ...state, music: { ...state.music, node: action.payload } };

    default:
      return state;
  }
}

export default streamReducer