import { motion } from "framer-motion";
import { invitationData } from "@/data/invitationData";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  guestName?: string;
}

const HeroSection = ({ guestName }: HeroSectionProps) => {
  const { events, couple } = invitationData;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_hsl(var(--gold))_1px,_transparent_1px)] bg-[length:40px_40px]" />
      </div>

      {/* Decorative top ornament */}
      <motion.div
        className="absolute top-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Guest greeting */}
        {guestName && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="text-xs tracking-wider uppercase text-muted-foreground mb-1">
              Kepada Yth.
            </p>
            <p className="text-lg text-foreground/90 font-medium">
              {guestName}
            </p>
          </motion.div>
        )}

        {/* Event type */}
        <motion.p
          className="text-xs md:text-sm tracking-elegant uppercase text-muted-foreground mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {events.mainEvent}
        </motion.p>

        {/* Couple names */}
        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl text-primary mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {couple.groom.shortName} & {couple.bride.shortName}
        </motion.h1>

        {/* Date */}
        <motion.p
          className="text-lg md:text-xl text-foreground/80 font-light mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          {events.mainDate}
        </motion.p>

        {/* Save the date button */}
        <motion.a
          href="#date"
          className="inline-flex items-center gap-2 px-6 py-3 border border-primary/40 text-primary text-sm tracking-wide uppercase hover:bg-primary/10 transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          Save The Date
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-primary/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
