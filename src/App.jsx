// App.jsx
import { motion } from "framer-motion";
import ImpactChart from "./components/ImpactChart";
import ArtGenerator from "./components/ArtGenerator";
import CodeRain from "./components/CodeRain";

// Section component với scroll snap
const Section = ({ children, className }) => (
  <section className={`min-h-screen w-full snap-start flex flex-col items-center justify-center p-8 relative overflow-hidden ${className}`}>
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
    <div className="bg-creamy-white text-charcoal h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar font-sans selection:bg-pastel-pink">

      {/* --- GIAI ĐOẠN 1: THE OBSERVER --- */}
      <Section className="bg-creamy-white">
        <motion.div
          className="max-w-4xl grid md:grid-cols-2 gap-10 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left content */}
          <motion.div variants={slideFromLeft}>
            <motion.h2
              className="text-5xl font-bold mb-4 font-handwriting text-pastel-pink drop-shadow-md"
              variants={itemVariants}
            >
              The Observer
            </motion.h2>
            <motion.h1
              className="text-4xl font-bold mb-6"
              variants={itemVariants}
            >
              Nghệ thuật là ngôn ngữ không biên giới.
            </motion.h1>
            <motion.p
              className="text-lg leading-relaxed mb-4"
              variants={itemVariants}
            >
              Những ngày đầu tiên tại trung tâm Phúc Tuệ, tôi nhìn thấy một cô bé mặc váy vàng đang vẽ một bức tranh về mẹ của mình.
            </motion.p>
            <motion.p
              className="text-lg leading-relaxed mb-4"
              variants={itemVariants}
            >
              Trong nét vẽ ngây thơ ấy, tôi thấy sự khao khát được kết nối. Nghệ thuật không cần ngôn từ, nó nói thẳng vào trái tim.
            </motion.p>
            <motion.p
              className="text-lg leading-relaxed text-gray-600 italic"
              variants={itemVariants}
            >
              Từ đó, tôi hiểu rằng việc quan sát và thấu hiểu là bước đầu tiên để tạo ra tác động có ý nghĩa.
            </motion.p>
          </motion.div>

          <motion.div
            className="relative cursor-pointer group"
            variants={slideFromRight}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 border-2 border-charcoal rounded-[2rem] transform rotate-2"></div>
            <div className="bg-white p-4 border-2 border-charcoal rounded-[2rem] transform -rotate-1 relative z-10">
              <div className="h-64 bg-warm-yellow/30 rounded-xl flex items-center justify-center">
                <span className="text-gray-400 italic">[Hình ảnh cô bé váy vàng]</span>
              </div>
              <div className="absolute bottom-10 left-10 bg-white px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-handwriting text-xl">"Mẹ ơi..."</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Section>

      {/* --- GIAI ĐOẠN 2: THE CONNECTOR --- */}
      <Section className="bg-white">
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
              Dự án Entelier không chỉ là bán tranh. Đó là việc kết nối những trái tim yêu nghệ thuật với những họa sĩ đặc biệt.
            </motion.p>
            <motion.p className="text-lg mb-4" variants={itemVariants}>
              Tôi nhận ra dữ liệu có thể tối ưu hóa sự kết nối này. Bằng cách phân tích xu hướng, tôi đưa đúng tác phẩm đến đúng người.
            </motion.p>
            <motion.p className="text-lg mb-6 text-gray-600 italic" variants={itemVariants}>
              Từ một dự án nhỏ, Entelier đã kết nối hơn 50 họa sĩ với hàng trăm người yêu nghệ thuật.
            </motion.p>

            {/* Skills */}
            <motion.div
              className="flex gap-2 flex-wrap font-mono text-sm"
              variants={containerVariants}
            >
              {['Leadership', 'Fundraising', 'Data Analysis', 'Empathy'].map((skill, i) => (
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
      </Section>

      {/* --- GIAI ĐOẠN 3: THE REALIZATION --- */}
      <Section className="bg-gray-900 text-creamy-white relative">
        <CodeRain />

        <motion.div
          className="max-w-3xl text-center z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-6xl md:text-7xl font-bold mb-6 text-blue-300"
            variants={scaleUp}
          >
            1600mm
          </motion.h2>
          <motion.p
            className="text-xl italic mb-6 text-gray-300"
            variants={itemVariants}
          >
            "Khi cơn lũ ập đến Huế, tôi nhận ra tiền bạc là chưa đủ.
            Con số 1600mm không vô tri, nó mang nỗi đau của hàng ngàn gia đình."
          </motion.p>
          <motion.p
            className="text-lg mb-8 text-gray-400"
            variants={itemVariants}
          >
            Tôi học được rằng Data Science không chỉ là con số và biểu đồ.
            Đó là công cụ để thấu hiểu, dự đoán và hành động có ý nghĩa.
          </motion.p>
          <motion.div
            className="p-6 border-l-4 border-pastel-pink bg-white/10 text-left backdrop-blur-sm"
            variants={slideFromLeft}
          >
            <p className="font-mono text-sm text-pastel-pink mb-2">Insight:</p>
            <p className="text-lg">Data Science without Empathy is empty.<br />Empathy without Data is blind.</p>
          </motion.div>
        </motion.div>
      </Section>

      {/* --- GIAI ĐOẠN 4: THE VISIONARY --- */}
      <Section className="bg-creamy-white">
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
              <span className="text-pastel-pink">Living</span> Gallery
            </motion.h2>
            <motion.p className="text-lg mb-4" variants={itemVariants}>
              Ước mơ của tôi là xây dựng một không gian nơi dòng code trở thành mạch dẫn của sự thấu cảm.
            </motion.p>
            <motion.p className="text-lg mb-4" variants={itemVariants}>
              Hãy thử nhập một cảm xúc của bạn vào bên phải. Công nghệ sẽ biến nó thành nghệ thuật.
            </motion.p>
            <motion.p className="text-lg mb-6 text-gray-600 italic" variants={itemVariants}>
              Data Science không chỉ tối ưu hóa lợi nhuận, mà còn khuếch đại nhân văn.
            </motion.p>

            {/* Tech Stack */}
            <motion.div className="mt-8" variants={itemVariants}>
              <h3 className="font-bold text-lg mb-4 underline decoration-wavy decoration-periwinkle">Tech Stack:</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-mono mb-1">
                    <span>Python / Pandas</span>
                    <span>90%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-periwinkle"
                      initial={{ width: 0 }}
                      whileInView={{ width: '90%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-mono mb-1">
                    <span>Data Visualization</span>
                    <span>75%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-pastel-pink"
                      initial={{ width: 0 }}
                      whileInView={{ width: '75%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.7 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Art Generator */}
          <motion.div className="flex justify-center" variants={slideFromRight}>
            <ArtGenerator />
          </motion.div>
        </motion.div>
      </Section>

    </div>
  );
}

export default App;