export const initialState = {
    user: null,
    token: null,
    tracks: null,
    playlists: [],
    playing: false,
    item: null,
    currentPlaylist: null,
    track: null,
  };
  
  const reducer = (state, action) => {
    console.log(action);
  
    switch (action.type) {
      case "SET_USER":
        return {
          ...state,
          user: action.user,
        };
      case "SET_TOKEN":
        return {
          ...state,
          token: action.token,
        };
      case "SET_TRACKS": {
        return {
          ...state,
          tracks: action.tracks,
        };
      }
      case "SET_TRACK": {
        return {
          ...state,
          track: action.track,
        };
      }
      case "SET_PLAYLISTS":
        return {
          ...state,
          playlists: action.playlists,
        };
        case "SET_CURRENT_PLAYLIST": {
          let currentPlaylist = null;
          state.playlists.items.forEach((playlist) => {
            if (playlist.id === action.id) {
              currentPlaylist = playlist;
            }
          });
          return {
            ...state,
            currentPlaylist: currentPlaylist,
          };
        }
      case "SET_DISCOVER_WEEKLY":
        return {
          ...state,
          discover_weekly: action.discover_weekly,
        };
      default:
        return state;
    }
  };
  
  export default reducer;