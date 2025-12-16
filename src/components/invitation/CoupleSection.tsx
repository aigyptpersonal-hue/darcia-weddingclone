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
      className="relative py-16 md:py-24 px-4 md:px-6 bg-background overflow-hidden"
    >
      <motion.div
        className="relative z-10 max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Opening text */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="font-display text-2xl md:text-3xl text-primary mb-4 uppercase tracking-wide">
            {opening.eventType}
          </h2>
          <div className="divider-ornament mb-6">
            <span className="w-2 h-2 rotate-45 bg-primary/30" />
          </div>
          <p className="font-script text-lg md:text-xl text-primary/70 mb-4">
            {opening.bismillah}
          </p>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {opening.mainText}
          </p>
        </motion.div>

        {/* Couple cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Groom */}
          <motion.div className="text-center" variants={itemVariants}>
            <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto mb-5">
              <div className="absolute inset-0 border-2 border-primary/20 rounded-full" />
              <div className="absolute inset-2 border border-primary/10 rounded-full" />
              <motion.div 
                className="absolute inset-3 rounded-full overflow-hidden"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={groomPhoto} 
                  alt={couple.groom.fullName}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            <h3 className="font-display text-xl md:text-2xl text-primary mb-2">
              {couple.groom.fullName}
            </h3>
            <p className="text-xs text-muted-foreground mb-1">{couple.groom.childOrder}</p>
            <p className="text-sm text-foreground/70">{couple.groom.fatherName}</p>
            <p className="text-primary/40 text-sm my-1">&</p>
            <p className="text-sm text-foreground/70 mb-3">{couple.groom.motherName}</p>
            <a
              href={`https://${couple.groom.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary/60 hover:text-primary transition-colors text-xs"
            >
              <Instagram className="w-3.5 h-3.5" />
              @{couple.groom.instagram.replace('instagram.com/', '')}
            </a>
          </motion.div>

          {/* Mobile ampersand */}
          <motion.div
            className="flex md:hidden justify-center -my-2"
            variants={itemVariants}
          >
            <span className="font-display text-3xl text-primary/40">&</span>
          </motion.div>

          {/* Bride */}
          <motion.div className="text-center" variants={itemVariants}>
            <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto mb-5">
              <div className="absolute inset-0 border-2 border-primary/20 rounded-full" />
              <div className="absolute inset-2 border border-primary/10 rounded-full" />
              <motion.div 
                className="absolute inset-3 rounded-full overflow-hidden"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={bridePhoto} 
                  alt={couple.bride.fullName}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            <h3 className="font-display text-xl md:text-2xl text-primary mb-2">
              {couple.bride.fullName}
            </h3>
            <p className="text-xs text-muted-foreground mb-1">{couple.bride.childOrder}</p>
            <p className="text-sm text-foreground/70">{couple.bride.fatherName}</p>
            <p className="text-primary/40 text-sm my-1">&</p>
            <p className="text-sm text-foreground/70 mb-3">{couple.bride.motherName}</p>
            <a
              href={`https://${couple.bride.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary/60 hover:text-primary transition-colors text-xs"
            >
              <Instagram className="w-3.5 h-3.5" />
              @{couple.bride.instagram.replace('instagram.com/', '')}
            </a>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div className="mt-12 text-center" variants={itemVariants}>
          <div className="divider-ornament mb-5">
            <span className="w-1.5 h-1.5 rotate-45 bg-primary/30" />
          </div>
          <p className="font-script text-base md:text-lg text-foreground/60 max-w-md mx-auto">
            "{couple.quote}"
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CoupleSection;
