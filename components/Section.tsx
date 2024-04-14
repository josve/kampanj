import { FunctionComponent } from 'react';
import Link from 'next/link';
import SectionHeader from './SectionHeader';
import SectionContent from './SectionContent';

interface SectionProps {
  translations: (key: string) => string;
  imagePath: string;
  children: React.ReactNode;
}

const Section: FunctionComponent<SectionProps> = ({
  translations,
  imagePath,
  children,
}) => {
  return (
    <>
      <SectionHeader
        translations={translations}
        imagePath={imagePath}
      ></SectionHeader>
      <SectionContent>{children}</SectionContent>
    </>
  );
};

export default Section;
