import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "../../data/invitationData"; 
import closeBg from "../../assets/close.png"; 

const ClosingSection = () => {
  const { closing, couple } = invitationData;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      // BACKGROUND IMAGE: close.png full cover
      // min-h-screen biar gambarnya minimal setinggi layar
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center pt-24 px-6 font-sans"
      style={{ 
        backgroundImage: `url(${closeBg})`,
        color: '#3A5A40' 
      }}
    >
      
      {/* --- TRANSISI HALUS (GRADIENT OVERLAY) --- */}
      {/* Ini kuncinya: Warna cream RSVP (#F8F0E5) memudar jadi transparan di atas gambar */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#F8F0E5] via-[#F8F0E5]/80 to-transparent z-0 pointer-events-none" />

      {/* --- KONTEN UTAMA --- */}
      <motion.div
        className="relative z-10 text-center mt-4 md:mt-10"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        
        {/* --- THANK YOU TEXT --- */}
        <p className="text-xs tracking-[0.3em] uppercase font-medium mb-6 opacity-90">
          {closing.thankYouText || "THANKYOU"}
        </p>

        {/* --- COUPLE NAMES (SINERA) --- */}
        <h2 className="text-[4rem] md:text-[6rem] leading-tight drop-shadow-sm" style={{ fontFamily: "'Sinera', serif" }}>
          <span className="block">{couple.groom.shortName}</span>
          <span className="block text-[3rem] md:text-[4rem] my-1" style={{ fontFamily: "'Sinera', serif" }}>&</span>
          <span className="block">{couple.bride.shortName}</span>
        </h2>

      </motion.div>

      {/* Footer "DC" & "Made by" SUDAH DIHAPUS */}
      
    </section>
  );
};

export default ClosingSection;
