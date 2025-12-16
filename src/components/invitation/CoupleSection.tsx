import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "@/data/invitationData";
import { Instagram } from "lucide-react";

const CoupleSection = () => {
  const { opening, couple } = invitationData;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section
      ref={ref}
      className="relative py-24 px-6 bg-card overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,_hsl(var(--gold))_25%,_transparent_25%,_transparent_75%,_hsl(var(--gold))_75%)] bg-[length:60px_60px]" />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Opening text */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="font-display text-2xl md:text-3xl text-primary mb-4">
            {opening.eventType}
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mb-8" />
          <p className="font-display text-xl text-primary/80 italic mb-4">
            {opening.bismillah}
          </p>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {opening.mainText}
          </p>
        </motion.div>

        {/* Couple cards */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Groom */}
          <motion.div
            className="text-center"
            variants={itemVariants}
          >
            <div className="relative w-48 h-64 md:w-56 md:h-72 mx-auto mb-6 overflow-hidden">
              <div className="absolute inset-0 border border-primary/30 rotate-3" />
              <div className="absolute inset-0 bg-dark-elevated flex items-center justify-center">
                <span className="font-display text-6xl text-primary/20">
                  {couple.groom.shortName.charAt(0)}
                </span>
              </div>
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-primary mb-3">
              {couple.groom.fullName}
            </h3>
            <p className="text-sm text-muted-foreground mb-1">{couple.groom.childOrder}</p>
            <p className="text-sm text-foreground/80">{couple.groom.fatherName}</p>
            <p className="text-primary/60 my-1">&</p>
            <p className="text-sm text-foreground/80 mb-4">{couple.groom.motherName}</p>
            <a
              href={couple.groom.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary/70 hover:text-primary transition-colors text-sm"
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </a>
          </motion.div>

          {/* Ampersand separator (visible on md+) */}
          <motion.div
            className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            variants={itemVariants}
          >
            <span className="font-display text-6xl text-primary/30">&</span>
          </motion.div>

          {/* Bride */}
          <motion.div
            className="text-center"
            variants={itemVariants}
          >
            <div className="relative w-48 h-64 md:w-56 md:h-72 mx-auto mb-6 overflow-hidden">
              <div className="absolute inset-0 border border-primary/30 -rotate-3" />
              <div className="absolute inset-0 bg-dark-elevated flex items-center justify-center">
                <span className="font-display text-6xl text-primary/20">
                  {couple.bride.shortName.charAt(0)}
                </span>
              </div>
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-primary mb-3">
              {couple.bride.fullName}
            </h3>
            <p className="text-sm text-muted-foreground mb-1">{couple.bride.childOrder}</p>
            <p className="text-sm text-foreground/80">{couple.bride.fatherName}</p>
            <p className="text-primary/60 my-1">&</p>
            <p className="text-sm text-foreground/80 mb-4">{couple.bride.motherName}</p>
            <a
              href={couple.bride.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary/70 hover:text-primary transition-colors text-sm"
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </a>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          className="mt-16 text-center"
          variants={itemVariants}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mb-6" />
          <p className="font-display text-lg md:text-xl text-foreground/70 italic max-w-md mx-auto">
            "{couple.quote}"
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CoupleSection;
