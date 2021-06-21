import {getCategories} from "./getCategories";

export const getCategory = (state) => (idCategory) => {
    const categories = getCategories(state).filter(category => category.id === idCategory);
    return categories[0]
};
