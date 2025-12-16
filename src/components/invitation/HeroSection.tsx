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
        {/* Gradient Putih di bawah */}
        <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-[#F9F7F2] via-[#F9F7F2]/90 to-transparent" />
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
            {/* THE WEDDING OF (South Paris) */}
            <p className="text-3xl text-[#3A5A40] -mb-2 z-10 transform -rotate-3 relative" style={{ fontFamily: "'South Paris', cursive" }}>
              the wedding of
            </p>

            {/* NAMA MEMPELAI (Sinera) */}
            <h1 className="text-[3.8rem] leading-[1] text-[#3A5A40] drop-shadow-sm flex flex-col items-center mt-2" style={{ fontFamily: "'Sinera', serif" }}>
              <span className="block">{couple.bride.shortName}</span>
              
              {/* AMPERSAND (&) - SEKARANG PAKE SINERA */}
              <span className="text-4xl my-[-5px]" style={{ fontFamily: "'Sinera', serif" }}>&</span>
              
              <span className="block">{couple.groom.shortName}</span>
            </h1>
        </motion.div>
      </div>

      {/* --- SPACER TENGAH --- */}
      <div className="flex-grow"></div>

      {/* --- BOTTOM CONTENT (Greeting Tamu) --- */}
      <div className="relative z-10 w-full pb-48 px-6 flex flex-col items-center text-center">
          
          <motion.div
              className="w-full flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
          >
              <p className="text-xs text-[#3A5A40] mb-1 font-medium tracking-widest uppercase opacity-80">
                  Kepada Yth.
              </p>
              
              {/* NAMA TAMU */}
              <h3 className="font-bold text-xl md:text-2xl text-[#3A5A40] capitalize tracking-wide" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>
                  {guestName || "Tamu Undangan"}
              </h3>
          </motion.div>
      </div>

    </section>
  );
};

export default HeroSection;
