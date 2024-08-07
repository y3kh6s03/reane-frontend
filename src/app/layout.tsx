import { Metadata } from "next";

import { SessionProvider } from "next-auth/react";
import { auth } from "@/../auth";
import ChartProvider from "./components/libs/ChartProvider";
import { accFont, jpFont, enFont } from "./styles/fonts";
import Nav from "./components/layouts/nav/Nav";

import "./styles/globals.scss";
import Header from "./components/layouts/header/Header";
import SideBar from "./components/layouts/sidebar/SideBar";

export const metadata: Metadata = {
  title: {
    template: '%s | REANE',
    default: 'REANE'
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
  const authEmail = session?.user?.email;

  return (
    <html lang='ja'>
      <body className={`${accFont.variable} ${jpFont.variable} ${enFont.variable}`}>
        <main>
          <SessionProvider>
            <ChartProvider>
              {authImage &&
                <>
                  <Header />
                  <Nav props={authImage} />
                  {
                    authEmail
                    &&
                    <SideBar authEmail={authEmail} />
                  }
                </>
              }
              {children}
            </ChartProvider>
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
