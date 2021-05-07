import {
    GET_CRIMINALCODE,
    GET_ALL_CRIMINALCODE,
    CREATE_CRIMINALCODE,
    UPDATE_CRIMINALCODE,
    DELETE_CRIMINALCODE
} from "../actions/actionTypes"

const initialState = [];

function criminalCodeReducer(criminalCodes = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_CRIMINALCODE:
            return payload;

        case GET_ALL_CRIMINALCODE:
            return payload;

        case CREATE_CRIMINALCODE:
            return [...criminalCodes, payload];

        case UPDATE_CRIMINALCODE:
            return criminalCodes.map((criminalCode) => {
                if (criminalCode.id === payload.id) {
                    return {
                        ...criminalCode,
                        ...payload,
                    };
                } else {
                    return criminalCode;
                }
            });

        case DELETE_CRIMINALCODE:
            return criminalCodes.filter(({ id }) => id !== payload.id);

        default:
            return criminalCodes;
    }
}

export default criminalCodeReducer;