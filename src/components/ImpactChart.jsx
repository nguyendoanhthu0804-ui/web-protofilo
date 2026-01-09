import { motion } from "framer-motion";

const ImpactChart = () => {
    return (
        <div className="flex flex-col items-center justify-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-periwinkle shadow-lg">
            <h3 className="text-charcoal font-bold mb-4">Hiệu quả gây quỹ (Fundraising)</h3>
            <div className="flex items-end gap-8 h-48">
                {/* Cột Trước khi áp dụng Data */}
                <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-12 bg-gray-300 rounded-t-lg relative group">
                        <span className="absolute -top-6 text-sm text-gray-500">Gốc</span>
                    </div>
                    <span className="text-xs font-mono text-gray-500">Trước</span>
                </div>

                {/* Cột Sau khi áp dụng Data - Animated */}
                <div className="flex flex-col items-center gap-2">
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }} // Full chiều cao cha (h-48 ~ 192px)
                        transition={{ duration: 1.5, type: "spring" }}
                        className="w-16 bg-periwinkle rounded-t-lg relative flex items-center justify-center"
                    >
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="font-bold text-white text-lg"
                        >
                            +256%
                        </motion.span>
                    </motion.div>
                    <span className="text-xs font-mono text-periwinkle font-bold">Sau (Data-Driven)</span>
                </div>
            </div>
            <p className="mt-4 text-xs text-charcoal italic text-center max-w-[200px]">
                "Áp dụng phân tích dữ liệu vào hồ sơ nhà tài trợ Entelier."
            </p>
        </div>
    );
};

export default ImpactChart;