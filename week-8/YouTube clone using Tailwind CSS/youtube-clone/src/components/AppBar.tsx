import { useState, useEffect } from "react";
import Link from 'next/link'
import { LeftPanel } from "./LeftPanel";
import { SearchBar } from "./SearchBar";

export function AppBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  return (
    <div className="p-2 flex justify-between">
      <div className="flex items-center pb-2">
        <button
          className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="size-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {isMenuOpen && (
          <div className="fixed top-0 left-0 z-50 h-screen w-3/4 md:w-1/2 xl:w-[30%] bg-gray-950 opacity-90 overflow-y-auto">
            <LeftPanel menuState={isMenuOpen} setMenuOpen={setIsMenuOpen} />
          </div>
        )}

        <Link href="/" className="ml-4">YouTube</Link>
      </div>

      <div>
        <SearchBar />
      </div>

      <div>Sign In</div>
    </div>
  );
}
