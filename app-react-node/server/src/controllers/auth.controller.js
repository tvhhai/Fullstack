const catchAsync = require('../utils/catchAsync');
const authService = require('../services/authService');
const config = require('../config');

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: config.isProduction,
  sameSite: 'lax',
};

const setAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie('access_token', accessToken, { ...COOKIE_OPTIONS, maxAge: 15 * 60 * 1000 });
  res.cookie('refresh_token', refreshToken, { ...COOKIE_OPTIONS, maxAge: 7 * 24 * 60 * 60 * 1000 });
};

const login = catchAsync(async (req, res) => {
  const result = await authService.login(req.body);
  setAuthCookies(res, result.accessToken, result.refreshToken);
  res.status(result.created ? 201 : 200).json({
    status: 'success',
    message: result.created ? 'Account created and logged in' : 'Login successful',
    data: { user: result.user },
  });
});

const getMe = catchAsync(async (req, res) => {
  const user = await authService.getMe(req.user.userId);
  res.json({ status: 'success', data: { user } });
});

const logout = (_req, res) => {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
  res.json({ status: 'success', message: 'Logged out successfully' });
};

module.exports = { login, getMe, logout };
