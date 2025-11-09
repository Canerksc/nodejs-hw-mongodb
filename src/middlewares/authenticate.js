import createHttpError from 'http-errors';
import { Session } from '../db/Session.js';
import { User } from '../db/User.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw createHttpError(401, 'Authorization header missing');
  }

  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    throw createHttpError(
      401,
      'Authorization header format must be Bearer <token>',
    );
  }

  const session = await Session.findOne({ accessToken: token });
  if (!session) {
    throw createHttpError(401, 'Session not found or invalid token');
  }

  if (new Date() > session.accessTokenValidUntil) {
    throw createHttpError(401, 'Access token expired');
  }

  const user = await User.findById(session.userId);
  if (!user) {
    throw createHttpError(401, 'User not found for this session');
  }

  req.user = user;

  next();
};