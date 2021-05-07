import {
    GET_CRIMINALCODE,
    GET_ALL_CRIMINALCODE,
    CREATE_CRIMINALCODE,
    UPDATE_CRIMINALCODE,
    DELETE_CRIMINALCODE
} from "../actions/actionTypes";
import CriminalCodeServices from "../services/criminalCodeService";

export const getCriminalCode = (id) => async (dispatch) => {
    try {
        const res = await CriminalCodeServices.get(id);

        dispatch({
            type: GET_CRIMINALCODE,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const getAllCriminalCode = () => async (dispatch) => {
    try {
        const res = await CriminalCodeServices.getAll();

        dispatch({
            type: GET_ALL_CRIMINALCODE,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const createCriminalCode = (data) => async (dispatch) => {
    try {
        const res = await CriminalCodeServices.create(data);

        dispatch({
            type: CREATE_CRIMINALCODE,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const updateCriminalCode = (data) => async (dispatch) => {
    try {
        const res = await CriminalCodeServices.update(data);

        dispatch({
            type: UPDATE_CRIMINALCODE,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteCriminalCode = (id) => async (dispatch) => {
    try {
        const res = await CriminalCodeServices.delete(id);

        dispatch({
            type: DELETE_CRIMINALCODE,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};