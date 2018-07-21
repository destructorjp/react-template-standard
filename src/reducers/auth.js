import { REHYDRATE } from 'redux-persist/lib/constants';

import * as types from '../constants/ActionTypes';

const initialState = {
  uid: ''
};

const volatileState = {
  isSignUpLoading: false,
  isSignUpFailed: false,
  signUpError: null,
  isSignInLoading: false,
  isSignInFailed: false,
  signInError: null,
  isAuthLoading: false,
  isAuthFailed: false,
  authError: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE: {
      if (!action.payload || !action.payload.auth) {
        return {
          ...state,
          ...volatileState
        };
      }

      const incoming = action.payload.auth;

      return {
        ...state,
        ...incoming,
        ...volatileState
      };
    }

    // auth with email and password
    case types.SIGN_UP_WITH_EMAIL_AND_PASSWORD_ENTRY:
      return {
        ...state,
        isSignUpLoading: true
      };

    case types.SIGN_UP_WITH_EMAIL_AND_PASSWORD_SUCCESS:
      return {
        ...state,
        isSignUpLoading: false,
        isSignUpFailed: false
      };

    case types.SIGN_UP_WITH_EMAIL_AND_PASSWORD_FAILED:
      return {
        ...state,
        isSignUpLoading: false,
        isSignUpFailed: true,
        signUpError: action.error
      };

    case types.SIGN_UP_WITH_EMAIL_AND_PASSWORD_RECOVER:
      return {
        ...state,
        isSignUpFailed: false
      };

    // sign in
    case types.SIGN_IN_WITH_EMAIL_AND_PASSWORD_ENTRY:
      return {
        ...state,
        isSignInLoading: true
      };

    case types.SIGN_IN_WITH_EMAIL_AND_PASSWORD_SUCCESS:
      return {
        ...state,
        uid: action.state.uid,
        isSignInLoading: false,
        isSignInFailed: false
      };

    case types.SIGN_IN_WITH_EMAIL_AND_PASSWORD_FAILED:
      return {
        ...state,
        isSignInLoading: false,
        isSignInFailed: true,
        signInError: action.error
      };

    case types.SIGN_IN_WITH_EMAIL_AND_PASSWORD_RECOVER:
      return {
        ...state,
        isSignInFailed: false
      };

    // auth with phone number
    case types.AUTH_WITH_PHONE_NUMBER_ENTRY:
      return {
        ...state,
        isAuthLoading: true
      };

    case types.AUTH_WITH_PHONE_NUMBER_SUCCESS:
      return {
        ...state,
        isAuthLoading: false,
        isAuthFailed: false
      };

    case types.AUTH_WITH_PHONE_NUMBER_FAILED:
      return {
        ...state,
        isAuthLoading: false,
        isAuthFailed: true,
        authError: action.error
      };

    case types.AUTH_WITH_PHONE_NUMBER_RECOVER:
      return {
        ...state,
        isAuthFailed: false
      };

    default:
      return state;
  }
};
