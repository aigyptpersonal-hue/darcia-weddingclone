import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { invitationData } from "../../data/invitationData";
import { Heart } from "lucide-react";

const StorySection = () => {
  const { story } = invitationData;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="relative py-20 px-4 md:px-6 bg-[#F9F7F2] overflow-hidden font-sans text-[#3A5A40]"
    >
      <div className="relative z-10 max-w-3xl mx-auto">
        
        {/* --- HEADER --- */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.2em] uppercase text-[#3A5A40]/60 mb-3 font-medium">
            Our Love Story
          </p>
          <h2 className="text-3xl md:text-4xl text-[#3A5A40] mb-4" style={{ fontFamily: "'Sinera', serif" }}>
            {story.title.replace("Story of ", "")}
          </h2>
          
          {/* Divider Simpel */}
          <div className="flex justify-center">
             <div className="w-16 h-[1px] bg-[#3A5A40]/30"></div>
          </div>
        </motion.div>

        {/* --- TIMELINE --- */}
        <div className="relative">
          {/* Garis Vertikal Tengah */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#3A5A40]/20 md:-translate-x-1/2" />

          {/* Timeline Items */}
          {story.chapters.map((chapter, index) => (
            <motion.div
              key={chapter.year}
              className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Dot Penanda (Heart Icon Kecil) */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 mt-1.5 z-10 bg-[#F9F7F2] p-1">
                 <Heart className="w-3 h-3 text-[#3A5A40] fill-[#3A5A40]" />
              </div>

              {/* Content Card */}
              <div className={`ml-10 md:ml-0 md:w-[calc(50%-30px)] bg-white/60 backdrop-blur-sm border border-[#3A5A40]/10 p-6 rounded-t-[30px] rounded-b-[10px] shadow-sm hover:shadow-md transition-all duration-300 ${
                index % 2 === 0 ? "md:text-right md:mr-auto" : "md:text-left md:ml-auto"
              }`}>
                
                {/* Tahun (Sinera) */}
                <span className="block text-2xl text-[#3A5A40] mb-2 leading-none" style={{ fontFamily: "'Sinera', serif" }}>
                  {chapter.year}
                </span>

                {/* Judul Chapter */}
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#3A5A40] mb-3 opacity-90">
                  {chapter.title}
                </h3>

                {/* Deskripsi */}
                <p className="text-sm text-[#3A5A40]/80 leading-relaxed">
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
