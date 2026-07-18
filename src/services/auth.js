import { Session } from '../models/session.js';

const FIFTEEN_MINUTES = 15 * 60 * 1000;
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export const createSession = async (userId) => {
  const accessToken = crypto.randomUUID();
  const refreshToken = crypto.randomUUID();

  const accessTokenValidUntil = Date.now() + FIFTEEN_MINUTES;
  const refreshTokenValidUntil = Date.now() + THIRTY_DAYS;

  return Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });
};

export const setCookies = (res, session) => {
  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: FIFTEEN_MINUTES,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: THIRTY_DAYS,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: THIRTY_DAYS,
  });
};

export const clearCookies = (res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');
};
