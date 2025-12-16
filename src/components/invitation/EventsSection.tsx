import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "@/data/invitationData";
import { MapPin, Check } from "lucide-react";
import WaveTransition from "./WaveTransition";

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
      className="relative bg-background border border-primary/20 p-6 md:p-10 text-center rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -5, boxShadow: "0 20px 40px hsla(195, 80%, 60%, 0.15)" }}
    >
      {event.isCompleted && (
        <div className="absolute top-4 right-4 flex items-center gap-1 text-xs text-primary/70">
          <Check className="w-3 h-3" />
          <span>Selesai</span>
        </div>
      )}

      <p className="font-display text-lg md:text-xl text-primary/70 mb-2">{event.day}</p>

      <h3 className="font-display text-xl md:text-3xl text-primary mb-6">
        {event.title}
      </h3>

      <div className="flex items-center justify-center gap-3 md:gap-4 mb-6">
        <div className="text-center">
          <p className="font-display text-base md:text-lg text-foreground/70">{event.month}</p>
        </div>
        <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-primary/30 rounded-xl flex items-center justify-center bg-card">
          <span className="font-display text-3xl md:text-4xl text-primary">{event.date}</span>
        </div>
        <div className="text-center">
          <p className="font-display text-base md:text-lg text-foreground/70">{event.year}</p>
        </div>
      </div>

      <p className="text-primary font-medium mb-4">{event.time}</p>

      <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
        {event.venue}
      </p>

      <a
        href={event.mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm rounded-full hover:bg-primary/90 transition-all duration-300"
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
      className="relative py-24 md:py-32 px-4 md:px-6 bg-card overflow-hidden"
    >
      <WaveTransition position="top" fillColor="hsl(var(--background))" />
      
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(var(--primary))_1px,_transparent_1px)] bg-[length:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <EventCard event={events.akadNikah} delay={0} />
          <EventCard event={events.ngunduhMantu} delay={0.2} />
        </div>
      </div>

      <WaveTransition position="bottom" fillColor="hsl(var(--background))" />
    </section>
  );
};

export default EventsSection;
