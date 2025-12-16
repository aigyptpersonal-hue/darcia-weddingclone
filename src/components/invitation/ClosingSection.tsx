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
      className="relative py-20 md:py-28 px-4 md:px-6 bg-background overflow-hidden"
    >
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <motion.div
        className="relative z-10 max-w-lg mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        {/* Thank you text */}
        <p className="text-xs tracking-elegant uppercase text-muted-foreground mb-4">
          {closing.thankYouText}
        </p>

        {/* Couple names */}
        <h2 className="font-display text-3xl md:text-4xl text-primary mb-6">
          {couple.groom.shortName} & {couple.bride.shortName}
        </h2>

        {/* Decorative element */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-14 h-px bg-gradient-to-r from-transparent to-primary/40" />
          <Heart className="w-4 h-4 text-primary/50 fill-primary/20" />
          <div className="w-14 h-px bg-gradient-to-l from-transparent to-primary/40" />
        </div>

        {/* Credit */}
        <p className="text-xs text-muted-foreground">
          {closing.credit}
        </p>
      </motion.div>
    </section>
  );
};

export default ClosingSection;
