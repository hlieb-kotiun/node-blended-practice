import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import createHttpError from 'http-errors';
import { clearCookies, createSession, setCookies } from '../services/auth.js';
import { Session } from '../models/session.js';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const newSession = await createSession(createdUser._id);

  setCookies(res, newSession);

  res.status(201).json(createdUser);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw createHttpError(401, 'User not found!');
  }

  const isValidPassword = await bcrypt.compare(password, existingUser.password);

  if (!isValidPassword) {
    throw createHttpError(401, 'User not found!');
  }

  await Session.deleteOne({ userId: existingUser._id });
  const newSession = await createSession(existingUser._id);

  setCookies(res, newSession);

  res.status(200).json(newSession);
};

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  await Session.deleteOne({ sessionId });

  // res.clearCookie('accessToken');
  // res.clearCookie('refreshToken');
  // res.clearCookie('sessionId');

  clearCookies();

  res.status(204).send();
};

// TASK 5

// Створіть роут POST /auth/refresh для оновлення сесії на основі рефреш токена, який записаний в cookies.

// Обробка цього роута має включати:

// Реєстрацію роута в файлі src/routers/authRoutes.js
// Опис контролера для цього роута в файлі src/controllers/authController.js
// Попередня сесія, за її наявності, має бути видалена, а нова створена за тим самим принципом, що і в POST /auth/login.
// Запишіть рефреш, access токени та sessionId в cookies відповіді.
// Відповідь сервера, в разі успішного створення нового продукту, має бути зі статусом 200 і містити об’єкт з наступними властивостями:
// message — повідомлення про результат виконання операції "Successfully refreshed a session!"

export const refreshUser = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  const session = await Session.findOne({ _id: sessionId, refreshToken });

  if (!session) {
    throw createHttpError(401, 'Session not found!');
  }

  const isRefreshTokenExpired = session.refreshTokenValidUntil < new Date();

  if (isRefreshTokenExpired) {
    await session.deleteOne();

    clearCookies();
    throw createHttpError(401, 'Session token is expired!');
  }

  await session.deleteOne();
  const newSession = await createSession(session.userId);

  setCookies(res, newSession);

  res.status(200).json({ message: 'Successfully refreshed a session!' });
};
