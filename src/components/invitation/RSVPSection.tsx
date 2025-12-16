import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "@/data/invitationData";
import { Send, User, Check, X, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WishItem {
  id: string;
  name: string;
  message: string;
  attendance: 'hadir' | 'tidak_hadir' | '';
  timestamp: number;
}

const STORAGE_KEY = 'wedding_wishes';

const RSVPSection = () => {
  const { rsvp } = invitationData;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir' | ''>('');
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      year: 'numeric'
    });
  };

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24 px-4 md:px-6 bg-card overflow-hidden"
    >
      {/* Frame border */}
      <div className="absolute inset-6 md:inset-10 border border-primary/10 pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl md:text-3xl text-primary mb-3 uppercase tracking-wide">
            {rsvp.title}
          </h2>
          <div className="divider-ornament mb-4">
            <Heart className="w-3 h-3 text-primary/40 fill-primary/20" />
          </div>
          <p className="text-sm text-muted-foreground">
            Kirimkan doa dan ucapan untuk kedua mempelai
          </p>
        </div>

        {/* Form */}
        <motion.form 
          onSubmit={handleSubmit}
          className="bg-background p-5 md:p-6 border border-primary/15 relative mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="absolute inset-2 border border-primary/5 pointer-events-none" />

          {/* Name input */}
          <div className="mb-4 relative z-10">
            <label className="block text-xs font-medium text-foreground mb-2 uppercase tracking-wider">
              Nama Anda
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama"
                className="w-full pl-10 pr-4 py-2.5 border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all text-sm"
                maxLength={50}
              />
            </div>
          </div>

          {/* Attendance */}
          <div className="mb-4 relative z-10">
            <label className="block text-xs font-medium text-foreground mb-2 uppercase tracking-wider">
              Konfirmasi Kehadiran
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setAttendance('hadir')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border transition-all text-xs ${
                  attendance === 'hadir' 
                    ? 'border-primary bg-primary text-primary-foreground' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                Hadir
              </button>
              <button
                type="button"
                onClick={() => setAttendance('tidak_hadir')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border transition-all text-xs ${
                  attendance === 'tidak_hadir' 
                    ? 'border-destructive bg-destructive text-destructive-foreground' 
                    : 'border-border hover:border-destructive/50'
                }`}
              >
                <X className="w-3.5 h-3.5" />
                Tidak Hadir
              </button>
            </div>
          </div>

          {/* Message */}
          <div className="mb-5 relative z-10">
            <label className="block text-xs font-medium text-foreground mb-2 uppercase tracking-wider">
              Ucapan & Doa
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan ucapan untuk mempelai..."
              rows={3}
              className="w-full px-4 py-2.5 border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all resize-none text-sm"
              maxLength={500}
            />
          </div>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="relative z-10 w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-wider hover:bg-primary/90 transition-all duration-300 disabled:opacity-50"
            whileTap={{ scale: 0.99 }}
          >
            <Send className="w-3.5 h-3.5" />
            {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
          </motion.button>
        </motion.form>

        {/* Wishes list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="font-display text-lg text-primary text-center mb-4">
            Ucapan ({wishes.length})
          </h3>

          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
            <AnimatePresence>
              {wishes.map((wish, index) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-background p-4 border border-primary/10"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 flex items-center justify-center">
                      <Heart className="w-3 h-3 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-medium text-foreground text-sm">{wish.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 uppercase tracking-wider ${
                          wish.attendance === 'hadir' 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-destructive/10 text-destructive'
                        }`}>
                          {wish.attendance === 'hadir' ? 'Hadir' : 'Tidak Hadir'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{wish.message}</p>
                      <span className="text-[10px] text-muted-foreground/60">
                        {formatTime(wish.timestamp)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {wishes.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Heart className="w-8 h-8 mx-auto mb-3 opacity-20" />
                <p className="text-sm">Jadilah yang pertama mengirim ucapan</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: hsl(var(--muted));
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--primary) / 0.3);
        }
      `}</style>
    </section>
  );
};

export default RSVPSection;
