import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "@/data/invitationData";
import WaveTransition from "./WaveTransition";

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
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.7 } 
    },
  };

  const flipVariants = {
    hidden: { rotateX: -90, opacity: 0 },
    visible: { 
      rotateX: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    },
  };

  return (
    <section
      ref={ref}
      id="date"
      className="relative py-24 md:py-32 px-4 md:px-6 bg-background overflow-hidden"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-transparent to-card/50" />
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-10 left-4 md:left-10 w-24 md:w-32 h-24 md:h-32 border-l-2 border-t-2 border-primary/20 rounded-tl-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.div 
        className="absolute bottom-10 right-4 md:right-10 w-24 md:w-32 h-24 md:h-32 border-r-2 border-b-2 border-primary/20 rounded-br-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Title with animated underline */}
        <motion.div variants={itemVariants} className="mb-10 md:mb-12">
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-3">
            Menghitung Hari
          </h2>
          <motion.div 
            className="w-0 h-0.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50 mx-auto rounded-full"
            animate={inView ? { width: 100 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <p className="text-sm tracking-elegant uppercase text-muted-foreground mt-3">
            Menuju Kebahagiaan
          </p>
        </motion.div>

        {/* Countdown boxes with flip animation */}
        <motion.div
          className="grid grid-cols-4 gap-2 md:gap-6 mb-10 md:mb-12"
          variants={containerVariants}
        >
          {timeBlocks.map((block, index) => (
            <motion.div
              key={block.label}
              className="relative perspective-1000"
              variants={flipVariants}
              custom={index}
            >
              <motion.div 
                className="bg-gradient-to-b from-card to-background border border-primary/20 p-3 md:p-6 rounded-2xl shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px hsla(195, 80%, 60%, 0.2)" }}
                transition={{ duration: 0.2 }}
              >
                <motion.span 
                  className="block font-display text-3xl md:text-5xl lg:text-6xl text-primary mb-1"
                  key={block.value}
                  initial={{ scale: 1.2, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {String(block.value).padStart(2, "0")}
                </motion.span>
                <span className="text-xs md:text-sm text-muted-foreground font-medium">
                  {block.label}
                </span>
              </motion.div>
              {index < 3 && (
                <span className="hidden md:block absolute top-1/2 -right-3 lg:-right-4 -translate-y-1/2 text-primary/40 font-display text-2xl lg:text-3xl">
                  :
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed px-4"
          variants={itemVariants}
        >
          Dengan memohon Ridho serta Rahmat Allah SWT, kami bermaksud menyelenggarakan acara pernikahan yang Insya Allah akan diselenggarakan pada:
        </motion.p>
      </motion.div>
    </section>
  );
};

export default CountdownSection;
