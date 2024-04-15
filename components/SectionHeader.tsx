import { FunctionComponent } from 'react';
import Link from 'next/link';

interface SectionProps {
  translations: Record<string, string>;
  imagePath: string;
  children: React.ReactNode;
}

const SectionHeader: FunctionComponent<SectionProps> = ({
  translations,
  imagePath,
  children,
}) => {
  return (
    <>
      <div className="section-header">
        <img
          src="/images/section_header_corner.png"
          className="section-header-corner"
        ></img>
        <div className="section-header-title">
          <img src={imagePath} className="section-header-icon"></img>
          {translations['title']}
          {children}
        </div>
      </div>
    </>
  );
};

export default SectionHeader;
