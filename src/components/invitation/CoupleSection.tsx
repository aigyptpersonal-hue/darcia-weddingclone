import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "../../data/invitationData"; 
import { Instagram } from "lucide-react";

// Import Foto
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
      className="relative py-20 px-4 md:px-6 bg-[#F8F0E5] overflow-hidden font-sans text-[#3A5A40]"
    >
      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        
        {/* --- 1. OPENING TEXT --- */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-lg md:text-xl mb-5 tracking-wide font-bold" style={{ fontFamily: "'Sinera', serif" }}>
            {opening.eventType}
          </h2>
          
          {/* BISMILLAH IMAGE */}
          <div className="flex justify-center mb-6">
            <img 
              src="/Bismillah.png" 
              alt="Bismillahirrahmanirrahim"
              className="h-12 md:h-16 object-contain opacity-90" 
            />
          </div>

          <div className="flex justify-center mb-6">
             <div className="w-16 h-[1px] bg-[#3A5A40]/30"></div>
          </div>

          <p className="text-sm md:text-base text-[#3A5A40]/80 max-w-xl mx-auto leading-relaxed italic">
            "{opening.mainText}"
          </p>
        </motion.div>

        {/* --- 2. COUPLE GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 items-start relative">
          
          {/* --- KARTU PERTAMA (Data: Siska) --- */}
          <motion.div className="text-center flex flex-col items-center" variants={itemVariants}>
            <div className="relative w-48 h-64 md:w-56 md:h-72 mx-auto mb-6">
              <div className="absolute inset-0 border border-[#3A5A40]/30 rounded-t-[100px] rounded-b-[20px] translate-x-2 translate-y-2" />
              <motion.div 
                className="absolute inset-0 rounded-t-[100px] rounded-b-[20px] overflow-hidden bg-gray-200 shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={bridePhoto} 
                  alt={couple.groom.fullName}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            <h3 className="text-2xl md:text-3xl text-[#3A5A40] mb-4 leading-tight px-2" style={{ fontFamily: "'Sinera', serif" }}>
              {couple.groom.fullName}
            </h3>
            
            <div className="text-sm text-[#3A5A40]/80 flex flex-col items-center gap-1 leading-snug">
                <p className="italic">{couple.groom.childOrder}</p>
                <p className="font-semibold px-4">
                  {couple.groom.fatherName} & {couple.groom.motherName}
                </p>
            </div>

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

          {/* --- SIMBOL & (MOBILE FOCUS) --- */}
          {/* -my-6: Biar jaraknya gak terlalu jauh nyodok ke atas/bawah
              text-7xl: Besar
              text-[#3A5A40]/30: Transparan (Opacity 30%)
          */}
          <motion.div className="flex md:hidden justify-center -my-6 z-0" variants={itemVariants}>
            <span 
              className="text-7xl text-[#3A5A40]/30" 
              style={{ fontFamily: "'Sinera', serif" }}
            >
              &
            </span>
          </motion.div>

          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-10 pointer-events-none select-none">
             <span className="text-[12rem]" style={{ fontFamily: "'Sinera', serif" }}>&</span>
          </div>

          {/* --- KARTU KEDUA (Data: Ridho) --- */}
          <motion.div className="text-center flex flex-col items-center" variants={itemVariants}>
            <div className="relative w-48 h-64 md:w-56 md:h-72 mx-auto mb-6">
               <div className="absolute inset-0 border border-[#3A5A40]/30 rounded-t-[100px] rounded-b-[20px] -translate-x-2 translate-y-2" />
               <motion.div 
                className="absolute inset-0 rounded-t-[100px] rounded-b-[20px] overflow-hidden bg-gray-200 shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={groomPhoto} 
                  alt={couple.bride.fullName}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            <h3 className="text-2xl md:text-3xl text-[#3A5A40] mb-4 leading-tight px-2" style={{ fontFamily: "'Sinera', serif" }}>
              {couple.bride.fullName}
            </h3>

            <div className="text-sm text-[#3A5A40]/80 flex flex-col items-center gap-1 leading-snug">
                <p className="italic">{couple.bride.childOrder}</p>
                <p className="font-semibold px-4">
                  {couple.bride.fatherName} & {couple.bride.motherName}
                </p>
            </div>

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
