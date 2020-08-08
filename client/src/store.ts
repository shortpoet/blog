import { reactive, readonly, provide, inject } from "vue"
import axios from "axios"
import { Post, User } from "./types"

interface PostsState {
  ids: string[]
  all: Record<string, Post>
  loaded: boolean
}

interface State {
  posts: PostsState
}

const initialPostsState = () : PostsState => ({
  ids: [
  ],
  all: {
  },
  loaded: false
})

const initialState = () : State => ({
  posts: initialPostsState()
})

class Store {
  protected state: State
  constructor(initialState: State) {
    this.state = reactive(initialState)
  }

  public getState(): State {
    return readonly(this.state)
  }

  async createUser(user: User) {
    // ..
  }

  async createPost(post: Post) {
    const response = await axios.post<Post>('/posts', post)
    this.state.posts.all[response.data.id] = response.data
    this.state.posts.ids.push(response.data.id.toString())
  }


  async fetchPosts() {
    // get is generic so can specify type
    const response = await axios.get<Post[]>('/posts')
    // to avoid mutating at all costs can do 
    // response.data.reduce(...)

    // this initial code resets state
    // const ids: string[] = []
    // const all: Record<string, Post> = {}

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