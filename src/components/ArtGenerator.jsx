import { useState } from "react";
import { motion } from "framer-motion";

const ArtGenerator = () => {
    const [input, setInput] = useState("");

    // Hệ thống phân tích cảm xúc và tạo nghệ thuật có ý nghĩa
    const generateArtStyles = (str) => {
        if (!str) return { scale: 1, rotate: 0, borderRadius: "50%", backgroundColor: "#FFD1DC" };

        const text = str.toLowerCase().trim();

        // 1. Phân loại cảm xúc và chủ đề
        const emotionMap = {
            // Cảm xúc tích cực - Màu ấm, hình mềm mại
            positive: {
                keywords: ['hope', 'hy vọng', 'joy', 'vui', 'happy', 'hạnh phúc', 'love', 'yêu', 'peace', 'bình yên', 'dream', 'ước mơ'],
                colors: ['#FFD1DC', '#FFE5B4', '#FFDAB9'], // Pink, Peach, Pastel Orange
                scale: 1.2,
                rotate: 5,
                borderRadius: '60% 40% 60% 40%',
            },
            // Cảm xúc tiêu cực - Màu lạnh, góc cạnh hơn
            negative: {
                keywords: ['sad', 'buồn', 'pain', 'đau', 'fear', 'sợ', 'anxiety', 'lo âu', 'grief', 'đau khổ', 'loss', 'mất mát'],
                colors: ['#B0C4DE', '#778899', '#4682B4'], // Light Steel Blue, Light Slate Gray
                scale: 0.9,
                rotate: -15,
                borderRadius: '30% 70% 30% 70%',
            },
            // Tự nhiên - Màu xanh lá, hình organic
            nature: {
                keywords: ['rain', 'mưa', 'sun', 'mặt trời', 'tree', 'cây', 'flower', 'hoa', 'ocean', 'đại dương', 'sky', 'bầu trời', 'earth', 'đất'],
                colors: ['#90EE90', '#87CEEB', '#98D8C8'], // Light Green, Sky Blue, Seafoam
                scale: 1.1,
                rotate: 10,
                borderRadius: '50% 50% 45% 55%',
            },
            // Năng lượng mạnh - Màu sống động, chuyển động nhiều
            energetic: {
                keywords: ['fire', 'lửa', 'energy', 'năng lượng', 'passion', 'đam mê', 'power', 'sức mạnh', 'courage', 'dũng cảm', 'fight', 'chiến đấu'],
                colors: ['#FF6347', '#FF4500', '#FFA500'], // Tomato, Orange Red, Orange
                scale: 1.3,
                rotate: 25,
                borderRadius: '40% 60% 50% 50%',
            },
            // Kết nối & Cộng đồng - Màu tím, hình cân bằng
            connection: {
                keywords: ['connection', 'kết nối', 'together', 'cùng nhau', 'community', 'cộng đồng', 'family', 'gia đình', 'friend', 'bạn bè', 'empathy', 'thấu cảm'],
                colors: ['#CCCCFF', '#DDA0DD', '#E6E6FA'], // Periwinkle, Plum, Lavender
                scale: 1.15,
                rotate: 0,
                borderRadius: '50% 50% 50% 50%',
            },
            // Sáng tạo & Nghệ thuật - Màu đa dạng, hình độc đáo
            creative: {
                keywords: ['art', 'nghệ thuật', 'create', 'sáng tạo', 'imagine', 'tưởng tượng', 'express', 'thể hiện', 'beauty', 'vẻ đẹp', 'color', 'màu sắc'],
                colors: ['#FFD700', '#FF69B4', '#9370DB'], // Gold, Hot Pink, Medium Purple
                scale: 1.25,
                rotate: 20,
                borderRadius: '45% 55% 60% 40%',
            },
        };

        // 2. Tìm category phù hợp nhất
        let matchedCategory = null;
        let maxMatches = 0;

        for (const [category, data] of Object.entries(emotionMap)) {
            const matches = data.keywords.filter(keyword => text.includes(keyword)).length;
            if (matches > maxMatches) {
                maxMatches = matches;
                matchedCategory = data;
            }
        }

        // 3. Nếu không match keyword nào, dùng thuật toán dựa trên đặc điểm của text
        if (!matchedCategory) {
            // Phân tích độ dài và ký tự đặc biệt
            const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(text);
            const wordCount = text.split(/\s+/).length;
            const charCount = text.length;

            // Text ngắn gọn -> đơn giản, tĩnh
            // Text dài -> phức tạp, động
            const intensity = Math.min(charCount / 20, 1.5);

            return {
                scale: 0.9 + intensity * 0.4,
                rotate: hasSpecialChars ? (charCount % 30) - 15 : (charCount % 20) - 10,
                borderRadius: `${40 + (charCount % 20)}% ${60 - (charCount % 20)}% ${50 + (wordCount % 15)}% ${50 - (wordCount % 15)}%`,
                backgroundColor: `hsl(${charCount * 7 % 360}, 60%, 75%)`, // Dynamic color based on char
            };
        }

        // 4. Áp dụng style từ category đã match
        const colorIndex = text.length % matchedCategory.colors.length;

        return {
            scale: matchedCategory.scale,
            rotate: matchedCategory.rotate,
            borderRadius: matchedCategory.borderRadius,
            backgroundColor: matchedCategory.colors[colorIndex],
        };
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-md">
            {/* Khung tranh kết quả */}
            <div className="w-64 h-64 border-4 border-charcoal bg-white flex items-center justify-center overflow-hidden shadow-2xl relative">
                <div className="absolute top-2 left-2 text-xs font-mono text-gray-400">Living Gallery Preview</div>
                <motion.div
                    animate={generateArtStyles(input)}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="w-32 h-32 bg-pastel-pink mix-blend-multiply opacity-80 blur-sm"
                />
                {/* Layer 2 để tạo chiều sâu */}
                <motion.div
                    animate={{ ...generateArtStyles(input), rotate: -generateArtStyles(input).rotate }}
                    className="absolute w-24 h-24 bg-warm-yellow mix-blend-multiply opacity-80 rounded-full"
                />
            </div>

            {/* Ô nhập liệu */}
            <div className="flex flex-col w-full">
                <label className="text-charcoal font-mono text-sm mb-2">Nhập cảm xúc hoặc thông điệp của bạn:</label>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ví dụ: Hope, Rain, Connection..."
                    className="p-3 border-2 border-charcoal rounded-none focus:outline-none focus:bg-warm-yellow transition font-mono"
                />
            </div>
        </div>
    );
};

export default ArtGenerator;