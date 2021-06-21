import {SetUsers} from "../action-creator/users/setUsers";

const initialState = [];

const users = (state = initialState, action) => {
    switch (action.type) {
        case SetUsers:
            return action.payload.users;

        default:
            return state
    }
};

export default users