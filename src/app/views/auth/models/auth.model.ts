export interface LoginRequestDto {
  email: string,
  password: string;
}

export interface UserDto {
  token: string,
  username: string,
  user_id: number;
}
