<template>
<!-- 

  refactor possibility

<PeriodSelector>
   <Period name="today" />
</PeriodSelector> 

-->
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
import { Period, Post } from './types'
import {today, thisWeek, thisMonth} from './mocks'
import TimelinePost from './TimelinePost.vue'
import { ref, computed, defineComponent } from 'vue'

import moment from 'moment'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default defineComponent({
  components: {
    TimelinePost
  },
  async setup() {
    const periods : Period[] = ['today', 'this week', 'this month']

    // ref is generic type
    const selectedPeriod = ref<Period>('today')

    await delay(2000)

    // computed automatically recalculates and updates the DOM anytime a reactive reference changes 
    const posts = computed(() => [today, thisWeek, thisMonth].filter(post => {
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
    const setPeriod = (period: Period) => {
      selectedPeriod.value = period
    }

    return {
      periods,
      selectedPeriod,
      setPeriod,
      posts
    }
  }
})
</script>