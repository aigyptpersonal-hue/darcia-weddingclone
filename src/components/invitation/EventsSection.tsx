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
      className="relative bg-card border border-primary/20 p-8 md:p-10 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
    >
      {/* Completed badge */}
      {event.isCompleted && (
        <div className="absolute top-4 right-4 flex items-center gap-1 text-xs text-primary/70">
          <Check className="w-3 h-3" />
          <span>Selesai</span>
        </div>
      )}

      {/* Day */}
      <p className="font-display text-xl text-primary/70 mb-2">{event.day}</p>

      {/* Title */}
      <h3 className="font-display text-2xl md:text-3xl text-primary mb-6">
        {event.title}
      </h3>

      {/* Date display */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="text-center">
          <p className="font-display text-lg text-foreground/70">{event.month}</p>
        </div>
        <div className="w-20 h-20 border border-primary/30 flex items-center justify-center">
          <span className="font-display text-4xl text-primary">{event.date}</span>
        </div>
        <div className="text-center">
          <p className="font-display text-lg text-foreground/70">{event.year}</p>
        </div>
      </div>

      {/* Time */}
      <p className="text-primary font-medium mb-4">{event.time}</p>

      {/* Venue */}
      <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
        {event.venue}
      </p>

      {/* Map button */}
      <a
        href={event.mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 border border-primary/40 text-primary text-sm hover:bg-primary/10 transition-all duration-300"
      >
        <MapPin className="w-4 h-4" />
        Menuju Lokasi
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
      className="relative py-24 px-6 bg-card overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(var(--gold))_1px,_transparent_1px)] bg-[length:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Events grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <EventCard event={events.akadNikah} delay={0} />
          <EventCard event={events.ngunduhMantu} delay={0.2} />
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
