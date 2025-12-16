import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "@/data/invitationData";

const QuranVerseSection = () => {
  const { quranVerse } = invitationData;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 px-4 md:px-6 bg-background overflow-hidden"
    >
      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-primary/20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-primary/20" />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        {/* Decorative top element */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary/40" />
          <div className="w-2 h-2 rotate-45 border border-primary/40" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary/40" />
        </div>

        {/* Arabic text */}
        {quranVerse.arabic && (
          <p className="font-display text-2xl md:text-3xl text-primary mb-8 leading-relaxed" dir="rtl">
            {quranVerse.arabic}
          </p>
        )}

        {/* Translation */}
        <p className="text-sm md:text-base text-foreground/80 leading-relaxed italic mb-6 max-w-2xl mx-auto">
          "{quranVerse.translation}"
        </p>

        {/* Source */}
        <p className="text-primary font-medium text-sm">
          {quranVerse.source}
        </p>

        {/* Decorative bottom element */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary/40" />
          <div className="w-2 h-2 rotate-45 border border-primary/40" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary/40" />
        </div>
      </motion.div>
    </section>
  );
};

export default QuranVerseSection;
