"use client";

import { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { MenuItem } from "./menu-item";
import { Logo } from "./logo";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  menuItems: { title: string; href: string }[];
}

export function MobileMenu({ menuItems }: MobileMenuProps) {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <IoMenuOutline
        size={40}
        className="text-[var(--logo-color)] lg:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />

      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-2xl z-50 transform transition-transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-3xl text-[var(--logo-color)]"
          >
            &times;
          </button>
        </div>

        <div className="flex justify-center mt-2">
          <Logo />
        </div>

        <div className="flex flex-col items-center gap-6 mt-10">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              title={item.title}
              href={item.href}
              onClick={handleMenuItemClick}
              selected={path === item.href}
            />
          ))}
        </div>
      </div>
    </>
  );
}
