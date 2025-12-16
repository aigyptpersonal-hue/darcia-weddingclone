import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "../../data/invitationData"; 

const QuranVerseSection = () => {
  const { quranVerse } = invitationData;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      // BACKGROUND: Transisi halus dari #F9F7F2 (akhir Story) ke #F8F0E5
      className="relative py-24 px-4 md:px-6 bg-gradient-to-b from-[#F9F7F2] to-[#F8F0E5] overflow-hidden font-sans text-[#3A5A40]"
    >
      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        
        {/* --- DECORATIVE TOP --- */}
        <div className="flex items-center justify-center gap-4 mb-10 opacity-60">
           <div className="w-12 h-[1px] bg-[#3A5A40]"></div>
           <div className="w-1.5 h-1.5 rotate-45 border border-[#3A5A40]"></div>
           <div className="w-12 h-[1px] bg-[#3A5A40]"></div>
        </div>

        {/* --- ARABIC IMAGE (Arum.png) --- */}
        <div className="flex justify-center mb-8">
            <img 
              src="/Arum.png" 
              alt="QS Ar-Rum 21" 
              // Ukuran responsif: HP (h-16) -> Laptop (h-24)
              className="h-16 md:h-24 object-contain opacity-90 drop-shadow-sm"
            />
        </div>

        {/* --- TRANSLATION --- */}
        <p className="text-sm md:text-base text-[#3A5A40]/80 leading-relaxed italic mb-8 max-w-2xl mx-auto px-2">
          "{quranVerse.translation}"
        </p>

        {/* --- SOURCE --- */}
        <h3 
            className="text-xl md:text-2xl text-[#3A5A40] tracking-wide" 
            style={{ fontFamily: "'Sinera', serif" }}
        >
          {quranVerse.source}
        </h3>

        {/* --- DECORATIVE BOTTOM --- */}
        <div className="flex items-center justify-center gap-4 mt-10 opacity-60">
           <div className="w-12 h-[1px] bg-[#3A5A40]"></div>
           <div className="w-1.5 h-1.5 rotate-45 border border-[#3A5A40]"></div>
           <div className="w-12 h-[1px] bg-[#3A5A40]"></div>
        </div>

      </motion.div>
    </section>
  );
};

export default QuranVerseSection;
