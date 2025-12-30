import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { mediaItems } from './data'
import MediaCard from './components/MediaCard'
import Intro from './components/Intro'
import ProgressBar from './components/ProgressBar'

function App() {
  const [isStarted, setIsStarted] = useState(false)
  const audioRef = useRef(null)
  const [playingVideos, setPlayingVideos] = useState(0)

  // Полоска прогресса сверху
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const startSurprise = () => {
    setIsStarted(true)
    if (audioRef.current) {
      audioRef.current.volume = 1
      audioRef.current.play().catch(e => console.log("Браузер блочит звук:", e))
    }
  }

  // Duck background music when any video with sound starts playing
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (playingVideos > 0) {
      audio.volume = 0.15
    } else {
      audio.volume = 1
    }
  }, [playingVideos])

  // Handlers passed to MediaCard so videos can notify when they play/pause
  const handleVideoPlay = () => setPlayingVideos(n => n + 1)
  const handleVideoPause = () => setPlayingVideos(n => Math.max(0, n - 1))

  return (
    <div className="min-h-screen text-white font-sans selection:bg-red-500 relative gallery-bg">
      <audio ref={audioRef} loop src={`${import.meta.env.BASE_URL}sounds/main-music.mp3`} />

      <AnimatePresence>
        {!isStarted ? (
          <Intro startSurprise={startSurprise} />
        ) : (
          <motion.div key="content" className="relative">
            <ProgressBar scaleX={scaleX} />

            <div className="max-w-3xl mx-auto px-6 py-24 flex flex-col items-center">
              <header className="h-screen flex items-center justify-center text-center px-6">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="w-full"
                >
                  <motion.h2 
                    className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
                    animate={{ backgroundPosition: ['0%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                    style={{
                      backgroundImage: 'linear-gradient(90deg, rgb(244, 63, 94), rgb(251, 146, 60))',
                      backgroundSize: '200% auto',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Лучшие моменты
                  </motion.h2>
                  <motion.p 
                    className="text-lg md:text-2xl font-light text-white mt-4 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.9 }}
                  >
                    Коллекция наших фото и видео
                  </motion.p>
                  <motion.p className="mt-12 text-gray-400 text-sm tracking-widest uppercase" animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    ↓ Листай вниз ↓
                  </motion.p>
                </motion.div>
              </header>

              {/* Рендерим нашу сотку */}
              <div className="space-y-12 md:space-y-20">
                {mediaItems.map((item, index) => (
                  <MediaCard
                    key={item.id}
                    item={item}
                    index={index}
                    onVideoPlay={handleVideoPlay}
                    onVideoPause={handleVideoPause}
                  />
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

export default App