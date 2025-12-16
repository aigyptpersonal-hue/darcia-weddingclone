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
        description: `Nomor rekening telah disalin.`,
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
      className="relative py-16 md:py-24 px-4 md:px-6 bg-background overflow-hidden"
    >
      <motion.div
        className="relative z-10 max-w-lg mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Title */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <div className="inline-flex items-center justify-center w-12 h-12 border border-primary/30 mb-4">
            <Gift className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-primary mb-3 uppercase tracking-wide">
            {gift.title}
          </h2>
          <div className="divider-ornament mb-4">
            <span className="w-1.5 h-1.5 rotate-45 bg-primary/30" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            {gift.description}
          </p>
        </motion.div>

        {/* Bank accounts */}
        <div className="space-y-4">
          {gift.accounts.map((account, index) => (
            <motion.div
              key={account.accountNumber}
              className="bg-card p-5 border border-primary/15 relative"
              variants={itemVariants}
            >
              <div className="absolute inset-2 border border-primary/5 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-center md:text-left">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    {account.bankName}
                  </p>
                  <p className="text-sm text-foreground/70 mb-1">
                    a/n {account.accountName}
                  </p>
                  <p className="font-display text-lg text-primary tracking-wider">
                    {account.accountNumber}
                  </p>
                </div>

                <button
                  onClick={() => handleCopy(account.accountNumber, index)}
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-primary/30 text-primary text-xs uppercase tracking-wider hover:bg-primary/10 transition-all duration-300"
                >
                  {copiedIndex === index ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Tersalin
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Salin
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default GiftSection;
