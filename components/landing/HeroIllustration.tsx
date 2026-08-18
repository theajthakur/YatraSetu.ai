import Image from "next/image";

export default function HeroIllustration() {
  return (
    <div className="w-full max-w-4xl px-4 pt-4">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src="/assets/hero.png"
          alt="YatraSetu AI Travel Companion Illustration"
          fill
          priority
          className="object-contain object-center"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
      </div>
    </div>
  );
}
