import { motion } from "framer-motion";
// Pastikan path import data ini benar
import { invitationData } from "../../data/invitationData"; 
// UPDATE GAMBAR: Pake 1235.png
import coverBg from "../../assets/1235.png"; 

interface HeroSectionProps {
  guestName?: string;
  onOpenInvitation?: () => void;
}

const HeroSection = ({ guestName, onOpenInvitation }: HeroSectionProps) => {
  const { couple } = invitationData;

  return (
    // Layout: Flex Col + Justify Between (Biar teks di atas & tombol di bawah)
    <section className="relative h-[100dvh] w-full overflow-hidden bg-wedding-cream flex flex-col justify-between items-center">
      
      {/* --- LAYER 1: BACKGROUND IMAGE --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src={coverBg} 
          alt="Wedding Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient Overlay bawah (Biar teks tamu kebaca jelas) */}
        <div className="absolute bottom-0 left-0 w-full h-[45vh] bg-gradient-to-t from-[#F9F7F2] via-[#F9F7F2]/60 to-transparent" />
      </div>

      {/* --- LAYER 2: KONTEN ATAS (Judul & Nama) --- */}
      <div className="relative z-10 w-full pt-10 px-4 flex flex-col items-center text-center mt-6">
        
        {/* Icon Cincin */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-2"
        >
           <span className="text-2xl text-wedding-primary">꩜</span>
        </motion.div>

        {/* Text Kecil: UNDANGAN PERNIKAHAN */}
        <motion.p
          className="text-[10px] tracking-[0.2em] uppercase text-wedding-primary font-medium mb-1"
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
            {/* Font Script (South Paris) */}
            <p className="font-script text-3xl md:text-4xl text-wedding-primary/90 -mb-3 z-10 transform -rotate-2 relative">
              the wedding of
            </p>

            {/* Font Serif (Sinera) */}
            <h1 className="font-serif text-5xl min-[375px]:text-6xl sm:text-7xl leading-[1.1] text-wedding-primary drop-shadow-sm flex flex-col items-center">
              <span className="block">{couple.bride.shortName}</span>
              <span className="font-script text-3xl my-[-5px]">&</span>
              <span className="block">{couple.groom.shortName}</span>
            </h1>
        </motion.div>
      </div>

      {/* --- SPACER TENGAH (KOSONG) --- */}
      {/* Area ini buat ilustrasi Rumah Gadang biar gak ketutupan */}

      {/* --- LAYER 3: KONTEN BAWAH (Tamu & Tombol) --- */}
      <div className="relative z-10 w-full pb-10 px-4 flex flex-col items-center text-center mb-6">
          
          <motion.div
              className="mb-5 w-full max-w-[300px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
          >
              <p className="text-xs text-wedding-primary/80 mb-2 font-medium">
                  Kepada Yth.
              </p>
              <div className="bg-white/30 backdrop-blur-[2px] border border-wedding-primary/10 rounded-lg p-2 shadow-sm">
                  <p className="font-bold text-lg text-wedding-primary capitalize tracking-wide line-clamp-2">
                      {guestName || "Bapak/Ibu/Saudara/i"}
                  </p>
              </div>
          </motion.div>

          <motion.button
            onClick={onOpenInvitation}
            className="group relative px-8 py-3 bg-wedding-button text-[#F9F7F2] rounded-full shadow-lg flex items-center gap-2 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <span className="relative z-10 font-normal tracking-wide italic font-serif text-base">
              Buka Undangan
            </span>
            {/* Efek Shine */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
          </motion.button>
      </div>

    </section>
  );
};

export default HeroSection;
