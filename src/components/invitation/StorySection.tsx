import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "@/data/invitationData";

const StorySection = () => {
  const { story } = invitationData;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 px-4 md:px-6 bg-card overflow-hidden"
    >
      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-primary/15" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-primary/15" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-elegant uppercase text-muted-foreground mb-2">
            Story of
          </p>
          <h2 className="font-display text-2xl md:text-3xl text-primary">
            {story.title.replace("Story of ", "")}
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 md:-translate-x-1/2" />

          {/* Timeline items */}
          {story.chapters.map((chapter, index) => (
            <motion.div
              key={chapter.year}
              className={`relative flex items-start gap-8 mb-14 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Year dot */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 mt-2 z-10" />

              {/* Year label */}
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 -top-6">
                <span className="font-display text-lg text-primary/60">{chapter.year}</span>
              </div>

              {/* Content card */}
              <div className={`ml-12 md:ml-0 md:w-[calc(50%-40px)] ${
                index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"
              }`}>
                <span className="md:hidden font-display text-lg text-primary/60 block mb-2">
                  {chapter.year}
                </span>
                <h3 className="font-display text-xl md:text-2xl text-primary mb-2">
                  {chapter.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {chapter.description}
                </p>
              </div>

              {/* Empty space for alternating layout on desktop */}
              <div className="hidden md:block md:w-[calc(50%-40px)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StorySection;
