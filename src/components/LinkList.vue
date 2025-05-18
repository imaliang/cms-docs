<template>
  <div class="link">
    <span @click="emit('change', link)" v-for="link in links" :key="link" class="link__item">
      {{ link }}
      <span v-if="posts">{{ posts[link].length }}</span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import type { IGroup } from '../types';

defineProps({
  links: { type: Array<string>, required: true },
  posts: Object as PropType<IGroup>
});

const emit = defineEmits(['change']);
</script>

<style lang="less" scoped>
.link {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;

  &__item {
    display: inline-block;
    padding: 4px 16px;
    margin: 6px 8px;
    font-size: 0.875rem;
    line-height: 25px;
    background-color: var(--vp-c-bg-alt);
    transition: 0.4s;
    border-radius: 2px;
    color: var(--vp-c-text-1);
    cursor: pointer;

    &:hover {
      background-color: var(--vp-c-gutter);
    }

    // 数字
    span {
      color: var(--vp-c-brand);
      font-weight: 700;
    }
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 1rem 0;
    text-align: left;
  }
}

@media screen and (max-width: 768px) {
  .link {
    &__title {
      font-size: 1.5rem;
    }
  }
}
</style>
