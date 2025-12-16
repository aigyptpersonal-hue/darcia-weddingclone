import { motion, AnimatePresence } from "framer-motion";
import { invitationData } from "@/data/invitationData";

interface CoverScreenProps {
  onOpen: () => void;
  guestName?: string;
}

const CoverScreen = ({ onOpen, guestName }: CoverScreenProps) => {
  const { meta, couple } = invitationData;
  const displayName = guestName || "Bapak/Ibu/Saudara/i";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-background via-card to-background overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.1,
        filter: "blur(10px)"
      }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsla(195,80%,60%,0.15)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsla(195,70%,85%,0.2)_0%,_transparent_60%)]" />
      </motion.div>

      {/* Floating decorative circles */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/5"
        animate={{ 
          y: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-8 w-24 h-24 rounded-full bg-accent/10"
        animate={{ 
          y: [0, 15, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-1/3 right-16 w-16 h-16 rounded-full bg-primary/8"
        animate={{ 
          y: [0, -10, 0],
          x: [0, 5, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md mx-auto">
        {/* Logo/Monogram with bloom animation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <div className="relative">
            <motion.div 
              className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative w-28 h-28 md:w-32 md:h-32 border-2 border-primary/40 rounded-full flex items-center justify-center bg-background/80 backdrop-blur-sm shadow-gold">
              <span className="font-display text-4xl md:text-5xl text-primary">{meta.logo}</span>
            </div>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-xs tracking-elegant uppercase text-muted-foreground mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {meta.tagline}
        </motion.p>

        {/* Couple Names with stagger animation */}
        <motion.h1
          className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, type: "spring" }}
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
          className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7, type: "spring" }}
        >
          {couple.bride.shortName}
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        />

        {/* Guest Name */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="text-xs tracking-wider uppercase text-muted-foreground mb-2">
            Kepada Yth.
          </p>
          <p className="text-lg md:text-xl text-foreground font-medium px-4">
            {displayName}
          </p>
        </motion.div>

        {/* Open Button with pulse animation */}
        <motion.button
          onClick={onOpen}
          className="group relative px-10 py-4 bg-primary text-primary-foreground text-sm tracking-elegant uppercase transition-all duration-300 rounded-full shadow-gold overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 40px hsla(195, 80%, 60%, 0.4)" }}
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

        {/* Scroll indicator */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ 
            opacity: { delay: 1.5, duration: 0.5 },
            y: { delay: 1.5, duration: 1.5, repeat: Infinity }
          }}
        >
          <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center pt-2">
            <motion.div 
              className="w-1.5 h-3 bg-primary/60 rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CoverScreen;
