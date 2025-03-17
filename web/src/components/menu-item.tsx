import Link from "next/link";

interface MenuItemProps {
  title: string;
  href: string;
  selected?: boolean;
}

export function MenuItem(props: MenuItemProps) {
  const fontWeightClass = props.selected ? "font-semibold" : "font-normal";
  const borderClass = props.selected
    ? "border-b-4 border-[var(--orange-low)]"
    : "";

  return (
    <Link
      href={props.href}
      className={`${fontWeightClass} 
				text-[var(--text-dark)] text-[16px] leading-[22px] 
				text-center uppercase cursor-pointer
				${borderClass}
				hover:border-b-4 hover:border-[var(--orange-low)] 
				hover:font-semibold
				transition-all duration-100 ease-in-out`}
    >
      {props.title}
    </Link>
  );
}
