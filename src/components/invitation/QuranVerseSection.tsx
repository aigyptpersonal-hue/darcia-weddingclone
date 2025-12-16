import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "@/data/invitationData";

const QuranVerseSection = () => {
  const { quranVerse } = invitationData;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="relative py-24 px-6 bg-card overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,_transparent_49%,_hsl(var(--gold))_50%,_transparent_51%)] bg-[length:100%_60px]" />
      </div>

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        {/* Decorative top element */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary/50" />
          <div className="w-2 h-2 rotate-45 border border-primary/50" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary/50" />
        </div>

        {/* Arabic text (if available) */}
        {quranVerse.arabic && (
          <p className="font-display text-2xl md:text-3xl text-primary mb-8 leading-relaxed" dir="rtl">
            {quranVerse.arabic}
          </p>
        )}

        {/* Translation */}
        <p className="text-sm md:text-base text-foreground/80 leading-relaxed italic mb-8 max-w-2xl mx-auto">
          "{quranVerse.translation}"
        </p>

        {/* Source */}
        <p className="text-primary font-medium text-sm tracking-wide">
          {quranVerse.source}
        </p>

        {/* Decorative bottom element */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary/50" />
          <div className="w-2 h-2 rotate-45 border border-primary/50" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary/50" />
        </div>
      </motion.div>
    </section>
  );
};

export default QuranVerseSection;
