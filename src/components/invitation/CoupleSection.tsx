import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "@/data/invitationData";
import { Instagram } from "lucide-react";
import groomPhoto from "@/assets/groom.png";
import bridePhoto from "@/assets/bride.png";

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
      className="relative py-20 md:py-28 px-4 md:px-6 bg-background overflow-hidden"
    >
      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-primary/20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-primary/20" />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Opening text */}
        <motion.div className="text-center mb-12 md:mb-16" variants={itemVariants}>
          <h2 className="font-display text-2xl md:text-3xl text-primary mb-4">
            {opening.eventType}
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mb-6" />
          <p className="font-display text-lg md:text-xl text-primary/70 italic mb-4">
            {opening.bismillah}
          </p>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed px-4">
            {opening.mainText}
          </p>
        </motion.div>

        {/* Couple cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Groom */}
          <motion.div className="text-center" variants={itemVariants}>
            <div className="relative w-44 h-44 md:w-52 md:h-52 mx-auto mb-6 overflow-hidden rounded-full">
              <div className="absolute inset-0 border-2 border-primary/30 rounded-full" />
              <motion.div 
                className="absolute inset-0 rounded-full overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={groomPhoto} 
                  alt={couple.groom.fullName}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-primary mb-3">
              {couple.groom.fullName}
            </h3>
            <p className="text-sm text-muted-foreground mb-1">{couple.groom.childOrder}</p>
            <p className="text-sm text-foreground/80">{couple.groom.fatherName}</p>
            <p className="text-primary/50 my-1">&</p>
            <p className="text-sm text-foreground/80 mb-4">{couple.groom.motherName}</p>
            <a
              href={`https://${couple.groom.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary/70 hover:text-primary transition-colors text-sm"
            >
              <Instagram className="w-4 h-4" />
              @{couple.groom.instagram.replace('instagram.com/', '')}
            </a>
          </motion.div>

          {/* Mobile ampersand */}
          <motion.div
            className="flex md:hidden justify-center -my-4"
            variants={itemVariants}
          >
            <div className="w-12 h-12 rounded-full bg-card border border-primary/20 flex items-center justify-center">
              <span className="font-display text-2xl text-primary">&</span>
            </div>
          </motion.div>

          {/* Bride */}
          <motion.div className="text-center" variants={itemVariants}>
            <div className="relative w-44 h-44 md:w-52 md:h-52 mx-auto mb-6 overflow-hidden rounded-full">
              <div className="absolute inset-0 border-2 border-primary/30 rounded-full" />
              <motion.div 
                className="absolute inset-0 rounded-full overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={bridePhoto} 
                  alt={couple.bride.fullName}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-primary mb-3">
              {couple.bride.fullName}
            </h3>
            <p className="text-sm text-muted-foreground mb-1">{couple.bride.childOrder}</p>
            <p className="text-sm text-foreground/80">{couple.bride.fatherName}</p>
            <p className="text-primary/50 my-1">&</p>
            <p className="text-sm text-foreground/80 mb-4">{couple.bride.motherName}</p>
            <a
              href={`https://${couple.bride.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary/70 hover:text-primary transition-colors text-sm"
            >
              <Instagram className="w-4 h-4" />
              @{couple.bride.instagram.replace('instagram.com/', '')}
            </a>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div className="mt-12 md:mt-16 text-center" variants={itemVariants}>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mb-6" />
          <p className="font-display text-lg md:text-xl text-foreground/70 italic max-w-md mx-auto px-4">
            "{couple.quote}"
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CoupleSection;
