import Link from "next/link";
import { Compass } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full border-b border-primary-200/60 bg-background/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-lg bg-primary-100 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-200">
            <Compass className="w-6 h-6 stroke-[2]" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight text-secondary-900">
            YatraSetu
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-secondary-700">
          <Link
            href="#destinations"
            className="hover:text-primary-600 transition-colors"
          >
            Destinations
          </Link>
          <Link
            href="#routes"
            className="hover:text-primary-600 transition-colors"
          >
            Cultural Routes
          </Link>
          <Link
            href="#insights"
            className="hover:text-primary-600 transition-colors"
          >
            Transit Insights
          </Link>
          <Link
            href="#about"
            className="hover:text-primary-600 transition-colors"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/planner"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary-600 text-white shadow-sm hover:bg-primary-700 active:bg-primary-800 transition-colors"
          >
            Plan My Trip
          </Link>
        </div>
      </div>
    </header>
  );
}
