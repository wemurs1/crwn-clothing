import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

export const setCurrentUser = (user: any) =>
    (createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));

export const checkUserSession = () => (createAction(USER_ACTION_TYPES.CHECK_USER_SESSION, null));

export const googleSignInStart = () => (createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, null));

export const emailSignInStart = (email: string, password: string) => (createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password }));

export const signInSuccess = (user: any) => (createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user));

export const signInFailed = (error: any) => (createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error));

export const signUpStart = (email: string, password: string, displayName: string) =>
    (createAction(USER_ACTION_TYPES.SIGN_UP_START, { email, password, displayName }));

export const signUpSuccess = (user: string, additionalDetails: any) => (createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails }));

export const signUpFailed = (error: any) => (createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error));

export const signOutStart = () => createAction(USER_ACTION_TYPES.SIGN_OUT_START, null);

export const signOutSuccess = () => (createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS, null));

export const signOutFailed = (error: any) => (createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error));