import { Moment } from "moment";

export interface Post {
  id: number;
  title: string;
  markdown: string;
  html: string;
  userId: number;
  created: Moment;
}
