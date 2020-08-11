import random from 'lodash/random'
import axios from 'axios'

import * as mockData from '../../tests/mocks'

// axios vs fetch with implementations
// https://blog.logrocket.com/axios-or-fetch-api/
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// override axios get for mock/development purposes
// ignore ts compiler because actual get is quite complex
// @ts-ignore
axios.get = async (url: string) => {
  if (url === '/posts') {
    await delay(1000)
    return Promise.resolve({
      data: [mockData.today, mockData.thisWeek, mockData.thisMonth]
    })
  }
}

// @ts-ignore
axios.post = async (url: string, payload: IPost) => {
  if (url === '/posts') {
    await delay(1000)
    const id = random(100, 10000)
    return Promise.resolve({
      data: {id, ...payload}
    })
  }
}

export const graphAxios
  = async (url: string, query: string): Promise<any> => {
    try {
      return await axios.post(url, query);
    } catch (error) {
      console.log(`Error when fetching: ${error}`);
    }
  };

export const graphFetch
  = async (url: string, query: string): Promise<any> => {
    try {
      const result = await window.fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: query
        })
      })
      return await result.json();
    } catch (error) {
      console.log(`Error when fetching: ${error}`);
    }
  };
