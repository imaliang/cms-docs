<template>
  <Layout>
    <template #sidebar-nav-before>
      <AdItem
        v-if="ads?.sidebarNavBefore || adsense?.sidebarNavBefore"
        :ads="ads?.sidebarNavBefore"
        :adsense="{ client: adsense?.client, slot: adsense?.sidebarNavBefore }"
        type="sidebar"
      />
    </template>
    <template #sidebar-nav-after>
      <AdItem
        v-if="ads?.sidebarNavAfter || adsense?.sidebarNavAfter"
        :ads="ads?.sidebarNavAfter"
        :adsense="{ client: adsense?.client, slot: adsense?.sidebarNavAfter }"
        type="sidebar"
      />
    </template>
    <template #aside-outline-before>
      <AdItem
        v-if="ads?.asideOutlineBefore || adsense?.asideOutlineBefore"
        :ads="ads?.asideOutlineBefore"
        :adsense="{ client: adsense?.client, slot: adsense?.asideOutlineBefore }"
        type="aside"
      />
    </template>
    <template #aside-outline-after>
      <AdItem
        v-if="ads?.asideOutlineAfter || adsense?.asideOutlineAfter"
        :ads="ads?.asideOutlineAfter"
        :adsense="{ client: adsense?.client, slot: adsense?.asideOutlineAfter }"
        type="aside"
      />
    </template>
    <template #doc-before>
      <AdItem
        v-if="ads?.docBefore || adsense?.docBefore"
        :ads="ads?.docBefore"
        :adsense="{ client: adsense?.client, slot: adsense?.docBefore }"
        type="doc"
      />
    </template>
    <template #doc-after>
      <AdItem
        v-if="ads?.docAfter || adsense?.docAfter"
        :ads="ads?.docAfter"
        :adsense="{ client: adsense?.client, slot: adsense?.docAfter }"
        type="doc"
      />
    </template>
    <template #doc-footer-before><PostInfoItem /></template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme';
import PostInfoItem from '../components/PostInfoItem.vue';
import AdItem from '../components/AdItem.vue';
import { useData } from 'vitepress';
const { Layout } = DefaultTheme;
const { theme } = useData();
const ads = theme.value.ads;
const adsense = theme.value.adsense;
</script>
