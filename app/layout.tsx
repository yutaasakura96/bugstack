import type { Metadata } from 'next';
import NavBar from './NavBar';
import './globals.css';

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
      <body>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
