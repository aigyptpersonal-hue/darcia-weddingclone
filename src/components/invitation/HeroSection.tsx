import { motion } from "framer-motion";
import { invitationData } from "../../data/invitationData";
import coverBg from "../../assets/1235.png"; 

interface HeroSectionProps {
  guestName?: string;
}

const HeroSection = ({ guestName }: HeroSectionProps) => {
  const { couple } = invitationData;

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-[#F9F7F2] flex flex-col justify-between items-center font-sans">
      
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src={coverBg} 
          alt="Wedding Background"
          className="w-full h-full object-cover object-center"
        />
        {/* GRADASI PUTIH GUE HAPUS DISINI ❌ */}
      </div>

      {/* --- TOP CONTENT (JUDUL) --- */}
      <div className="relative z-10 w-full pt-24 px-4 flex flex-col items-center text-center">
        
        {/* TEXT KECIL */}
        <motion.p
          className="text-[10px] tracking-[0.25em] uppercase text-[#3A5A40] font-medium mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Undangan Pernikahan
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-col items-center w-full"
        >
            {/* THE WEDDING OF */}
            <p className="text-3xl text-[#3A5A40] -mb-2 z-10 transform -rotate-3 relative" style={{ fontFamily: "'South Paris', cursive" }}>
              the wedding of
            </p>

            {/* NAMA MEMPELAI & AMPERSAND */}
            <h1 className="text-[3.8rem] leading-[1] text-[#3A5A40] drop-shadow-sm flex flex-col items-center mt-2" style={{ fontFamily: "'Sinera', serif" }}>
              <span className="block">{couple.groom.shortName}</span>
              <span className="text-4xl my-[-5px]" style={{ fontFamily: "'Sinera', serif" }}>&</span>
              <span className="block">{couple.bride.shortName}</span>
            </h1>
        </motion.div>
      </div>

      {/* --- SPACER TENGAH --- */}
      <div className="flex-grow"></div>

      {/* --- BOTTOM CONTENT (SCROLL INDICATOR) --- */}
      <div className="relative z-10 w-full pb-10 flex flex-col items-center justify-end">
          
          <motion.div 
            className="flex flex-col items-center gap-2 cursor-default"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {/* Mouse Icon Animation */}
            <div className="w-[24px] h-[36px] border-[1.5px] border-[#3A5A40] rounded-full flex justify-center pt-2 opacity-80">
              <motion.div 
                className="w-1 h-1.5 bg-[#3A5A40] rounded-full"
                animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </div>

            {/* Text Scroll Down */}
            <motion.p 
              className="text-[9px] tracking-[0.25em] uppercase text-[#3A5A40] font-medium opacity-70"
              animate={{ y: [0, 3, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.2 
              }}
            >
              Scroll Down
            </motion.p>
          </motion.div>

      </div>

    </section>
  );
};

export default HeroSection;
