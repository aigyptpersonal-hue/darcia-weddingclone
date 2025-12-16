import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "@/data/invitationData";

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
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7 } 
    },
  };

  return (
    <section
      ref={ref}
      id="date"
      className="relative py-20 md:py-28 px-4 md:px-6 bg-card overflow-hidden"
    >
      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-primary/15" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-primary/15" />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Title */}
        <motion.div variants={itemVariants} className="mb-10">
          <h2 className="font-display text-2xl md:text-3xl text-primary mb-3">
            Menghitung Hari
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto" />
          <p className="text-xs tracking-elegant uppercase text-muted-foreground mt-3">
            Menuju Kebahagiaan
          </p>
        </motion.div>

        {/* Countdown boxes */}
        <motion.div
          className="grid grid-cols-4 gap-2 md:gap-4 mb-10"
          variants={containerVariants}
        >
          {timeBlocks.map((block, index) => (
            <motion.div
              key={block.label}
              className="relative"
              variants={itemVariants}
            >
              <div className="bg-background border border-primary/20 p-3 md:p-5 rounded-xl">
                <motion.span 
                  className="block font-display text-2xl md:text-4xl lg:text-5xl text-primary mb-1"
                  key={block.value}
                  initial={{ scale: 1.1, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {String(block.value).padStart(2, "0")}
                </motion.span>
                <span className="text-xs md:text-sm text-muted-foreground">
                  {block.label}
                </span>
              </div>
              {index < 3 && (
                <span className="hidden md:block absolute top-1/2 -right-2 lg:-right-3 -translate-y-1/2 text-primary/30 font-display text-xl">
                  :
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed px-4"
          variants={itemVariants}
        >
          Dengan memohon Ridho serta Rahmat Allah SWT, kami bermaksud menyelenggarakan acara pernikahan yang Insya Allah akan diselenggarakan pada:
        </motion.p>
      </motion.div>
    </section>
  );
};

export default CountdownSection;
