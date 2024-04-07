import { FunctionComponent } from 'react';
import {useTranslations} from 'next-intl';
import Link from 'next/link';

interface HeaderProps {
  translations: (key: string) => string;
}

const Header: FunctionComponent<HeaderProps> = ({ translations }) => {
  const ht = useTranslations('SystemName');
  return (
    <div className="header">
     <div className="header-logo">
        <img src="/logo.svg" width="207px" />
      </div>
      <div className="section-header-title">
        <Link href="/">
              {ht('title')}
        </Link>
       </div>
       <div className="header-title">
            {translations('title')}
       </div>
       <div className="header-subtitle">
            {translations('subtitle')}
       </div>
    </div>);
};

export default Header;