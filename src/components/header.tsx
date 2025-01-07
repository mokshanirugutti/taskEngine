"use client"

import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { Button } from "./ui/button";
import { useSession, signOut } from "next-auth/react";
export default function Header() {
  const { data: session } = useSession();


  return (
    <header>
      <div className="px-4 sm:px-6 ">
        <div className="mx-auto mb-12 flex h-[72px] w-full max-w-6xl items-center justify-between gap-3 border-b border-border/70 absolute z-50 left-1/2 -translate-x-1/2">
          <Link
            href="/"
            aria-label="Home"
            className="rounded-full outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
          >
            <span className="sr-only">Task Engine</span>
            <h1 className="font-semibold tracking-wide"> TaskEngine</h1>
          </Link>
          
          <div className="flex items-center gap-2">
            {session ? (
              <Button variant="outline" 
                className="hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition duration-300 ease-in-out"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            ) : (
              <Link href="/signin">
                <Button variant="outline" 
                  className="hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition duration-300 ease-in-out">
                  Sign In
                </Button>
              </Link>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}