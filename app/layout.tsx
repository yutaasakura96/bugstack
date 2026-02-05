import { Container, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from './NavBar';
import QueryClientProvider from './QueryClientProvider';
import AuthProvider from './api/Provider';
import './globals.css';
import './theme-config.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});
export const metadata: Metadata = {
  title: 'BugStack',
  description: 'BugStack is a platform for tracking issues',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor="violet">
              <NavBar />
              <Container>
                <main className="p-5">{children}</main>
              </Container>
            </Theme>
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
