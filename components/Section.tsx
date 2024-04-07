import { FunctionComponent } from 'react';
import {useTranslations} from 'next-intl';
import Link from 'next/link';

interface SectionProps {
  translations: (key: string) => string;
  imagePath: string;
  children: React.ReactNode;
}

const Section: FunctionComponent<SectionProps> = ({ translations, imagePath, children }) => {
  return (
    <>
    <div className="section-header">
    <img src="section_header_corner.png" 
         className="section-header-corner">
    </img>
      <div className="section-header-title">
      <img src={imagePath}
      className="section-header-icon">
        </img>
         {translations('title')}
       </div>
    </div>
    <div className="padding">
        {children}
    </div>
    </>);
};

export default Section;