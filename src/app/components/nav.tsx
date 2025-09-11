"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-[15px] left-[50vw] mix-blend-exclusion text-[#878787] mix-blend-exclusion  z-100">
      {/* <Link 
        href="/" 
        className={`mr-[10px] ${pathname === "/" ? "border-b border-solid border-black" : ""}`}
      >
        Current
      </Link> */}
      <Link 
        href="/" 
        className={`mr-[10px] ${pathname === "/" ? "border-b border-solid border-black" : ""}`}
      >
        Selected
      </Link>
      <Link 
        href="/projects" 
        className={`mr-[10px] ${pathname === "/projects" ? "border-b border-solid border-black" : ""}`}
      >
        Projects
      </Link>
      <Link 
        href="/about" 
        className={`mr-[10px] ${pathname === "/about" ? "border-b border-solid border-black" : ""}`}
      >
        About
      </Link>            
    </nav>
  );
};