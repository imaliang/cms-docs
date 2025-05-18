import removeMd from 'remove-markdown';

export const removeMdPro = (str: string) => {
  return removeMd(str.replace(/```.*?```/gs, '').replace(/^#+\s.*$/gm, '')) // 移除代码块、标题
    .trim() // 移除空格
    .split(/\r\n|\n|\r/)
    .join(' ') // 移除换行
    .replace(/\s{2,}/g, ' ')
    .replace(/:::.*?:::/gs, '') // 移除 :::
    .trim();
};
