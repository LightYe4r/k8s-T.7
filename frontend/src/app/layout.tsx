import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DateProvider, Providers } from "./providers";
import "./globals.css";
import Navigation from "@/components/Navbar";
import { UserProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cloud School Q&A",
  description: "Created by AWS Cloud School 4기 Group 4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <UserProvider>
            <Navigation />
            <DateProvider>{children}</DateProvider>
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
