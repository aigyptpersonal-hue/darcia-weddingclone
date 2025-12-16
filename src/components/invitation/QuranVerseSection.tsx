import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "@/data/invitationData";

const QuranVerseSection = () => {
  const { quranVerse } = invitationData;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24 px-4 md:px-6 bg-background overflow-hidden"
    >
      <motion.div
        className="relative z-10 max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        {/* Decorative top */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-10 h-px bg-primary/20" />
          <div className="w-2 h-2 rotate-45 border border-primary/30" />
          <div className="w-10 h-px bg-primary/20" />
        </div>

        {/* Arabic text */}
        {quranVerse.arabic && (
          <p className="font-display text-xl md:text-2xl text-primary mb-6 leading-relaxed" dir="rtl">
            {quranVerse.arabic}
          </p>
        )}

        {/* Translation */}
        <p className="font-script text-sm md:text-base text-foreground/70 leading-relaxed mb-5 max-w-lg mx-auto">
          "{quranVerse.translation}"
        </p>

        {/* Source */}
        <p className="text-primary text-xs uppercase tracking-wider">
          {quranVerse.source}
        </p>

        {/* Decorative bottom */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="w-10 h-px bg-primary/20" />
          <div className="w-2 h-2 rotate-45 border border-primary/30" />
          <div className="w-10 h-px bg-primary/20" />
        </div>
      </motion.div>
    </section>
  );
};

export default QuranVerseSection;
