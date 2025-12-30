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
      audioRef.current.volume = 0.6
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

            <div className="w-full flex flex-col items-center">
              <header className="h-screen w-full flex items-center justify-center text-center">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="w-full px-4 md:px-6"
                >
                  <motion.h2 
                    className="text-7xl md:text-9xl font-black mb-6 leading-tight"
                    animate={{ backgroundPosition: ['0%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                    style={{
                      backgroundImage: 'linear-gradient(90deg, rgb(244, 63, 94), rgb(251, 146, 60), rgb(244, 63, 94))',
                      backgroundSize: '200% auto',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      letterSpacing: '-0.02em'
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

              <footer className="h-screen w-full flex flex-col items-center justify-center text-center px-6">
                <motion.h2 
                  whileInView={{ scale: [0.9, 1.1, 1] }}
                  className="text-6xl md:text-8xl font-black mb-12 leading-tight"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, rgb(244, 63, 94), rgb(251, 146, 60), rgb(244, 63, 94))',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  ЛЮБЛЮ ТЕБЯ
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="bg-gradient-to-r from-rose-500/30 to-orange-500/30 backdrop-blur-md rounded-2xl p-8 border border-rose-400/50 max-w-lg mx-auto"
                >
                  <p className="text-xl md:text-3xl font-semibold text-white">Жду твою реакцию</p>
                  <p className="text-gray-200 text-base mt-4">С Новым Годом, вредина ❤️</p>
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