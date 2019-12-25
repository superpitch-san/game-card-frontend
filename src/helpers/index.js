import { createCookie, getCookie, deleteCookie } from './Cookie/Cookie';

import { validateHTTPS, validateHaveCookieName } from './Validate/Validate';

import { encrypt, decrypt } from './Crypto/Crypto';

import history from './History/History';

export {
  // cookie
  createCookie,
  getCookie,
  deleteCookie,
  // validate
  validateHTTPS,
  validateHaveCookieName,
  // crypto
  encrypt,
  decrypt,
  // history
  history,
};
