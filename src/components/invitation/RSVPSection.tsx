import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "../../data/invitationData";
import { Send, User, Check, X, Heart, MessageCircle } from "lucide-react";
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

  // Load data dari LocalStorage saat pertama kali buka
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
        title: "Data Belum Lengkap",
        description: "Mohon isi nama, ucapan, dan konfirmasi kehadiran.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulasi delay biar berasa "sending"
    setTimeout(() => {
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
            title: "Terima Kasih!",
            description: "Ucapan dan doa Anda telah kami terima.",
        });
    }, 800);
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
      // BACKGROUND: Transisi dari #F9F7F2 (akhir Gift) ke #F8F0E5
      className="relative py-20 px-4 md:px-6 bg-gradient-to-b from-[#F9F7F2] to-[#F8F0E5] overflow-hidden font-sans text-[#3A5A40]"
    >
      <motion.div
        className="relative z-10 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        
        {/* --- HEADER --- */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#3A5A40]/20 bg-white/40 mb-4 text-[#3A5A40]">
            <MessageCircle className="w-5 h-5" />
          </div>

          <h2 className="text-3xl md:text-4xl text-[#3A5A40] mb-3" style={{ fontFamily: "'Sinera', serif" }}>
            {rsvp.title}
          </h2>

          <div className="flex justify-center mb-4">
             <div className="w-16 h-[1px] bg-[#3A5A40]/30"></div>
          </div>

          <p className="text-sm text-[#3A5A40]/80 leading-relaxed max-w-xs mx-auto italic">
            "Kirimkan doa dan ucapan hangat untuk kedua mempelai."
          </p>
        </div>

        {/* --- FORM CONTAINER (ARCH STYLE) --- */}
        <motion.div 
            className="bg-white/60 backdrop-blur-sm border border-[#3A5A40]/10 p-6 md:p-8 rounded-t-[50px] rounded-b-[20px] shadow-sm mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Input Nama */}
                <div>
                    <label className="block text-xs font-bold text-[#3A5A40] uppercase tracking-widest mb-2 ml-1">
                        Nama Anda
                    </label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3A5A40]/50" />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Tulis nama lengkap..."
                            className="w-full pl-10 pr-4 py-3 bg-white/50 border border-[#3A5A40]/20 rounded-xl text-[#3A5A40] placeholder:text-[#3A5A40]/40 focus:outline-none focus:border-[#3A5A40] focus:ring-1 focus:ring-[#3A5A40] transition-all text-sm"
                            maxLength={50}
                        />
                    </div>
                </div>

                {/* Input Kehadiran */}
                <div>
                    <label className="block text-xs font-bold text-[#3A5A40] uppercase tracking-widest mb-2 ml-1">
                        Konfirmasi Kehadiran
                    </label>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => setAttendance('hadir')}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm transition-all duration-300 ${
                                attendance === 'hadir' 
                                ? 'bg-[#3A5A40] text-[#F9F7F2] border-[#3A5A40]' 
                                : 'bg-white/50 border-[#3A5A40]/20 text-[#3A5A40] hover:bg-[#3A5A40]/5'
                            }`}
                        >
                            <Check className="w-4 h-4" />
                            <span>Hadir</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setAttendance('tidak_hadir')}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm transition-all duration-300 ${
                                attendance === 'tidak_hadir' 
                                ? 'bg-[#BC4749] text-white border-[#BC4749]' 
                                : 'bg-white/50 border-[#3A5A40]/20 text-[#3A5A40] hover:bg-[#BC4749]/5 hover:text-[#BC4749] hover:border-[#BC4749]/30'
                            }`}
                        >
                            <X className="w-4 h-4" />
                            <span>Maaf</span>
                        </button>
                    </div>
                </div>

                {/* Input Pesan */}
                <div>
                    <label className="block text-xs font-bold text-[#3A5A40] uppercase tracking-widest mb-2 ml-1">
                        Ucapan & Doa
                    </label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tuliskan harapan dan doa terbaikmu..."
                        rows={3}
                        className="w-full px-4 py-3 bg-white/50 border border-[#3A5A40]/20 rounded-xl text-[#3A5A40] placeholder:text-[#3A5A40]/40 focus:outline-none focus:border-[#3A5A40] focus:ring-1 focus:ring-[#3A5A40] transition-all resize-none text-sm"
                        maxLength={500}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#3A5A40] text-[#F9F7F2] rounded-full text-xs font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 shadow-lg shadow-[#3A5A40]/20"
                >
                    <Send className="w-3.5 h-3.5" />
                    {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
                </button>
            </form>
        </motion.div>

        {/* --- WISHES LIST --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-2xl text-[#3A5A40] text-center mb-6" style={{ fontFamily: "'Sinera', serif" }}>
            Doa-doa Kerabat ({wishes.length})
          </h3>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence>
              {wishes.map((wish, index) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/80 border border-[#3A5A40]/10 p-5 rounded-2xl shadow-sm relative"
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar Icon */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3A5A40]/10 flex items-center justify-center mt-1">
                      <Heart className="w-3.5 h-3.5 text-[#3A5A40]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-[#3A5A40] text-sm truncate">{wish.name}</span>
                        
                        {/* Attendance Badge */}
                        <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-medium ${
                          wish.attendance === 'hadir' 
                            ? 'bg-[#3A5A40]/10 text-[#3A5A40]' 
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {wish.attendance === 'hadir' ? 'Hadir' : 'Absen'}
                        </span>
                      </div>

                      <p className="text-sm text-[#3A5A40]/80 mb-2 leading-relaxed">
                        "{wish.message}"
                      </p>

                      <span className="text-[10px] text-[#3A5A40]/40 font-medium">
                        {formatTime(wish.timestamp)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {wishes.length === 0 && (
              <div className="text-center py-10 opacity-50">
                <Heart className="w-10 h-10 mx-auto mb-2 text-[#3A5A40]" />
                <p className="text-sm text-[#3A5A40]">Jadilah yang pertama mengirimkan doa.</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* --- CUSTOM SCROLLBAR CSS --- */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(58, 90, 64, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(58, 90, 64, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(58, 90, 64, 0.5);
        }
      `}</style>
    </section>
  );
};

export default RSVPSection;
