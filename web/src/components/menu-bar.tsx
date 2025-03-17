import { MenuItem } from "./menu-item";

const items = [
  { title: "Home", href: "/", selected: true },
  { title: "Quotes", href: "/" },
  { title: "Average", href: "/" },
  { title: "Slippage", href: "/" },
];

export function MenuBar() {
  return (
    <div className="flex items-center justify-center gap-10">
      {items.map((item, i) => (
        <MenuItem
          key={i}
          title={item.title}
          href={item.href}
          selected={item.selected}
        ></MenuItem>
      ))}
    </div>
  );
}
