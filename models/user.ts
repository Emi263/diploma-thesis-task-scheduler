export interface UserToken {
  sub: number;
  email: string;
  exp: number;
  iat: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  profileImage?: string;
}
