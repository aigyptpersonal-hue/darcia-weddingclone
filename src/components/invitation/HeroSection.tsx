import { motion } from "framer-motion";
import { invitationData } from "@/data/invitationData";
import { ChevronDown } from "lucide-react";
import WaveTransition from "./WaveTransition";

interface HeroSectionProps {
  guestName?: string;
}

const HeroSection = ({ guestName }: HeroSectionProps) => {
  const { events, couple } = invitationData;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-6 py-20 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_hsl(var(--primary))_1px,_transparent_1px)] bg-[length:40px_40px]" />
      </div>

      {/* Decorative circles */}
      <motion.div
        className="absolute top-1/4 left-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-accent/10 blur-2xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {guestName && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="text-xs tracking-wider uppercase text-muted-foreground mb-1">
              Kepada Yth.
            </p>
            <p className="text-lg md:text-xl text-foreground/90 font-medium">
              {guestName}
            </p>
          </motion.div>
        )}

        <motion.p
          className="text-xs md:text-sm tracking-elegant uppercase text-muted-foreground mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {events.mainEvent}
        </motion.p>

        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-7xl text-primary mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {couple.groom.shortName} & {couple.bride.shortName}
        </motion.h1>

        <motion.p
          className="text-base md:text-xl text-foreground/80 font-light mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          {events.mainDate}
        </motion.p>

        <motion.a
          href="#date"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm tracking-wide uppercase rounded-full hover:bg-primary/90 transition-all duration-300 shadow-gold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          Save The Date
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ 
          opacity: { delay: 1.4, duration: 0.6 },
          y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
        }}
      >
        <ChevronDown className="w-6 h-6 text-primary/50" />
      </motion.div>

      <WaveTransition position="bottom" fillColor="hsl(var(--card))" />
    </section>
  );
};

export default HeroSection;
