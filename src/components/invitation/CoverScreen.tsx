import { motion } from "framer-motion";
import { invitationData } from "@/data/invitationData";
// Pastikan hero-bg.png adalah gambar yang sama dengan yang dipakai di HeroSection (misal 1235.png kemarin)
// Jika beda, sesuaikan path importnya.
import heroBg from "@/assets/hero-bg.png"; 

interface CoverScreenProps {
  onOpen: () => void;
  guestName?: string;
}

const CoverScreen = ({ onOpen, guestName }: CoverScreenProps) => {
  // Kita cuma butuh data couple di sini
  const { couple } = invitationData;
  const displayName = guestName || "Tamu Undangan";

  return (
    <motion.section
      // onClick ditaruh di sini agar seluruh layar bisa diklik
      onClick={onOpen}
      className="fixed inset-0 z-50 h-[100dvh] w-full flex flex-col justify-between items-center overflow-hidden bg-[#F9F7F2] font-sans cursor-pointer"
      // Animasi keluar saat cover tertutup
      exit={{ 
        opacity: 0, 
        scale: 1.05, 
        transition: { duration: 0.8, ease: "easeInOut" } 
      }}
    >
      
      {/* --- LAYER 1: BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Wedding Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient Putih di bawah biar teks tamu kebaca jelas */}
        <div className="absolute bottom-0 left-0 w-full h-[45vh] bg-gradient-to-t from-[#F9F7F2] via-[#F9F7F2]/90 to-transparent" />
      </div>

      {/* --- LAYER 2: TOP CONTENT (JUDUL) --- */}
      {/* pt-28: Posisi judul dari atas */}
      <div className="relative z-10 w-full pt-28 px-4 flex flex-col items-center text-center">
        
        {/* TEXT KECIL */}
        <motion.p
          className="text-[10px] tracking-[0.25em] uppercase text-[#3A5A40] font-medium mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          The Wedding of
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col items-center w-full"
        >
            {/* NAMA MEMPELAI (SINERA) */}
            {/* Menggunakan flex-col biar nama groom, &, dan bride tersusun vertikal rapi */}
            <h1 className="text-[3.8rem] leading-[1.1] text-[#3A5A40] drop-shadow-sm flex flex-col items-center mt-2" style={{ fontFamily: "'Sinera', serif" }}>
              <span className="block">{couple.groom.shortName}</span>
              {/* Ampersand pake Sinera juga */}
              <span className="text-4xl my-1" style={{ fontFamily: "'Sinera', serif" }}>&</span>
              <span className="block">{couple.bride.shortName}</span>
            </h1>
        </motion.div>
      </div>

      {/* --- SPACER TENGAH --- */}
      <div className="flex-grow"></div>

      {/* --- LAYER 3: BOTTOM CONTENT (GREETING TAMU) --- */}
      {/* pb-20: Jarak dari bawah */}
      <div className="relative z-10 w-full pb-20 px-6 flex flex-col items-center text-center">
          
          <motion.div
              className="w-full flex flex-col items-center animate-pulse" // Efek kedip halus biar tau bisa diklik
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
          >
              <p className="text-xs text-[#3A5A40] mb-1 font-medium tracking-widest uppercase opacity-80">
                  Kepada Yth.
              </p>
              
              {/* NAMA TAMU */}
              <h3 className="font-bold text-xl md:text-2xl text-[#3A5A40] capitalize tracking-wide mb-3" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>
                  {displayName}
              </h3>

              {/* Instruksi Kecil */}
              <p className="text-[9px] tracking-[0.2em] uppercase text-[#3A5A40]/70 mt-4 border-b border-[#3A5A40]/30 pb-1">
                ( Ketuk Layar Untuk Membuka )
              </p>
          </motion.div>
      </div>

    </motion.section>
  );
};

export default CoverScreen;
