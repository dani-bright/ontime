export const SetCategories = "category/set-categories";

export const setCategories = (categories) => {
    return {
        type: SetCategories,
        payload: {categories}
    }
};