import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "@/data/invitationData";
import { Instagram } from "lucide-react";
import WaveTransition from "./WaveTransition";
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
      className="relative py-24 md:py-32 px-4 md:px-6 bg-card overflow-hidden"
    >
      {/* Wave transitions */}
      <WaveTransition position="top" fillColor="hsl(var(--background))" />
      
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,_hsl(var(--primary))_25%,_transparent_25%,_transparent_75%,_hsl(var(--primary))_75%)] bg-[length:60px_60px]" />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto pt-12"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Opening text */}
        <motion.div className="text-center mb-12 md:mb-16" variants={itemVariants}>
          <h2 className="font-display text-2xl md:text-3xl text-primary mb-4">
            {opening.eventType}
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mb-6 md:mb-8" />
          <p className="font-display text-lg md:text-xl text-primary/80 italic mb-4">
            {opening.bismillah}
          </p>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed px-4">
            {opening.mainText}
          </p>
        </motion.div>

        {/* Couple cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Groom */}
          <motion.div
            className="text-center"
            variants={itemVariants}
          >
            <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-6 overflow-hidden rounded-full">
              <div className="absolute inset-0 border-4 border-primary/30 rounded-full" />
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
              {/* Decorative ring */}
              <motion.div 
                className="absolute -inset-2 border border-primary/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-primary mb-3">
              {couple.groom.fullName}
            </h3>
            <p className="text-sm text-muted-foreground mb-1">{couple.groom.childOrder}</p>
            <p className="text-sm text-foreground/80">{couple.groom.fatherName}</p>
            <p className="text-primary/60 my-1">&</p>
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

          {/* Ampersand separator (visible on md+) */}
          <motion.div
            className="hidden md:flex absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            variants={itemVariants}
          >
            <div className="w-16 h-16 rounded-full bg-background border border-primary/30 flex items-center justify-center shadow-lg">
              <span className="font-display text-3xl text-primary">&</span>
            </div>
          </motion.div>

          {/* Mobile ampersand */}
          <motion.div
            className="flex md:hidden justify-center -my-4"
            variants={itemVariants}
          >
            <div className="w-12 h-12 rounded-full bg-background border border-primary/30 flex items-center justify-center shadow-lg">
              <span className="font-display text-2xl text-primary">&</span>
            </div>
          </motion.div>

          {/* Bride */}
          <motion.div
            className="text-center"
            variants={itemVariants}
          >
            <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-6 overflow-hidden rounded-full">
              <div className="absolute inset-0 border-4 border-primary/30 rounded-full" />
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
              {/* Decorative ring */}
              <motion.div 
                className="absolute -inset-2 border border-primary/20 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-primary mb-3">
              {couple.bride.fullName}
            </h3>
            <p className="text-sm text-muted-foreground mb-1">{couple.bride.childOrder}</p>
            <p className="text-sm text-foreground/80">{couple.bride.fatherName}</p>
            <p className="text-primary/60 my-1">&</p>
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
        <motion.div
          className="mt-12 md:mt-16 text-center"
          variants={itemVariants}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mb-6" />
          <p className="font-display text-lg md:text-xl text-foreground/70 italic max-w-md mx-auto px-4">
            "{couple.quote}"
          </p>
        </motion.div>
      </motion.div>

      <WaveTransition position="bottom" fillColor="hsl(var(--background))" />
    </section>
  );
};

export default CoupleSection;
