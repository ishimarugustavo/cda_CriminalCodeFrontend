import { APP_LOAD } from "../actions/actionTypes";


const defaultState = {
    token: null
};

export default function common(state = defaultState, action) {
    switch (action.type) {
        case APP_LOAD:
            return {
                ...state,
                token: action.token || null,
                appLoaded: true,
            }

        default: 
            return state;
    }
};