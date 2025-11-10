import createHttpError from 'http-errors';
import { REFRESH_TOKEN_LIFETIME_MS } from '../constants/index.js';
import { 
    loginUser, 
    registerUser,
    refreshSession,
    logoutUser,
    sendResetPasswordEmail,
    resetPassword,
} from '../services/auth.js';

export const registerUserController = async (req, res) => {
    const userData = await registerUser(req.body);

    res.status(201).json({
    status: 201,
    message: 'Bir kullanıcı başarıyla kaydedildi!',
    data: userData,
  });
};

export const loginUserController = async (req, res) => {
  const { accessToken, refreshToken } = await loginUser(req.body);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TOKEN_LIFETIME_MS),
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  // 1. Refresh token'ı çerezden al
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    // Çerez zaten yoksa, kullanıcı zaten çıkış yapmış demektir.
    // Talimatlara uygun olarak 204 gönderip işlemi bitiriyoruz.
    return res.status(204).send();
  }

  await logoutUser(refreshToken);
  res.clearCookie('refreshToken');
  res.status(204).send();
};

export const refreshSessionController = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    throw createHttpError(401, 'Refresh token cookie is missing');
  }

  const {
    accessToken,
    refreshToken: newRefreshToken,
  } = await refreshSession(refreshToken);

  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TOKEN_LIFETIME_MS),
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken,
    },
  });
};

export const sendResetEmailController = async (req, res) => {
  const { email } = req.body;

  await sendResetPasswordEmail(email);

  res.status(200).json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);

  res.status(200).json({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
};