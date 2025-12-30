import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function MediaCard({ item, index, onVideoPlay, onVideoPause }) {
  const isEven = index % 2 === 0
  const videoRef = useRef(null)
  const reportedPlaying = useRef(false)

  const getImageUrl = (path) => {
    const name = path.split('/').pop()
    return new URL(`../assets/${name}`, import.meta.url).href
  }

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const handlePlay = () => {
      if (!v.muted && !reportedPlaying.current) {
        reportedPlaying.current = true
        onVideoPlay()
      }
    }

    const handlePause = () => {
      if (reportedPlaying.current) {
        reportedPlaying.current = false
        onVideoPause()
      }
    }

    const handleVolumeChange = () => {
      if (!v.muted && !v.paused && !reportedPlaying.current) {
        reportedPlaying.current = true
        onVideoPlay()
      }
      if ((v.muted || v.paused) && reportedPlaying.current) {
        reportedPlaying.current = false
        onVideoPause()
      }
    }

    v.addEventListener('play', handlePlay)
    v.addEventListener('pause', handlePause)
    v.addEventListener('ended', handlePause)
    v.addEventListener('volumechange', handleVolumeChange)

    return () => {
      v.removeEventListener('play', handlePlay)
      v.removeEventListener('pause', handlePause)
      v.removeEventListener('ended', handlePause)
      v.removeEventListener('volumechange', handleVolumeChange)
    }
  }, [onVideoPlay, onVideoPause])

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col ${isEven ? 'items-start' : 'items-end'} w-full mb-20`}
    >
      <div className={`relative group w-full md:max-w-[55%] overflow-hidden ${isEven ? 'md:pr-10' : 'md:pl-10'}`}>
        {item.type === 'photo' ? (
          <img
            src={getImageUrl(item.src)}
            alt={item.caption}
            className="w-full h-auto rounded-2xl shadow-2xl border border-white/10 object-cover transform transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="relative overflow-hidden rounded-2xl">
            <video
              ref={videoRef}
              src={item.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-auto rounded-2xl shadow-2xl border border-white/10 bg-black cursor-pointer"
              onClick={() => {
                const v = videoRef.current
                if (!v) return
                if (v.paused) {
                  v.muted = false
                  v.play().catch(() => {})
                } else {
                  v.pause()
                }
              }}
            />
          </div>
        )}

        {item.caption && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={`mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/5 ${isEven ? 'text-left' : 'text-right'}`}
          >
            <p className="text-lg md:text-2xl font-light tracking-wide text-gray-200">
              {item.caption}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
