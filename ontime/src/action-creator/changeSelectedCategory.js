export const ChangeSelectedCategory = "selected-category/change-selected-category";

export const changeSelectedCategory = (categoryId) => {
    return {
        type: ChangeSelectedCategory,
        payload: {categoryId}
    }
};