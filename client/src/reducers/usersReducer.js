import { types } from "../types/types";

const initialState = {
    users: [],
    userCreated: {}
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.usersCreate:
            return {
                ...state,
                userCreated: action.payload
            }
        case types.usersLoad:
            return {
                ...state,
                users: action.payload
            }


        default:
            return state;
    }
}