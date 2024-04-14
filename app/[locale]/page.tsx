import Header from '../../components/Header'; 
import Section from '../../components/Section';
import WelcomeSection from '../../components/WelcomeSection';
import CurrentSection from '../../components/CurrentSection';
import { getDictionary } from '@/app/languages';

export default async function Index({ params: { locale }}) {
  const dictionary = await getDictionary(locale);

  const t = dictionary['IndexHeader'];
  const w = dictionary['Welcome'];

  return (<>
            <Header translations={t} locale={locale}>
            </Header>
            <div className="content">
                <WelcomeSection locale={locale} />
                <CurrentSection locale={locale} />
            </div>
         </>);
}