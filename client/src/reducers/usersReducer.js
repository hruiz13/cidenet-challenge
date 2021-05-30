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
        case types.userEdit:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return user;
                    }
                })
            }

        case types.userDelete:
            return {
                ...state,
                users: state.users.filter(user => user.id !== Number(action.payload))
            }


        default:
            return state;
    }
}