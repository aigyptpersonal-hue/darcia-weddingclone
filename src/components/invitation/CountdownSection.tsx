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
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      ref={ref}
      id="date"
      className="relative py-24 px-6 bg-background overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-primary/10" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-primary/10" />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Title */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="font-display text-2xl md:text-3xl text-primary mb-2">
            Menghitung Hari
          </h2>
          <p className="text-sm tracking-elegant uppercase text-muted-foreground">
            Kebahagiaan
          </p>
        </motion.div>

        {/* Countdown boxes */}
        <motion.div
          className="grid grid-cols-4 gap-3 md:gap-6 mb-12"
          variants={containerVariants}
        >
          {timeBlocks.map((block, index) => (
            <motion.div
              key={block.label}
              className="relative"
              variants={itemVariants}
            >
              <div className="bg-card border border-primary/20 p-4 md:p-6">
                <span className="block font-display text-3xl md:text-5xl text-primary mb-1">
                  {String(block.value).padStart(2, "0")}
                </span>
                <span className="text-xs md:text-sm text-muted-foreground">
                  {block.label}
                </span>
              </div>
              {index < 3 && (
                <span className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 text-primary/30 font-display text-2xl">
                  :
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Dengan memohon Ridho serta Rahmat Allah SWT, kami bermaksud menyelenggarakan Ngunduh Mantu yang Insya Allah akan diselenggarakan pada:
        </motion.p>
      </motion.div>
    </section>
  );
};

export default CountdownSection;
