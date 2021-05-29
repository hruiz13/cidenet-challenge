import { types } from "../types/types";
import { notification } from 'antd';


const baseUrl = process.env.REACT_APP_API_URL;

const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message,
        description,
        duration: 5,
    });
};

export const checkDni = async (dni) => {
    try {
        const resp = await fetch(`${baseUrl}/users/${dni}`);
        const body = await resp.json();
        return body?.data;

    } catch (error) {
        console.log(error)
    }
}

export const addUser = (data) => {
    return async (dispatch) => {
        //dispatch(isLoading())
        try {
            const resp = await fetch(`${baseUrl}/users`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const body = await resp.json();
            if (body.data) {
                dispatch(saveUser(body.data))
                openNotificationWithIcon('success', 'Empleado guardado con exito!', 'El empleado fue guardado exitosamente, el correo será ' + body.data.email)
            } else {
                openNotificationWithIcon('error', 'Ocurrio un error', 'Intente nuevamente mas tarde, si persiste el error, contacte a soporte.')
            }
        } catch (err) {
            console.log(err)
        }
        //dispatch(isLoading())
    }
}

export const loadUsers = (data) => {
    return async (dispatch) => {
        //dispatch(isLoading())
        try {
            const resp = await fetch(`${baseUrl}/users`)
            const body = await resp.json();
            if (body.data) {
                dispatch(getUsers(body.data))
            } else {
                openNotificationWithIcon('error', 'Ocurrio un error', 'Intente nuevamente mas tarde, si persiste el error, contacte a soporte.')
            }
        } catch (err) {
            console.log(err)
        }
        //dispatch(isLoading())
    }
}



const getUsers = (payload) => ({
    type: types.usersLoad,
    payload
})
const saveUser = (payload) => ({
    type: types.usersCreate,
    payload
})

