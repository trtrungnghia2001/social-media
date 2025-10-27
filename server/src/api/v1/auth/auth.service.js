import ENV_CONFIG from "#server/configs/env.config";
import { addCookie } from "#server/shared/utils/cookie.util";
import {
  generateAccessToken,
  generateRefreshToken,
} from "#server/shared/utils/jwt.util";
import userModel from "../user/user.model.js";

export async function generateAuthTokensAndSetCookies(res, payload) {
  // generate token
  const access_token = generateAccessToken(payload);
  const refresh_token = generateRefreshToken(payload);

  // Đặt Access Token va Refresh Token vào cookie
  addCookie(res, "access_token", `Bearer ` + access_token, {
    maxAge: parseInt(ENV_CONFIG.JWT_SECRET_EXPIRES),
  });
  addCookie(res, "refresh_token", refresh_token, {
    maxAge: parseInt(ENV_CONFIG.JWT_REFRESH_SECRET_EXPIRES),
  });

  // Lưu Refresh Token vào database
  await userModel.findByIdAndUpdate(
    payload._id,
    {
      refreshToken: refresh_token,
    },
    { new: true }
  );

  return { access_token, refresh_token };
}
