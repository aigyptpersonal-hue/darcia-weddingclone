import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "@/data/invitationData";
import { MessageCircle, Send } from "lucide-react";

const RSVPSection = () => {
  const { rsvp, couple } = invitationData;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const whatsappMessage = encodeURIComponent(
    `Assalamualaikum, saya ingin mengucapkan selamat kepada ${couple.groom.shortName} & ${couple.bride.shortName} atas pernikahan mereka. Semoga menjadi keluarga yang sakinah, mawaddah, wa rahmah. Aamiin.`
  );

  const whatsappLink = `${rsvp.whatsappLink}&text=${whatsappMessage}`;

  return (
    <section
      ref={ref}
      className="relative py-24 px-6 bg-card overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_hsl(var(--gold))_0deg,_transparent_60deg,_transparent_300deg,_hsl(var(--gold))_360deg)]" />
      </div>

      <motion.div
        className="relative z-10 max-w-xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 border border-primary/30 rounded-full mb-6">
          <MessageCircle className="w-7 h-7 text-primary" />
        </div>

        {/* Title */}
        <h2 className="font-display text-2xl md:text-3xl text-primary mb-4">
          {rsvp.title}
        </h2>

        <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
          Kirimkan doa dan ucapan terbaik Anda untuk kedua mempelai
        </p>

        {/* WhatsApp Button */}
        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:bg-primary/90 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Send className="w-4 h-4" />
          {rsvp.whatsappText}
        </motion.a>
      </motion.div>
    </section>
  );
};

export default RSVPSection;
