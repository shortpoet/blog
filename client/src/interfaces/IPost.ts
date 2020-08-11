import { Moment } from "moment";

export interface IPost {
  id: number;
  title: string;
  markdown: string;
  html: string;
  userId: number;
  created: Moment;
}
