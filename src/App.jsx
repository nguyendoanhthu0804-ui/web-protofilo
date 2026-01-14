import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImpactChart from "./components/ImpactChart";
import LilyFlower from "./components/LilyFlower";



// Image Gallery Component
const ImageGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { src: "/images/anhthu2.png", caption: "Những khoảnh khắc đáng nhớ" },
    { src: "/images/cjc1.jpg", caption: "Hoạt động tình nguyện" },
    { src: "/images/cjc7.jpg", caption: "Dự án Entelier" },
    { src: "/images/DSC_1241.jpeg", caption: "Cùng các em nhỏ" },
    { src: "/images/ente1.jpg", caption: "Hành trình của tôi" },
    { src: "/images/ente2.jpg", caption: "Hành trình của tôi" },
    { src: "/images/ente3.jpg", caption: "Hành trình của tôi" },
    { src: "/images/ente4.jpg", caption: "Hành trình của tôi" },
    { src: "/images/ente5.jpg", caption: "Hành trình của tôi" },
    { src: "/images/IMG_5201.JPG", caption: "Hành trình của tôi" },
    { src: "/images/sap1.jpg", caption: "Hành trình của tôi" },
    { src: "/images/sap2.jpg", caption: "Hành trình của tôi" },
    { src: "/images/sap3.jpg", caption: "Hành trình của tôi" },
    { src: "/images/sap4.jpg", caption: "Hành trình của tôi" },
    { src: "/images/yosci1.jpg", caption: "Hành trình của tôi" },
  ];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <motion.div
      className="relative cursor-pointer group"
      variants={{
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
      }}
      onClick={nextImage}
    >
      {/* Title hint */}
      {/* <motion.div
        className="text-center mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-pastel-pink/20 rounded-full text-sm font-medium text-charcoal border border-pastel-pink/30">
          <span>📸</span>
          <span>Nhấn để xem thêm ảnh</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </span>
      </motion.div> */}

      {/* Background decoration */}
      <div className="absolute inset-0 border-2 border-charcoal rounded-[2rem] transform rotate-2 mt-12"></div>

      {/* Main image container */}
      <div className="bg-white p-4 border-2 border-charcoal rounded-[2rem] transform -rotate-1 relative z-10">
        <div className="h-64 bg-gradient-to-br from-warm-yellow/30 via-pastel-pink/20 to-periwinkle/30 rounded-xl flex items-center justify-center overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: 90 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Actual images */}
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].caption}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to placeholder if image doesn't exist
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback placeholder */}
              <div className="text-center p-4 hidden flex-col items-center justify-center absolute inset-0 bg-gradient-to-br from-warm-yellow/30 via-pastel-pink/20 to-periwinkle/30">
                <span className="text-6xl mb-2 block">
                  {['🎨', '🤝', '💡', '❤️', '🌟'][currentIndex]}
                </span>
                <span className="text-gray-500 italic text-sm">
                  {images[currentIndex].caption}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Image counter */}
          <div className="absolute bottom-3 right-3 bg-charcoal/80 text-white text-xs px-2 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-3">
          {images.map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-pastel-pink w-6' : 'bg-gray-300'
                }`}
              animate={i === currentIndex ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Hover hint */}
        {/* <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <span className="font-handwriting text-lg">Click để tiếp tục! ✨</span>
        </motion.div> */}
      </div>
    </motion.div>
  );
};

// Scroll Hint Component - Artistic Style
const ScrollHint = ({ nextSection, dark = false }) => (
  <motion.div
    className="absolute bottom-6 -translate-x-1/2 flex flex-col items-center cursor-pointer group"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1, duration: 0.5 }}
    whileHover={{ scale: 1.05 }}
  >
    {/* Decorative brush stroke background */}
    <div className="relative">
      {/* Left brush stroke */}
      <svg
        className={`absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-8 ${dark ? 'text-gray-600' : 'text-pastel-pink/40'}`}
        viewBox="0 0 50 20"
      >
        <path
          d="M2 10 Q 10 5, 20 10 T 40 10 T 48 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="group-hover:stroke-pastel-pink transition-colors duration-300"
        />
      </svg>

      {/* Right brush stroke */}
      <svg
        className={`absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-8 ${dark ? 'text-gray-600' : 'text-periwinkle/40'}`}
        viewBox="0 0 50 20"
      >
        <path
          d="M2 8 Q 10 15, 20 10 T 40 10 T 48 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="group-hover:stroke-periwinkle transition-colors duration-300"
        />
      </svg>

      {/* Section name with artistic underline */}
      <div className="relative px-6 py-2">
        <span className={`text-sm font-medium tracking-wide ${dark ? 'text-gray-300' : 'text-gray-600'} group-hover:${dark ? 'text-white' : 'text-charcoal'} transition-colors`}>
          {nextSection}
        </span>

        {/* Animated underline brush stroke */}
        <motion.svg
          className="absolute -bottom-1 left-0 w-full h-3"
          viewBox="0 0 100 12"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.path
            d="M5 6 Q 25 2, 50 6 T 95 6"
            fill="none"
            stroke={dark ? "#f9a8d4" : "#f9a8d4"}
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          />
        </motion.svg>
      </div>
    </div>

    {/* Animated scroll icon with artistic touch */}
    <motion.div
      className="mt-3 relative"
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Mouse/scroll indicator */}
      <div className={`w-6 h-10 rounded-full border-2 ${dark ? 'border-gray-400' : 'border-charcoal/50'} flex justify-center pt-2 group-hover:border-pastel-pink transition-colors duration-300`}>
        <motion.div
          className={`w-1.5 h-2.5 rounded-full ${dark ? 'bg-gray-400' : 'bg-charcoal/50'} group-hover:bg-pastel-pink transition-colors duration-300`}
          animate={{ y: [0, 4, 0], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Small decorative dots */}
      <motion.div
        className={`absolute -left-3 top-1/2 w-1 h-1 rounded-full ${dark ? 'bg-periwinkle/50' : 'bg-pastel-pink/50'}`}
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div
        className={`absolute -right-3 top-1/3 w-1.5 h-1.5 rounded-full ${dark ? 'bg-pastel-pink/50' : 'bg-periwinkle/50'}`}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
    </motion.div>

    {/* Sparkle decorations on hover */}
    <motion.span
      className={`absolute -top-2 -right-4 text-xs ${dark ? 'text-yellow-300' : 'text-warm-yellow'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      ✦
    </motion.span>
    <motion.span
      className={`absolute -bottom-1 -left-6 text-[10px] ${dark ? 'text-pink-300' : 'text-pastel-pink'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
    >
      ✧
    </motion.span>
  </motion.div>
);

const MiniNav = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isNavHovered, setIsNavHovered] = useState(false);

  const sections = [
    { id: 'intro', label: 'Introduction', icon: '👋', color: '#f9a8d4' },
    { id: 'connector', label: 'The Connector', icon: '🔗', color: '#a5b4fc' },
    { id: 'realization', label: 'The Realization', icon: '💡', color: '#fcd34d' },
    { id: 'gallery', label: "The 'Me'", icon: '🎨', color: '#f9a8d4' },
    { id: 'vinuni', label: 'Why VinUni?', icon: '🎓', color: '#60a5fa' },
    { id: 'contact', label: 'Contact', icon: '📧', color: '#a5b4fc' },
  ];

  // Track which section is in view
  useEffect(() => {
    const scrollContainer = document.querySelector('.snap-y');

    const observerOptions = {
      root: scrollContainer,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sections.findIndex(s => s.id === entry.target.id);
          if (index !== -1) {
            setActiveSection(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (index) => {
    const element = document.getElementById(sections[index].id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className="fixed right-6 top-1/2 z-50 hidden md:flex flex-col items-center"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: isNavHovered ? 1 : 0.2, x: 0 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      style={{ transform: 'translateY(-50%)' }}
      onMouseEnter={() => setIsNavHovered(true)}
      onMouseLeave={() => setIsNavHovered(false)}
    >
      {/* Navigation container with labels always visible */}
      <div className="relative flex flex-col items-end gap-2">
        {sections.map((section, index) => {
          const isActive = activeSection === index;
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={section.id}
              className="relative flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              {/* Always visible label */}
              <motion.button
                onClick={() => scrollToSection(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-300"
                style={{
                  background: isActive
                    ? `${section.color}25`
                    : isHovered
                      ? 'rgba(255,255,255,0.9)'
                      : 'rgba(255,255,255,0.7)',
                  boxShadow: isActive
                    ? `0 4px 15px ${section.color}40`
                    : isHovered
                      ? '0 4px 15px rgba(0,0,0,0.1)'
                      : '0 2px 8px rgba(0,0,0,0.05)',
                  border: isActive
                    ? `2px solid ${section.color}`
                    : '2px solid transparent',
                }}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Icon */}
                <span className="text-base">{section.icon}</span>

                {/* Label */}
                <span
                  className="text-xs font-medium transition-colors duration-300"
                  style={{
                    color: isActive ? section.color : '#6b7280',
                    fontWeight: isActive ? 600 : 500
                  }}
                >
                  {section.label}
                </span>

                {/* Dot indicator */}
                <motion.div
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: isActive ? section.color : '#d1d5db',
                    boxShadow: isActive ? `0 0 8px ${section.color}` : 'none'
                  }}
                  animate={{
                    scale: isActive ? [1, 1.3, 1] : 1,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: isActive ? Infinity : 0,
                  }}
                />
              </motion.button>

              {/* Active indicator line */}
              {isActive && (
                <motion.div
                  className="absolute -right-3 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full"
                  style={{ background: section.color }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Section counter at bottom - nằm ngoài dots container */}
      <motion.div
        className="mt-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.span
          className="text-xs font-bold"
          style={{ color: sections[activeSection]?.color }}
          key={activeSection}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {String(activeSection + 1).padStart(2, '0')}
        </motion.span>
        <span className="text-xs text-gray-400">/</span>
        <span className="text-xs text-gray-400">{String(sections.length).padStart(2, '0')}</span>
      </motion.div>
    </motion.nav>
  );
};

// Rain Effect Component
const RainEffect = () => {
  const raindrops = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 3,
    duration: 1 + Math.random() * 1.5,
    opacity: 0.2 + Math.random() * 0.4,
    size: Math.random() > 0.7 ? 'large' : 'small'
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {raindrops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute top-0"
          style={{ left: drop.left }}
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: '100vh',
            opacity: [0, drop.opacity, drop.opacity, 0]
          }}
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            delay: drop.delay,
            ease: 'linear'
          }}
        >
          {/* Raindrop */}
          <div
            className={`rounded-full bg-gradient-to-b from-blue-300/60 to-transparent ${drop.size === 'large' ? 'w-0.5 h-8' : 'w-[1px] h-4'
              }`}
            style={{ opacity: drop.opacity }}
          />
        </motion.div>
      ))}

      {/* Water ripples at bottom */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`ripple-${i}`}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 border border-blue-400/20 rounded-full"
          style={{
            left: `${10 + i * 12}%`,
          }}
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{
            width: [0, 40, 80],
            height: [0, 20, 40],
            opacity: [0.4, 0.2, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeOut'
          }}
        />
      ))}
    </div>
  );
};

// Section component với scroll snap
const Section = ({ children, className, id }) => (
  <section id={id} className={`min-h-screen w-full md:snap-start flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden ${className}`}>
    {children}
  </section>
);

// Animation variants cho stagger effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const slideFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};
function App() {
  return (
    <div className="bg-creamy-white text-charcoal h-screen overflow-y-scroll md:snap-y md:snap-mandatory scroll-smooth no-scrollbar selection:bg-pastel-pink">

      {/* Mini Navigation */}
      <MiniNav />

      {/* --- GIAI ĐOẠN 1: GIỚI THIỆU BẢN THÂN --- */}
      <Section id="intro" className="bg-creamy-white">
        {/* Background Image từ PDF */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/thu_page-0002.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Optional: Overlay để làm mờ nhẹ background nếu cần */}
          <div className="absolute inset-0 bg-creamy-white/30" />
        </div>

        <motion.div
          className="max-w-4xl grid md:grid-cols-2 gap-10 items-center relative z-10 mt-16 md:mt-0 px-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left content */}
          <motion.div variants={slideFromLeft} className="bg-white/70 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none rounded-2xl p-4 md:p-0">
            <motion.h2
              className="text-5xl font-bold mb-4 text-pinkish-purple drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
              variants={itemVariants}
            >
              Hello👋
            </motion.h2>
            <motion.h1
              className="text-4xl font-bold mb-6"
              variants={itemVariants}
            >
              I am <span className="text-pinkish-purple font-extrabold">Anh Thu</span>
            </motion.h1>
            <motion.p
              className="text-lg leading-relaxed mb-4"
              variants={itemVariants}
            >
              I am a <span className="font-semibold text-pinkish-purple">Data Science</span> enthusiast who believes that data, when used thoughtfully, can create meaningful social impact.
            </motion.p>
            <motion.p
              className="text-lg leading-relaxed mb-4"
              variants={itemVariants}
            >
              As someone who also loves <span className="font-semibold text-pinkish-purple">art</span>, I see <span className="font-semibold text-pinkish-purple">data</span> not merely as numbers or code, but as a medium for storytelling – one that reveals the human realities behind patterns and statistics. Art shapes how I observe the world; data helps me understand and improve it.
            </motion.p>
            <motion.p
              className="text-lg leading-relaxed text-gray-600 italic"
              variants={itemVariants}
            >
              This website documents my journey from a quiet observer to an active change-maker, using data as both my language and my tool.
            </motion.p>

            {/* Quick Info Tags */}
            <motion.div
              className="flex flex-wrap gap-2 mt-6"
              variants={itemVariants}
            >
              {[
                { text: '🎓 Change-maker', bg: 'bg-gradient-to-r from-amber-400/40 to-orange-400/30', border: 'border-amber-500/60', textColor: 'text-amber-800' },
                { text: '💻 Data Enthusiast', bg: 'bg-gradient-to-r from-periwinkle/50 to-blue-400/40', border: 'border-periwinkle/70', textColor: 'text-blue-800' },
                { text: '🎨 Art Lover', bg: 'bg-gradient-to-r from-pastel-pink/50 to-rose-400/40', border: 'border-pastel-pink/70', textColor: 'text-pink-800' },
                { text: '❤️ Volunteer', bg: 'bg-gradient-to-r from-red-400/40 to-rose-500/30', border: 'border-red-500/60', textColor: 'text-red-800' }
              ].map((tag, i) => (
                <motion.span
                  key={i}
                  className={`px-4 py-1.5 ${tag.bg} rounded-full text-sm font-semibold border-2 ${tag.border} ${tag.textColor} shadow-sm`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {tag.text}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Image Gallery */}
          <ImageGallery />
        </motion.div>

        <ScrollHint nextSection="The Connector" />
      </Section>

      {/* --- GIAI ĐOẠN 2: THE CONNECTOR --- */}
      <Section id="connector" className="bg-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%">
            <line x1="10%" y1="10%" x2="90%" y2="90%" stroke="black" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="90%" y1="10%" x2="10%" y2="90%" stroke="black" strokeWidth="2" strokeDasharray="5,5" />
          </svg>
        </div>

        <motion.div
          className="max-w-5xl flex flex-col md:flex-row items-center justify-between w-full gap-10 z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left content */}
          <motion.div className="w-full md:w-1/2" variants={slideFromLeft}>
            <motion.h2
              className="text-4xl font-bold mb-6 text-periwinkle font-mono"
              variants={itemVariants}
            >
              The Connector
            </motion.h2>
            <motion.p className="text-lg mb-4" variants={itemVariants}>
              In my journey, I had the chance to be a part of many meaningful projects. They all shared the same role: a connector, which united people who had a common interest and connected kind-hearted people to the hearts in need of warmth.
            </motion.p>
            <motion.p className="text-lg mb-4" variants={itemVariants}>
              Data became a powerful tool in this process. By analyzing participation trends, donation behaviors, and potential outcomes, I strengthened collaboration, improved transparency, and attracted sponsors who shared the same vision. Data transformed connection from something emotional into something sustainable.
            </motion.p>
            <motion.p className="text-lg mb-6 text-gray-600 italic" variants={itemVariants}>
              {/* Từ một dự án nhỏ, Entelier đã kết nối hơn 50 họa sĩ với hàng trăm người yêu nghệ thuật. */}
            </motion.p>

            {/* Skills */}
            <motion.div
              className="flex gap-2 flex-wrap font-mono text-sm"
              variants={containerVariants}
            >
              {['Leadership', 'Like-minded Peers', 'Data Analysis', 'Warmth'].map((skill, i) => (
                <motion.span
                  key={skill}
                  className={`px-3 py-1 rounded-full border ${i === 0 ? 'bg-pastel-pink/30 border-pastel-pink' :
                    i === 1 ? 'bg-periwinkle/30 border-periwinkle' :
                      i === 2 ? 'bg-warm-yellow/30 border-warm-yellow' :
                        'bg-gray-100 border-gray-300'
                    }`}
                  variants={scaleUp}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Chart */}
          <motion.div className="w-full md:w-1/2" variants={slideFromRight}>
            <ImpactChart />
          </motion.div>
        </motion.div>

        <ScrollHint nextSection="The Realization" />
      </Section>

      {/* --- GIAI ĐOẠN 3: THE REALIZATION --- */}
      <Section id="realization" className="bg-gradient-to-br from-charcoal via-gray-800 to-charcoal relative">
        {/* Rain Effect */}
        <RainEffect />

        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-pastel-pink/20 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-periwinkle/20 blur-3xl"></div>

          {/* Storm clouds effect */}
          <motion.div
            className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-900/50 to-transparent"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Lightning flash effect - subtle */}
          <motion.div
            className="absolute inset-0 bg-white/5"
            animate={{ opacity: [0, 0, 0, 0.1, 0, 0.05, 0, 0, 0, 0, 0, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <motion.div
          className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left content */}
          <motion.div variants={slideFromLeft}>
            {/* <motion.span
              className="inline-block px-4 py-2 bg-pastel-pink/20 backdrop-blur-sm rounded-full text-sm font-mono mb-4 text-pastel-pink border border-pastel-pink/30"
              variants={itemVariants}
            >
              💧 Khoảnh khắc nhận ra
            </motion.span> */}
            <motion.h2
              className="text-4xl font-bold mb-6 text-creamy-white"
              variants={itemVariants}
            >
              The <span className="text-pastel-pink">Realization</span>
            </motion.h2>
            <motion.p
              className="text-lg leading-relaxed mb-4 text-gray-300"
              variants={itemVariants}
            >
              In October of 2025, when the disastrous flood struck Hue, I realized financial aid alone is not enough. The rainfall reached an unprecedented <span className="text-periwinkle font-bold">1600mm</span> a day, sweeping away people’s possessions, effort, and even their hope.
            </motion.p>
            <motion.p
              className="text-lg leading-relaxed mb-6 text-gray-400"
              variants={itemVariants}
            >
              This experience reshaped my perspective. I realized that data could do more than record damage after it happened. It could help anticipate needs, guide resource allocation, and communicate urgency with empathy.
            </motion.p>

            {/* Tags */}
            <motion.div
              className="flex flex-wrap gap-2"
              variants={itemVariants}
            >
              {['Empathy', 'Social Impact'].map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Visual */}
          <motion.div variants={slideFromRight} className="flex flex-col items-center">
            {/* Big number display */}
            <motion.div
              className="relative mb-8"
              variants={scaleUp}
            >
              <motion.span
                className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pastel-pink via-periwinkle to-warm-yellow"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                1600
              </motion.span>
              <span className="absolute -bottom-2 right-0 text-2xl text-gray-400 font-mono">mm</span>

              {/* Animated rain drops */}
              <motion.div
                className="absolute -top-4 left-1/4 text-2xl"
                animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💧
              </motion.div>
              <motion.div
                className="absolute -top-2 right-1/4 text-xl"
                animate={{ y: [0, 15, 0], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              >
                💧
              </motion.div>
            </motion.div>

            {/* Insight box */}
            <motion.div
              className="w-full p-6 bg-gradient-to-r from-pastel-pink/10 to-periwinkle/10 backdrop-blur-sm rounded-2xl border border-white/20"
              variants={itemVariants}
            >
              <p className="font-mono text-sm text-pastel-pink mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-pastel-pink rounded-full animate-pulse"></span>
                Insight
              </p>
              <p className="text-lg text-creamy-white leading-relaxed">
                <span className="text-periwinkle font-medium">DATA SCIENCE</span> without <span className="text-pastel-pink font-medium">EMPATHY</span> is empty.
                <br />
                <span className="text-pastel-pink font-medium">EMPATHY</span> without <span className="text-periwinkle font-medium">DATA</span> is blind.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        <ScrollHint nextSection="Living Gallery" dark />
      </Section>

      {/* --- GIAI ĐOẠN 4: THE VISIONARY --- */}
      <Section id="gallery" className="bg-creamy-white">
        <motion.div
          className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left content */}
          <motion.div variants={slideFromLeft}>
            <motion.h2
              className="text-4xl font-bold mb-4 font-mono text-charcoal"
              variants={itemVariants}
            >
              The <span className="text-pastel-pink">"Me"</span>
            </motion.h2>
            <motion.p className="text-lg mb-4" variants={itemVariants}>
              At the end of the journey, I have grown a lot. With all the friends I have made, the memories I have gained and the experiences I have obtained, I have gradually opened myself up like a blooming lily, each part of my journey has contributed to who I am becoming:
            </motion.p>
            {/* <motion.p className="text-lg mb-4" variants={itemVariants}>
              Hãy thử nhập một cảm xúc của bạn vào bên phải. Công nghệ sẽ biến nó thành nghệ thuật.
            </motion.p>
            <motion.p className="text-lg mb-6 text-gray-600 italic" variants={itemVariants}>
              Data Science không chỉ tối ưu hóa lợi nhuận, mà còn khuếch đại nhân văn.
            </motion.p> */}

            {/* Tech Stack */}
            <motion.div className="mt-8" variants={itemVariants}>
              <h3 className="font-bold text-lg mb-4 underline decoration-wavy decoration-periwinkle">Tech Stack:</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-mono mb-1">
                    <span>Python / Excel</span>
                    <span>60%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-periwinkle"
                      initial={{ width: 0 }}
                      whileInView={{ width: '60%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-mono mb-1">
                    <span>Data Visualization</span>
                    <span>80%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-pastel-pink"
                      initial={{ width: 0 }}
                      whileInView={{ width: '80%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.7 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Hành trình Nở Hoa */}
          <motion.div className="flex justify-center" variants={slideFromRight}>
            <LilyFlower />
          </motion.div>
        </motion.div>

        <ScrollHint nextSection="Why VinUni?" />
      </Section>

      {/* --- GIAI ĐOẠN 5: THE GROWTH - INTERACTIVE STORYTELLING (TẠM ĐÓNG) ---
      <Section className="bg-gradient-to-b from-creamy-white to-pink-50">
        <motion.div
          className="max-w-6xl w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-4"
              variants={scaleUp}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-teal-400 to-pink-500">
                Hành trình Nở Hoa
              </span>
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Mỗi trải nghiệm, mỗi kết nối, mỗi hành động thiện nguyện...
              đều là những giọt nước nuôi dưỡng tâm hồn tôi phát triển.
            </motion.p>
          </motion.div>

          <motion.div variants={scaleUp}>
            <LilyFlower />
          </motion.div>

          <motion.p
            className="text-center text-sm text-gray-500 italic mt-4"
            variants={itemVariants}
          >
            "Từ một nụ hoa e ấp, với tình yêu thương và sự kết nối,
            tôi đã học cách nở rộ theo cách của riêng mình."
          </motion.p>
        </motion.div>

        <ScrollHint nextSection="Why VinUni?" />
      </Section>
      --- */
      }
      {/* --- GIAI ĐOẠN 6: WHY VINUNI? --- */}
      <Section id="vinuni" className="bg-gradient-to-br from-[#1a365d] via-[#2c5282] to-[#2b6cb0] text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 border-2 border-white rotate-45"></div>
        </div>

        <motion.div
          className="max-w-5xl w-full z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Header */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            {/* <motion.span
              className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-mono mb-4"
              variants={scaleUp}
            >
              🎯 Điểm đến tiếp theo
            </motion.span> */}
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-4"
              variants={scaleUp}
            >
              The Next Destination: <span className="text-amber-400">VinUni</span>
            </motion.h2>
          </motion.div>

          {/* Reasons Grid */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-12"
            variants={containerVariants}
          >
            {/* Reason 1 */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              variants={slideFromLeft}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-bold mb-3 text-amber-300">Opportunities for Improvement</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                Through research-oriented initiatives such as <span className="text-amber-400">VinTelligence</span> and interdisciplinary extracurricular activities, I hope to deepen my understanding of applied data science while learning how research can drive real-world solutions.
              </p>
            </motion.div>

            {/* Reason 3 */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              variants={slideFromRight}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-3 text-amber-300">Academic Excellence</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                VinUni offers a unique curriculum and teaching model adapted from top universities in the world. Moreover, with the appointment of Professor Tan Yap-Peng, who used to be Vice Dean of the College of Engineering (COE) at Nanyang Technological University (NTU), I believe that VinUni is a suitable environment for me to improve my academic ability.
              </p>
            </motion.div>

            {/* Reason 2 */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              variants={scaleUp}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="text-4xl mb-4">🌏</div>
              <h3 className="text-xl font-bold mb-3 text-amber-300">Global Connection</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                VinUni’s global partnerships align with my aspiration to learn from diverse perspectives and bring those insights back to my community.
              </p>
            </motion.div>

          </motion.div>

          {/* Quote Box */}
          <motion.div
            className="bg-gradient-to-r from-amber-400/20 to-orange-400/20 backdrop-blur-sm p-8 rounded-2xl border border-amber-400/30 text-center"
            variants={scaleUp}
          >
            <p className="text-xl md:text-2xl font-medium italic mb-4">
              "I aspire to use <span className="text-amber-400">data</span> and <span className="text-amber-400">technology</span> to foster empathy and create social impact.
              VinUni is where this aspiration can evolve into action."
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
              <span className="w-8 h-[1px] bg-gray-400"></span>
              <span>My Promise</span>
              <span className="w-8 h-[1px] bg-gray-400"></span>
            </div>
          </motion.div>

          {/* Future Goals */}
          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-4"
            variants={containerVariants}
          >
            {[
              { icon: "📊", text: "Data Science" },
              { icon: "🤝", text: "Community" },
              { icon: "🚀", text: "Opportunity" }
            ].map((goal, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm"
                variants={scaleUp}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                <span>{goal.icon}</span>
                <span>{goal.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <ScrollHint nextSection="Contact" dark />
      </Section>

      {/* --- FOOTER: CONTACT & CTA --- */}
      <Section id="contact" className="bg-charcoal text-creamy-white min-h-[80vh]">
        <motion.div
          className="max-w-4xl w-full text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Profile */}
          <motion.div className="mb-8" variants={scaleUp}>
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-pastel-pink via-periwinkle to-warm-yellow p-1">
              <div className="w-full h-full rounded-full bg-charcoal flex items-center justify-center text-5xl">
                👩‍💻
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              Nguyen Do Anh Thu
            </h2>
            <p className="text-xl text-gray-400 font-mono">
              Aspiring Data Scientist | Social Innovator
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            “What began as a quiet moment in front of a child’s drawing has grown into a lasting commitment to purposeful data use, and I see VinUniversity as the place where I can turn this commitment into meaningful impact.”
          </motion.p>

          {/* Download CV Button */}
          <motion.div className="mb-12" variants={scaleUp}>
            <motion.a
              href="/CV-Nguyen_Do_Anh_Thu.pdf"
              download
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pastel-pink to-periwinkle text-charcoal font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download CV / Resume
            </motion.a>
          </motion.div>

          {/* Contact Links */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-12"
            variants={containerVariants}
          >
            {[
              {
                icon: "🐙",
                label: "GitHub",
                value: "@nguyendoanhthu0804-ui",
                href: "https://github.com/nguyendoanhthu0804-ui",
                color: "from-gray-400 to-gray-600"
              },
              {
                icon: "📧",
                label: "Email",
                value: "nguyendoanhthu0804@gmail.com",
                href: "mailto:nguyendoanhthu0804@gmail.com",
                color: "from-red-400 to-pink-400"
              },
              {
                icon: "📱",
                label: "Phone",
                value: "+84 978904146",
                href: "tel:+84978904146",
                color: "from-green-400 to-teal-400"
              }
            ].map((contact, i) => (
              <motion.a
                key={i}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 min-w-[140px]"
                variants={scaleUp}
                whileHover={{ y: -5 }}
              >
                <span className={`text-3xl group-hover:scale-110 transition-transform`}>
                  {contact.icon}
                </span>
                <span className="text-sm text-gray-400">{contact.label}</span>
                <span className="text-xs text-gray-500 font-mono">{contact.value}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-4"
            variants={itemVariants}
          />

          {/* Scroll to top hint */}
          <motion.div
            className="mt-8 flex justify-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              onClick={() => {
                const introSection = document.getElementById('intro');
                if (introSection) {
                  introSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group flex flex-col items-center gap-2 text-gray-500 hover:text-pastel-pink transition-all duration-300"
              whileHover={{ y: -5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-12 h-12 rounded-full border-2 border-gray-600 group-hover:border-pastel-pink flex items-center justify-center transition-all duration-300 group-hover:bg-pastel-pink/10"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="text-2xl">↑</span>
              </motion.div>
              <p className="text-xs font-medium">Back to top</p>
            </motion.button>
          </motion.div>
        </motion.div>
      </Section>

    </div >
  );
}

export default App;