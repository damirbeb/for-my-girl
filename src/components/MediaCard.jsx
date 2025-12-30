import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function MediaCard({ item, index, onVideoPlay, onVideoPause }) {
  const isEven = index % 2 === 0
  const videoRef = useRef(null)
  const reportedPlaying = useRef(false)

  const getImageUrl = (path) => {
    const name = path.split('/').pop()
    return new URL(`../assets/${name}`, import.meta.url).href
  }

  const getVideoPoster = (path) => {
    const name = path.split('/').pop().replace(/\.mp4$/, '.jpg')
    try {
      return new URL(`../assets/${name}`, import.meta.url).href
    } catch (e) {
      return ''
    }
  }

  const resolvePublicPath = (p) => {
    if (!p) return p
    if (p.startsWith('/')) return import.meta.env.BASE_URL + p.replace(/^\//, '')
    return p
  }

  const [isPlaying, setIsPlaying] = useState(false)

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
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
      className={`flex flex-col items-center w-full mb-16`}
    >
      <div className={`relative group w-full md:max-w-2xl overflow-hidden mx-auto py-2`} style={{maxWidth: 760}}>
        {item.type === 'photo' ? (
          <div
            className="w-full rounded-2xl shadow-2xl border border-white/10 overflow-hidden mx-auto"
            style={{ maxWidth: 720, background: 'linear-gradient(180deg,#ffffff06,#00000006)', height: 'clamp(180px, 28vh, 360px)' }}
          >
            <img
              src={getImageUrl(item.src)}
              alt={item.caption}
              className="rounded-2xl transform transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
              style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', maxWidth: '720px' }}
            />
          </div>
        ) : (
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 mx-auto"
            style={{ maxWidth: 720, background: '#000' }}
          >
            <video
              ref={videoRef}
              src={resolvePublicPath(item.src)}
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              poster={getVideoPoster(item.src)}
              className="bg-black cursor-pointer block"
              style={{ width: '100%', height: 'clamp(180px, 28vh, 360px)', maxWidth: '720px', display: 'block', objectFit: 'cover' }}
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
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-sm rounded-xl border border-white/5 text-center`}
          >
            <p className="caption">
              {item.caption}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
