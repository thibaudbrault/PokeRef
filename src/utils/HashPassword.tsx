import { randomBytes, scryptSync } from 'node:crypto';

const encryptPassword = (password: string, salt: string) => {
  return scryptSync(password, salt, 32).toString(`hex`);
};

export const hashPassword = (password: string): string => {
  const salt = randomBytes(16).toString(`hex`);
  return encryptPassword(password, salt) + salt;
};

export const matchPassword = (password: string, hash: string): boolean => {
  const salt = hash.slice(64);
  const originalPassHash = hash.slice(0, 64);
  const currentPassHash = encryptPassword(password, salt);
  return originalPassHash === currentPassHash;
};
