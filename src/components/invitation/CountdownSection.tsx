import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "@/data/invitationData";
import { Heart } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownSection = () => {
  const { events } = invitationData;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(events.countdownTarget) - +new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { value: timeLeft.days, label: "Hari" },
    { value: timeLeft.hours, label: "Jam" },
    { value: timeLeft.minutes, label: "Menit" },
    { value: timeLeft.seconds, label: "Detik" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6 } 
    },
  };

  return (
    <section
      ref={ref}
      id="date"
      className="relative py-16 md:py-24 px-4 md:px-6 bg-card overflow-hidden"
    >
      {/* Frame border decoration */}
      <div className="absolute inset-6 md:inset-10 border border-primary/10 pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-2xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Title */}
        <motion.div variants={itemVariants} className="mb-8">
          <p className="text-xs tracking-elegant uppercase text-muted-foreground mb-3">
            Menghitung Hari
          </p>
          <h2 className="font-display text-2xl md:text-3xl text-primary uppercase tracking-wide">
            Menuju Kebahagiaan
          </h2>
          <div className="divider-ornament mt-4">
            <Heart className="w-3 h-3 text-primary/40 fill-primary/20" />
          </div>
        </motion.div>

        {/* Countdown boxes */}
        <motion.div
          className="grid grid-cols-4 gap-2 md:gap-4 mb-8"
          variants={containerVariants}
        >
          {timeBlocks.map((block, index) => (
            <motion.div
              key={block.label}
              className="relative"
              variants={itemVariants}
            >
              <div className="bg-background border border-primary/15 p-3 md:p-4 relative">
                {/* Inner frame */}
                <div className="absolute inset-1 border border-primary/5 pointer-events-none" />
                <motion.span 
                  className="block font-display text-2xl md:text-4xl text-primary mb-1"
                  key={block.value}
                  initial={{ scale: 1.1, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {String(block.value).padStart(2, "0")}
                </motion.span>
                <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">
                  {block.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Dengan memohon Ridho serta Rahmat Allah SWT, kami bermaksud menyelenggarakan acara pernikahan
        </motion.p>
      </motion.div>
    </section>
  );
};

export default CountdownSection;
