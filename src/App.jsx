// App.jsx
import { motion } from "framer-motion";
import ImpactChart from "./components/ImpactChart";
import ArtGenerator from "./components/ArtGenerator";
import CodeRain from "./components/CodeRain";
import LilyFlower from "./components/LilyFlower";

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
    <div className="bg-creamy-white text-charcoal h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar selection:bg-pastel-pink">

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
              className="text-5xl font-bold mb-4 text-pastel-pink drop-shadow-md"
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

      {/* --- GIAI ĐOẠN 5: THE GROWTH - INTERACTIVE STORYTELLING --- */}
      <Section className="bg-gradient-to-b from-creamy-white to-pink-50">
        <motion.div
          className="max-w-6xl w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Header */}
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

          {/* Interactive Lily Flower */}
          <motion.div variants={scaleUp}>
            <LilyFlower />
          </motion.div>

          {/* Caption */}
          <motion.p
            className="text-center text-sm text-gray-500 italic mt-4"
            variants={itemVariants}
          >
            "Từ một nụ hoa e ấp, với tình yêu thương và sự kết nối,
            tôi đã học cách nở rộ theo cách của riêng mình."
          </motion.p>
        </motion.div>
      </Section>

      {/* --- GIAI ĐOẠN 6: WHY VINUNI? --- */}
      <Section className="bg-gradient-to-br from-[#1a365d] via-[#2c5282] to-[#2b6cb0] text-white relative overflow-hidden">
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
            <motion.span
              className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-mono mb-4"
              variants={scaleUp}
            >
              🎯 Điểm đến tiếp theo
            </motion.span>
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-4"
              variants={scaleUp}
            >
              Why <span className="text-amber-400">VinUni</span>?
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
              <h3 className="text-xl font-bold mb-3 text-amber-300">Research-Driven</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                VinUni không chỉ dạy lý thuyết. Môi trường nghiên cứu tại đây cho phép tôi
                áp dụng Data Science vào các vấn đề thực tế của Việt Nam ngay từ năm nhất.
              </p>
            </motion.div>

            {/* Reason 2 */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              variants={scaleUp}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="text-4xl mb-4">🌏</div>
              <h3 className="text-xl font-bold mb-3 text-amber-300">Global + Local</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                Chương trình hợp tác với Cornell giúp tôi tiếp cận kiến thức quốc tế,
                nhưng vẫn giữ gốc rễ để phục vụ cộng đồng Việt Nam.
              </p>
            </motion.div>

            {/* Reason 3 */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              variants={slideFromRight}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-3 text-amber-300">Innovation Ecosystem</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                Hệ sinh thái Vingroup mở ra cơ hội thực tập, khởi nghiệp và biến ý tưởng
                Data for Good thành sản phẩm thực sự tác động xã hội.
              </p>
            </motion.div>
          </motion.div>

          {/* Quote Box */}
          <motion.div
            className="bg-gradient-to-r from-amber-400/20 to-orange-400/20 backdrop-blur-sm p-8 rounded-2xl border border-amber-400/30 text-center"
            variants={scaleUp}
          >
            <p className="text-xl md:text-2xl font-medium italic mb-4">
              "Tôi muốn trở thành người kết nối giữa <span className="text-amber-400">công nghệ</span> và
              <span className="text-pink-300"> tình người</span>. VinUni là nơi giúp tôi hiện thực hóa sứ mệnh đó."
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
              { icon: "📊", text: "Data Science for Social Good" },
              { icon: "🎨", text: "Art + Tech Integration" },
              { icon: "🤝", text: "Community Impact" },
              { icon: "🚀", text: "Innovation Leader" }
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
      </Section>

      {/* --- FOOTER: CONTACT & CTA --- */}
      <Section className="bg-charcoal text-creamy-white min-h-[80vh]">
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
              Anh Thư
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
            Kết nối dữ liệu với trái tim. Biến những con số thành câu chuyện có ý nghĩa.
            Sẵn sàng để tạo ra tác động tích cực cho cộng đồng.
          </motion.p>

          {/* Download CV Button */}
          <motion.div className="mb-12" variants={scaleUp}>
            <motion.a
              href="/cv-nguyen-hoang-bao.pdf"
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
                icon: "📧",
                label: "Email",
                value: "anhthu@example.com",
                href: "mailto:anhthu@example.com",
                color: "from-red-400 to-pink-400"
              },
              {
                icon: "💼",
                label: "LinkedIn",
                value: "/in/anhthu",
                href: "https://linkedin.com/in/anhthu",
                color: "from-blue-400 to-blue-600"
              },
              {
                icon: "🐙",
                label: "GitHub",
                value: "@anhthu",
                href: "https://github.com/hoangbao",
                color: "from-gray-400 to-gray-600"
              },
              {
                icon: "📱",
                label: "Phone",
                value: "+84 xxx xxx xxx",
                href: "tel:+84xxxxxxxxx",
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
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-gray-500 hover:text-gray-300 transition-colors"
              whileHover={{ y: -3 }}
            >
              <span className="text-2xl">↑</span>
              <p className="text-xs mt-1">Về đầu trang</p>
            </motion.button>
          </motion.div>
        </motion.div>
      </Section>

    </div>
  );
}

export default App;