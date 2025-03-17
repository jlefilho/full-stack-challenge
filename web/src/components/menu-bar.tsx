import { MenuItem } from "./menu-item";

export function MenuBar() {
  return (
    <ul className="flex items-center justify-center gap-10">
      <MenuItem title="Home" selected></MenuItem>
      <MenuItem title="Quotes"></MenuItem>
      <MenuItem title="Average"></MenuItem>
      <MenuItem title="Slippage"></MenuItem>
    </ul>
  );
}
