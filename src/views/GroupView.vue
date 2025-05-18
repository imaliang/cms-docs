<template>
  <div class="ZCContainer">
    <div class="ZCContent">
      <AdItem
        v-if="ads?.docBefore || adsense?.docBefore"
        :ads="ads?.docBefore"
        :adsense="{ client: adsense?.client, slot: adsense?.docBefore }"
        type="doc"
      />
      <template v-if="type === 'archives'">
        <template v-for="year in keys" :key="year">
          <div class="title">{{ year }}</div>
          <PostListLite :posts="posts[year]" />
        </template>
      </template>

      <template v-else-if="type === 'category' || type === 'tags'">
        <LinkList @change="handleChange" :links="keys" :posts="posts" />
        <div v-show="select" class="title bold">{{ type === 'category' ? titles[lang] : '' }}{{ select }}</div>

        <PostList v-if="type === 'category'" :posts="posts[select]" :type="type" />
        <PostListLite v-else-if="type === 'tags'" :posts="posts[select]" date="full" />
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
import { ref } from 'vue';
import { useData } from 'vitepress';
import { useAds } from '../composables/useAds';
import { useGroup } from '../composables/useGroup';
import AdItem from '../components/AdItem.vue';
import LinkList from '../components/LinkList.vue';
import PostList from '../components/PostList.vue';
import PostListLite from '../components/PostListLite.vue';

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  lang: {
    type: String,
    default: 'zh'
  }
});

const titles = {
  zh: '分类：',
  en: 'Category: '
};

const { ads, adsense } = useAds();
const { theme } = useData();
const { keys, data: posts } = useGroup(theme.value?.posts || [], props.type);

const url = location.href.split('?')[0];
const search = location.href.split('?')[1];
const params = new URLSearchParams(search);
const select = ref(params.get(props.type) || '');
const handleChange = (link: string) => {
  select.value = link;
  const newUrl = `${url}?${props.type}=${link.replaceAll('&', '%26')}`;
  window.history.replaceState(null, '', newUrl);
};
</script>

<style lang="less" scoped>
@import '../styles/page.less';
.title {
  font-size: 1.25rem;
  padding: 14px 0 8px;
  font-family: var(--font-family-number);
}

.bold {
  font-weight: 700;
}

@media screen and (max-width: 768px) {
  .bold {
    font-size: 1.5rem;
  }
}
</style>
