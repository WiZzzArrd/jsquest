import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { storage } from './storage';
import { insertUserSchema, loginSchema, type InsertUser, type LoginUser } from '@shared/schema';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const SALT_ROUNDS = 10;

export async function registerUser(userData: InsertUser) {
  // Validate input
  const validatedData = insertUserSchema.parse(userData);
  
  // Check if user already exists
  const existingUser = await storage.getUserByEmail(validatedData.email);
  if (existingUser) {
    throw new Error('Пользователь с таким email уже существует');
  }
  
  const existingUsername = await storage.getUserByUsername(validatedData.username);
  if (existingUsername) {
    throw new Error('Пользователь с таким именем уже существует');
  }
  
  // Hash password
  const hashedPassword = await bcrypt.hash(validatedData.password, SALT_ROUNDS);
  
  // Create user
  const user = await storage.createUser({
    ...validatedData,
    password: hashedPassword,
  });
  
  // Generate JWT
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
  
  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    token,
  };
}

export async function loginUser(loginData: LoginUser) {
  // Validate input
  const validatedData = loginSchema.parse(loginData);
  
  // Find user
  const user = await storage.getUserByEmail(validatedData.email);
  if (!user) {
    throw new Error('Неверный email или пароль');
  }
  
  // Check password
  const isValidPassword = await bcrypt.compare(validatedData.password, user.password);
  if (!isValidPassword) {
    throw new Error('Неверный email или пароль');
  }
  
  // Generate JWT
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
  
  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    token,
  };
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number };
  } catch (error) {
    throw new Error('Недействительный токен');
  }
}

export async function getUserFromToken(token: string) {
  const decoded = verifyToken(token);
  const user = await storage.getUser(decoded.userId);
  
  if (!user) {
    throw new Error('Пользователь не найден');
  }
  
  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
}