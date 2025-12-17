import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Disc3 } from "lucide-react";

interface MusicPlayerProps {
  autoPlay?: boolean;
}

const MusicPlayer = ({ autoPlay = true }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Coba Autoplay saat load
    if (autoPlay && audioRef.current) {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay biasanya diblokir browser kalau belum ada interaksi user
            setIsPlaying(false);
          });
      }
    }
  }, [autoPlay]);

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
      {/* Pastikan file music.mp3 ada di folder PUBLIC */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/music.mp3" 
      />
      
      <motion.button
        onClick={togglePlay}
        // STYLE: Glassmorphism Cream + Hijau Minang
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#F9F7F2]/80 backdrop-blur-md border border-[#3A5A40]/30 flex items-center justify-center text-[#3A5A40] hover:bg-[#3A5A40] hover:text-[#F9F7F2] transition-all duration-300 shadow-lg shadow-[#3A5A40]/20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          // Icon muter dikit biar asik (Disc) atau Volume
          <Disc3 className="w-5 h-5 animate-spin-slow" /> 
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
        
        {/* --- ANIMASI RING (GELOMBANG SUARA) --- */}
        {isPlaying && (
          <>
            <motion.span
              className="absolute inset-0 rounded-full border border-[#3A5A40]/40"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
            />
            <motion.span
              className="absolute inset-0 rounded-full border border-[#3A5A40]/20"
              animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut", delay: 0.3 }}
            />
          </>
        )}
      </motion.button>
    </>
  );
};

export default MusicPlayer;
