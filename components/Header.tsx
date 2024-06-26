import { FunctionComponent } from 'react';
import Link from 'next/link';
import { Button } from 'antd';
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
      <div className="header">
        <div className="header-logo">
          <img src={process.env.PUBLIC_LOGO} />
        </div>
        <div className="section-header-title">
          <Link href="/">{process.env.SYSTEM_NAME}</Link>
        </div>
        <div className="header-title">{translations['title']}</div>
        <div className="header-subtitle">{translations['subtitle']}</div>
        {!session?.user && (
          <div className="login-button">
            <Button href="/api/auth/signin" size="small">
              Administrera
            </Button>
          </div>
        )}
      </div>
      {session?.user && <AdminAvatar username={session.user.name!} />}
    </>
  );
};

export default Header;
