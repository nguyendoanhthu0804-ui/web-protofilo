import { useEffect, useRef } from 'react';

const CodeRain = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Cài đặt kích thước canvas full màn hình cha
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Các ký tự sẽ rơi (Dùng số 0, 1 và các ký tự toán học cho đúng chất Data Science)
        const characters = '010101∑∏∆∫µ∞≈≠≤≥';
        const fontSize = 16;
        const columns = canvas.width / fontSize;

        // Mảng lưu vị trí Y của các giọt mưa (mỗi cột 1 giọt)
        const drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const draw = () => {
            // Tô màu đen mờ phủ lên frame cũ để tạo hiệu ứng vệt mờ (trail effect)
            // Thay đổi 0.05 để vệt mờ dài hơn hoặc ngắn hơn
            ctx.fillStyle = 'rgba(15, 23, 42, 0.1)'; // Màu nền tối (Slate-900) có độ trong suốt
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Màu chữ (Dùng màu xanh buồn/lạnh cho hợp chủ đề Lũ lụt)
            ctx.fillStyle = '#6495ED'; // CornflowerBlue
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Chọn ký tự ngẫu nhiên
                const text = characters.charAt(Math.floor(Math.random() * characters.length));

                // Vẽ ký tự
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset về đầu trang ngẫu nhiên để mưa không rơi đều chằn chặn
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                // Tăng tọa độ Y
                drops[i]++;
            }
        };

        // Tốc độ render (33ms ~ 30fps)
        const interval = setInterval(draw, 33);

        // Xử lý khi thay đổi kích thước màn hình
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        // Dọn dẹp bộ nhớ khi component bị hủy
        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
        />
    );
};

export default CodeRain;