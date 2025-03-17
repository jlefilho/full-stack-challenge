interface MenuItemProps {
  title: string;
  selected?: boolean;
}

export function MenuItem(props: MenuItemProps) {
  return (
    <li
      className={`font-${props.selected ? "semibold" : "normal"} 
                  text-[var(--text-dark)] text-[16px] leading-[22px] 
                  text-center uppercase cursor-pointer
                  ${
                    props.selected
                      ? "border-b-4 border-[var(--orange-low)]"
                      : ""
                  }`}
    >
      {props.title}
    </li>
  );
}
