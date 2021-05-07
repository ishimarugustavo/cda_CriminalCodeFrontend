import {
    GET_STATUS,
    GET_ALL_STATUS,
    CREATE_STATUS,
    UPDATE_STATUS,
    DELETE_STATUS
} from "../actions/actionTypes"

const initialState = [];

function statusReducer(status = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_STATUS:
            return payload;

        case GET_ALL_STATUS:
            return payload;

        case CREATE_STATUS:
            return [...status, payload];

        case UPDATE_STATUS:
            return status.map((status_) => {
                if (status_.id === payload.id) {
                    return {
                        ...status_,
                        ...payload,
                    };
                } else {
                    return status_;
                }
            });

        case DELETE_STATUS:
            return status.filter(({ id }) => id !== payload.id);

        default:
            return status;
    }
}

export default statusReducer;