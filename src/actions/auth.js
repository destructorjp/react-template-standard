import {
  signInWithPhoneNumber,
  signUpWithEmailAndPassword as firebaseSignUpWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword
} from '../utils/Firebase';
import * as types from '../constants/ActionTypes';

function signUpWithEmailAndPasswordEntry() {
  return {
    type: types.SIGN_UP_WITH_EMAIL_AND_PASSWORD_ENTRY
  };
}

function signUpWithEmailAndPasswordSuccess() {
  return {
    type: types.SIGN_UP_WITH_EMAIL_AND_PASSWORD_SUCCESS
  };
}

function signUpWithEmailAndPasswordFailed(error) {
  return {
    type: types.SIGN_UP_WITH_EMAIL_AND_PASSWORD_FAILED,
    error
  };
}

export function recoverSignUpWithEmailAndPassword() {
  return {
    type: types.SIGN_UP_WITH_EMAIL_AND_PASSWORD_RECOVER
  };
}

export function signUpWithEmailAndPassword(email, password) {
  return dispatch => {
    dispatch(signUpWithEmailAndPasswordEntry());

    return firebaseSignUpWithEmailAndPassword(email, password)
      .then(() => {
        return dispatch(signUpWithEmailAndPasswordSuccess());
      })
      .catch(error => {
        if (error) {
          return dispatch(signUpWithEmailAndPasswordFailed(error));
        }
      });
  };
}

function signInWithEmailAndPasswordEntry() {
  return {
    type: types.SIGN_IN_WITH_EMAIL_AND_PASSWORD_ENTRY
  };
}

function signInWithEmailAndPasswordSuccess(uid) {
  return {
    type: types.SIGN_IN_WITH_EMAIL_AND_PASSWORD_SUCCESS,
    state: {
      uid
    }
  };
}

function signInWithEmailAndPasswordFailed(error) {
  return {
    type: types.SIGN_IN_WITH_EMAIL_AND_PASSWORD_FAILED,
    error
  };
}

export function recoverSignInWithEmailAndPassword() {
  return {
    type: types.SIGN_IN_WITH_EMAIL_AND_PASSWORD_RECOVER
  };
}

export function signInWithEmailAndPassword(email, password) {
  return dispatch => {
    dispatch(signInWithEmailAndPasswordEntry());

    return firebaseSignInWithEmailAndPassword(email, password)
      .then(result => {
        const { user } = result;

        return dispatch(signInWithEmailAndPasswordSuccess(user.uid));
      })
      .catch(error => {
        if (error) {
          return dispatch(signInWithEmailAndPasswordFailed(error));
        }
      });
  };
}

function authWithPhoneNumberEntry() {
  return {
    type: types.AUTH_WITH_PHONE_NUMBER_ENTRY
  };
}

function authWithPhoneNumberSuccess() {
  return {
    type: types.AUTH_WITH_PHONE_NUMBER_SUCCESS
  };
}

function authWithPhoneNumberFailed(error) {
  return {
    type: types.AUTH_WITH_PHONE_NUMBER_FAILED,
    error
  };
}

export function recoverAuthWithPhoneNumber() {
  return {
    type: types.AUTH_WITH_PHONE_NUMBER_RECOVER
  };
}

export function authWithPhoneNumber(phoneNumber) {
  return dispatch => {
    dispatch(authWithPhoneNumberEntry());

    return signInWithPhoneNumber()
      .then(() => {
        return dispatch(authWithPhoneNumberSuccess());
      })
      .catch(error => {
        if (error) {
          return dispatch(authWithPhoneNumberFailed(error));
        }
      });
  };
}
