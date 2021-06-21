import {SetUser} from "../action-creator/users/user/setUser";

const initialState = {
    user: null
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case SetUser:
            return action.payload.user;

        default:
            return state
    }
};

export default user