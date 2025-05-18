import { useData } from 'vitepress';

export const useAds = () => {
  const { theme } = useData();
  const ads = theme.value.ads;
  const adsense = theme.value.adsense;

  return {
    ads,
    adsense
  };
};
