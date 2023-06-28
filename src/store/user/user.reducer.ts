import { USER_ACTION_TYPES } from "./user.types";

interface ActionProps {
    type: string;
    payload: any;
}

const INITIAL_STATE = {
    currentUser: null,
};

export const userReducer = (state = INITIAL_STATE, action: ActionProps) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                currentUser: payload,
            };

        default:
            return state;
    }
};
