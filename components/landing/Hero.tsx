import HeroHeadline from "./HeroHeadline";
import HeroActions from "./HeroActions";
import HeroIllustration from "./HeroIllustration";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center py-12 lg:py-20 px-4 space-y-8 bg-gradient-to-b from-background via-primary-100/30 to-background">
      <HeroHeadline />
      <HeroActions />
      <HeroIllustration />
    </section>
  );
}
