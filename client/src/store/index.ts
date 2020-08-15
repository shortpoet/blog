import { reactive, readonly, provide, inject } from "vue"
import axios from "axios"
import { IUser } from "../interfaces/IUser"
import { IPost } from "../interfaces/IPost"
import { IAuthor } from "../interfaces/IAuthor"
import * as mockData from '../../tests/mocks'
import { graphAxios } from "../ajax"
import { ICreateUser } from "../interfaces/ICreateUser"

interface StoreState<T> {
  ids: string[];
  all: Record<string, T>;
  loaded: boolean;
  currentId?: string;
}

interface State {
  authors: StoreState<IAuthor>
  posts: StoreState<IPost>
}

// https://stackoverflow.com/questions/32308370/what-is-the-syntax-for-typescript-arrow-functions-with-generics

function iSS<T>(): StoreState<T> {
  return {
    ids: [
    ],
    all: {
    },
    loaded: false,
    currentId: undefined
  }
}

const initialStoreState = <T extends {}>(x: T): StoreState<T> => ({
  ids: [
  ],
  all: {
  },
  loaded: false,
  currentId: undefined
})

const initialState = () : State => ({
  authors: iSS<IAuthor>(),
  posts: initialStoreState<IPost>({} as IPost)
})
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

class Store {
  protected state: State
  constructor(initialState: State) {
    this.state = reactive<State>(initialState) as State
  }

  public getState(): State {
    return readonly(this.state) as State
  }

  async createUser(createUser: ICreateUser) {
    const query = `
      mutation {
        createUser (user: { username: "${createUser.username}", password: "${createUser.password}"}) {
          id
          username
        }
      }
    `
    const response = await graphAxios(query);
    const user: IUser = response.createUser;
    this.setCurrentUser(user);
    // console.log(user);
    
    // this.state.authors.all[user.id] = user
    // this.state.authors.ids.push(user.id.toString())
    // this.state.authors.currentId = user.id.toString()
    // console.log(this.state);
  }

  setCurrentUser(user: IUser): IAuthor {
    this.state.authors.all[user.id] = user
    this.state.authors.ids.push(user.id.toString())
    this.state.authors.currentId = user.id.toString()
    return this.state.authors.all[user.id]
  }

  async login(username: string, password: string): Promise<(IAuthor | null)> {
    const query = `
      {
        user(username: "${username}"){
          id
          username
          password
        }
      }
    `
    const data = await graphAxios(query);
    const user: IUser = data.user
    if (user.password == password) {
      return this.setCurrentUser(user);
    } else {
      return null
    }
  }

  logout() {
    return this.state.authors.currentId = null
  }

  async getUsers() {
    try {
      const query = `
        {
          users{
            id
            username
            password
          }
        }
      `
      const data = await graphAxios(query);
      return data.users
    } catch (error) {
      console.log(`Error fetching users ${error}`);
    }
  }
  async getUser(username) {
    try {
      const query = `
        {
          user(username: "${username}"){
            id
            username
            password
            posts {
              id
              title
              markdown
              html
              created
            }
          }
        }
      `
      return await graphAxios(query);
    } catch (error) {
      console.log(`Error fetching users ${error}`);
    }
  }

  async createPost(post: IPost) {
    const response = await axios.post<IPost>('/posts', post)
    this.state.posts.all[response.data.id] = response.data
    this.state.posts.ids.push(response.data.id.toString())
  }

  async fetchPosts() {
    // get is generic so can specify type
    await delay(1000)
    const response = {data: [mockData.today, mockData.thisWeek, mockData.thisMonth]}
    // to avoid mutating at all costs can do 
    // response.data.reduce(...)

    // this initial code resets state
    // const ids: string[] = []
    // const all: Record<string, IPost> = {}

    for (const post of response.data) {

      // do a check to account for duplicates
      if (!this.state.posts.ids.includes(post.id.toString())) {
        this.state.posts.ids.push(post.id.toString())
      }
      // using number as key to JS object, it implicitly assumes it is a string and calls .toString() automatically
      this.state.posts.all[post.id] = post
    }

    this.state.posts.loaded = true

    // old implementation 

    // this.state.posts = {
    //   ids,
    //   all,
    //   loaded: true
    // }

  }

}

const store = new Store(initialState())
store.getState()

export const provideStore = () =>  {
  provide('store', store)
}


export const createStore = () => {
  return new Store(initialState())
}

export const useStore = (): Store => {
  // instead of returning store directly
  // create new var called store
  // inject this via 'store' string
  // search for closest component that called provideStore with same string 
  // and return that value
  const store = inject<Store>('store')
  return store


}