import {loadState, saveState} from "./localStorage";
import {createStore} from "redux";
import routeReducer from "./reducers";

//persist state crashing app when deleting "redux" in localStorage --'
export const store = createStore(routeReducer, loadState());

store.subscribe(() => {
    saveState({
        user: store.getState().user,
        songs: store.getState().songs,
        albums: store.getState().albums,
        categories: store.getState().categories,
    });
});