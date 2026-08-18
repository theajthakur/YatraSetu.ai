import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroActions() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
      <Link
        href="/planner"
        className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-semibold text-base bg-primary-600 text-white shadow-md hover:bg-primary-700 active:bg-primary-800 transition-all duration-200 group"
      >
        <span>Plan My Trip</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
      </Link>
    </div>
  );
}
