import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "../../data/invitationData"; 
// Hapus import Heart karena udah gak dipake
// Import gambar background baru
import closeBg from "../../assets/close.png"; 

const ClosingSection = () => {
  const { closing, couple } = invitationData;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      // BACKGROUND IMAGE: close.png full cover
      className="relative min-h-[90dvh] w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-between py-16 px-6 font-sans"
      style={{ 
        backgroundImage: `url(${closeBg})`,
        // Warna Hijau Minang untuk semua teks di dalamnya
        color: '#3A5A40' 
      }}
    >
      
      {/* --- BAGIAN ATAS: THANKYOU & NAMA --- */}
      <motion.div
        className="relative z-10 text-center mt-10"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        
        {/* --- THANK YOU TEXT --- */}
        <p className="text-xs tracking-[0.3em] uppercase font-medium mb-6 opacity-90">
          {closing.thankYouText || "THANKYOU"}
        </p>

        {/* --- COUPLE NAMES (SINERA) --- */}
        {/* Font size gede banget biar mirip gambar */}
        <h2 className="text-[4rem] md:text-[5.5rem] leading-tight drop-shadow-sm" style={{ fontFamily: "'Sinera', serif" }}>
          <span className="block">{couple.groom.shortName}</span>
          {/* Ampersand gede juga */}
          <span className="block text-[3rem] md:text-[4rem] my-1" style={{ fontFamily: "'Sinera', serif" }}>&</span>
          <span className="block">{couple.bride.shortName}</span>
        </h2>

      </motion.div>

      {/* --- SPACER --- */}
      {/* Biar footer kedorong ke bawah */}
      <div className="flex-grow"></div>

      {/* --- BAGIAN BAWAH: FOOTER & CREDIT --- */}
      <motion.div
        className="relative z-10 text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* LOGO DC (Placeholder Text, bisa diganti gambar logo kalo ada) */}
        <div className="text-4xl font-bold mb-2 opacity-90" style={{ fontFamily: "'Sinera', serif" }}>
            DC
        </div>

        {/* --- CREDIT --- */}
        <p className="text-[10px] italic opacity-80 mb-1">
           Made by
        </p>
        <p className="text-xs uppercase tracking-widest font-bold opacity-90">
           {closing.credit}
        </p>
        
      </motion.div>
    </section>
  );
};

export default ClosingSection;
