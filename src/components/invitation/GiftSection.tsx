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
        description: `Nomor rekening ${accountNumber} telah disalin ke clipboard.`,
      });
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast({
        title: "Gagal menyalin",
        description: "Silakan salin nomor rekening secara manual.",
        variant: "destructive",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section
      ref={ref}
      className="relative py-24 px-6 bg-background overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--gold))_0%,_transparent_70%)]" />
      </div>

      <motion.div
        className="relative z-10 max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Title */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <div className="inline-flex items-center justify-center w-16 h-16 border border-primary/30 rounded-full mb-6">
            <Gift className="w-7 h-7 text-primary" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-primary mb-4">
            {gift.title}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            {gift.description}
          </p>
        </motion.div>

        {/* Bank accounts */}
        <div className="space-y-4">
          {gift.accounts.map((account, index) => (
            <motion.div
              key={account.accountNumber}
              className="bg-card border border-primary/20 p-6 md:p-8"
              variants={itemVariants}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Bank info */}
                <div className="text-center md:text-left">
                  <p className="text-sm text-muted-foreground mb-1">
                    {account.bankName}
                  </p>
                  <p className="text-sm text-foreground/80 mb-2">
                    a/n {account.accountName}
                  </p>
                  <p className="font-display text-2xl text-primary tracking-wider">
                    {account.accountNumber}
                  </p>
                </div>

                {/* Copy button */}
                <button
                  onClick={() => handleCopy(account.accountNumber, index)}
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-primary/40 text-primary text-sm hover:bg-primary/10 transition-all duration-300 w-full md:w-auto"
                >
                  {copiedIndex === index ? (
                    <>
                      <Check className="w-4 h-4" />
                      Tersalin
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
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
