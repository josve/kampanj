import { FunctionComponent } from 'react';
import Link from 'next/link';
import SectionHeader from './SectionHeader';

interface SectionProps {
  children: React.ReactNode;
}

const SectionContent: FunctionComponent<SectionProps> = ({ children }) => {
  return (
    <>
      <div className="padding">{children}</div>
    </>
  );
};
export default SectionContent;
