<template>
  <div class="info" v-if="$frontmatter.datetime">
    <div class="date">
      <span class="iconfont">&#xe7eb;</span>
      <span>{{ $frontmatter.datetime.substring(0, 16) }}</span>
    </div>
    <div>
      <template v-if="$frontmatter.tags">
        <span class="iconfont">&#xe869;</span>
        <a
          :href="withBase(`${outDir}/tags.html?tags=${item.replaceAll('&', '%26')}`)"
          v-for="item in $frontmatter.tags"
          class="tag"
        >
          {{ item }}
        </a>
      </template>
      <template v-if="$frontmatter.category">
        <span class="iconfont">&#xe86d;</span>
        <a
          :href="withBase(`${outDir}/category.html?category=${$frontmatter.category.replaceAll('&', '%26')}`)"
          class="category"
        >
          {{ $frontmatter.category }}
        </a>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { withBase } from 'vitepress';
import { useOutDir } from '../composables/useOutDir';
const { outDir } = useOutDir();
</script>

<style lang="less" scoped>
.info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.iconfont {
  font-size: 14px;
  margin-right: 6px;
  vertical-align: bottom;
}

.date {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.tag,
.category {
  font-size: 14px;
  display: inline-block;
  padding: 0 8px;
  border-radius: 2px;
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  transition: 0.4s;

  &:not(:last-of-type) {
    margin-right: 8px;
  }

  &:hover {
    color: var(--vp-c-brand);
    background-color: var(--vp-c-gutter);
  }
}
</style>
