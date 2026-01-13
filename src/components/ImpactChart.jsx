import { motion } from "framer-motion";
import { useState } from "react";

const ImpactChart = () => {
    const [activeChart, setActiveChart] = useState(0);

    // Data cho Pie Chart - Lĩnh vực tài trợ
    const pieData = [
        { label: 'Giáo dục', value: 45, color: '#4A7DC4', startAngle: 0 },
        { label: 'Khác', value: 25, color: '#E8944A', startAngle: 162 },
        { label: 'Teabreak', value: 10, color: '#7B8794', startAngle: 252 },
        { label: 'Văn phòng phẩm', value: 8, color: '#5BC0DE', startAngle: 288 },
        { label: 'Ngân hàng', value: 5, color: '#9B59B6', startAngle: 316.8 },
        { label: 'Truyền thông', value: 7, color: '#27AE60', startAngle: 334.8 },
    ];

    // Data cho Bar Chart - Số tiền tài trợ
    const barData = [
        { label: 'Giáo dục', value: 45500000, color: '#4A7DC4', displayValue: '45.5M' },
        { label: 'Khác', value: 2100000, color: '#E8944A', displayValue: '2.1M' },
    ];

    // Tính toán path cho pie slice với hiệu ứng vẽ tay
    const createPieSlice = (startAngle, endAngle, radius, cx, cy) => {
        const start = polarToCartesian(cx, cy, radius, endAngle);
        const end = polarToCartesian(cx, cy, radius, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

        // Thêm độ random nhỏ cho hiệu ứng vẽ tay
        const wobble = () => (Math.random() - 0.5) * 2;

        return `M ${cx + wobble()} ${cy + wobble()} L ${start.x + wobble()} ${start.y + wobble()} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x + wobble()} ${end.y + wobble()} Z`;
    };

    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-periwinkle shadow-lg w-full max-w-md">
            {/* SVG Filter cho hiệu ứng viền thô như vẽ tay */}
            <svg className="absolute w-0 h-0">
                <defs>
                    <filter id="roughEdge">
                        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                    <filter id="handDrawn">
                        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
            </svg>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-4">
                {['Lĩnh vực', 'Số tiền'].map((tab, i) => (
                    <motion.button
                        key={tab}
                        onClick={() => setActiveChart(i)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeChart === i
                            ? 'bg-periwinkle text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {tab}
                    </motion.button>
                ))}
            </div>

            {/* Chart Container */}
            <div className="relative w-full min-h-[280px]">
                {/* Pie Chart - Lĩnh vực tài trợ */}
                {activeChart === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        <h3
                            className="text-charcoal font-bold mb-3 text-center"
                        >
                            📊 Lĩnh vực tài trợ
                        </h3>

                        <div className="flex flex-col md:flex-row items-center gap-4">
                            {/* Pie Chart SVG */}
                            <svg width="160" height="160" viewBox="0 0 160 160" style={{ filter: 'url(#handDrawn)' }}>
                                {pieData.map((slice, index) => {
                                    const endAngle = slice.startAngle + (slice.value / 100) * 360;
                                    return (
                                        <motion.path
                                            key={slice.label}
                                            d={createPieSlice(slice.startAngle, endAngle, 70, 80, 80)}
                                            fill={slice.color}
                                            stroke="#fff"
                                            strokeWidth="2"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.1, duration: 0.5 }}
                                            style={{
                                                transformOrigin: '80px 80px',
                                                filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.2))'
                                            }}
                                        />
                                    );
                                })}
                                {/* Hiệu ứng texture vẽ tay */}
                                <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1" strokeDasharray="3,3" />
                            </svg>

                            {/* Legend */}
                            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                                {pieData.map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        className="flex items-center gap-1.5"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                    >
                                        <div
                                            className="w-3 h-3 rounded-sm"
                                            style={{
                                                backgroundColor: item.color,
                                                transform: `rotate(${Math.random() * 6 - 3}deg)`,
                                                borderRadius: '2px 4px 3px 5px'
                                            }}
                                        />
                                        <span style={{ fontFamily: "'Caveat', cursive", fontSize: '13px' }}>
                                            {item.label}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Bar Chart - Số tiền tài trợ */}
                {activeChart === 1 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        <h3
                            className="text-charcoal font-bold mb-3 text-center"
                        >
                            💰 Số tiền tài trợ (VNĐ)
                        </h3>

                        <div className="flex items-end justify-center gap-8 h-48 w-full px-4">
                            {barData.map((bar, index) => {
                                const maxValue = 45500000;
                                const heightPercent = (bar.value / maxValue) * 100;

                                return (
                                    <div key={bar.label} className="flex flex-col items-center gap-2">
                                        {/* Value label */}
                                        <motion.span
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 + index * 0.2 }}
                                            className="text-sm font-bold"
                                            style={{
                                                fontFamily: "'Caveat', cursive",
                                                fontSize: '16px',
                                                color: bar.color
                                            }}
                                        >
                                            {bar.displayValue}
                                        </motion.span>

                                        {/* Bar */}
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${heightPercent * 1.5}px` }}
                                            transition={{ duration: 1, delay: index * 0.2, type: "spring" }}
                                            className="w-16 relative overflow-hidden"
                                            style={{
                                                background: `linear-gradient(135deg, ${bar.color} 0%, ${bar.color}dd 50%, ${bar.color}bb 100%)`,
                                                borderRadius: '6px 10px 3px 5px',
                                                transform: `rotate(${index === 0 ? 0.5 : -0.5}deg)`,
                                                boxShadow: `
                                                    inset 3px 3px 8px rgba(255,255,255,0.3),
                                                    inset -2px -2px 6px rgba(0,0,0,0.1),
                                                    3px 4px 8px rgba(0,0,0,0.2)
                                                `,
                                                border: `2px solid ${bar.color}88`,
                                                filter: 'url(#roughEdge)'
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
                                                            rgba(255,255,255,0.15) 1px,
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
                                        </motion.div>

                                        {/* Label */}
                                        <span
                                            className="text-xs text-gray-600 text-center"
                                            style={{ fontFamily: "'Caveat', cursive", fontSize: '14px' }}
                                        >
                                            {bar.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Total */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="mt-2 text-center"
                        >
                            <span
                                className="text-gray-500 text-md"
                            >
                                Tổng: <span className="font-bold text-periwinkle">47.6M VNĐ</span>
                            </span>
                        </motion.div>
                    </motion.div>
                )}
            </div>

            <p
                className="mt-3 text-xs text-charcoal italic text-center max-w-[280px]"
            >
                "Phân tích dữ liệu tài trợ giúp Entelier kết nối hiệu quả hơn với nhà tài trợ."
            </p>
        </div>
    );
};

export default ImpactChart;