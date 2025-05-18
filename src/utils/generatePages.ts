import fs from 'fs/promises';
import path from 'path';
import { fileExists } from './fileExists';

export const generatePages = async (
  outDir?: string,
  lang?: string,
  pageSize?: number,
  homepage?: boolean,
  total?: number
) => {
  const indexPath = path.resolve(outDir, 'index.md');

  const indexExist = await fileExists(indexPath);
  const pageTotal = total > 0 ? Math.ceil(total / pageSize) : 0;

  for (let i = 1; i <= pageTotal; i++) {
    const title = i === 1 && homepage ? '' : lang === 'zh' ? `\ntitle: 第${i}页` : `\ntitle: Page ${i}`;
    const page = `
---${title}
layout: page
---

<Page :pagination="${i}" :total="${pageTotal}" :size="${pageSize}" :homepage="${homepage}" />
`.trim();
    const pagePath = i === 1 && homepage ? indexPath : path.resolve(outDir, `page-${i}.md`);
    await fs.writeFile(pagePath, page);
  }

  if ((total === 0 || !homepage) && !indexExist) {
    const page = `
---
layout: page
---
<Home imgUrl="/profile.png" title="只抄" desc="Less is more." :links="[{ url: 'https://github.com/izhichao/vitepress-theme-minimalism', text: 'Github ->' }]" />
    `.trim();
    await fs.writeFile(indexPath, page);
  }
};
