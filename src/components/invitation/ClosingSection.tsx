import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "../../data/invitationData"; 
import { Heart } from "lucide-react";

const ClosingSection = () => {
  const { closing, couple } = invitationData;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      // BACKGROUND: Transisi akhir dari #F8F0E5 ke #F9F7F2
      className="relative py-24 px-4 md:px-6 bg-gradient-to-b from-[#F8F0E5] to-[#F9F7F2] overflow-hidden font-sans text-[#3A5A40]"
    >
      <motion.div
        className="relative z-10 max-w-md mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        
        {/* --- THANK YOU TEXT --- */}
        <p className="text-xs tracking-[0.25em] uppercase text-[#3A5A40]/60 mb-6 font-medium">
          {closing.thankYouText || "Terima Kasih"}
        </p>

        {/* --- COUPLE NAMES (SINERA) --- */}
        <h2 className="text-4xl md:text-5xl text-[#3A5A40] mb-8 leading-tight" style={{ fontFamily: "'Sinera', serif" }}>
          <span className="block">{couple.groom.shortName}</span>
          <span className="block text-3xl my-1" style={{ fontFamily: "'Sinera', serif" }}>&</span>
          <span className="block">{couple.bride.shortName}</span>
        </h2>

        {/* --- DECORATIVE HEART --- */}
        <div className="flex items-center justify-center gap-4 mb-12 opacity-60">
           <div className="w-12 h-[1px] bg-[#3A5A40]"></div>
           <Heart className="w-4 h-4 text-[#3A5A40] fill-[#3A5A40]/20" />
           <div className="w-12 h-[1px] bg-[#3A5A40]"></div>
        </div>

        {/* --- CREDIT / FOOTER --- */}
        <div className="border-t border-[#3A5A40]/10 pt-8 w-3/4 mx-auto">
            <p className="text-[10px] text-[#3A5A40]/50 uppercase tracking-widest font-bold mb-1">
            {closing.credit}
            </p>
            <p className="text-[9px] text-[#3A5A40]/30 italic">
            © 2025 All Rights Reserved
            </p>
        </div>

      </motion.div>
    </section>
  );
};

export default ClosingSection;
