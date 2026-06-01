"use client";

import { useState } from "react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur border-b border-gray-200 z-50">
      <div className="mx-auto max-w-5xl px-4 flex items-center justify-between h-16">
        <a href="#" className="font-bold text-lg">
          戎居
        </a>

        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="メニューを開く"
        >
          <span className="block h-0.5 w-6 bg-gray-900"></span>
          <span className="block h-0.5 w-6 bg-gray-900"></span>
          <span className="block h-0.5 w-6 bg-gray-900"></span>
        </button>
      </div>

      {isOpen && (
        <nav className="md:hidden border-t border-gray-200 bg-white">
          <ul className="flex flex-col px-4 py-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 text-gray-600 hover:text-gray-900"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
