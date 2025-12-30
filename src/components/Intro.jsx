import { motion } from 'framer-motion'

export default function Intro({ startSurprise }) {
  return (
    <motion.div 
      key="intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-black via-neutral-900 to-slate-900"
    >
      <motion.h1 
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="text-5xl md:text-7xl font-black mb-4 text-center bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent"
      >
        Для самой любимой ❤️
      </motion.h1>

      <p className="text-gray-300 mb-8 text-center max-w-lg">Я подготовил для тебя эту галерею — лучшие моменты, аккуратно и с музыкой. Нажми кнопку, чтобы открыть.</p>

      <button 
        onClick={startSurprise}
        className="group relative px-12 py-5 bg-white text-black font-bold text-lg rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl"
      >
        ОТКРЫТЬ
      </button>
    </motion.div>
  )
}
