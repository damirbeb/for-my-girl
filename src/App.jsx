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
      audioRef.current.volume = 0.3
      audioRef.current.play().catch(e => console.log("Браузер блочит звук:", e))
    }
  }

  // Duck background music when any video with sound starts playing
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (playingVideos > 0) {
      audio.volume = 0.1
    } else {
      audio.volume = 0.3
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

            <div className="w-full flex flex-col items-center">
              <header className="h-screen w-full flex flex-col items-center justify-center text-center px-4">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="w-full flex justify-center items-center" // Контейнер-флекс для центрирования
                >
                  <motion.h2 
                    className="text-5xl sm:text-7xl md:text-8xl lg:text-[140px] font-black leading-tight text-center w-full"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, #fff, #ffccd5, #fff)',
                      backgroundSize: '200% auto',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Лучшие моменты
                  </motion.h2>
                </motion.div>
              </header>

              {/* Рендерим нашу сотку */}
              <div className="w-full max-w-3xl space-y-20 md:space-y-32 mx-auto">
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

              <footer className="h-screen w-full flex flex-col items-center justify-center text-center px-4">
                <motion.div className="w-full flex flex-col items-center justify-center">
                  <motion.h2 
                    className="text-6xl sm:text-8xl md:text-9xl font-black mb-8 text-center w-full"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, #f43f5e, #fb923c, #f43f5e)', 
                      backgroundSize: '200% auto',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    ЛЮБЛЮ ТЕБЯ
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    // УБРАЛ ВСЕ ЛИШНИЕ КЛАССЫ, ОСТАВИЛ ТОЛЬКО ЦЕНТРИРОВАНИЕ
                    className="text-2xl sm:text-4xl md:text-6xl font-bold text-center w-full block"
                    style={{ 
                      color: '#ffffff', 
                      WebkitTextFillColor: '#ffffff', // ПЕРЕБИВАЕМ ПРОЗРАЧНОСТЬ
                      opacity: 1 
                    }}
                  >
                    С Новым Годом, пися ❤️
                  </motion.p>
                </motion.div>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App