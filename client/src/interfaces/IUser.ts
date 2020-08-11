
export interface IUser {
  id: number;
  username: string;
  // in production app wouldn't include password here
  // would have separate interface for form
  password: string;
}
