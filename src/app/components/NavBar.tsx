"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const nav = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={nav}
      className={`fixed top-0 left-0 right-0 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="bg-black bg-opacity-85 text-white p-4">
        <ul className="flex justify-center space-x-10">
          {["Home", "About", "Services", "Contact"].map((item) => (
            <li key={item}>
              <Link
                href={`#${item.toLowerCase()}`}
                className="relative group block py-2"
              >
                <span className="relative z-10 px-2 font-PlayfairDisplay">
                  {item}
                </span>
                <span className="absolute inset-x-0 top-0 h-[1px] bg-white group-hover:bg-black transition-all duration-700 ease-out">
                  <span className="absolute inset-y-0 left-0 bg-black w-0 group-hover:w-full transition-all duration-700 ease-out" />
                </span>
                <span className="absolute inset-x-0 bottom-0 h-[1px] bg-white group-hover:bg-black transition-all duration-700 ease-out">
                  <span className="absolute inset-y-0 left-0 bg-black w-0 group-hover:w-full transition-all duration-700 ease-out" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
