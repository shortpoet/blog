import { initialState, State, createStore } from "../src/store"
import { today, thisWeek, thisMonth } from "./mocks"
import { IPost } from "../src/interfaces/IPost";
import { AxiosRequestConfig } from "axios";

const mockPost: IPost = today;

jest.mock(('axios'), () => ({
  post: (url: string, query: string, config: AxiosRequestConfig) => ({
    data: {
      data: {
        createPost: today,
        posts: [today]
      }
    },
    status: 200  
}),
  interceptors: {
    request: { use: jest.fn(), eject: jest.fn() },
    response: { use: jest.fn(), eject: jest.fn() }
  }
}))

describe('store.index.ts', () => {
  describe('fetchPosts', () => {
    it('fetches posts and updates the store', async () => {
      const expected: State = {
        ...initialState(),
        posts: {
          ...initialState().posts,
          all: {
            1: mockPost
          },
          ids: ['1'],
          loaded: true
        }
      }
      const store = createStore()
      await store.fetchPosts()
      expect(store.getState()).toEqual(expected)
    })

  })
})