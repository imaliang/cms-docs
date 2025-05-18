import fs from 'fs/promises';
import path from 'path';
import { fileExists } from './fileExists';

export const generateMd = async (type: string, outDir: string, lang: string) => {
  const filePath = path.resolve(outDir, `${type}.md`);
  if (await fileExists(filePath)) return;

  const titles = {
    archives: { zh: '归档', en: 'Archives' },
    category: { zh: '分类', en: 'Category' },
    tags: { zh: '标签', en: 'Tags' }
  };

  const page = `
---
title: ${titles[type][lang]}
layout: page
---

<Group type='${type}' lang='${lang}' />
    `.trim();
  await fs.writeFile(filePath, page);
};
