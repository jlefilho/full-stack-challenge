import type { Metadata } from "next";
import "./globals.css";
import { Saira } from "next/font/google";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Currenzy",
  description: "",
};

const saira = Saira({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={saira.className} style={{ paddingTop: "80px" }}>
        <Header />
        {children}
      </body>
    </html>
  );
}
