import Link from "next/link";
import { Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-primary-200/60 bg-primary-100/40 py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-md bg-primary-600 text-white">
            <Compass className="w-5 h-5 stroke-[2]" />
          </div>
          <span className="font-display font-bold text-lg text-secondary-900">
            YatraSetu
          </span>
          <span className="text-xs text-secondary-600 ml-2">
            SIH 2026 Prototype
          </span>
        </div>

        <p className="text-xs text-secondary-600 text-center md:text-left">
          &copy; {new Date().getFullYear()} YatraSetu. Intelligent Cultural Travel Companion.
        </p>

        <div className="flex items-center gap-6 text-xs font-medium text-secondary-700">
          <Link href="#privacy" className="hover:text-primary-600 transition-colors">
            Privacy Policy
          </Link>
          <Link href="#terms" className="hover:text-primary-600 transition-colors">
            Terms of Service
          </Link>
          <Link href="#contact" className="hover:text-primary-600 transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
