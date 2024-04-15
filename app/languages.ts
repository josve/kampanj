import 'server-only';

const dictionaries = {
  sv: () => import('../messages/sv.json').then((module) => module.default),
  en: () => import('../messages/en.json').then((module) => module.default),
};

export const getDictionary = async (
  locale: string,
): Promise<Record<string, Record<string, string>>> => dictionaries[locale]();
