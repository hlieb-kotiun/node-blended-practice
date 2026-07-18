import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import createHttpError from 'http-errors';
import { createSession, setCookies } from '../services/auth.js';

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
