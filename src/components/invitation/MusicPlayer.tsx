import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  autoPlay?: boolean;
}

const MusicPlayer = ({ autoPlay = true }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay blocked, user needs to interact
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
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/music/background.mp3"
      />
      <motion.button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-primary/40 flex items-center justify-center text-primary hover:bg-primary/10 transition-all duration-300 shadow-lg"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
        
        {/* Animated rings when playing */}
        {isPlaying && (
          <>
            <motion.span
              className="absolute inset-0 rounded-full border border-primary/30"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
            />
            <motion.span
              className="absolute inset-0 rounded-full border border-primary/20"
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
