// App.jsx
import { motion } from "framer-motion";
import ImpactChart from "./components/ImpactChart";
import ArtGenerator from "./components/ArtGenerator";
import CodeRain from "./components/CodeRain";

// Component con cho từng Section để code gọn hơn
const Section = ({ children, className }) => (
  <section className={`h-screen w-full snap-start flex flex-col items-center justify-center p-8 relative overflow-hidden ${className}`}>
    {children}
  </section>
);

function App() {
  return (
    <div className="bg-creamy-white text-charcoal h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar font-sans selection:bg-pastel-pink">

      {/* --- GIAI ĐOẠN 1: THE OBSERVER --- */}
      <Section className="bg-creamy-white">
        <div className="max-w-4xl grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-5xl font-bold mb-4 font-handwriting text-pastel-pink drop-shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              The Observer
            </motion.h2>
            <motion.h1
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Nghệ thuật là ngôn ngữ không biên giới.
            </motion.h1>
            <motion.p
              className="text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Những ngày đầu tiên tại trung tâm Phúc Tuệ. Tôi nhìn thấy một cô bé mặc váy vàng...
            </motion.p>
          </motion.div>

          <motion.div
            className="relative cursor-pointer group"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Giả lập khung tranh vẽ tay */}
            <div className="absolute inset-0 border-2 border-charcoal rounded-[2rem] transform rotate-2"></div>
            <div className="bg-white p-4 border-2 border-charcoal rounded-[2rem] transform -rotate-1 relative z-10">
              <div className="h-64 bg-warm-yellow/30 rounded-xl flex items-center justify-center">
                <span className="text-gray-400 italic">[Hình ảnh cô bé váy vàng]</span>
              </div>
              {/* Tooltip khi hover */}
              <div className="absolute bottom-10 left-10 bg-white px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-handwriting text-xl">"Mẹ ơi..."</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* --- GIAI ĐOẠN 2: THE CONNECTOR --- */}
      <Section className="bg-white">
        {/* Background lines effect */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%">
            <line x1="10%" y1="10%" x2="90%" y2="90%" stroke="black" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="90%" y1="10%" x2="10%" y2="90%" stroke="black" strokeWidth="2" strokeDasharray="5,5" />
          </svg>
        </div>

        <div className="max-w-5xl flex flex-col md:flex-row items-center justify-between w-full gap-10">
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-4xl font-bold mb-6 text-periwinkle font-mono"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              The Connector
            </motion.h2>
            <motion.p
              className="text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Dự án Entelier không chỉ là bán tranh. Đó là việc kết nối những trái tim...
              Tôi nhận ra dữ liệu có thể tối ưu hóa sự kết nối này.
            </motion.p>
            {/* Widget Skillset đơn giản */}
            <motion.div
              className="flex gap-2 flex-wrap font-mono text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.span
                className="px-3 py-1 bg-pastel-pink/30 rounded-full border border-pastel-pink"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, type: "spring" }}
              >
                Leadership
              </motion.span>
              <motion.span
                className="px-3 py-1 bg-periwinkle/30 rounded-full border border-periwinkle"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, type: "spring" }}
              >
                Fundraising
              </motion.span>
              <motion.span
                className="px-3 py-1 bg-warm-yellow/30 rounded-full border border-warm-yellow"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, type: "spring" }}
              >
                Empathy
              </motion.span>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* NHÚNG WIDGET CHART VÀO ĐÂY */}
            <ImpactChart />
          </motion.div>
        </div>
      </Section>

      {/* --- GIAI ĐOẠN 3: THE REALIZATION (FLOOD) --- */}
      <Section className="bg-gray-900 text-creamy-white relative">
        {/* Rain Effect - Đơn giản bằng CSS hoặc tạo component riêng */}
        <CodeRain />

        <div className="max-w-3xl text-center z-10">
          <motion.h2
            className="text-5xl font-bold mb-6 text-blue-300"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            1600mm
          </motion.h2>
          <motion.p
            className="text-xl italic mb-8 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            "Khi cơn lũ ập đến Huế, tôi nhận ra tiền bạc là chưa đủ.
            Con số 1600mm không vô tri, nó mang nỗi đau của hàng ngàn gia đình."
          </motion.p>
          <motion.div
            className="p-6 border-l-4 border-pastel-pink bg-white/10 text-left backdrop-blur-sm"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="font-mono text-sm text-pastel-pink mb-2">Insight:</p>
            <p className="text-lg">Data Science without Empathy is empty.<br />Empathy without Data is blind.</p>
          </motion.div>
        </div>
      </Section>

      {/* --- GIAI ĐOẠN 4: THE VISIONARY (LIVING GALLERY) --- */}
      <Section className="bg-creamy-white">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-4xl font-bold mb-4 font-mono text-charcoal"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="text-pastel-pink">Living</span> Gallery
            </motion.h2>
            <motion.p
              className="text-lg mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Ước mơ của tôi là xây dựng một không gian nơi dòng code (Lines of code) trở thành mạch dẫn của sự thấu cảm (Vessel for empathy).
              Hãy thử nhập một cảm xúc của bạn vào bên phải.
            </motion.p>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <h3 className="font-bold text-lg mb-4 underline decoration-wavy decoration-periwinkle">Tech Stack của tôi:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-periwinkle"
                    initial={{ width: 0 }}
                    whileInView={{ width: '90%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 1 }}
                  />
                </div>
                <span className="text-sm font-mono">Python / Pandas (90%)</span>

                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-pastel-pink"
                    initial={{ width: 0 }}
                    whileInView={{ width: '75%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 1 }}
                  />
                </div>
                <span className="text-sm font-mono">Data Visualization (75%)</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* NHÚNG WIDGET ART GENERATOR */}
            <ArtGenerator />
          </motion.div>
        </div>
      </Section>

    </div>
  );
}

export default App;