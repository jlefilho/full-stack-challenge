"use client";

import Link from "next/link";
import { MenuBar } from "./menu-bar";
import { MobileMenu } from "./mobile-menu";

const menuItems = [
  { title: "Cotações", href: "/" },
  { title: "Sobre", href: "/about" },
  { title: "Contato", href: "/contact" },
];

export function Header() {
  return (
    <header className="relative flex items-center justify-between px-6 py-10 lg:px-[160px] w-full">
      <Link
        href="/"
        className="text-[var(--logo-color)] font-normal text-[40px] leading-[150%]"
      >
        Curren
        <span className="text-[var(--orange-low)]">zy</span>
      </Link>

      <div className="hidden lg:flex flex-1 justify-center">
        <MenuBar items={menuItems} />
      </div>

      <div className="lg:hidden">
        <MobileMenu menuItems={menuItems} />
      </div>
    </header>
  );
}
