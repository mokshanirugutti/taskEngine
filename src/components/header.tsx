import Link from "next/link";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <header>
      <div className="px-4 sm:px-6">
        <div className="mx-auto mb-16 flex h-[72px] w-full max-w-6xl items-center justify-between gap-3 border-b border-border/70">
          <Link
            href="/"
            aria-label="Home"
            className="rounded-full outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
          >
            <span className="sr-only">Task Engine</span>
            <h1 className="font-semibold tracking-wide"> TaskEngine</h1>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}