import { motion } from "framer-motion";
import { invitationData } from "../../data/invitationData";
import coverBg from "../../assets/1235.png"; // Pastikan ini path ke gambar background polos lo

interface HeroSectionProps {
  guestName?: string;
  onOpenInvitation?: () => void;
}

const HeroSection = ({ guestName, onOpenInvitation }: HeroSectionProps) => {
  const { couple } = invitationData;

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-[#F9F7F2] flex flex-col justify-between items-center font-sans">
      
      {/* --- LAYER 1: BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src={coverBg} 
          alt="Wedding Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient Putih di bawah biar teks tamu kebaca */}
        <div className="absolute bottom-0 left-0 w-full h-[35vh] bg-gradient-to-t from-[#F9F7F2] via-[#F9F7F2]/80 to-transparent" />
      </div>

      {/* --- LAYER 2: TOP CONTENT (JUDUL) --- */}
      <div className="relative z-10 w-full pt-12 px-4 flex flex-col items-center text-center">
        
        {/* Icon Cincin Hijau */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-3 text-[#3A5A40]" 
        >
           <span className="text-3xl">꩜</span>
        </motion.div>

        <motion.p
          className="text-[10px] tracking-[0.25em] uppercase text-[#3A5A40] font-medium mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Undangan Pernikahan
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col items-center w-full"
        >
            {/* The Wedding Of (Font Script) */}
            <p className="font-script text-3xl text-[#3A5A40] -mb-3 z-10 transform -rotate-3 relative" style={{ fontFamily: '"South Paris", cursive' }}>
              the wedding of
            </p>

            {/* Nama Mempelai (Font Serif) - Ukuran disesuaikan biar gak numpuk */}
            <h1 className="font-serif text-[3.5rem] leading-[1] text-[#3A5A40] drop-shadow-sm flex flex-col items-center mt-1" style={{ fontFamily: '"Sinera", serif' }}>
              <span className="block">{couple.bride.shortName}</span>
              <span className="font-script text-2xl my-[-5px]">&</span>
              <span className="block">{couple.groom.shortName}</span>
            </h1>
        </motion.div>
      </div>

      {/* --- SPACER TENGAH BIAR GAMBAR COUPLE KELIHATAN --- */}
      <div className="flex-grow"></div>

      {/* --- LAYER 3: BOTTOM CONTENT (TAMU & TOMBOL) --- */}
      <div className="relative z-10 w-full pb-8 px-6 flex flex-col items-center text-center">
          
          <motion.div
              className="mb-4 w-full flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
          >
              <p className="text-xs text-[#3A5A40] mb-2 font-medium tracking-wide">
                  Kepada Yth.
              </p>
              
              {/* Box Tamu - Gue kecilin & transparanin biar gak nutup kaki */}
              <div className="bg-white/60 backdrop-blur-sm border border-[#3A5A40]/20 rounded-lg px-6 py-2 shadow-sm min-w-[200px] max-w-[80%]">
                  <p className="font-bold text-lg text-[#3A5A40] capitalize tracking-wide line-clamp-1">
                      {guestName || "Tamu Undangan"}
                  </p>
              </div>
          </motion.div>

          <motion.button
            onClick={onOpenInvitation}
            className="group relative px-8 py-3 bg-[#3A5A40] text-[#F9F7F2] rounded-full shadow-lg flex items-center gap-2 overflow-hidden hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <span className="relative z-10 font-normal tracking-wide italic font-serif text-sm">
              Buka Undangan
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
          </motion.button>
      </div>

    </section>
  );
};

export default HeroSection;
