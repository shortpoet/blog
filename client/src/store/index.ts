import { reactive, readonly, provide, inject } from "vue"
import axios from "axios"
import { IUser } from "../interfaces/IUser"
import { IPost } from "../interfaces/IPost"
import { IAuthor } from "../interfaces/IAuthor"
import * as mockData from '../../tests/mocks'
import { graphAxios } from "../ajax"
import { ICreateUser } from "../interfaces/ICreateUser"
import moment from "moment"
import { useStorage } from "../composables/useStorage"
import { CURRENT_USER_ID_STORAGE_KEY } from "../constants"
import { colorLog } from "../../utils/colorLog"
import { chalkLog } from "../../utils/chalkLog"

interface StoreState<T> {
  ids: string[];
  all: Record<string, T>;
  loaded: boolean;
  currentId?: string;
}

export interface State {
  authors: StoreState<IAuthor>
  posts: StoreState<IPost>
}

// https://stackoverflow.com/questions/32308370/what-is-the-syntax-for-typescript-arrow-functions-with-generics

export function iSS<T>(): StoreState<T> {
  return {
    ids: [
    ],
    all: {
    },
    loaded: false,
    currentId: undefined
  }
}

export const initialStoreState = <T extends {}>(x: T): StoreState<T> => ({
  ids: [
  ],
  all: {
  },
  loaded: false,
  currentId: undefined
})

export const initialState = () : State => ({
  authors: iSS<IAuthor>(),
  posts: initialStoreState<IPost>({} as IPost)
})
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const localStorage = useStorage();

class Store {
  protected state: State
  sessionStorage: string
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
    localStorage.set(CURRENT_USER_ID_STORAGE_KEY, this.state.authors.currentId)
    colorLog(`current id: ${this.state.authors.currentId}`)
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
    // colorLog(query)
    const data = await graphAxios(query);
    const user: IUser = data.user
    if (user.password == password) {

      return this.setCurrentUser(user);
    } else {
      return null
    }
  }

  logout() {
    localStorage.remove(CURRENT_USER_ID_STORAGE_KEY)
    return this.state.authors.currentId = null
  }

  async getUsers() {
    try {
      const query = `
        {
          users{
            id
            username
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
      const data = await graphAxios(query, 'users');
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
  async getUserById(id) {
    try {
      const query = `
        {
          userById(id: ${id}){
            id
            username
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
      
      return await graphAxios(query, 'getUserById');
    } catch (error) {
      console.log(`Error fetching users ${error}`);
    }
  }

  async createPost(input: IPost) {
    console.log(input);
    let html = `${input.html}`
    // console.log(html);
    // console.log(html.replace(/"/g, '\\"'));
    // console.log(html.replace(/(['"])/g, "\\$1"));
    // console.log(html.replace(/(['"])/g, "\\$1"));
    delete input['id']
    

    const createPost: string = Object.entries(input).reduce((cur, [k, v]) => {
      // console.log(v);
      // console.log(`${v}`);
      // console.log(`${v}`.replace(/\n/, '\""'));
      // if (typeof v == 'string') {
      //   console.log(v.replace(/"/g, '\"'));

      // }
      
      return typeof v != 'number'
        ? cur += `${k}: """${v.toString().replace(/"/g, '\\"')}""", `
        : cur += `${k}: ${v}, `
      
    }, '')
    console.log(createPost);

    const query = `
      mutation {
        createPost (post: {${createPost}}) {
          id
          userId
          title
        }
      }
    `
    console.log(query);
    const response = await graphAxios(query);
    console.log(response);
    console.log(response.createPost);
    console.log(response.createPost.id);
    
    // const post: IPost = {
    //   ...response.createPost,
    //   created: moment(response.createPost.created)
    // }
    // console.log(post);
    
    this.state.posts.all[response.createPost.id] = response.createPost
    this.state.posts.ids.push(response.createPost.id.toString())

  }

  async fetchPosts() {
    const query = `
      {
        posts {
          id
          title
          markdown
          html
          userId
          created
        }
      }
    `
    const response = await graphAxios(query, 'posts')
    // chalkLog('blueBright', response)
    const posts = response.posts.map(p => ({
      ...p,
      created: moment(p.created)
    }))
    if (posts) {
      for (const post of posts) {
        if (!this.state.posts.ids.includes(post.id.toString())) {
          this.state.posts.ids.push(post.id.toString())
        }
        this.state.posts.all[post.id] = post
      }
    } 
    this.state.posts.loaded = true
  }

  async _fetchPosts() {
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

export const store = new Store(initialState())
store.getState()

export const provideStore = () =>  {
  provide('store', store)
}

// this way did not do default type checking without declaring type: State
// export const createStore = (initState?: State) => {
//   return initState
//     ? new Store(initState)
//     : new Store(initialState())
// }
export const createStore = (initState: State = initialState()) => {
  return new Store(initState)
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