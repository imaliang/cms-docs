<template>
  <div class="ZCContainer">
    <div class="ZCContent">
      <AdItem
        v-if="ads?.docBefore || adsense?.docBefore"
        :ads="ads?.docBefore"
        :adsense="{ client: adsense?.client, slot: adsense?.docBefore }"
        type="doc"
      />

      <template v-if="posts">
        <PostList :posts="posts" />
        <Pagination :pagination="pagination" :total="total" :homepage="homepage" />
      </template>

      <AdItem
        v-if="ads?.docAfter || adsense?.docAfter"
        :ads="ads?.docAfter"
        :adsense="{ client: adsense?.client, slot: adsense?.docAfter }"
        type="doc"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useData } from 'vitepress';
import AdItem from '../components/AdItem.vue';
import PostList from '../components/PostList.vue';
import Pagination from '../components/Pagination.vue';
import type { IPost } from '../types';
import { useAds } from '../composables/useAds';

const props = defineProps({
  pagination: { type: Number, required: true },
  total: { type: Number, required: true },
  size: { type: Number, required: true },
  homepage: Boolean
});

const { ads, adsense } = useAds();
const { theme } = useData();
const posts: IPost[] = (theme.value.posts ? [...theme.value.posts] : [])
  .sort((a, b) => {
    if (a.order && b.order) {
      return a.order - b.order; // 如果 a 和 b 都有 order 属性，按 order 排序
    }
    if (a.order) return -1; // 如果只有 a 有 order 属性，a 优先
    if (b.order) return 1; // 如果只有 b 有 order 属性，b 优先
    return 0; // 如果都没有 order 属性，保持原有顺序
  })
  .slice(props.size * (props.pagination - 1), props.size * props.pagination);
</script>

<style lang="less" scoped>
@import '../styles/page.less';
</style>
