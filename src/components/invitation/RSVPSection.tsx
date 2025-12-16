import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "@/data/invitationData";
import { MessageCircle, Send, User, Check, X, Heart } from "lucide-react";
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 px-4 md:px-6 bg-card overflow-hidden"
    >
      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-primary/15" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-primary/15" />

      <motion.div
        className="relative z-10 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Icon & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 border border-primary/30 rounded-full mb-5 bg-background">
            <MessageCircle className="w-6 h-6 text-primary" />
          </div>

          <h2 className="font-display text-2xl md:text-3xl text-primary mb-3">
            {rsvp.title}
          </h2>

          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Kirimkan doa dan ucapan terbaik Anda untuk kedua mempelai
          </p>
        </div>

        {/* Form */}
        <motion.form 
          onSubmit={handleSubmit}
          className="bg-background rounded-xl p-5 md:p-6 border border-primary/15 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Name input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Nama Anda
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
                maxLength={50}
              />
            </div>
          </div>

          {/* Attendance */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Konfirmasi Kehadiran
            </label>
            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setAttendance('hadir')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-sm ${
                  attendance === 'hadir' 
                    ? 'border-primary bg-primary text-primary-foreground' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>Hadir</span>
              </button>
              <button
                type="button"
                onClick={() => setAttendance('tidak_hadir')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-sm ${
                  attendance === 'tidak_hadir' 
                    ? 'border-destructive bg-destructive text-destructive-foreground' 
                    : 'border-border hover:border-destructive/50'
                }`}
              >
                <X className="w-3.5 h-3.5" />
                <span>Tidak Hadir</span>
              </button>
            </div>
          </div>

          {/* Message */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-foreground mb-2">
              Ucapan & Doa
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan ucapan dan doa untuk kedua mempelai..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none text-sm"
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
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
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
          <h3 className="font-display text-lg text-primary text-center mb-5">
            Ucapan & Doa ({wishes.length})
          </h3>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
            <AnimatePresence>
              {wishes.map((wish, index) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-background rounded-lg p-4 border border-primary/10"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Heart className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-medium text-foreground text-sm">{wish.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          wish.attendance === 'hadir' 
                            ? 'bg-primary/15 text-primary' 
                            : 'bg-destructive/15 text-destructive'
                        }`}>
                          {wish.attendance === 'hadir' ? '✓ Hadir' : '✕ Tidak Hadir'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{wish.message}</p>
                      <span className="text-xs text-muted-foreground/60">
                        {formatTime(wish.timestamp)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {wishes.length === 0 && (
              <div className="text-center py-10 text-muted-foreground">
                <Heart className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Belum ada ucapan. Jadilah yang pertama!</p>
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
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--primary) / 0.3);
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

export default RSVPSection;
