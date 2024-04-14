import { FunctionComponent } from 'react';
import Section from './Section';
import { getDictionary } from '@/app/languages';

const WelcomeSection: FunctionComponent = async ({ locale }) => {
  const dictionary = await getDictionary(locale);

  const w = dictionary['Welcome'];

  return (
    <Section translations={w} imagePath="/images/icon_registration_white.png" >
    <div className="welcome-content">
      <img className="welcome-image" src="/images/cover-image.jpg" />
      <div className="welcome-text">
        <h2>{w['description_title']}</h2>
        <p>
          {w['description_text']}
        </p>
      </div>
    </div>
    </Section>
  );
};

export default WelcomeSection;