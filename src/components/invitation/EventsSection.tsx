import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "@/data/invitationData";
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
      className="relative bg-background p-6 md:p-8 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
    >
      {/* Frame borders */}
      <div className="absolute inset-0 border border-primary/20" />
      <div className="absolute inset-2 border border-primary/10" />

      <h3 className="font-display text-xl md:text-2xl text-primary mb-4 uppercase tracking-wide">
        {event.title}
      </h3>

      <div className="flex items-center justify-center gap-1 text-muted-foreground mb-4">
        <Calendar className="w-3.5 h-3.5" />
        <span className="text-xs">{event.day}</span>
      </div>

      {/* Date display */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="font-display text-sm text-foreground/60">{event.month}</span>
        <div className="w-12 h-12 md:w-14 md:h-14 border-2 border-primary/30 flex items-center justify-center relative">
          <div className="absolute inset-1 border border-primary/10" />
          <span className="font-display text-xl md:text-2xl text-primary">{event.date}</span>
        </div>
        <span className="font-display text-sm text-foreground/60">{event.year}</span>
      </div>

      <div className="flex items-center justify-center gap-1 text-primary mb-4">
        <Clock className="w-3.5 h-3.5" />
        <span className="text-sm font-medium">{event.time}</span>
      </div>

      <p className="text-xs text-muted-foreground mb-5 max-w-xs mx-auto leading-relaxed">
        {event.venue}
      </p>

      <a
        href={event.mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-primary text-primary text-xs uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300"
      >
        <MapPin className="w-3.5 h-3.5" />
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
      className="relative py-16 md:py-24 px-4 md:px-6 bg-background overflow-hidden"
    >
      {/* Section title */}
      <motion.div 
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-2xl md:text-3xl text-primary uppercase tracking-wide mb-3">
          Waktu & Tempat
        </h2>
        <div className="divider-ornament">
          <span className="w-1.5 h-1.5 rotate-45 bg-primary/30" />
        </div>
      </motion.div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EventCard event={events.akadNikah} delay={0} />
          <EventCard event={events.ngunduhMantu} delay={0.15} />
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
