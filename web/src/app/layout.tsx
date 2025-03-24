import type { Metadata } from "next";
import "./globals.css";
import { Saira } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FilterProvider } from "@/contexts/filter-context";

export const metadata: Metadata = {
  title: "Currenzy",
  description: "Acompanhe cotações de dólar em tempo real",
  icons: {
    icon: "/favicon.ico",
  },
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
    <html lang="pt-BR">
      <body
        className={saira.className}
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          paddingTop: "80px",
        }}
      >
        <FilterProvider>
          <Header />
          <main
            style={{
              flex: 1,
              paddingBottom: "20px",
              backgroundColor: "var(--bg-primary)",
            }}
          >
            {children}
          </main>
          <Footer />
        </FilterProvider>
      </body>
    </html>
  );
}
