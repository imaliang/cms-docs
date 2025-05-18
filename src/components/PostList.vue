<template>
  <div v-for="post in posts" :key="post.title" class="post">
    <div>
      <div class="post__title">
        <span class="post__pinned" v-if="post.order && type !== 'category'">
          {{ post.pinned || page?.pinned || '[置顶]' }}
        </span>
        <a :href="withBase(post.permalink)">{{ post.title }}</a>
      </div>
      <div class="post__excerpt" v-if="post.excerpt">
        <a :href="withBase(post.permalink)">{{ post.excerpt }}</a>
      </div>
    </div>
    <div>
      <span class="iconfont">&#xe7eb;</span>
      <span class="post__date">{{ post.datetime.split(' ')[0] }}</span>
      <span class="post__category" v-if="post.category">
        <span class="iconfont">&#xe86d;</span>
        <a
          :href="withBase(`${outDir}/category.html?category=${post.category.replaceAll('&', '%26')}`)"
          class="post__category__item"
        >
          {{ post.category }}
        </a>
      </span>
      <span class="post__tag" v-if="post.tags">
        <span class="iconfont">&#xe869;</span>
        <a
          :href="withBase(`${outDir}/tags.html?tags=${item.replaceAll('&', '%26')}`)"
          v-for="item in post.tags"
          class="post__tag__item"
        >
          {{ item }}
        </a>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useData, withBase } from 'vitepress';
import { IPost } from '../types';
import { useOutDir } from '../composables/useOutDir';
const { outDir } = useOutDir();

defineProps({
  posts: Array<IPost>,
  type: String
});

const { theme } = useData();
const page = theme.value.page;
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 14px;
  vertical-align: bottom;
  margin-right: 6px;
}

.post {
  padding: 14px 0;
  border-bottom: 1px dashed #ccc;

  &__pinned {
    color: crimson;
    margin-right: 4px;
  }

  &__title {
    font-size: 1.125rem;
    font-weight: 500;
    margin-bottom: 8px;

    a {
      color: var(--vp-c-text-1);

      &:hover {
        color: var(--vp-c-brand);
      }
    }
  }

  &__excerpt {
    font-size: 0.9375rem;
    color: var(--vp-c-text-2);
    margin-bottom: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__date {
    font-size: 14px;
  }

  &__tag,
  &__category {
    margin-left: 12px;
    &__item {
      font-size: 14px;
      display: inline-block;
      padding: 0 8px;
      border-radius: 2px;
      background-color: var(--vp-c-bg-alt);
      color: var(--vp-c-text-1);
      transition: 0.4s;

      &:nth-of-type(1) {
        margin-left: 2px;
      }

      &:not(:nth-of-type(1)) {
        margin-left: 8px;
      }

      &:hover {
        color: var(--vp-c-brand);
        background-color: var(--vp-c-gutter);
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .post {
    &__title {
      font-size: 1.0625rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}
</style>
