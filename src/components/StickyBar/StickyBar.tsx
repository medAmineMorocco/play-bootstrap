import React from "react";

export default function StickyBar({text}:{text: string}) {
  return (
    <section>
      <div className="w-full bg-gradient-to-l from-[#27F090] via-[#7F41F3] to-[#F59527] px-4 md:px-10">
        <div className="relative pr-6">
          <p className="py-3 text-center text-sm font-semibold text-white md:text-base">
            {text}
            <a href="/pricing" className="pl-1 underline">
              Get it now→
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
