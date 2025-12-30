import { motion } from 'framer-motion'

export default function Intro({ startSurprise }) {
  return (
    <motion.div 
      key="intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a0a1f 25%, #0a0f1f 50%, #1a0f0a 75%, #0f0f0f 100%)',
        backgroundSize: '400% 400%'
      }}
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div 
        className="absolute -bottom-8 right-20 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="relative z-10 text-center max-w-2xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="mb-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="text-7xl md:text-8xl mb-6 inline-block"
          >
            ❤️
          </motion.div>
        </motion.div>

        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-8xl font-black mb-6 leading-tight"
          style={{
            backgroundImage: 'linear-gradient(45deg, rgb(251, 146, 60), rgb(244, 63, 94), rgb(251, 146, 60))',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Для самой<br/>любимой
        </motion.h1>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-2xl text-gray-300 mb-10 font-light leading-relaxed"
        >
          <p className="mb-4">Я собрал для тебя эту коллекцию —</p>
          <p className="text-white font-semibold">самые лучшие моменты нашей истории</p>
          <p className="mt-4 text-gray-400">с музыкой, любовью и душой ❤️</p>
        </motion.div>

        <motion.button 
          onClick={startSurprise}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(251, 146, 60, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-4 md:py-6 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg md:text-xl rounded-full shadow-2xl border-2 border-orange-400 cursor-pointer"
        >
          НАЧАТЬ ✨
        </motion.button>

        <motion.p
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-12 text-gray-500 text-sm tracking-widest uppercase"
        >
          ↓ нажми кнопку ↓
        </motion.p>
      </div>
    </motion.div>
  )
}
