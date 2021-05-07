import {
    GET_USER,
    GET_ALL_USER,
    CREATE_USER,
    LOGIN_USER
} from "./actionTypes";
import UserService from "../services/userService";

export const getUser = (id) => async (dispatch) => {
    try {
        const res = await UserService.get(id);

        dispatch({
            type: GET_USER,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getAllUser = () => async (dispatch) => {
    try {
        const res = await UserService.get();

        dispatch({
            type: GET_ALL_USER,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const createUser = (data) => async (dispatch) => {
    try {
        const res = await UserService.create(data);

        dispatch({
            type: CREATE_USER,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const loginUser = (data) => async (dispatch) => {
    try {
        const res = await UserService.login(data);

        dispatch({
            type: LOGIN_USER,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};