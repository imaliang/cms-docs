<template>
  <div class="home">
    <div class="home__image">
      <img :src="withBase(imgUrl)" />
    </div>
    <div class="home__title">{{ title }}</div>
    <div class="home__desc">{{ desc }}</div>
    <div class="home__links">
      <a :href="item.url" target="_blank" v-for="item in links" :key="item.text">{{ item.text }}</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { withBase } from 'vitepress';
import { ref, onMounted } from 'vue';
defineProps({
  imgUrl: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String },
  links: { type: Array<{ url: string; text: string }> }
});
const contentHeight = ref('auto');

const handleHeight = () => {
  const content = document.querySelector('.VPContent');
  if (content) {
    const pt = parseFloat(getComputedStyle(content).getPropertyValue('padding-top'));
    const height = content.clientHeight;
    contentHeight.value = `${height - pt}px`;
  }
};

// debounce
const debounce = (fn, delay = 100) => {
  let timer: number;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // @ts-ignore
      fn.apply(this, arguments);
      timer = null;
    }, delay) as any;
  };
};

// first entry
onMounted(() => {
  handleHeight();
});

// resize
window.addEventListener('resize', debounce(handleHeight));
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: v-bind(contentHeight);

  &__image {
    width: 18rem;
    height: 18rem;

    img {
      width: 100%;
      height: 100%;
      user-select: none;
      -webkit-user-drag: none;
    }
  }

  &__title {
    font-size: 2.3rem;
    font-weight: 700;
    margin: 1.2rem auto;
    line-height: initial;
  }

  &__desc {
    font-size: 1.6rem;
    line-height: 1.3;
    color: #6a8bad;
    margin: 0 auto 1.8rem;
  }

  &__links {
    display: flex;

    a {
      display: block;
      padding: 0.5rem;
      border-radius: 5px;
      background-color: var(--vp-c-brand);
      color: #fff;
      transition: background-color 0.3s ease;

      &:not(:last-child) {
        margin-right: 1rem;
      }

      &:hover {
        background-color: var(--vp-c-brand-3);
      }
    }
  }
}
</style>
