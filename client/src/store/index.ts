import { reactive, readonly, provide, inject } from "vue"
import axios from "axios"
import { IUser } from "../interfaces/IUser"
import { IPost } from "../interfaces/IPost"
import { IAuthor } from "../interfaces/IAuthor"

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

class Store {
  protected state: State
  constructor(initialState: State) {
    this.state = reactive<State>(initialState) as State
  }

  public getState(): State {
    return readonly(this.state) as State
  }

  async createUser(user: IUser) {
    const response = await axios.post<IAuthor>('/users', user)
    this.state.authors.all[response.data.id] = response.data
    this.state.authors.ids.push(response.data.id.toString())
    this.state.authors.currentId = response.data.id.toString()
    console.log(this.state);
    
  }

  async createPost(post: IPost) {
    const response = await axios.post<IPost>('/posts', post)
    this.state.posts.all[response.data.id] = response.data
    this.state.posts.ids.push(response.data.id.toString())
  }


  async fetchPosts() {
    // get is generic so can specify type
    const response = await axios.get<IPost[]>('/posts')
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