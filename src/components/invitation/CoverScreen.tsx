import { motion } from "framer-motion";
import { invitationData } from "@/data/invitationData";
import heroBg from "@/assets/hero-bg.png";

interface CoverScreenProps {
  onOpen: () => void;
  guestName?: string;
}

const CoverScreen = ({ onOpen, guestName }: CoverScreenProps) => {
  const { meta, couple } = invitationData;
  const displayName = guestName || "Bapak/Ibu/Saudara/i";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.1,
        filter: "blur(10px)"
      }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src={heroBg} 
          alt="Wedding background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content overlay - positioned at center-top */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md mx-auto mt-[-15vh]">
        {/* Tagline */}
        <motion.p
          className="text-xs tracking-elegant uppercase text-primary/80 mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {meta.tagline}
        </motion.p>

        {/* Couple Names */}
        <motion.h1
          className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          {couple.groom.shortName}
        </motion.h1>
        
        <motion.span
          className="font-display text-3xl md:text-4xl text-primary/60 my-1"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          &
        </motion.span>
        
        <motion.h1
          className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          {couple.bride.shortName}
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          className="w-20 h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        />

        {/* Guest Name */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="text-xs tracking-wider uppercase text-muted-foreground mb-1">
            Kepada Yth.
          </p>
          <p className="text-base md:text-lg text-foreground font-medium">
            {displayName}
          </p>
        </motion.div>

        {/* Open Button */}
        <motion.button
          onClick={onOpen}
          className="group relative px-8 py-3 bg-primary text-primary-foreground text-sm tracking-elegant uppercase transition-all duration-300 rounded-full shadow-gold overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
          <span className="relative z-10">Buka Undangan</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CoverScreen;
