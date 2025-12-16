import { motion } from "framer-motion";
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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(var(--gold))_1px,_transparent_1px)] bg-[length:30px_30px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Logo/Monogram */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-24 h-24 border border-primary/40 rounded-full flex items-center justify-center">
            <span className="font-display text-4xl text-primary">{meta.logo}</span>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-xs tracking-elegant uppercase text-muted-foreground mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {meta.tagline}
        </motion.p>

        {/* Couple Names */}
        <motion.h1
          className="font-display text-4xl md:text-6xl text-primary mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {couple.groom.shortName} & {couple.bride.shortName}
        </motion.h1>

        {/* Guest Name */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="text-xs tracking-wider uppercase text-muted-foreground mb-1">
            Kepada Yth.
          </p>
          <p className="text-lg md:text-xl text-foreground font-medium">
            {displayName}
          </p>
        </motion.div>

        {/* Open Button */}
        <motion.button
          onClick={onOpen}
          className="group relative px-10 py-4 border border-primary/60 hover:border-primary text-primary text-sm tracking-elegant uppercase transition-all duration-300 hover:bg-primary/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">Buka Undangan</span>
          <div className="absolute inset-0 bg-primary/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </motion.button>

        {/* Decorative line */}
        <motion.div
          className="mt-12 w-px h-16 bg-gradient-to-b from-primary/50 to-transparent"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        />
      </div>
    </motion.div>
  );
};

export default CoverScreen;
