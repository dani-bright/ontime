import {ChangeSelectedCategory} from "../action-creator/changeSelectedCategory";

const initialState = {
    selectedCategory: undefined
};

const selectedCategory = (state = initialState, action) => {
    switch (action.type) {
        case ChangeSelectedCategory:
            return action.payload.categoryId;
        default:
            return state
    }
};

export default selectedCategory;