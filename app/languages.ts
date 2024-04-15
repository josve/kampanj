import 'server-only';

const dictionaries: any = {
  sv: () => import('../messages/sv.json').then((module) => module.default),
  en: () => import('../messages/en.json').then((module) => module.default),
};

export const getDictionary: any = async (locale: string) =>
  dictionaries[locale]();
