import { reactive, readonly } from "vue"
import axios from "axios"
import { Post } from "./types"

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

  async fetchPosts() {
    // get is generic so can specify type
    const response = await axios.get<Post[]>('/posts')
    // to avoid mutating at all costs can do 
    // response.data.reduce(...)
    const ids: string[] = []
    const all: Record<string, Post> = {}
    for (const post of response.data) {
      ids.push(post.id.toString())
      // using number as key to JS object, it implicitly assumes it is a string and calls .toString() automatically
      all[post.id] = post
    }

    this.state.posts = {
      ids,
      all,
      loaded: true
    }
  }

}

const store = new Store(initialState())
store.getState()

export const useStore = () => store