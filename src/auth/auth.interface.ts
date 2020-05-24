export interface IAuthResponse {
  token: string;
  username: string;
}

export interface AuthUser {
  id: string;
  username: string;
}

export interface AuthUserRequest extends Request {
  user?: AuthUser | boolean | undefined
};

export interface TokenPayload extends AuthUser {
  iat: number;
  exp: number;
}