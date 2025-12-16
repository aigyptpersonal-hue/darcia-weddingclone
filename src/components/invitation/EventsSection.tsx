import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "../../data/invitationData"; 
import { MapPin, Calendar, Clock } from "lucide-react";

interface EventCardProps {
  event: {
    title: string;
    day: string;
    date: string;
    month: string;
    year: string;
    time: string;
    venue: string;
    mapsLink: string;
    isCompleted: boolean;
  };
  delay?: number;
}

const EventCard = ({ event, delay = 0 }: EventCardProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      // STYLE KARTU: Arch Shape (Kubah), Background Putih Transparan
      className="relative bg-white/50 backdrop-blur-sm border border-[#3A5A40]/10 p-8 text-center rounded-t-[100px] rounded-b-[20px] shadow-sm hover:shadow-md transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
    >
      {/* JUDUL ACARA (Sinera) */}
      <h3 className="text-3xl md:text-4xl text-[#3A5A40] mb-6 mt-4" style={{ fontFamily: "'Sinera', serif" }}>
        {event.title}
      </h3>

      {/* --- DATE GROUP --- */}
      <div className="flex flex-col items-center justify-center mb-6">
        {/* Hari */}
        <div className="flex items-center gap-2 text-[#3A5A40]/70 mb-1 uppercase tracking-widest text-xs font-semibold">
           <Calendar className="w-3.5 h-3.5" />
           <span>{event.day}</span>
        </div>

        {/* Tanggal Besar (Sinera) */}
        <div className="relative py-2">
            <span className="text-6xl md:text-7xl text-[#3A5A40] leading-none" style={{ fontFamily: "'Sinera', serif" }}>
                {event.date}
            </span>
        </div>

        {/* Bulan & Tahun */}
        <span className="text-sm font-medium tracking-[0.2em] text-[#3A5A40] uppercase">
            {event.month} {event.year}
        </span>
      </div>

      {/* Divider Kecil */}
      <div className="w-10 h-[1px] bg-[#3A5A40]/20 mx-auto mb-6"></div>

      {/* --- TIME & VENUE --- */}
      <div className="flex flex-col items-center gap-4 mb-8">
        {/* Jam */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3A5A40]/5 text-[#3A5A40] text-xs font-semibold tracking-wide">
            <Clock className="w-3.5 h-3.5" />
            <span>{event.time}</span>
        </div>

        {/* Lokasi */}
        <p className="text-sm text-[#3A5A40]/80 leading-relaxed px-2 font-medium">
            {event.venue}
        </p>
      </div>

      {/* BUTTON MAPS */}
      <a
        href={event.mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3A5A40] text-[#F9F7F2] text-xs uppercase tracking-widest hover:scale-105 transition-all duration-300 shadow-lg shadow-[#3A5A40]/20"
      >
        <MapPin className="w-3.5 h-3.5 group-hover:animate-bounce" />
        Lihat Lokasi
      </a>
    </motion.div>
  );
};

const EventsSection = () => {
  const { events } = invitationData;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      // BACKGROUND: Gradient dari Cream Muda (akhir section sebelumnya) ke Cream Hangat (#F8F0E5)
      className="relative py-20 md:py-28 px-4 md:px-6 bg-gradient-to-b from-[#F9F7F2] to-[#F8F0E5] overflow-hidden font-sans text-[#3A5A40]"
    >
      
      {/* Section Title */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs tracking-[0.2em] uppercase text-[#3A5A40]/60 mb-3 font-medium">
            Jadwal Acara
        </p>
        <h2 className="text-3xl md:text-4xl text-[#3A5A40] mb-4" style={{ fontFamily: "'Sinera', serif" }}>
          Waktu & Tempat
        </h2>
        
        {/* Divider Simpel */}
        <div className="flex justify-center">
             <div className="w-16 h-[1px] bg-[#3A5A40]/30"></div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Grid 2 Kolom di Desktop, 1 Kolom di Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <EventCard event={events.akadNikah} delay={0} />
          <EventCard event={events.ngunduhMantu} delay={0.2} />
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
