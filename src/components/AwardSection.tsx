import { AwardBadge } from "./ui/award-badge";

export const AwardSection = () => {
  return (
    <section className="py-24 bg-[#FAF9F6] border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center justify-center gap-8">
          <AwardBadge />
          <p className="max-w-lg text-gray-500 text-[10px] font-bold leading-relaxed uppercase tracking-[0.2em]">
            This project was meticulously crafted and engineered by the team at Timefall Studios. 
            Pushing the boundaries of automotive acoustic design.
          </p>
        </div>
      </div>
    </section>
  );
};
