import {useTranslations} from 'next-intl';
import Header from '../../components/Header'; 
import Section from '../../components/Section';
import WelcomeSection from '../../components/WelcomeSection';
import CurrentSection from '../../components/CurrentSection';

export default function Index({ params: { locale }}) {
  const t = useTranslations('IndexHeader');
  const w = useTranslations('Welcome');
  return (<>
            <Header translations={t}>
            </Header>
            <div className="content">
                <WelcomeSection />
                <CurrentSection locale={locale} />
            </div>
         </>);
}