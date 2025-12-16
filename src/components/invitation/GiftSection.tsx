import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "@/data/invitationData";
import { Copy, Check, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GiftSection = () => {
  const { gift } = invitationData;
  const { toast } = useToast();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (accountNumber: string, index: number) => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopiedIndex(index);
      toast({
        title: "Berhasil disalin!",
        description: "Nomor rekening telah disalin ke clipboard.",
      });
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast({
        title: "Gagal menyalin",
        description: "Silakan salin secara manual.",
        variant: "destructive",
      });
    }
  };

  // Helper buat pilih logo
  const getBankLogo = (bankName: string) => {
    const name = bankName.toLowerCase();
    if (name.includes("bsi")) return "/BSI.png";
    if (name.includes("dana")) return "/DANA.png";
    return null;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      ref={ref}
      // BACKGROUND: Transisi dari #F8F0E5 (akhir Quran) ke #F9F7F2
      className="relative py-20 px-4 md:px-6 bg-gradient-to-b from-[#F8F0E5] to-[#F9F7F2] overflow-hidden font-sans text-[#3A5A40]"
    >
      <motion.div
        className="relative z-10 max-w-lg mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        
        {/* --- HEADER --- */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[#3A5A40]/20 bg-white/40 mb-4 text-[#3A5A40]">
            <Gift className="w-6 h-6" />
          </div>
          
          <h2 className="text-3xl md:text-4xl text-[#3A5A40] mb-3" style={{ fontFamily: "'Sinera', serif" }}>
            {gift.title}
          </h2>
          
          {/* Divider */}
          <div className="flex justify-center mb-4">
             <div className="w-16 h-[1px] bg-[#3A5A40]/30"></div>
          </div>

          <p className="text-sm text-[#3A5A40]/80 leading-relaxed max-w-sm mx-auto italic">
            "{gift.description}"
          </p>
        </motion.div>

        {/* --- BANK ACCOUNTS --- */}
        <div className="space-y-6">
          {gift.accounts.map((account, index) => (
            <motion.div
              key={account.accountNumber}
              // STYLE: Arch Card (Rounded Top 50px)
              className="bg-white/60 backdrop-blur-sm border border-[#3A5A40]/10 p-6 rounded-t-[50px] rounded-b-[15px] shadow-sm relative overflow-hidden group"
              variants={itemVariants}
            >
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-center md:text-left">
                
                {/* Info Rekening */}
                <div className="flex flex-col items-center md:items-start">
                  {/* Logo Bank */}
                  <div className="h-8 mb-3 flex items-center justify-center">
                    {getBankLogo(account.bankName) ? (
                        <img 
                            src={getBankLogo(account.bankName)!} 
                            alt={account.bankName} 
                            className="h-full object-contain"
                        />
                    ) : (
                        <span className="font-bold text-xl uppercase tracking-widest">{account.bankName}</span>
                    )}
                  </div>

                  {/* Nomor & Nama */}
                  <p className="text-2xl md:text-3xl text-[#3A5A40] mb-1 tracking-wide" style={{ fontFamily: "'Sinera', serif" }}>
                    {account.accountNumber}
                  </p>
                  <p className="text-sm text-[#3A5A40]/70 font-medium">
                    a.n {account.accountName}
                  </p>
                </div>

                {/* Tombol Copy */}
                <div className="flex justify-center">
                    <button
                    onClick={() => handleCopy(account.accountNumber, index)}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-[#3A5A40]/30 text-[#3A5A40] text-xs uppercase tracking-widest hover:bg-[#3A5A40] hover:text-[#F9F7F2] transition-all duration-300 w-full md:w-auto"
                    >
                    {copiedIndex === index ? (
                        <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Tersalin</span>
                        </>
                    ) : (
                        <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin</span>
                        </>
                    )}
                    </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
};

export default GiftSection;
