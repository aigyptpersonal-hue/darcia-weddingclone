import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "@/data/invitationData";
import { Heart } from "lucide-react";

const ClosingSection = () => {
  const { closing, couple } = invitationData;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24 px-4 md:px-6 bg-card overflow-hidden"
    >
      {/* Frame border */}
      <div className="absolute inset-6 md:inset-10 border border-primary/10 pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-md mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        {/* Thank you text */}
        <p className="text-xs tracking-elegant uppercase text-muted-foreground mb-4">
          {closing.thankYouText}
        </p>

        {/* Couple names */}
        <h2 className="font-display text-2xl md:text-3xl text-primary mb-5">
          {couple.groom.shortName} & {couple.bride.shortName}
        </h2>

        {/* Decorative element */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-px bg-primary/20" />
          <Heart className="w-4 h-4 text-primary/40 fill-primary/20" />
          <div className="w-12 h-px bg-primary/20" />
        </div>

        {/* Credit */}
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
          {closing.credit}
        </p>
      </motion.div>
    </section>
  );
};

export default ClosingSection;
