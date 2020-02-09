//nowPlaying is not at the same location in state on initial state and after
export const getNowPlaying = state => state.nowPlaying.audio ? state.nowPlaying : state.nowPlaying.nowPlaying;
