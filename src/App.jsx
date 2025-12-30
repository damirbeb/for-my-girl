import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { mediaItems } from './data'

function App() {
  const [isStarted, setIsStarted] = useState(false)
  const audioRef = useRef(null)

  // Полоска прогресса сверху (чтобы понимала, сколько еще до конца сотки)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const startSurprise = () => {
    setIsStarted(true)
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Браузер блочит звук:", e))
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-500">
      {/* Скрытый плеер */}
      <audio ref={audioRef} loop src="/sounds/main-music.mp3" />

      <AnimatePresence>
        {!isStarted ? (
          <motion.div 
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-black"
          >
            <motion.h1 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="text-5xl md:text-7xl font-black mb-12 text-center bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent"
            >
              ПРИВЕТ, КУКОЛКА ❤️
            </motion.h1>
            <button 
              onClick={startSurprise}
              className="group relative px-12 py-6 bg-white text-black font-bold text-2xl rounded-full transition-all hover:scale-110 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.3)]"
            >
              ЖМИ СЮДА
            </button>
          </motion.div>
        ) : (
          <motion.div key="content" className="relative">
            {/* Полоска прогресса */}
            <motion.div className="fixed top-0 left-0 right-0 h-2 bg-red-600 origin-left z-[100]" style={{ scaleX }} />

            <div className="max-w-4xl mx-auto px-4 py-20">
              <header className="h-screen flex items-center justify-center text-center">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <h2 className="text-3xl md:text-5xl font-light italic text-gray-400">
                    «Тони Старк собрал мини-реактор в яме... <br/>
                    <span className="text-white not-italic font-bold">а я собрал это для тебя»</span>
                  </h2>
                  <p className="mt-10 animate-bounce text-gray-600 text-sm tracking-widest uppercase">Листай вниз</p>
                </motion.div>
              </header>

              {/* Рендерим нашу сотку */}
              <div className="space-y-32 md:space-y-64">
                {mediaItems.map((item, index) => (
                  <MediaCard key={item.id} item={item} index={index} />
                ))}
              </div>

              <footer className="h-screen flex flex-col items-center justify-center text-center">
                <motion.h2 
                  whileInView={{ scale: [0.9, 1.1, 1] }}
                  className="text-5xl md:text-8xl font-black mb-10"
                >
                  ЛЮБЛЮ ТЕБЯ
                </motion.h2>
                <p className="text-gray-500">С Новым Годом, вредина ❤️</p>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Отдельный компонент для карточки, чтобы не лагало
function MediaCard({ item, index }) {
  const isEven = index % 2 === 0
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, type: "spring" }}
      className={`flex flex-col ${isEven ? 'items-start' : 'items-end'}`}
    >
      <div className="relative group max-w-[90%] md:max-w-[70%]">
        {item.type === 'photo' ? (
          <motion.img 
            whileHover={{ scale: 1.05 }}
            src={item.src} 
            alt={item.caption}
            className="rounded-2xl shadow-2xl border border-white/10"
          />
        ) : (
          <video 
            src={item.src} 
            autoPlay loop muted playsInline 
            className="rounded-2xl shadow-2xl border border-white/10"
          />
        )}
        
        {item.caption && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`mt-4 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 ${isEven ? 'text-left' : 'text-right'}`}
          >
            <p className="text-lg md:text-xl font-medium text-gray-200">{item.caption}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default App