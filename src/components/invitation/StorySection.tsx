import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "@/data/invitationData";
import { Heart } from "lucide-react";

const StorySection = () => {
  const { story } = invitationData;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24 px-4 md:px-6 bg-card overflow-hidden"
    >
      {/* Frame border */}
      <div className="absolute inset-6 md:inset-10 border border-primary/10 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-elegant uppercase text-muted-foreground mb-2">
            Our Story
          </p>
          <h2 className="font-display text-2xl md:text-3xl text-primary uppercase tracking-wide">
            {story.title.replace("Story of ", "")}
          </h2>
          <div className="divider-ornament mt-4">
            <Heart className="w-3 h-3 text-primary/40 fill-primary/20" />
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-primary/15 md:-translate-x-1/2" />

          {/* Timeline items */}
          {story.chapters.map((chapter, index) => (
            <motion.div
              key={chapter.year}
              className={`relative flex items-start gap-6 mb-10 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              {/* Year dot */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary/30 border-2 border-background -translate-x-1/2 mt-1.5 z-10" style={{ transform: 'rotate(45deg) translateX(-70%)' }} />

              {/* Content card */}
              <div className={`ml-10 md:ml-0 md:w-[calc(50%-30px)] bg-background p-5 border border-primary/10 ${
                index % 2 === 0 ? "md:text-right md:mr-auto" : "md:text-left md:ml-auto"
              }`}>
                <span className="font-display text-sm text-primary/60 block mb-1">
                  {chapter.year}
                </span>
                <h3 className="font-display text-lg text-primary mb-2">
                  {chapter.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {chapter.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StorySection;
