import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "@/data/invitationData";
import { MessageCircle, Send, User, Check, X, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import WaveTransition from "./WaveTransition";

interface WishItem {
  id: string;
  name: string;
  message: string;
  attendance: 'hadir' | 'tidak_hadir' | '';
  timestamp: number;
}

const STORAGE_KEY = 'wedding_wishes';

const RSVPSection = () => {
  const { rsvp, couple } = invitationData;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir' | ''>('');
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load wishes from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setWishes(parsed.sort((a: WishItem, b: WishItem) => b.timestamp - a.timestamp));
      } catch (e) {
        console.error('Failed to parse wishes:', e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim() || !attendance) {
      toast({
        title: "Lengkapi data",
        description: "Mohon isi nama, ucapan, dan konfirmasi kehadiran.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    const newWish: WishItem = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      attendance,
      timestamp: Date.now()
    };

    const updatedWishes = [newWish, ...wishes];
    setWishes(updatedWishes);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWishes));

    setName('');
    setMessage('');
    setAttendance('');
    setIsSubmitting(false);

    toast({
      title: "Terima kasih!",
      description: "Ucapan dan doa Anda telah tersimpan.",
    });
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 px-4 md:px-6 bg-card overflow-hidden"
    >
      <WaveTransition position="top" fillColor="hsl(var(--background))" />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_hsl(var(--primary))_0deg,_transparent_60deg,_transparent_300deg,_hsl(var(--primary))_360deg)]" />
      </div>

      <motion.div
        className="relative z-10 max-w-2xl mx-auto pt-12"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-primary/30 rounded-full mb-6 bg-background/80">
            <MessageCircle className="w-7 h-7 text-primary" />
          </div>

          <h2 className="font-display text-2xl md:text-3xl text-primary mb-4">
            {rsvp.title}
          </h2>

          <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
            Kirimkan doa dan ucapan terbaik Anda untuk kedua mempelai
          </p>
        </div>

        {/* Form */}
        <motion.form 
          onSubmit={handleSubmit}
          className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-primary/10 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Name input */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-foreground mb-2">
              Nama Anda
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                maxLength={50}
              />
            </div>
          </div>

          {/* Attendance */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-foreground mb-3">
              Konfirmasi Kehadiran
            </label>
            <div className="flex gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setAttendance('hadir')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 transition-all ${
                  attendance === 'hadir' 
                    ? 'border-primary bg-primary text-primary-foreground' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Check className="w-4 h-4" />
                <span className="text-sm font-medium">Hadir</span>
              </button>
              <button
                type="button"
                onClick={() => setAttendance('tidak_hadir')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 transition-all ${
                  attendance === 'tidak_hadir' 
                    ? 'border-destructive bg-destructive text-destructive-foreground' 
                    : 'border-border hover:border-destructive/50'
                }`}
              >
                <X className="w-4 h-4" />
                <span className="text-sm font-medium">Tidak Hadir</span>
              </button>
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              Ucapan & Doa
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan ucapan dan doa untuk kedua mempelai..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground mt-1 text-right">
              {message.length}/500
            </p>
          </div>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-primary text-primary-foreground font-medium text-sm tracking-wide rounded-xl hover:bg-primary/90 transition-all duration-300 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
          </motion.button>
        </motion.form>

        {/* Wishes list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="font-display text-xl text-primary text-center mb-6">
            Ucapan & Doa ({wishes.length})
          </h3>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence>
              {wishes.map((wish, index) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-background/60 backdrop-blur-sm rounded-xl p-5 border border-primary/10"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-medium text-foreground">{wish.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          wish.attendance === 'hadir' 
                            ? 'bg-primary/20 text-primary' 
                            : 'bg-destructive/20 text-destructive'
                        }`}>
                          {wish.attendance === 'hadir' ? '✓ Hadir' : '✕ Tidak Hadir'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{wish.message}</p>
                      <span className="text-xs text-muted-foreground/60">
                        {formatTime(wish.timestamp)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {wishes.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Heart className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="text-sm">Belum ada ucapan. Jadilah yang pertama!</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      <WaveTransition position="bottom" fillColor="hsl(var(--background))" />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: hsl(var(--muted));
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--primary) / 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary) / 0.5);
        }
      `}</style>
    </section>
  );
};

export default RSVPSection;
