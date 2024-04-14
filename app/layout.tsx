import "../styles/main.scss";
import { AntdRegistry } from '@ant-design/nextjs-registry';

export default function LocaleLayout({
    children,
    params: {locale}
  }: {
    children: React.ReactNode;
    params: {locale: string};
  }) {
    return (
      <html lang={locale}>
        <body>
          <AntdRegistry>
            <center>
                <div className="main-container">
                    {children}
                </div>
            </center>
          </AntdRegistry>
        </body>
      </html>
    );
  }