<template>
  <ul>
    <li v-for="post in posts" :key="post.title">
      <a :href="withBase(post.permalink)" class="post">
        <div class="post__title">
          {{ post.title }}
        </div>
        <div class="post__date">
          {{ date === 'full' ? post.datetime.split(' ')[0] : post.datetime.split(' ')[0].slice(5) }}
        </div>
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { withBase } from 'vitepress';
import { IPost } from '../types';
defineProps({
  posts: Array<IPost>,
  date: String
});
</script>

<style lang="less" scoped>
li {
  list-style: none;
}

.post {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 15px;
  color: var(--vp-c-text-1);
  line-height: 1.75rem;
  border-radius: 0.25rem;
  transition: 0.4s;

  &:hover {
    background-color: var(--vp-c-gutter);
    color: var(--vp-c-brand);

    .post__title::before {
      background-color: var(--vp-c-brand);
    }
  }

  &__title {
    &::before {
      display: inline-block;
      content: '';
      margin: 0 10px 2px 0;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: var(--vp-c-text-1);
      transition: 0.4s;
    }
  }

  &__date {
    flex-shrink: 0;
    font-family: var(--font-family-number);
  }
}

@media screen and (max-width: 768px) {
  .post {
    padding: 4px;

    &__title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 16.5em;
    }
  }
}
</style>
