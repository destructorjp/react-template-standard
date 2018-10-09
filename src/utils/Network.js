import { getFirebaseIdToken } from './Firebase';
import Config from './Config';
import * as types from '../constants/ActionTypes';

function buildParamsWithUrl(url, params, options) {
  const query = Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');

  const uri = `${url}?${query}`;

  return { uri, options };
}

function buildParamsWithBody(url, params, options) {
  return {
    uri: url,
    options: {
      ...options,
      body: JSON.stringify(params)
    }
  };
}

function buildFetchUrlAndParams(url, method, params, options) {
  if (method === 'GET') {
    return buildParamsWithUrl(url, params, options);
  }

  return buildParamsWithBody(url, params, options);
}

function timeout(ms, promise) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error());
    }, ms);

    promise.then(resolve, reject).catch(error => console.log(error));
  });
}

function getErrorObject(code, message) {
  return {
    error: {
      code,
      message
    }
  };
}

export async function request(
  dispatch,
  method,
  path,
  { params = {}, headers = {} } = {}
) {
  const baseURL = Config.CLOUD_FUNCTIONS_BASE_URL;

  let token = '';

  try {
    token = await getFirebaseIdToken();
  } catch (e) {
    //
  }

  let paramsWithToken = params;

  if (token) {
    paramsWithToken = {
      ...paramsWithToken,
      idToken: token
    };
  }

  const fetchHeaders = {
    ...headers
  };

  const url = path.match('^http') ? path : `${baseURL}${path}`;

  const fetchOptions = {
    method,
    headers: fetchHeaders
  };

  const { uri, options } = buildFetchUrlAndParams(
    url,
    method,
    paramsWithToken,
    fetchOptions
  );

  let response = null;

  try {
    response = await timeout(30000, fetch(uri, options));
  } catch (e) {
    // timeout
    response = null;
  }

  if (!response) {
    return getErrorObject(
      'network_error',
      'ネットワーク環境を確認してください。'
    );
  }

  const { status } = response;

  if (status === 503) {
    dispatch({
      type: types.IN_MAINTENANCE
    });

    return getErrorObject('maintenance', '現在、メンテナンス中です。');
  }

  if (status === 401) {
    dispatch({
      type: types.NOT_AUTHENTICATED_OR_INVALIDATED
    });

    return getErrorObject(
      'authentication_failed',
      'もう一度ログインしてください。'
    );
  }

  let result = null;

  try {
    result = await response.json();
  } catch (e) {
    result = null;
  }

  if (status === 400 || status === 403 || status === 404 || status === 500) {
    return {
      error: result
    };
  }

  return { response: result };
}
