import {
    GET_STATUS,
    GET_ALL_STATUS,
    CREATE_STATUS,
    UPDATE_STATUS,
    DELETE_STATUS
} from "../actions/actionTypes";
import StatusService from "../services/statusService";

export const getStatus = (id) => async (dispatch) => {
    try {
        const res = await StatusService.get(id);

        dispatch({
            type: GET_STATUS,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};

export const getAllStatus = () => async (dispatch) => {
    try {
        const res = await StatusService.getAll();

        dispatch({
            type: GET_ALL_STATUS,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};

export const createStatus = (data) => async (dispatch) => {
    try {
        const res = await StatusService.create(data, data);

        dispatch({
            type: CREATE_STATUS,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const updateStatus = (data) => async (dispatch) => {
    try {
        const res = await StatusService.update(data);

        dispatch({
            type: UPDATE_STATUS,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteStatus = (id) => async (dispatch) => {
    try {
        const res = await StatusService.delete(id);

        dispatch({
            type: DELETE_STATUS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};