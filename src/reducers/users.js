import {
    CREATE_USER,
    GET_USER,
    GET_ALL_USER,
    LOGIN_USER
} from "../actions/actionTypes";

const initialState = [];

function userReducer(users = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_USER:
            return payload;

        case GET_ALL_USER:
            return payload;

        case CREATE_USER:
            return [...users, payload];

        case LOGIN_USER:
            return payload;

        default:
            return users;
    }
}

export default userReducer;