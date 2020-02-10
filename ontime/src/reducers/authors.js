import {SetAuthors} from "../action-creator/authors/setAuthors";

const initialState = [];

const authors = (state = initialState, action) => {
    switch (action.type) {
        case SetAuthors:
            return action.payload.authors;

        default:
            return state
    }
};

export default authors;