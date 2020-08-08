import { Moment } from "moment";

export interface Post {
  id: number;
  title: string;
  markdown: string;
  html: string;
  authorId: number;
  created: Moment;
}
