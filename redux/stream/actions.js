export const setMusicMetaList = (list) => {
  return {
    type: "MUSIC_METADATA",
    payload: list
  };
};

export const regSrc = (src) => {
  return {
    type: "REGISTER_SOURCE",
    payload: src,
  };
};

export const regCtx = (ctx) => {
  return {
    type: "REGISTER_CONTEXT",
    payload: ctx,
  };
};

export const regNode = (node) => {
  return {
    type: "REGISTER_NODE",
    payload: node,
  };
};


export const setPlaying = (state) => {
  return {
    type: "SET_PLAYING",
    payload: state,
  };
};

export const setPause = (state) => {
  return {
    type: "SET_PAUSE",
    payload: state,
  };
};

export const setVolume = (state) => {
  return {
    type: "SET_VOLUME",
    payload: state,
  };
};

export const setNowSongID = (state) => {
  return {
    type: "SET_NOW_SONG_ID",
    payload: state,
  };
};

export const setNowSec = (state) => {
  return {
    type: "SET_NOW_SEC",
    payload: state,
  };
};