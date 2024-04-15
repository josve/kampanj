import { FunctionComponent } from 'react';
import Link from 'next/link';
import { getDictionary } from '@/app/languages';
import { authOptions } from '@/utils/authConfig';
import { getServerSession } from 'next-auth';
import AdminAvatar from '@/components/AdminAvatar';

interface HeaderProps {
  translations: Record<string, string>;
  locale: string;
}

const Header: FunctionComponent<HeaderProps> = async ({
  translations,
  locale,
}) => {
  const dictionary = await getDictionary(locale);

  const ht = dictionary['SystemName'];

  const session = await getServerSession(authOptions);

  return (
    <>
      {session?.user && <AdminAvatar username={session.user.name} />}
      <div className="header">
        <div className="header-logo">
          <img src="/images/logo.svg" width="207px" />
        </div>
        <div className="section-header-title">
          <Link href="/">{ht['title']}</Link>
        </div>
        <div className="header-title">{translations['title']}</div>
        <div className="header-subtitle">{translations['subtitle']}</div>
      </div>
    </>
  );
};

export default Header;
