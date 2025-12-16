import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "../../data/invitationData"; // Import data lo
import { Instagram } from "lucide-react";

// IMPORT FOTO DARI ASSETS
// (Pastikan file groom.png & bride.png ada di folder src/assets)
import groomPhoto from "../../assets/groom.png";
import bridePhoto from "../../assets/bride.png";

const CoupleSection = () => {
  const { opening, couple } = invitationData;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section
      ref={ref}
      className="relative py-20 px-4 md:px-6 bg-[#F9F7F2] overflow-hidden font-sans text-[#3A5A40]"
    >
      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        
        {/* --- 1. OPENING TEXT (Bismillah & Salam) --- */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          {/* Judul Salam (Sinera) */}
          <h2 className="text-lg md:text-xl mb-4 tracking-wide font-bold" style={{ fontFamily: "'Sinera', serif" }}>
            {opening.title}
          </h2>
          
          {/* Bismillah (Font Arab/Serif) */}
          <p className="text-2xl md:text-3xl mb-6 text-[#3A5A40]">
            {opening.bismillah}
          </p>

          {/* Divider Simpel */}
          <div className="flex justify-center mb-6">
             <div className="w-16 h-[1px] bg-[#3A5A40]/30"></div>
          </div>

          {/* Teks Pembuka (Sans) */}
          <p className="text-sm md:text-base text-[#3A5A40]/80 max-w-xl mx-auto leading-relaxed italic">
            "{opening.mainText}"
          </p>
        </motion.div>

        {/* --- 2. COUPLE GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-start relative">
          
          {/* --- KARTU PERTAMA (Groom Key - Saat ini isinya SISKA) --- */}
          <motion.div className="text-center flex flex-col items-center" variants={itemVariants}>
            <div className="relative w-48 h-64 md:w-56 md:h-72 mx-auto mb-6">
              {/* Frame Foto Melengkung (Arch) */}
              <div className="absolute inset-0 border border-[#3A5A40]/30 rounded-t-[100px] rounded-b-[20px] translate-x-2 translate-y-2" />
              <motion.div 
                className="absolute inset-0 rounded-t-[100px] rounded-b-[20px] overflow-hidden bg-gray-200 shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image Source */}
                <img 
                  src={groomPhoto} // Pastikan ini foto yg bener di assets
                  alt={couple.groom.fullName}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Nama Panggilan (Sinera) */}
            <h3 className="text-4xl md:text-5xl text-[#3A5A40] mb-3" style={{ fontFamily: "'Sinera', serif" }}>
              {couple.groom.shortName}
            </h3>

            {/* Nama Lengkap & Gelar */}
            <p className="font-bold text-xs tracking-widest uppercase text-[#3A5A40]/60 mb-4">
              {couple.groom.fullName}
            </p>
            
            {/* Detail Orang Tua */}
            <div className="text-sm text-[#3A5A40]/80 space-y-1 leading-relaxed">
                <p className="italic mb-1">{couple.groom.childOrder}</p>
                <p className="font-semibold">{couple.groom.fatherName}</p>
                <p className="text-xs">&</p>
                <p className="font-semibold">{couple.groom.motherName}</p>
            </div>

            {/* Instagram Button */}
            <a
              href={`https://${couple.groom.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 px-5 py-2 rounded-full border border-[#3A5A40]/20 hover:bg-[#3A5A40] hover:text-[#F9F7F2] transition-all text-xs font-medium tracking-wide group"
            >
              <Instagram className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              @{couple.groom.instagram.replace('instagram.com/', '').replace('/', '')}
            </a>
          </motion.div>

          {/* --- SIMBOL DAN (&) --- */}
          {/* Mobile: Muncul di tengah grid */}
          <motion.div
            className="flex md:hidden justify-center -my-8 z-10"
            variants={itemVariants}
          >
            {/* Pake Font Sinera sesuai request */}
            <span className="text-5xl text-[#3A5A40]" style={{ fontFamily: "'Sinera', serif" }}>&</span>
          </motion.div>

          {/* Desktop: Absolute Center Overlay */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-10 pointer-events-none select-none">
             <span className="text-[12rem]" style={{ fontFamily: "'Sinera', serif" }}>&</span>
          </div>

          {/* --- KARTU KEDUA (Bride Key - Saat ini isinya RIDHO) --- */}
          <motion.div className="text-center flex flex-col items-center" variants={itemVariants}>
            <div className="relative w-48 h-64 md:w-56 md:h-72 mx-auto mb-6">
               {/* Frame Foto Melengkung (Arah sebaliknya biar dinamis) */}
               <div className="absolute inset-0 border border-[#3A5A40]/30 rounded-t-[100px] rounded-b-[20px] -translate-x-2 translate-y-2" />
               <motion.div 
                className="absolute inset-0 rounded-t-[100px] rounded-b-[20px] overflow-hidden bg-gray-200 shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={bridePhoto} 
                  alt={couple.bride.fullName}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Nama Panggilan (Sinera) */}
            <h3 className="text-4xl md:text-5xl text-[#3A5A40] mb-3" style={{ fontFamily: "'Sinera', serif" }}>
              {couple.bride.shortName}
            </h3>
            
            {/* Nama Lengkap */}
            <p className="font-bold text-xs tracking-widest uppercase text-[#3A5A40]/60 mb-4">
              {couple.bride.fullName}
            </p>

            {/* Detail Orang Tua */}
            <div className="text-sm text-[#3A5A40]/80 space-y-1 leading-relaxed">
                <p className="italic mb-1">{couple.bride.childOrder}</p>
                <p className="font-semibold">{couple.bride.fatherName}</p>
                <p className="text-xs">&</p>
                <p className="font-semibold">{couple.bride.motherName}</p>
            </div>

            {/* Instagram Button */}
            <a
              href={`https://${couple.bride.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 px-5 py-2 rounded-full border border-[#3A5A40]/20 hover:bg-[#3A5A40] hover:text-[#F9F7F2] transition-all text-xs font-medium tracking-wide group"
            >
              <Instagram className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              @{couple.bride.instagram.replace('instagram.com/', '').replace('/', '')}
            </a>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
};

export default CoupleSection;
