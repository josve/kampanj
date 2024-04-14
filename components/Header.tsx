import { FunctionComponent } from 'react';
import Link from 'next/link';
import { getDictionary } from '@/app/languages';

interface HeaderProps {
  translations: (key: string) => string;
}

const Header: FunctionComponent<HeaderProps> = async ({ translations, locale }) => {
  const dictionary = await getDictionary(locale);

  const ht = dictionary['SystemName'];
  
  return (
    <div className="header">
     <div className="header-logo">
        <img src="/images/logo.svg" width="207px" />
      </div>
      <div className="section-header-title">
        <Link href="/">
              {ht['title']}
        </Link>
       </div>
       <div className="header-title">
            {translations['title']}
       </div>
       <div className="header-subtitle">
            {translations['subtitle']}
       </div>
    </div>);
};

export default Header;