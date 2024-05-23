import { Metadata } from "next";

import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { accFont, jpFont, enFont } from "./styles/fonts";
import Nav from "./components/layouts/nav/Nav";

import "./styles/globals.scss";
import Header from "./components/layouts/header/Header";
import SideBar from "./components/layouts/sidebar/SideBar";

export const metadata: Metadata = {
  title: {
    template: '%s | REANA',
    default: 'REANA'
  },
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const authImage = session?.user?.image;

  return (
    <html lang='ja'>
      <body className={`${accFont.variable} ${jpFont.variable} ${enFont.variable}`}>
        <main>
          <SessionProvider>
              {authImage &&
                <>
                  <Header />
                  <Nav props={authImage} />
                  <SideBar />
                </>
              }
              {children}
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
