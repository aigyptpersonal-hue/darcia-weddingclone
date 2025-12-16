import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "@/data/invitationData";
import { MapPin, Check } from "lucide-react";

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
      className="relative bg-card border border-primary/15 p-6 md:p-8 text-center rounded-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
    >
      {event.isCompleted && (
        <div className="absolute top-4 right-4 flex items-center gap-1 text-xs text-primary/60">
          <Check className="w-3 h-3" />
          <span>Selesai</span>
        </div>
      )}

      <p className="font-display text-lg text-primary/60 mb-2">{event.day}</p>

      <h3 className="font-display text-xl md:text-2xl text-primary mb-5">
        {event.title}
      </h3>

      <div className="flex items-center justify-center gap-3 mb-5">
        <div className="text-center">
          <p className="font-display text-sm text-foreground/60">{event.month}</p>
        </div>
        <div className="w-14 h-14 md:w-16 md:h-16 border border-primary/30 rounded-lg flex items-center justify-center bg-background">
          <span className="font-display text-2xl md:text-3xl text-primary">{event.date}</span>
        </div>
        <div className="text-center">
          <p className="font-display text-sm text-foreground/60">{event.year}</p>
        </div>
      </div>

      <p className="text-primary font-medium text-sm mb-3">{event.time}</p>

      <p className="text-sm text-muted-foreground mb-5 max-w-xs mx-auto">
        {event.venue}
      </p>

      <a
        href={event.mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm rounded-full hover:bg-primary/90 transition-all duration-300"
      >
        <MapPin className="w-4 h-4" />
        Menuju Lokasi
      </a>
    </motion.div>
  );
};

const EventsSection = () => {
  const { events } = invitationData;

  return (
    <section className="relative py-20 md:py-28 px-4 md:px-6 bg-background overflow-hidden">
      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-primary/20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-primary/20" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <EventCard event={events.akadNikah} delay={0} />
          <EventCard event={events.ngunduhMantu} delay={0.2} />
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
