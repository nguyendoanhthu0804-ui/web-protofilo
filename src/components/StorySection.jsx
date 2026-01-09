import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const StorySection = ({ title, text, image, align = "left" }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={`min-h-screen flex items-center justify-center p-10 ${align === "right" ? "flex-row-reverse" : "flex-row"
                }`}
        >
            <div className="w-1/2 p-5">
                <h2 className="text-4xl font-bold mb-4 text-blue-600">{title}</h2>
                <p className="text-xl leading-relaxed text-gray-700">{text}</p>
            </div>
            <div className="w-1/2 p-5">
                {/* Chỗ này có thể để ảnh hoặc biểu đồ */}
                <motion.img
                    src={image}
                    alt="Visual"
                    className="rounded-lg shadow-2xl"
                    whileHover={{ scale: 1.05 }} // Hiệu ứng phóng to khi di chuột
                />
            </div>
        </motion.div>
    );
};

export default StorySection;