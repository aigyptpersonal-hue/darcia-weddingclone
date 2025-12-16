import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "../../data/invitationData"; // Sesuaikan path import

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
      // STYLE: Background Cream, Teks Hijau, Font Sans
      className="relative py-20 px-4 md:px-6 bg-[#F9F7F2] overflow-hidden font-sans text-[#3A5A40]"
    >
      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        
        {/* --- TITLE SECTION --- */}
        <motion.div variants={itemVariants} className="mb-10">
          <p className="text-xs tracking-[0.2em] uppercase text-[#3A5A40]/60 mb-3 font-medium">
            Menghitung Hari
          </p>
          
          {/* Judul Font Sinera */}
          <h2 className="text-3xl md:text-4xl text-[#3A5A40] mb-4" style={{ fontFamily: "'Sinera', serif" }}>
            Menuju Kebahagiaan
          </h2>
          
          {/* Divider Simpel */}
          <div className="flex justify-center">
             <div className="w-16 h-[1px] bg-[#3A5A40]/30"></div>
          </div>
        </motion.div>

        {/* --- COUNTDOWN BOXES --- */}
        <motion.div
          className="grid grid-cols-4 gap-3 md:gap-6 mb-10 max-w-2xl mx-auto"
          variants={containerVariants}
        >
          {timeBlocks.map((block) => (
            <motion.div
              key={block.label}
              variants={itemVariants}
            >
              {/* Box Style: Putih Transparan + Border Tipis */}
              <div className="bg-white/60 backdrop-blur-sm border border-[#3A5A40]/10 rounded-t-[30px] rounded-b-[10px] p-3 md:p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
                
                {/* Angka (Font Sinera) */}
                <motion.span 
                  className="block text-3xl md:text-5xl text-[#3A5A40] mb-1 leading-none"
                  style={{ fontFamily: "'Sinera', serif" }}
                  key={block.value}
                  initial={{ scale: 1.1, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {String(block.value).padStart(2, "0")}
                </motion.span>
                
                {/* Label */}
                <span className="text-[10px] md:text-xs text-[#3A5A40]/70 uppercase tracking-widest font-medium">
                  {block.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- DESCRIPTION --- */}
        <motion.p
          className="text-sm md:text-base text-[#3A5A40]/80 max-w-md mx-auto leading-relaxed italic"
          variants={itemVariants}
        >
          "Dengan memohon Ridho serta Rahmat Allah SWT, kami bermaksud menyelenggarakan acara pernikahan ini."
        </motion.p>
        
      </motion.div>
    </section>
  );
};

export default CountdownSection;
