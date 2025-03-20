"use client";

import { usePathname } from "next/navigation";
import { MenuItem } from "./menu-item";

interface MenuBarProps {
  items: { title: string; href: string; selected?: boolean }[];
}

export function MenuBar({ items }: MenuBarProps) {
  const path = usePathname();

  return (
    <div className="flex items-center justify-center gap-10">
      {items.map((item, i) => (
        <MenuItem
          key={i}
          title={item.title}
          href={item.href}
          selected={path === item.href}
        />
      ))}
    </div>
  );
}
