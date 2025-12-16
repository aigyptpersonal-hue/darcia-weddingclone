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
        {/* Gradient Putih di bawah biar transisi ke konten selanjutnya halus */}
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[#F9F7F2] via-[#F9F7F2]/80 to-transparent" />
      </div>

      {/* --- TOP CONTENT (JUDUL) --- */}
      <div className="relative z-10 w-full pt-20 px-4 flex flex-col items-center text-center">
        
        {/* TEXT KECIL */}
        <motion.p
          className="text-[10px] tracking-[0.25em] uppercase text-[#3A5A40] font-medium mb-2"
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
            {/* FONT SOUTH PARIS */}
            <p className="text-3xl text-[#3A5A40] -mb-3 z-10 transform -rotate-3 relative" style={{ fontFamily: "'South Paris', cursive" }}>
              the wedding of
            </p>

            {/* NAMA MEMPELAI (SINERA) */}
            <h1 className="text-[3.5rem] leading-[1] text-[#3A5A40] drop-shadow-sm flex flex-col items-center mt-1" style={{ fontFamily: "'Sinera', serif" }}>
              <span className="block">{couple.bride.shortName}</span>
              <span className="text-2xl my-[-5px]" style={{ fontFamily: "'South Paris', cursive" }}>&</span>
              <span className="block">{couple.groom.shortName}</span>
            </h1>
        </motion.div>
      </div>

      {/* --- SPACER TENGAH --- */}
      <div className="flex-grow"></div>

      {/* --- BOTTOM CONTENT (Greeting Tamu) --- */}
      <div className="relative z-10 w-full pb-10 px-6 flex flex-col items-center text-center">
          
          <motion.div
              className="w-full flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
          >
              <p className="text-xs text-[#3A5A40] mb-2 font-medium tracking-wide">
                  Kepada Yth.
              </p>
              
              {/* Box Nama Tamu (Sebagai penanda personalisasi di dalam undangan) */}
              <div className="bg-white/60 backdrop-blur-sm border border-[#3A5A40]/20 rounded-lg px-6 py-2 shadow-sm min-w-[200px] max-w-[80%]">
                  <p className="font-bold text-lg text-[#3A5A40] capitalize tracking-wide line-clamp-1">
                      {guestName || "Tamu Undangan"}
                  </p>
              </div>

              {/* Scroll Indicator (Opsional: Biar orang tau harus scroll ke bawah) */}
              <motion.div 
                className="mt-6 text-[#3A5A40]/60"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <p className="text-[10px] tracking-widest uppercase">Scroll Down</p>
              </motion.div>
          </motion.div>
      </div>

    </section>
  );
};

export default HeroSection;
