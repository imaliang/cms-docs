import { useData } from 'vitepress';

export const useOutDir = () => {
  const { theme } = useData();
  let outDir: string = theme.value?.page?.outDir || '';
  if (outDir && !outDir.startsWith('/')) {
    outDir = '/' + outDir;
  }
  return { outDir };
};
