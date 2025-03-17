import { Saira_Stencil_One } from "next/font/google";
import { MenuBar } from "./menu-bar";

const sairaStencil = Saira_Stencil_One({
  weight: ["400"],
  subsets: ["latin"],
});

export function Header() {
  return (
    <header className="flex items-center justify-between px-[160px] py-10">
      <a
        className={`${sairaStencil.className} text-[var(--logo-color)] font-normal text-[40px] leading-[150%]`}
      >
        Currenzy
      </a>
      <MenuBar />
    </header>
  );
}
