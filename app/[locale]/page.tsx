import {useTranslations} from 'next-intl';
import Header from '../../components/Header'; 
import Section from '../../components/Section';
import WelcomeSection from '../../components/WelcomeSection';

export default function Index() {
  const t = useTranslations('IndexHeader');
  const w = useTranslations('Welcome');
  return (<>
            <Header translations={t}>
            </Header>
            <div className="content">
                <WelcomeSection />
            </div>
         </>);
}