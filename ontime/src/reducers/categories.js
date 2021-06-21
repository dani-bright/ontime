import {SetCategories} from "../action-creator/categories/setCategories";

const initialState = [];

const categories = (state = initialState, action) => {
    switch (action.type) {
        case SetCategories:
            return action.payload.categories;

        default:
            return state
    }
};

export default categories