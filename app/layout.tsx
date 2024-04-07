import "../styles/main.scss";

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
            <center>
                <div className="main-container">
                    {children}
                </div>
            </center>
        </body>
      </html>
    );
  }