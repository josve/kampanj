import { FunctionComponent } from 'react';
import { useTranslations } from 'next-intl';
import Section from './Section';

const WelcomeSection: FunctionComponent = () => {
  const w = useTranslations('Welcome');
  return (
    <Section translations={w} imagePath="icon_registration_white.png" >
    <div className="welcome-content">
      <img className="welcome-image" src="cover-image.jpg" />
      <div className="welcome-text">
        <h2>{w('description_title')}</h2>
        <p>
          {w('description_text')}
        </p>
      </div>
    </div>
    </Section>
  );
};

export default WelcomeSection;