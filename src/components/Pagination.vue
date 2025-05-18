<template>
  <div class="pagination" v-if="posts">
    <a class="pagination__link iconfont" :href="withBase(homepage ? '/index.html' : '/page-1.html')" v-if="total > max">
      &#xe86a;
    </a>
    <a
      class="pagination__link"
      v-for="page in pages"
      :key="page"
      :href="withBase(page === 1 && homepage ? '/index.html' : `/page-${page}.html`)"
      :class="{ 'pagination__link--active': pagination === page }"
    >
      {{ page }}
    </a>
    <a class="pagination__link iconfont" :href="withBase(`/page-${total}.html`)" v-if="total > max">&#xe86b;</a>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useData, withBase } from 'vitepress';

const props = defineProps({
  pagination: { type: Number, required: true },
  total: { type: Number, required: true },
  homepage: { type: Boolean, default: true }
});

const { theme } = useData();
const posts = theme.value.posts;
const page = theme.value.page;
const max = page?.max || 5;

const pages = ref(findNeighbors(props.pagination, props.total, max));

function findNeighbors(target: number, total: number, max: number) {
  const result: number[] = [];
  const half = Math.floor(max / 2);

  if (total < max) {
    for (let i = 1; i <= total; i++) {
      result.push(i);
    }
    return result;
  }

  for (let i = target - half; i <= target + half; i++) {
    if (i >= 1 && i <= total) {
      result.push(i);
    }
  }

  while (result.length < max) {
    const first = result[0];
    const last = result[result.length - 1];

    if (first > 1) {
      result.unshift(first - 1);
    } else if (last < total) {
      result.push(last + 1);
    } else {
      break;
    }
  }
  return result;
}
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 14px;
  vertical-align: bottom;
  margin-right: 6px;
}

.pagination {
  margin-top: 32px;
  // margin-bottom: v-bind(margin_bottom);
  display: flex;
  justify-content: center;

  &__link {
    display: inline-block;
    width: 36px;
    height: 36px;
    line-height: 34px;
    text-align: center;
    border: 1px var(--vp-c-divider) solid;
    margin: 0 0.2rem;
    font-weight: 400;
    transition: color 0.3s, background 0.5s, border 0.5s;
    color: var(--vp-c-text-1);

    &:hover,
    &--active {
      color: var(--vp-c-bg-soft);
      background: var(--vp-c-text-1);
      border: 1px solid var(--vp-c-text-1);
    }

    &:first-of-type {
      margin-left: 0;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }
}
</style>
