import { motion } from "framer-motion";
import { useState, useMemo } from "react";

const ImpactChart = () => {
    const [activeChart, setActiveChart] = useState(0);

    // Data cho Pie Chart - Lĩnh vực tài trợ
    const pieData = [
        { label: 'Education', value: 45, color: '#4A7DC4', startAngle: 0, hatchAngle: 45 },
        { label: 'Others', value: 25, color: '#E8944A', startAngle: 162, hatchAngle: -45 },
        { label: 'Teabreak', value: 10, color: '#7B8794', startAngle: 252, hatchAngle: 0 },
        { label: 'Office Supplies', value: 8, color: '#5BC0DE', startAngle: 288, hatchAngle: 90 },
        { label: 'Banking', value: 5, color: '#9B59B6', startAngle: 316.8, hatchAngle: 30 },
        { label: 'Media', value: 7, color: '#27AE60', startAngle: 334.8, hatchAngle: -30 },
    ];

    // Data cho Bar Chart - Số tiền tài trợ
    const barData = [
        { label: 'Education', value: 45500000, color: '#4A7DC4', displayValue: '45.5M' },
        { label: 'Others', value: 2100000, color: '#E8944A', displayValue: '2.1M' },
    ];

    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };

    // Tạo path pie slice với đường viền sketchy
    const createSketchyPieSlice = (startAngle, endAngle, radius, cx, cy, seed = 0) => {
        const points = [];
        const segments = Math.max(20, Math.floor((endAngle - startAngle) / 5));

        // Tạo các điểm trên arc với độ lắc nhẹ
        for (let i = 0; i <= segments; i++) {
            const angle = startAngle + (endAngle - startAngle) * (i / segments);
            const rad = (angle - 90) * Math.PI / 180;
            const wobble = Math.sin(seed + i * 1.2) * 1.5 + Math.cos(seed + i * 0.8) * 1;
            const r = radius + wobble;
            points.push({
                x: cx + r * Math.cos(rad),
                y: cy + r * Math.sin(rad)
            });
        }

        // Tạo path
        let path = `M ${cx} ${cy}`;
        path += ` L ${points[0].x} ${points[0].y}`;

        for (let i = 1; i < points.length; i++) {
            path += ` L ${points[i].x} ${points[i].y}`;
        }

        path += ' Z';
        return path;
    };

    // Pre-generate paths
    const piePaths = useMemo(() => {
        return pieData.map((slice, index) => {
            const endAngle = slice.startAngle + (slice.value / 100) * 360;
            return createSketchyPieSlice(slice.startAngle, endAngle, 68, 85, 85, index * 15);
        });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-periwinkle shadow-lg w-full max-w-md">
            {/* SVG Patterns và Filters */}
            <svg className="absolute w-0 h-0">
                <defs>
                    {/* Hatching patterns cho từng slice với góc khác nhau */}
                    {pieData.map((slice, index) => (
                        <pattern
                            key={`hatch-${index}`}
                            id={`hatch-${index}`}
                            patternUnits="userSpaceOnUse"
                            width="6"
                            height="6"
                            patternTransform={`rotate(${slice.hatchAngle})`}
                        >
                            <line
                                x1="0" y1="0"
                                x2="0" y2="6"
                                stroke={slice.color}
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </pattern>
                    ))}

                    {/* Cross-hatch pattern cho legend */}
                    {pieData.map((slice, index) => (
                        <pattern
                            key={`crosshatch-${index}`}
                            id={`crosshatch-${index}`}
                            patternUnits="userSpaceOnUse"
                            width="5"
                            height="5"
                        >
                            <line x1="0" y1="0" x2="5" y2="5" stroke={slice.color} strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="5" y1="0" x2="0" y2="5" stroke={slice.color} strokeWidth="1.5" strokeLinecap="round" />
                        </pattern>
                    ))}

                    {/* Filter cho hiệu ứng sketchy nhẹ */}
                    <filter id="sketchy">
                        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.8" />
                    </filter>
                </defs>
            </svg>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-4">
                {['Field', 'Amount'].map((tab, i) => (
                    <motion.button
                        key={tab}
                        onClick={() => setActiveChart(i)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeChart === i
                            ? 'bg-periwinkle text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    // style={{ fontFamily: "'Caveat', cursive", fontSize: '15px' }}
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
                        // style={{ fontFamily: "'Caveat', cursive", fontSize: '20px' }}
                        >
                            📊 Funding
                        </h3>

                        <div className="flex flex-col md:flex-row items-center gap-5">
                            {/* Pie Chart SVG với hatching */}
                            <svg width="180" height="180" viewBox="0 0 170 170" className="overflow-visible">
                                {/* Vòng tròn nền */}
                                <circle
                                    cx="85" cy="85" r="72"
                                    fill="none"
                                    stroke="rgba(0,0,0,0.06)"
                                    strokeWidth="1"
                                    strokeDasharray="3,5"
                                />

                                {pieData.map((slice, index) => (
                                    <motion.g key={slice.label}>
                                        {/* Lớp nền màu nhạt */}
                                        <motion.path
                                            d={piePaths[index]}
                                            fill={slice.color}
                                            fillOpacity="0.25"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.08, duration: 0.4 }}
                                            style={{ transformOrigin: '85px 85px' }}
                                        />

                                        {/* Lớp hatching pattern */}
                                        <motion.path
                                            d={piePaths[index]}
                                            fill={`url(#hatch-${index})`}
                                            fillOpacity="0.9"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.08 + 0.1, duration: 0.4 }}
                                            style={{ transformOrigin: '85px 85px' }}
                                        />

                                        {/* Viền sketchy */}
                                        <motion.path
                                            d={piePaths[index]}
                                            fill="none"
                                            stroke={slice.color}
                                            strokeWidth="2"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ delay: index * 0.08 + 0.2, duration: 0.5 }}
                                            style={{
                                                transformOrigin: '85px 85px',
                                                filter: 'url(#sketchy)'
                                            }}
                                        />
                                    </motion.g>
                                ))}

                                {/* Tâm điểm */}
                                <motion.circle
                                    cx="85" cy="85" r="2.5"
                                    fill="rgba(0,0,0,0.3)"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.7 }}
                                />
                            </svg>

                            {/* Legend với cross-hatch */}
                            <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
                                {pieData.map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        className="flex items-center gap-2"
                                        initial={{ opacity: 0, x: 15 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + index * 0.06 }}
                                    >
                                        {/* Ô màu với hatching */}
                                        <svg width="16" height="16" viewBox="0 0 16 16">
                                            <rect
                                                x="1" y="1" width="14" height="14"
                                                fill={item.color}
                                                fillOpacity="0.2"
                                                rx="2"
                                            />
                                            <rect
                                                x="1" y="1" width="14" height="14"
                                                fill={`url(#crosshatch-${index})`}
                                                rx="2"
                                            />
                                            <rect
                                                x="1" y="1" width="14" height="14"
                                                fill="none"
                                                stroke={item.color}
                                                strokeWidth="1.5"
                                                rx="2"
                                            />
                                        </svg>
                                        <span style={{ fontSize: '13px', color: '#444' }}>
                                            {item.label} <span className="text-gray-400">({item.value}%)</span>
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
                            style={{ fontSize: '20px' }}
                        >
                            💰 Funding Amount (VND)
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

                                        {/* Bar với hatching */}
                                        <svg
                                            width="64"
                                            height={heightPercent * 1.5}
                                            viewBox={`0 0 64 ${heightPercent * 1.5}`}
                                            className="overflow-visible"
                                        >
                                            <defs>
                                                <pattern
                                                    id={`barHatch-${index}`}
                                                    patternUnits="userSpaceOnUse"
                                                    width="6"
                                                    height="6"
                                                    patternTransform={`rotate(${index === 0 ? 45 : -45})`}
                                                >
                                                    <line
                                                        x1="0" y1="0"
                                                        x2="0" y2="6"
                                                        stroke={bar.color}
                                                        strokeWidth="2.5"
                                                        strokeLinecap="round"
                                                    />
                                                </pattern>
                                            </defs>

                                            {/* Nền nhạt */}
                                            <motion.rect
                                                x="2" y="0"
                                                width="60" height={heightPercent * 1.5}
                                                fill={bar.color}
                                                fillOpacity="0.2"
                                                rx="4"
                                                initial={{ scaleY: 0 }}
                                                animate={{ scaleY: 1 }}
                                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                                style={{ transformOrigin: 'bottom' }}
                                            />

                                            {/* Hatching */}
                                            <motion.rect
                                                x="2" y="0"
                                                width="60" height={heightPercent * 1.5}
                                                fill={`url(#barHatch-${index})`}
                                                rx="4"
                                                initial={{ scaleY: 0 }}
                                                animate={{ scaleY: 1 }}
                                                transition={{ duration: 0.8, delay: index * 0.2 + 0.1 }}
                                                style={{ transformOrigin: 'bottom' }}
                                            />

                                            {/* Viền */}
                                            <motion.rect
                                                x="2" y="0"
                                                width="60" height={heightPercent * 1.5}
                                                fill="none"
                                                stroke={bar.color}
                                                strokeWidth="2"
                                                rx="4"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                                                style={{ filter: 'url(#sketchy)' }}
                                            />
                                        </svg>

                                        {/* Label */}
                                        <span
                                            className="text-xs text-gray-600 text-center"
                                            style={{ fontSize: '14px' }}
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
                                className="text-gray-500"
                                style={{ fontSize: '15px' }}
                            >
                                Total: <span className="font-bold text-periwinkle">47.6M VND</span>
                            </span>
                        </motion.div>
                    </motion.div>
                )}
            </div>

            <p
                className="mt-3 text-xs text-charcoal italic text-center max-w-[280px]"
            >
                "Data analysis helps my projects connect more effectively with sponsors."
            </p>
        </div>
    );
};

export default ImpactChart;