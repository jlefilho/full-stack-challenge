import { MenuItem } from "./menu-item";

interface MenuBarProps {
  items: { title: string; href: string; selected?: boolean }[];
}

export function MenuBar({ items }: MenuBarProps) {
  return (
    <div className="flex items-center justify-center gap-10">
      {items.map((item, i) => (
        <MenuItem
          key={i}
          title={item.title}
          href={item.href}
          selected={item.selected}
        />
      ))}
    </div>
  );
}
