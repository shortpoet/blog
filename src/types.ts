import { Moment } from "moment"

export type Period = 'today' | 'this week' | 'this month'

export interface Post {
  id: number
  title: string
  markdown: string
  html: string
  authorId: number
  created: Moment
}

export interface User {
  id: number
  username: string
  // in production app wouldn't include password here
  // would have separate interface for form
  password: string
}