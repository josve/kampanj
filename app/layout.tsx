import '../styles/main.scss';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.css';
import '@mdxeditor/editor/style.css';
import { ConfigProvider } from 'antd';

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const cssText = `
  :root {
  --header-font-family: ${process.env.NEXT_PUBLIC_HEADER_FONT_FAMILY};
  --content-font-family: ${process.env.NEXT_PUBLIC_CONTENT_FONT_FAMILY};
  }
  @font-face {
    font-family: ${process.env.NEXT_PUBLIC_HEADER_FONT_FAMILY};
    src: url('${process.env.NEXT_PUBLIC_HEADER_FONT_URL}');
    font-style: normal;
    font-weight: bold;
    text-rendering: optimizeLegibility;
  }
  @font-face {
    font-family: ${process.env.NEXT_PUBLIC_CONTENT_FONT_FAMILY};
    src: url('${process.env.NEXT_PUBLIC_CONTENT_FONT_URL}');
    font-style: normal;
    text-rendering: optimizeLegibility;
  }
`;

  return (
    <html lang={locale}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: cssText }} />
        <meta name="ROBOTS" content="NOINDEX, NOFOLLOW" />
      </head>

      <body>
        <AntdRegistry>
          <ConfigProvider locale={locale}>
            <center>
              <div className="main-container">{children}</div>
            </center>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
