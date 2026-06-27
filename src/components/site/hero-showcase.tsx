"use client";

import { GripArt, TruckArt, WheelArt } from "@/components/site/part-art";

export function HeroShowcase() {
  return (
    <div className="mt-8 w-full">
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-10 xl:gap-14">
        <aside className="order-2 flex w-full max-w-lg items-end justify-between gap-4 sm:max-w-xl sm:justify-center sm:gap-10 lg:order-1 lg:w-40 lg:max-w-none lg:shrink-0 lg:flex-col lg:items-end lg:gap-12 xl:w-48">
          <TruckArt className="w-[42%] sm:w-32 lg:w-full animate-float-board [animation-delay:-1.5s]" />
          <GripArt className="w-[28%] sm:w-24 lg:w-full animate-float-board [animation-delay:-0.5s]" />
        </aside>

        <div className="order-1 w-full min-w-0 flex-1 lg:order-2 lg:max-w-4xl xl:max-w-5xl">
          {/* Native img keeps the full-resolution file sharp without optimizer limits */}
          <img
            src="/hero/boards.png"
            alt="Handmade wooden fingerboard decks stacked on a dark surface"
            className="mx-auto block h-auto w-full object-contain"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <aside className="order-3 flex w-full max-w-lg items-start justify-between gap-4 sm:max-w-xl sm:justify-center sm:gap-10 lg:w-40 lg:max-w-none lg:shrink-0 lg:flex-col lg:items-start lg:gap-12 xl:w-48">
          <WheelArt className="w-[42%] sm:w-32 lg:w-full animate-float-board [animation-delay:-2s]" />
          <WheelArt
            label="Urethane"
            className="w-[28%] sm:w-24 lg:w-full animate-float-board [animation-delay:-1s]"
          />
        </aside>
      </div>
    </div>
  );
}
