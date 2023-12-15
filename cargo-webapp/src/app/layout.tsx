'use client'

// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import Provider from './components/Provider'
import { useEffect } from 'react';
import Menu from './components/Menu';
import MenuItem from './components/MenuItem';
import HomeIcon from './components/icon/HomeIcon';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn, useSession } from 'next-auth/react';
import AuthenticatedContainer from './components/AuthenticatedContainer';

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  useEffect(() => {
    require("preline");
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <ToastContainer />
          <AuthenticatedContainer>
            {children}
          </AuthenticatedContainer>
        </Provider>
      </body>
    </html>
  )
}
