"use client";

import { MenuBar } from "./menu-bar";
import { MobileMenu } from "./mobile-menu";
import { Logo } from "./logo";

const menuItems = [
  { title: "Cotações", href: "/" },
  { title: "Sobre", href: "/about" },
  { title: "Contato", href: "/contact" },
];

export function Header() {
  return (
    <header className="relative flex items-center justify-between px-6 py-4 lg:px-[160px] w-full shadow-lg">
      <Logo />

      <div
        className="hidden lg:flex flex-1 justify-center"
        style={{ marginLeft: "-170px" }}
      >
        <MenuBar items={menuItems} />
      </div>

      <div className="lg:hidden">
        <MobileMenu menuItems={menuItems} />
      </div>
    </header>
  );
}
