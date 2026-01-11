import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Các items có thể kéo thả
const draggableItems = [
    {
        id: "lightstick",
        name: "Lightstick",
        emoji: "🎤",
        color: "#FFD700",
        description: "Ánh sáng từ fandom",
        position: { top: "10%", left: "5%" }
    },
    {
        id: "connection",
        name: "Kết nối",
        emoji: "🤝",
        color: "#4ECDC4",
        description: "Sức mạnh cộng đồng",
        position: { top: "50%", left: "0%" }
    },
    {
        id: "children",
        name: "Thiện nguyện",
        emoji: "👧",
        color: "#FF6B9D",
        description: "Yêu thương lan tỏa",
        position: { bottom: "15%", left: "5%" }
    },
    {
        id: "data",
        name: "Data",
        emoji: "📊",
        color: "#7C83FD",
        description: "Sức mạnh dữ liệu",
        position: { top: "10%", right: "5%" }
    },
    {
        id: "art",
        name: "Nghệ thuật",
        emoji: "🎨",
        color: "#F7A072",
        description: "Sáng tạo không giới hạn",
        position: { top: "50%", right: "0%" }
    },
    {
        id: "heart",
        name: "Trái tim",
        emoji: "💖",
        color: "#FF69B4",
        description: "Tình yêu thương",
        position: { bottom: "15%", right: "5%" }
    }
];

// Component cho từng item có thể kéo
const DraggableItem = ({ item, onDragEnd, isCollected }) => {
    const [isDragging, setIsDragging] = useState(false);

    return (
        <motion.div
            className={`absolute cursor-grab active:cursor-grabbing z-20 ${isCollected ? 'pointer-events-none' : ''}`}
            style={{
                ...item.position,
            }}
            drag
            dragConstraints={{ top: -200, left: -200, right: 200, bottom: 200 }}
            dragElastic={0.8}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(event, info) => {
                setIsDragging(false);
                onDragEnd(item.id, info);
            }}
            whileDrag={{ scale: 1.2, zIndex: 100 }}
            animate={{
                opacity: isCollected ? 0 : 1,
                scale: isCollected ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
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

    // Reset trạng thái
    const handleReset = () => {
        setCollectedItems([]);
        setIsFullyBloomed(false);
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
            {draggableItems.map(item => (
                <DraggableItem
                    key={item.id}
                    item={item}
                    onDragEnd={handleDragEnd}
                    isCollected={collectedItems.includes(item.id)}
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
                    width="200"
                    height="280"
                    viewBox="0 0 200 280"
                    className="drop-shadow-2xl"
                >
                    {/* Thân hoa */}
                    <motion.path
                        d="M100 280 Q95 220 100 160"
                        fill="none"
                        stroke="#228B22"
                        strokeWidth="8"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1 }}
                    />

                    {/* Lá trái */}
                    <motion.path
                        d="M100 240 Q60 230 50 200 Q70 210 100 220"
                        fill="#32CD32"
                        initial={{ scale: 0, originX: 1, originY: 1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    />

                    {/* Lá phải */}
                    <motion.path
                        d="M100 220 Q140 210 150 180 Q130 190 100 200"
                        fill="#32CD32"
                        initial={{ scale: 0, originX: 0, originY: 1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    />

                    {/* Cánh hoa - với animation nở dần */}
                    <g>
                        {/* Cánh sau (nền) */}
                        <motion.ellipse
                            cx="100"
                            cy="80"
                            fill={flowerColor.secondary}
                            initial={{ rx: 15, ry: 30 }}
                            animate={{
                                rx: 20 + bloomProgress * 0.3,
                                ry: 40 + bloomProgress * 0.5,
                                rotate: -15
                            }}
                            style={{ transformOrigin: "100px 120px" }}
                        />
                        <motion.ellipse
                            cx="100"
                            cy="80"
                            fill={flowerColor.secondary}
                            initial={{ rx: 15, ry: 30 }}
                            animate={{
                                rx: 20 + bloomProgress * 0.3,
                                ry: 40 + bloomProgress * 0.5,
                                rotate: 15
                            }}
                            style={{ transformOrigin: "100px 120px" }}
                        />

                        {/* Cánh trái */}
                        <motion.ellipse
                            cx="70"
                            cy="90"
                            fill={flowerColor.primary}
                            initial={{ rx: 20, ry: 35, rotate: -30 }}
                            animate={{
                                rx: 25 + bloomProgress * 0.35,
                                ry: 45 + bloomProgress * 0.6,
                                rotate: -30 - bloomProgress * 0.3,
                                x: -bloomProgress * 0.15
                            }}
                            style={{ transformOrigin: "100px 120px" }}
                        />

                        {/* Cánh phải */}
                        <motion.ellipse
                            cx="130"
                            cy="90"
                            fill={flowerColor.primary}
                            initial={{ rx: 20, ry: 35, rotate: 30 }}
                            animate={{
                                rx: 25 + bloomProgress * 0.35,
                                ry: 45 + bloomProgress * 0.6,
                                rotate: 30 + bloomProgress * 0.3,
                                x: bloomProgress * 0.15
                            }}
                            style={{ transformOrigin: "100px 120px" }}
                        />

                        {/* Cánh giữa (trước) */}
                        <motion.ellipse
                            cx="100"
                            cy="70"
                            fill={flowerColor.primary}
                            initial={{ rx: 18, ry: 40 }}
                            animate={{
                                rx: 22 + bloomProgress * 0.25,
                                ry: 50 + bloomProgress * 0.6,
                                y: -bloomProgress * 0.1
                            }}
                            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                        />

                        {/* Nhụy hoa */}
                        <motion.g
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: bloomProgress > 30 ? 1 : 0,
                                scale: bloomProgress > 30 ? 1 : 0
                            }}
                        >
                            <ellipse cx="100" cy="100" rx="8" ry="6" fill="#FFD700" />
                            <circle cx="95" cy="98" r="2" fill="#FFA500" />
                            <circle cx="105" cy="98" r="2" fill="#FFA500" />
                            <circle cx="100" cy="103" r="2" fill="#FFA500" />
                        </motion.g>
                    </g>

                    {/* Hiệu ứng lấp lánh khi nở */}
                    {bloomProgress > 50 && (
                        <g>
                            {[...Array(5)].map((_, i) => (
                                <motion.circle
                                    key={i}
                                    cx={60 + i * 20}
                                    cy={50 + (i % 2) * 30}
                                    r="3"
                                    fill="white"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        scale: [0, 1, 0]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.3
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
            <AnimatePresence>
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
            </AnimatePresence>

            {/* Reset button */}
            {collectedItems.length > 0 && (
                <motion.button
                    className="absolute bottom-16 -translate-x-1/2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-sm font-medium text-gray-600 transition-colors"
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
