import { motion } from 'framer-motion'

export default function Intro({ startSurprise }) {
  return (
    <motion.div 
      key="intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-black"
    >
      <motion.h1 
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="text-5xl md:text-7xl font-black mb-8 text-center bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent"
      >
        ПРИВЕТ, КУКОЛКА ❤️
      </motion.h1>

      <p className="text-gray-300 mb-8 text-center max-w-xl">Я собрал для тебя эту галерею — тут наши фото, видео и маленькие подписи. Нажми кнопку и наслаждайся. Совет: положи на место `public/sounds/main-music.mp3` — он будет фоном.</p>

      <button 
        onClick={startSurprise}
        className="group relative px-12 py-6 bg-white text-black font-bold text-2xl rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl"
      >
        Открыть сюрприз
      </button>
    </motion.div>
  )
}
