import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Các items có thể kéo thả
const draggableItems = [
    {
        id: "memory",
        name: "Memory",
        emoji: "🎤",
        color: "#FFD700",
        description: "Những kỷ niệm đáng nhớ",
        position: { top: "10%", left: "5%" }
    },
    {
        id: "connection",
        name: "Connection",
        emoji: "🤝",
        color: "#4ECDC4",
        description: "Sức mạnh kết nối",
        position: { top: "50%", left: "0%" }
    },
    {
        id: "love",
        name: "Love",
        emoji: "🍋",
        color: "#FFEB3B",
        description: "Tình yêu ngọt ngào",
        position: { bottom: "15%", left: "5%" }
    },
    {
        id: "challenge",
        name: "Challenge",
        emoji: "💰",
        color: "#4CAF50",
        description: "Thử thách và cơ hội",
        position: { top: "10%", right: "5%" }
    },
    {
        id: "lesson",
        name: "Lesson",
        emoji: "📊",
        color: "#7C83FD",
        description: "Bài học từ dữ liệu",
        position: { top: "50%", right: "0%" }
    },
    {
        id: "interest",
        name: "Interest",
        emoji: "🎨",
        color: "#F7A072",
        description: "Đam mê sáng tạo",
        position: { bottom: "15%", right: "5%" }
    }
];

// Component cho từng item có thể kéo
const DraggableItem = ({ item, onDragEnd, isCollected, isResetting, itemIndex }) => {
    const [isDragging, setIsDragging] = useState(false);

    // Tính toán hướng văng ra dựa trên vị trí ban đầu (ngược lại để bay từ tâm ra)
    const getEjectDirection = () => {
        const pos = item.position;
        let x = 0, y = 0;
        // Đảo ngược hướng: items bên trái cần bay từ phải (tâm) sang trái
        if (pos.left) x = 120;  // Bay từ tâm (phải) về vị trí gốc (trái)
        if (pos.right) x = -120; // Bay từ tâm (trái) về vị trí gốc (phải)
        if (pos.top) y = 80;    // Bay từ tâm (dưới) về vị trí gốc (trên)
        if (pos.bottom) y = -80; // Bay từ tâm (trên) về vị trí gốc (dưới)
        return { x, y };
    };

    const ejectDir = getEjectDirection();
    const staggerDelay = itemIndex * 0.08; // Delay cho mỗi item

    return (
        <motion.div
            className={`absolute cursor-grab active:cursor-grabbing z-20 ${isCollected && !isResetting ? 'pointer-events-none' : ''}`}
            style={{
                ...item.position,
            }}
            drag={!isResetting}
            dragConstraints={{ top: -200, left: -200, right: 200, bottom: 200 }}
            dragElastic={0.8}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(event, info) => {
                setIsDragging(false);
                onDragEnd(item.id, info);
            }}
            whileDrag={{ scale: 1.2, zIndex: 100 }}
            initial={false}
            animate={{
                opacity: isCollected && !isResetting ? 0 : 1,
                scale: isCollected && !isResetting ? 0.3 : 1,
                x: isResetting ? [ejectDir.x, ejectDir.x * 0.3, 0] : 0,
                y: isResetting ? [ejectDir.y, ejectDir.y * 0.3, 0] : 0,
            }}
            transition={{
                duration: isResetting ? 0.7 : 0.3,
                delay: isResetting ? staggerDelay : 0,
                ease: isResetting ? [0.34, 1.56, 0.64, 1] : "easeOut", // Custom spring-like easing
                opacity: { duration: isResetting ? 0.2 : 0.3, delay: isResetting ? staggerDelay : 0 },
                scale: {
                    duration: isResetting ? 0.5 : 0.3,
                    delay: isResetting ? staggerDelay : 0,
                    ease: "backOut"
                }
            }}
        >
            <motion.div
                className="flex flex-col items-center gap-1"
                animate={{
                    y: isDragging ? 0 : [0, -8, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {/* Item card */}
                <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-3xl md:text-4xl shadow-lg backdrop-blur-sm border-2 transition-all duration-300"
                    style={{
                        background: `linear-gradient(135deg, ${item.color}40, ${item.color}20)`,
                        borderColor: `${item.color}80`,
                        boxShadow: isDragging
                            ? `0 10px 40px ${item.color}60`
                            : `0 4px 15px ${item.color}30`
                    }}
                >
                    {item.emoji}
                </div>
                {/* Label */}
                <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
                    style={{
                        background: `${item.color}30`,
                        color: item.color
                    }}
                >
                    {item.name}
                </span>
            </motion.div>
        </motion.div>
    );
};

// Component bông hoa ly chính
const LilyFlower = () => {
    const [collectedItems, setCollectedItems] = useState([]);
    const [isFullyBloomed, setIsFullyBloomed] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [windEffect, setWindEffect] = useState(0); // 0: no wind, 1-6: wind intensity based on item
    const flowerRef = useRef(null);

    // Tính toán mức độ nở hoa (0-100%)
    const bloomProgress = Math.min((collectedItems.length / draggableItems.length) * 100, 100);

    // Màu hoa thay đổi từ xanh sang hồng
    const flowerColor = {
        primary: bloomProgress < 50
            ? `hsl(${150 - bloomProgress * 2}, 70%, ${50 + bloomProgress * 0.3}%)`
            : `hsl(${340 - (bloomProgress - 50) * 0.5}, ${60 + bloomProgress * 0.4}%, ${60 + bloomProgress * 0.2}%)`,
        secondary: bloomProgress < 50
            ? `hsl(${140 - bloomProgress * 2}, 60%, ${40 + bloomProgress * 0.4}%)`
            : `hsl(${330 - (bloomProgress - 50) * 0.3}, ${50 + bloomProgress * 0.5}%, ${50 + bloomProgress * 0.3}%)`
    };

    // Xử lý khi thả item
    const handleDragEnd = (itemId, info) => {
        if (flowerRef.current) {
            const flowerRect = flowerRef.current.getBoundingClientRect();
            const dropX = info.point.x;
            const dropY = info.point.y;

            // Kiểm tra xem có thả vào vùng hoa không
            const isInFlowerZone =
                dropX >= flowerRect.left - 50 &&
                dropX <= flowerRect.right + 50 &&
                dropY >= flowerRect.top - 50 &&
                dropY <= flowerRect.bottom + 50;

            if (isInFlowerZone && !collectedItems.includes(itemId)) {
                // Trigger wind effect
                setWindEffect(prev => prev + 1);
                setTimeout(() => setWindEffect(0), 800);

                setCollectedItems(prev => {
                    const newItems = [...prev, itemId];
                    if (newItems.length === draggableItems.length) {
                        setTimeout(() => setIsFullyBloomed(true), 500);
                    }
                    return newItems;
                });
            }
        }
    };

    // Reset trạng thái với animation văng ra mượt mà
    const handleReset = () => {
        // Bắt đầu animation văng ra
        setIsResetting(true);
        setIsFullyBloomed(false);

        // Reset collectedItems ngay để items xuất hiện và bay ra
        setCollectedItems([]);

        // Đợi animation hoàn thành rồi mới tắt trạng thái resetting
        // Thời gian = duration (0.7s) + stagger delay của item cuối (5 * 0.08 = 0.4s) + buffer
        setTimeout(() => {
            setIsResetting(false);
        }, 1200);
    };

    return (
        <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center">
            {/* Hiệu ứng hào quang khi nở hoàn toàn */}
            <AnimatePresence>
                {isFullyBloomed && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                                style={{
                                    background: `hsl(${340 + i * 10}, 80%, 70%)`
                                }}
                                initial={{ x: "-50%", y: "-50%", scale: 0 }}
                                animate={{
                                    x: `calc(-50% + ${Math.cos(i * 30 * Math.PI / 180) * 150}px)`,
                                    y: `calc(-50% + ${Math.sin(i * 30 * Math.PI / 180) * 150}px)`,
                                    scale: [0, 1.5, 0],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.1
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Các items có thể kéo */}
            {draggableItems.map((item, index) => (
                <DraggableItem
                    key={item.id}
                    item={item}
                    onDragEnd={handleDragEnd}
                    isCollected={collectedItems.includes(item.id)}
                    isResetting={isResetting}
                    itemIndex={index}
                />
            ))}

            {/* Bông hoa ly chính */}
            <motion.div
                ref={flowerRef}
                className="relative z-10"
                animate={{
                    scale: isFullyBloomed ? [1, 1.1, 1] : 1,
                }}
                transition={{
                    duration: 0.5,
                    repeat: isFullyBloomed ? 2 : 0
                }}
            >
                {/* SVG Hoa Ly */}
                <svg
                    width="320"
                    height="400"
                    viewBox="-60 -100 320 400"
                    className="drop-shadow-2xl overflow-visible"
                >
                    {/* Định nghĩa gradients */}
                    <defs>
                        {/* Gradient cho cánh hoa */}
                        <linearGradient id="petalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={bloomProgress < 50 ? "#98FB98" : "#FFB6C1"} />
                            <stop offset="50%" stopColor={bloomProgress < 50 ? "#90EE90" : "#FF69B4"} />
                            <stop offset="100%" stopColor={bloomProgress < 50 ? "#228B22" : "#DB7093"} />
                        </linearGradient>

                        <linearGradient id="petalGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={bloomProgress < 50 ? "#7CFC00" : "#FFD1DC"} />
                            <stop offset="50%" stopColor={bloomProgress < 50 ? "#ADFF2F" : "#FFC0CB"} />
                            <stop offset="100%" stopColor={bloomProgress < 50 ? "#98FB98" : "#FF91A4"} />
                        </linearGradient>

                        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
                            <stop offset="70%" stopColor="#FFA500" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.3" />
                        </radialGradient>

                        <linearGradient id="stemGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#228B22" />
                            <stop offset="50%" stopColor="#32CD32" />
                            <stop offset="100%" stopColor="#228B22" />
                        </linearGradient>

                        <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#32CD32" />
                            <stop offset="50%" stopColor="#7CFC00" />
                            <stop offset="100%" stopColor="#228B22" />
                        </linearGradient>

                        {/* Filter cho hiệu ứng glow */}
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Hiệu ứng hào quang xung quanh hoa */}
                    {bloomProgress > 60 && (
                        <motion.ellipse
                            cx="100"
                            cy="80"
                            rx={80 + bloomProgress * 0.5}
                            ry={100 + bloomProgress * 0.5}
                            fill="none"
                            stroke="url(#petalGradient)"
                            strokeWidth="2"
                            strokeOpacity="0.3"
                            filter="url(#softGlow)"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    )}

                    {/* Thân hoa với gradient */}
                    <motion.path
                        d="M100 300 Q92 240 98 180 Q102 160 100 150"
                        fill="none"
                        stroke="url(#stemGradient)"
                        strokeWidth="10"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{
                            pathLength: 1,
                            d: windEffect > 0
                                ? ["M100 300 Q92 240 98 180 Q102 160 100 150",
                                    "M100 300 Q95 240 102 180 Q106 160 104 150",
                                    "M100 300 Q89 240 95 180 Q99 160 97 150",
                                    "M100 300 Q92 240 98 180 Q102 160 100 150"]
                                : "M100 300 Q92 240 98 180 Q102 160 100 150"
                        }}
                        transition={{
                            pathLength: { duration: 1.2 },
                            d: { duration: 0.6, ease: "easeInOut" }
                        }}
                    />

                    {/* Lá trái với chi tiết */}
                    <motion.g
                        initial={{ scale: 0, originX: 1, originY: 1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <path
                            d="M98 260 Q50 250 30 210 Q35 205 45 200 Q65 230 98 245 Z"
                            fill="url(#leafGradient)"
                        />
                        {/* Gân lá */}
                        <path
                            d="M95 255 Q60 235 40 210"
                            fill="none"
                            stroke="#228B22"
                            strokeWidth="1.5"
                            strokeOpacity="0.6"
                        />
                    </motion.g>

                    {/* Lá phải với chi tiết */}
                    <motion.g
                        initial={{ scale: 0, originX: 0, originY: 1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                    >
                        <path
                            d="M102 235 Q150 225 170 185 Q165 180 155 175 Q135 205 102 220 Z"
                            fill="url(#leafGradient)"
                        />
                        {/* Gân lá */}
                        <path
                            d="M105 230 Q140 210 160 185"
                            fill="none"
                            stroke="#228B22"
                            strokeWidth="1.5"
                            strokeOpacity="0.6"
                        />
                    </motion.g>

                    {/* Lá nhỏ thêm */}
                    <motion.path
                        d="M100 280 Q75 275 65 260 Q80 265 100 270"
                        fill="#32CD32"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.9 }}
                    />

                    {/* Cánh hoa - với animation nở dần */}
                    <g filter={bloomProgress > 70 ? "url(#glow)" : undefined}>
                        {/* Cánh sau xa nhất - trái */}
                        <motion.ellipse
                            cx={100 - 25 - bloomProgress * 0.15}
                            cy={80 - bloomProgress * 0.2}
                            rx={18 + bloomProgress * 0.12}
                            ry={45 + bloomProgress * 0.35}
                            fill={flowerColor.secondary}
                            opacity="0.8"
                            initial={{ scale: 0.3, rotate: -20 }}
                            animate={{
                                scale: 1,
                                rotate: windEffect > 0
                                    ? [-25 - bloomProgress * 0.15, -20 - bloomProgress * 0.15, -28 - bloomProgress * 0.15, -25 - bloomProgress * 0.15]
                                    : -25 - bloomProgress * 0.15
                            }}
                            style={{ transformOrigin: "100px 140px" }}
                            transition={{
                                duration: windEffect > 0 ? 0.6 : 0.8,
                                delay: windEffect > 0 ? 0 : 0.3,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Cánh sau xa nhất - phải */}
                        <motion.ellipse
                            cx={100 + 25 + bloomProgress * 0.15}
                            cy={80 - bloomProgress * 0.2}
                            rx={18 + bloomProgress * 0.12}
                            ry={45 + bloomProgress * 0.35}
                            fill={flowerColor.secondary}
                            opacity="0.8"
                            initial={{ scale: 0.3, rotate: 20 }}
                            animate={{
                                scale: 1,
                                rotate: windEffect > 0
                                    ? [25 + bloomProgress * 0.15, 30 + bloomProgress * 0.15, 22 + bloomProgress * 0.15, 25 + bloomProgress * 0.15]
                                    : 25 + bloomProgress * 0.15
                            }}
                            style={{ transformOrigin: "100px 140px" }}
                            transition={{
                                duration: windEffect > 0 ? 0.6 : 0.8,
                                delay: windEffect > 0 ? 0.05 : 0.35,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Cánh giữa - trái */}
                        <motion.ellipse
                            cx={100 - 18 - bloomProgress * 0.2}
                            cy={75 - bloomProgress * 0.15}
                            rx={20 + bloomProgress * 0.15}
                            ry={50 + bloomProgress * 0.4}
                            fill="url(#petalGradient)"
                            initial={{ scale: 0.3, rotate: -12 }}
                            animate={{
                                scale: 1,
                                rotate: windEffect > 0
                                    ? [-15 - bloomProgress * 0.1, -10 - bloomProgress * 0.1, -18 - bloomProgress * 0.1, -15 - bloomProgress * 0.1]
                                    : -15 - bloomProgress * 0.1
                            }}
                            style={{ transformOrigin: "100px 140px" }}
                            transition={{
                                duration: windEffect > 0 ? 0.6 : 0.8,
                                delay: windEffect > 0 ? 0.1 : 0.4,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Cánh giữa - phải */}
                        <motion.ellipse
                            cx={100 + 18 + bloomProgress * 0.2}
                            cy={75 - bloomProgress * 0.15}
                            rx={20 + bloomProgress * 0.15}
                            ry={50 + bloomProgress * 0.4}
                            fill="url(#petalGradient)"
                            initial={{ scale: 0.3, rotate: 12 }}
                            animate={{
                                scale: 1,
                                rotate: windEffect > 0
                                    ? [15 + bloomProgress * 0.1, 20 + bloomProgress * 0.1, 12 + bloomProgress * 0.1, 15 + bloomProgress * 0.1]
                                    : 15 + bloomProgress * 0.1
                            }}
                            style={{ transformOrigin: "100px 140px" }}
                            transition={{
                                duration: windEffect > 0 ? 0.6 : 0.8,
                                delay: windEffect > 0 ? 0.15 : 0.45,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Cánh trước chính giữa */}
                        <motion.ellipse
                            cx={100}
                            cy={65 - bloomProgress * 0.25}
                            rx={22 + bloomProgress * 0.18}
                            ry={55 + bloomProgress * 0.45}
                            fill="url(#petalGradient2)"
                            filter="drop-shadow(0 4px 8px rgba(0,0,0,0.15))"
                            initial={{ scale: 0.3 }}
                            animate={{
                                scale: 1,
                                rotate: windEffect > 0 ? [0, 3, -2, 0] : 0
                            }}
                            style={{ transformOrigin: "100px 140px" }}
                            transition={{
                                duration: windEffect > 0 ? 0.6 : 0.8,
                                delay: windEffect > 0 ? 0.08 : 0.5,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Đường vân cánh hoa giữa */}
                        {bloomProgress > 30 && (
                            <g opacity="0.25">
                                <motion.path
                                    d={`M100 130 Q98 90 96 ${40 - bloomProgress * 0.3}`}
                                    fill="none"
                                    stroke={bloomProgress < 50 ? "#228B22" : "#DB7093"}
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: 0.8 }}
                                />
                                <motion.path
                                    d={`M100 130 Q102 90 104 ${40 - bloomProgress * 0.3}`}
                                    fill="none"
                                    stroke={bloomProgress < 50 ? "#228B22" : "#DB7093"}
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: 0.9 }}
                                />
                                {/* Vân phụ */}
                                <motion.path
                                    d={`M100 125 Q90 95 ${85 - bloomProgress * 0.1} ${50 - bloomProgress * 0.2}`}
                                    fill="none"
                                    stroke={bloomProgress < 50 ? "#228B22" : "#DB7093"}
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: 1 }}
                                />
                                <motion.path
                                    d={`M100 125 Q110 95 ${115 + bloomProgress * 0.1} ${50 - bloomProgress * 0.2}`}
                                    fill="none"
                                    stroke={bloomProgress < 50 ? "#228B22" : "#DB7093"}
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: 1.1 }}
                                />
                            </g>
                        )}

                        {/* Nhụy hoa đẹp hơn */}
                        <motion.g
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: bloomProgress > 25 ? 1 : 0,
                                scale: bloomProgress > 25 ? 0.8 + (bloomProgress / 200) : 0
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Đế nhụy */}
                            <ellipse cx="100" cy="130" rx="15" ry="10" fill="url(#centerGlow)" />

                            {/* Các nhụy */}
                            {[...Array(6)].map((_, i) => (
                                <g key={i}>
                                    <motion.line
                                        x1="100"
                                        y1="125"
                                        x2={100 + Math.cos((i * 60 - 90) * Math.PI / 180) * (20 + bloomProgress * 0.15)}
                                        y2={125 + Math.sin((i * 60 - 90) * Math.PI / 180) * (25 + bloomProgress * 0.2)}
                                        stroke="#90EE90"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                                    />
                                    <motion.circle
                                        cx={100 + Math.cos((i * 60 - 90) * Math.PI / 180) * (20 + bloomProgress * 0.15)}
                                        cy={125 + Math.sin((i * 60 - 90) * Math.PI / 180) * (25 + bloomProgress * 0.2)}
                                        r="4"
                                        fill="#FFD700"
                                        initial={{ scale: 0 }}
                                        animate={{
                                            scale: [1, 1.2, 1],
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            delay: i * 0.2
                                        }}
                                    />
                                </g>
                            ))}

                            {/* Nhụy trung tâm */}
                            <motion.circle
                                cx="100"
                                cy="120"
                                r="6"
                                fill="#FFD700"
                                animate={{
                                    filter: ["drop-shadow(0 0 3px #FFD700)", "drop-shadow(0 0 8px #FFD700)", "drop-shadow(0 0 3px #FFD700)"]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.g>
                    </g>

                    {/* Hiệu ứng lấp lánh khi nở */}
                    {bloomProgress > 40 && (
                        <g>
                            {[...Array(8)].map((_, i) => (
                                <motion.g key={i}>
                                    <motion.circle
                                        cx={50 + Math.random() * 100}
                                        cy={20 + Math.random() * 80}
                                        r="2"
                                        fill="white"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: [0, 1, 0],
                                            scale: [0, 1.5, 0]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: i * 0.25
                                        }}
                                    />
                                    {/* Tia sáng */}
                                    <motion.path
                                        d={`M${55 + i * 12} ${30 + (i % 3) * 25} l3 -3 l-3 -3 l-3 3 z`}
                                        fill={bloomProgress < 50 ? "#ADFF2F" : "#FFB6C1"}
                                        initial={{ opacity: 0, scale: 0, rotate: 0 }}
                                        animate={{
                                            opacity: [0, 0.8, 0],
                                            scale: [0, 1, 0],
                                            rotate: [0, 180, 360]
                                        }}
                                        transition={{
                                            duration: 2.5,
                                            repeat: Infinity,
                                            delay: i * 0.3
                                        }}
                                    />
                                </motion.g>
                            ))}
                        </g>
                    )}

                    {/* Hạt phấn bay */}
                    {bloomProgress > 70 && (
                        <g>
                            {[...Array(6)].map((_, i) => (
                                <motion.circle
                                    key={`pollen-${i}`}
                                    r="2"
                                    fill="#FFD700"
                                    initial={{
                                        cx: 100,
                                        cy: 120,
                                        opacity: 0
                                    }}
                                    animate={{
                                        cx: [100, 100 + (Math.random() - 0.5) * 80],
                                        cy: [120, 120 - 50 - Math.random() * 30],
                                        opacity: [0, 1, 0],
                                        scale: [0.5, 1, 0.3]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        delay: i * 0.5,
                                        ease: "easeOut"
                                    }}
                                />
                            ))}
                        </g>
                    )}
                </svg>

                {/* Drop zone indicator */}
                <motion.div
                    className="absolute inset-0 rounded-full border-4 border-dashed pointer-events-none"
                    style={{
                        borderColor: bloomProgress > 0 ? `hsl(340, 70%, 60%)` : `hsl(150, 60%, 50%)`,
                        top: "-20%",
                        left: "-30%",
                        right: "-30%",
                        bottom: "20%"
                    }}
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.02, 1]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity
                    }}
                />
            </motion.div>

            {/* Progress indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <div className="flex gap-1">
                    {draggableItems.map((item, i) => (
                        <motion.div
                            key={item.id}
                            className="w-3 h-3 rounded-full border-2"
                            style={{
                                borderColor: item.color,
                                backgroundColor: collectedItems.includes(item.id) ? item.color : 'transparent'
                            }}
                            animate={{
                                scale: collectedItems.includes(item.id) ? [1, 1.3, 1] : 1
                            }}
                        />
                    ))}
                </div>
                <p className="text-sm text-gray-500 font-medium">
                    {collectedItems.length}/{draggableItems.length} đã tưới
                </p>
            </div>

            {/* Message khi hoàn thành */}
            {/* <AnimatePresence>
                {isFullyBloomed && (
                    <motion.div
                        className="absolute top-4 -translate-x-1/2 bg-gradient-to-r from-pink-400 to-rose-400 text-white px-6 py-3 rounded-full shadow-lg"
                        initial={{ opacity: 0, y: -20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <p className="font-bold text-center">
                            🌸 Bông hoa đã nở rộ! 🌸
                        </p>
                    </motion.div>
                )}
            </AnimatePresence> */}

            {/* Reset button */}
            {collectedItems.length > 0 && (
                <motion.button
                    className="absolute bottom-16 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-sm font-medium text-gray-600 transition-colors"
                    onClick={handleReset}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    🔄 Làm mới
                </motion.button>
            )}

            {/* Hướng dẫn */}
            {collectedItems.length === 0 && (
                <motion.p
                    className="absolute top-4 left-1/2 -translate-x-1/2 text-center text-gray-500 text-sm max-w-[250px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    ✨ Kéo các biểu tượng xung quanh vào bông hoa để "tưới nước" ✨
                </motion.p>
            )}
        </div>
    );
};

export default LilyFlower;
