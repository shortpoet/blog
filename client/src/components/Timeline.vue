<template>
<!-- 

  refactor possibility

<PeriodSelector>
   <IPeriod name="today" />
</PeriodSelector> 

-->
  <div class="message is-info is-marginless">
    <div class="message-header">
      <p>Posts</p>
    </div>
  </div>
  <nav class="is-primary panel">
    <p class="panel-tabs">
      <!-- define a test specific selector so that future code changes to tag, class, or id, which don't nec change functionality, don't break test eg a => div -->
      <a v-for="period in periods" :key="period" data-test="period"
        :class="[ period === selectedPeriod ? 'is-active' : '']"
        @click="setPeriod(period)"
      >
        {{ period }}
      </a>
    </p>
    <TimelinePost v-for="post in posts" :key="post.id" :post="post"/>
  </nav>
</template>

<script lang="ts">
import { IPeriod } from '../interfaces/IPeriod'
import { IPost } from '../interfaces/IPost'
import TimelinePost from './TimelinePost.vue'
import { ref, computed, defineComponent } from 'vue'
import { useStore } from '../store'

import moment from 'moment'


import { colorLog } from '../../utils/colorLog'

export default defineComponent({
  components: {
    TimelinePost
  },
  async setup() {
    const periods : IPeriod[] = ['today', 'this week', 'this month']

    // ref is generic type
    const selectedPeriod = ref<IPeriod>('today')

    const store = useStore()
    const users = await store.getUsers()

    if (!store.getState().posts.loaded) {
      console.log('timeline');
      
      await store.fetchPosts()
    }
    
    // console.log(users);
    // this uses the mapper to return with O(1) instead of O(n) by searching by id insead of looping over an array
    const allPosts = store.getState().posts.ids.reduce<IPost[]>((accumulator, id) => {
      const post = store.getState().posts.all[id]
      return accumulator.concat(post)
    }, [])

    // computed automatically recalculates and updates the DOM anytime a reactive reference changes 
    const posts = computed(() => allPosts.filter(post => {
      colorLog("post")
      // Object.entries(post).forEach(([k,v]) => colorLog(`${k} is ${v}: ${typeof v}`))
      // colorLog(JSON.stringify(post))
      if (
        selectedPeriod.value === 'today' &&
        post.created.isAfter(moment().subtract(1, 'day'))
      ) {
        return true
      }
      if (
        selectedPeriod.value === 'this week' &&
        post.created.isAfter(moment().subtract(1, 'week'))
      ) {
        return true
      }
      if (
        selectedPeriod.value === 'this month' &&
        post.created.isAfter(moment().subtract(1, 'month'))
      ) {
        return true
      }
      return false
    })
    )
    const setPeriod = (period: IPeriod) => {
      selectedPeriod.value = period
    }
    colorLog('posts')
    console.log(posts.value);
    
    return {
      periods,
      selectedPeriod,
      setPeriod,
      posts
    }
  }
})
</script>