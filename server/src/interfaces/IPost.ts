import { Moment } from 'moment';
import { IUser } from './IUser';

export interface IPost {
  id: number;
  title: string;
  markdown?: string;
  html?: string;
  created: Moment;
  userId: number;
  user: IUser;
}
