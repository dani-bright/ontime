export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('redux');
        if (serializedState === null) {
            return {};
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('redux', serializedState);
    } catch {
        // ignore write errors
    }
};