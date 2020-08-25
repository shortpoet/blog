import { IPost } from "../src/interfaces/IPost";
import moment from 'moment'


;

export const basePost : IPost = {
  id: 1,
  title: 'Base post',
  markdown: 'Content',
  html: '<p>Content</p>',
  userId: 1,
  created: moment()
}

export const today: IPost = {
  ...basePost,
  id: 1,
  title: 'Today'
}
export const thisWeek: IPost = {
  ...basePost,
  id: 2,
  title: 'This Week',
  created: moment().subtract(2, 'days')
}
export const thisMonth: IPost = {
  ...basePost,
  id: 3,
  title: 'This Month',
  created: moment().subtract(2, 'weeks')
}