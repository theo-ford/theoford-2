"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-[10px] left-[50vw] ml-[7px] mix-blend-exclusion z-[100]">
      {/* <Link 
        href="/" 
        className={`mr-[10px] ${pathname === "/" ? "border-b border-solid border-black" : ""}`}
      >
        Current
      </Link> */}
      <Link
        href="/"
        className={pathname === "/" ? "text-white" : "text-[#878787]"}
      >
        Selected,
      </Link>
      <span> </span>
      <Link
        href="/projects"
        className={pathname === "/projects" ? "text-white" : "text-[#878787]"}
      >
        Projects,
      </Link>
      <span> </span>
      <Link
        href="/about"
        className={pathname === "/about" ? "text-white" : "text-[#878787]"}
      >
        About
      </Link>
    </nav>
  );
};