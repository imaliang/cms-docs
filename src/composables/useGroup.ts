import type { IPost, IGroup } from '../types';

export const useGroup = (posts: IPost[], type: string) => {
  const data: IGroup = {};
  posts.forEach((post) => {
    if (type === 'archives') {
      const year = new Date(post.datetime).getFullYear();
      addToData(data, year, post);
    } else if (type === 'category') {
      const category = post.category;
      addToData(data, category, post);
    } else if (type === 'tags') {
      const tags = post.tags;
      tags && tags.forEach((tag) => addToData(data, tag, post));
    }
  });

  const keys = Object.keys(data).sort((a, b) => {
    if (type === 'tags' || type === 'category') {
      return a.localeCompare(b);
    }
    return parseInt(b) - parseInt(a);
  });

  return { keys, data };
};

function addToData(obj: IGroup, key: any, value: IPost) {
  if (key) {
    if (!obj[key]) {
      obj[key] = [];
    }
    obj[key].push(value);
  }
}