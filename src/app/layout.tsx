import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import MobileNavbar from '@/components/MobileNavbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: process.env.APP_TITLE,
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex max-sm:flex-col space-x-0 px-0 min-h-screen">
            <div className="flex-shrink-0 min-h-screen max-sm:hidden block">
              <Navbar />
            </div>
            <div className="max-sm:block hidden">
              <MobileNavbar />
            </div>
            <div className="w-full">
              <div className="px-8 mx-auto flex justify-center pt-8 max-w-[80rem]">{children}</div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
