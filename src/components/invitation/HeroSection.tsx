import { motion } from "framer-motion";
import { invitationData } from "@/data/invitationData";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

interface HeroSectionProps {
  guestName?: string;
}

const HeroSection = ({ guestName }: HeroSectionProps) => {
  const { events, couple } = invitationData;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src={heroBg} 
          alt="Wedding background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Main content - positioned at center-top */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-4 mt-[-15vh]">
        {guestName && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="text-xs tracking-wider uppercase text-muted-foreground mb-1">
              Kepada Yth.
            </p>
            <p className="text-base md:text-lg text-foreground/90 font-medium">
              {guestName}
            </p>
          </motion.div>
        )}

        <motion.p
          className="text-xs md:text-sm tracking-elegant uppercase text-primary/70 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {events.mainEvent}
        </motion.p>

        <motion.h1
          className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {couple.groom.shortName} & {couple.bride.shortName}
        </motion.h1>

        <motion.p
          className="text-sm md:text-base text-foreground/80 font-light mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          {events.mainDate}
        </motion.p>

        <motion.a
          href="#date"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm tracking-wide uppercase rounded-full hover:bg-primary/90 transition-all duration-300 shadow-gold"
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
    </section>
  );
};

export default HeroSection;
