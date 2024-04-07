import {useTranslations} from 'next-intl';
import Header from '../../components/Header'; 

export default function Index() {
  const t = useTranslations('IndexHeader');
  return <>
            <Header translations={t} />
            <h1>{t('title')}</h1>
         </>;
}