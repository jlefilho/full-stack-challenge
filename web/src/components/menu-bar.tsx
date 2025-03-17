import { MenuItem } from "./menu-item";

const items = [
  { title: "Cotações", href: "/", selected: true },
  { title: "Sobre", href: "/about" },
  { title: "Contato", href: "/contact" },
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
