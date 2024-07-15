import React, { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  mainClassName?: string;
}

const Layout = ({ children, mainClassName }: LayoutProps) => {
  return (
    <div className="flex flex-col lg:h-screen">
      <Header />
      <main className={`flex-1 ${mainClassName}`}>{children}</main>
    </div>
  );
};

export default Layout;
