import fs from 'fs/promises';
import matter from 'gray-matter';

export const writeMd = async (path: string, content: string, data: { [key: string]: any }) => {
  const matters = ['title', 'datetime', 'permalink', 'outline', 'order', 'pinned', 'description', 'category', 'tags', 'prev', 'next'];
  const newMarkdown = matter.stringify(content, data, {
    // @ts-ignore
    sortKeys: (a: string, b: string) => matters.indexOf(a) - matters.indexOf(b)
  });
  await fs.writeFile(path, newMarkdown, 'utf8');
};
