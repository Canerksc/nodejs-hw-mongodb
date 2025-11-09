import { User } from '../db/User.js';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { Session } from '../db/Session.js';
import crypto from 'crypto';
import {
  ACCESS_TOKEN_LIFETIME_MS,
  REFRESH_TOKEN_LIFETIME_MS,
} from '../constants/index.js';


export const registerUser = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw createHttpError(409, 'Email Kullanımda');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const newUser = await User.create({
    ...payload,
    password: hashedPassword,
  });

  const userObj = newUser.toObject();
  delete userObj.password;

  return userObj;
};  

export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(401, 'Email or password invalid');
  }

  const isPasswordCorrect = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordCorrect) {
    throw createHttpError(401, 'Email or password invalid');
  }

  await Session.deleteOne({ userId: user._id });

  const accessToken = crypto.randomBytes(32).toString('hex');
  const refreshToken = crypto.randomBytes(32).toString('hex');

  const accessTokenValidUntil = new Date(Date.now() + ACCESS_TOKEN_LIFETIME_MS);
  const refreshTokenValidUntil = new Date(Date.now() + REFRESH_TOKEN_LIFETIME_MS);

  await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const refreshSession = async (refreshTokenFromCookie) => {
    const oldSession = await Session.findOne({
    refreshToken: refreshTokenFromCookie,
  });
  if (!oldSession) {
    throw createHttpError(401, 'Session not found or invalid');
  }
  if (new Date() > oldSession.refreshTokenValidUntil) {
    throw createHttpError(401, 'Refresh token expired');
  }
  await Session.deleteOne({ userId: oldSession.userId });

  const accessToken = crypto.randomBytes(32).toString('hex');
  const refreshToken = crypto.randomBytes(32).toString('hex');

  const accessTokenValidUntil = new Date(Date.now() + ACCESS_TOKEN_LIFETIME_MS);
  const refreshTokenValidUntil = new Date(Date.now() + REFRESH_TOKEN_LIFETIME_MS);

  await Session.create({
    userId: oldSession.userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });
  return {
    accessToken,
    refreshToken,
  };
};

export const logoutUser = async (refreshTokenFromCookie) => {
  await Session.deleteOne({ refreshToken: refreshTokenFromCookie });
};