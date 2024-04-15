import 'server-only';

const dictionaries = {
  sv: () => import('../messages/sv.json').then((module) => module.default),
  en: () => import('../messages/en.json').then((module) => module.default),
};

export const getDictionary = async (
  locale: string,
): Promise<(category: string) => Record<string, string>> =>
  dictionaries[locale]();
