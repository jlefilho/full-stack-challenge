"use client";

import Link from "next/link";
import { Saira_Stencil_One } from "next/font/google";

const sairaStencil = Saira_Stencil_One({
  weight: ["400"],
  subsets: ["latin"],
});

export function Logo() {
  return (
    <Link
      href="/"
      className={`${sairaStencil.className} text-[var(--logo-color)] font-normal text-[40px] leading-[150%]`}
    >
      Curren
      <span className="text-[var(--orange-low)]">zy</span>
    </Link>
  );
}
