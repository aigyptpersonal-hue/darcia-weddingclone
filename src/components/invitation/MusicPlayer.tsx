import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Disc3, VolumeX, Music2 } from "lucide-react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // --- FUNGSI 1: LOGIC AUTOPLAY & CLICK LISTENER ---
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 1. Coba Autoplay langsung pas load
    const attemptPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        // Kalau gagal (diblokir browser), set state jadi pause dulu
        setIsPlaying(false);
        console.log("Autoplay prevented by browser, waiting for interaction.");
      }
    };

    attemptPlay();

    // 2. Listener: Begitu user klik APAPUN di layar (misal tombol "Buka Undangan"), musik nyala
    const handleUserInteraction = () => {
      if (audio.paused) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(e => console.error("Play failed:", e));
      }
      // Hapus listener biar gak jalan terus-terusan
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  // --- FUNGSI 2: TOMBOL PLAY/PAUSE MANUAL ---
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* Element Audio Tersembunyi */}
      {/* Pastikan file music.mp3 ada di folder public */}
      <audio
        ref={audioRef}
        src="/music.mp3" 
        loop
        preload="auto"
      />

      {/* Tombol Floating */}
      <motion.button
        onClick={togglePlay}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl border backdrop-blur-md ${
           isPlaying 
             ? "bg-[#F9F7F2]/90 border-[#3A5A40]/30 text-[#3A5A40] shadow-[#3A5A40]/20" 
             : "bg-[#3A5A40] border-[#3A5A40] text-[#F9F7F2] shadow-md"
        }`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              className="relative"
            >
               {/* Icon Muter (Piringan Hitam Style) */}
               <Disc3 className="w-6 h-6 animate-spin-slow" />
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
               <VolumeX className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Efek Gelombang Suara (Visualizer) kalau lagi play */}
        {isPlaying && (
          <div className="absolute inset-0 pointer-events-none">
            <span className="absolute inset-0 rounded-full border border-[#3A5A40] opacity-40 animate-ping-slow"></span>
            <span className="absolute inset-0 rounded-full border border-[#3A5A40] opacity-20 animate-ping-slower"></span>
          </div>
        )}
      </motion.button>

      {/* Custom CSS buat animasi muter & ping */}
      <style>{`
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
        .animate-ping-slow {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-ping-slower {
          animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
          animation-delay: 0.5s;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default MusicPlayer;
