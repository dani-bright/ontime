export const SetAuthors = "authors/set-authors";

export const setAuthors = (authors) => {
    return {
        type: SetAuthors,
        payload: {authors}
    }
};