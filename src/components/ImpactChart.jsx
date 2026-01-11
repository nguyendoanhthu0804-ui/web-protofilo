import { motion } from "framer-motion";

const ImpactChart = () => {
    // Style cho hiệu ứng vẽ tay bằng bút sáp/bút chì màu
    const crayonStyle = {
        background: `
            repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                rgba(255,255,255,0.1) 2px,
                rgba(255,255,255,0.1) 4px
            ),
            repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 2px,
                rgba(0,0,0,0.03) 2px,
                rgba(0,0,0,0.03) 4px
            )
        `,
        filter: 'url(#roughEdge)',
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-periwinkle shadow-lg">
            {/* SVG Filter cho hiệu ứng viền thô như vẽ tay */}
            <svg className="absolute w-0 h-0">
                <defs>
                    <filter id="roughEdge">
                        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                    <filter id="pencilTexture">
                        <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" result="noise" />
                        <feComposite in="SourceGraphic" in2="noise" operator="in" />
                    </filter>
                </defs>
            </svg>

            <h3 className="text-charcoal font-bold mb-4" style={{ fontFamily: "'Caveat', cursive" }}>
                Hiệu quả gây quỹ (Fundraising)
            </h3>
            <div className="flex items-end gap-8 h-48">
                {/* Cột Trước khi áp dụng Data */}
                <div className="flex flex-col items-center gap-2">
                    <div
                        className="w-16 h-12 relative group"
                        style={{
                            background: `
                                linear-gradient(135deg, #ffb88c 0%, #f7a072 30%, #e88a5a 60%, #ffcc99 100%)
                            `,
                            borderRadius: '4px 8px 2px 6px',
                            transform: 'rotate(-0.5deg)',
                            boxShadow: `
                                inset 2px 2px 4px rgba(255,255,255,0.4),
                                inset -2px -2px 4px rgba(180,100,50,0.2),
                                2px 3px 6px rgba(0,0,0,0.15)
                            `,
                            border: '2px solid rgba(230,140,80,0.4)',
                            ...crayonStyle
                        }}
                    >
                        <span
                            className="absolute -top-7 left-1/2 -translate-x-1/2 text-sm text-orange-400"
                            style={{ fontFamily: "'Caveat', cursive", fontSize: '16px', fontWeight: 600 }}
                        >
                            Gốc
                        </span>
                    </div>
                    <span
                        className="text-xs text-orange-400"
                        style={{ fontFamily: "'Caveat', cursive", fontSize: '14px', fontWeight: 500 }}
                    >
                        Trước
                    </span>
                </div>

                {/* Cột Sau khi áp dụng Data - Animated */}
                <div className="flex flex-col items-center gap-2">
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: 160 }}
                        transition={{ duration: 1.5, type: "spring" }}
                        className="w-16 relative flex items-end justify-center overflow-hidden"
                        style={{
                            background: `
                                linear-gradient(135deg, #7dd3c0 0%, #4ecdc4 30%, #26a69a 60%, #81e6d9 100%)
                            `,
                            borderRadius: '6px 10px 3px 5px',
                            transform: 'rotate(0.8deg)',
                            boxShadow: `
                                inset 3px 3px 8px rgba(255,255,255,0.5),
                                inset -2px -2px 6px rgba(0,100,80,0.15),
                                3px 4px 8px rgba(0,0,0,0.2)
                            `,
                            border: '2px solid rgba(78, 205, 196, 0.5)',
                            ...crayonStyle
                        }}
                    >
                        {/* Texture overlay cho hiệu ứng bút sáp */}
                        <div
                            className="absolute inset-0 opacity-30"
                            style={{
                                background: `
                                    repeating-linear-gradient(
                                        90deg,
                                        transparent 0px,
                                        rgba(255,255,255,0.1) 1px,
                                        transparent 2px,
                                        transparent 4px
                                    ),
                                    repeating-linear-gradient(
                                        0deg,
                                        transparent 0px,
                                        rgba(0,0,0,0.05) 1px,
                                        transparent 2px,
                                        transparent 3px
                                    )
                                `
                            }}
                        />
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="font-bold text-white text-lg mb-2 relative z-10"
                            style={{
                                fontFamily: "'Caveat', cursive",
                                fontSize: '22px',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 1px rgba(255,255,255,0.2)',
                                color: '#60dbd1ff'
                            }}
                        >
                            +256%
                        </motion.span>
                    </motion.div>
                    <span
                        className="text-xs text-teal-500 font-bold"
                        style={{ fontFamily: "'Caveat', cursive", fontSize: '14px' }}
                    >
                        Sau (Data-Driven)
                    </span>
                </div>
            </div>
            <p className="mt-4 text-xs text-charcoal italic text-center max-w-[200px]">
                "Áp dụng phân tích dữ liệu vào hồ sơ nhà tài trợ Entelier."
            </p>
        </div>
    );
};

export default ImpactChart;