import { generateTokens } from '../utils/auth.util';
import { findByEmail, save } from '../dao/token.dao';

export const generateToken = async (email: string) => {
  const storedRefreshtoken = await findByEmail(email);
  if (storedRefreshtoken) {
    await storedRefreshtoken.destroy();
  }

  const { accessToken, refreshToken } = generateTokens(email);

  await save(email, refreshToken);

  return {
    accessToken,
    refreshToken
  };
}

export const removeRefreshToken = async (email: string) => {
  const token = await findByEmail(email);
  if (token) {
    token.destroy();
  }
}

export const verify = async (refreshToken: string) => {
 
}