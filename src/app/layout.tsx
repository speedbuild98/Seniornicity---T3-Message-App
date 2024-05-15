import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import { NavBar } from "./_components/General";

export const metadata = {
  title: "Seniornicity - T3 Messaging App",
  description: "Built with create-t3-app by Gallardo dev",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          {children}
          <NavBar />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
