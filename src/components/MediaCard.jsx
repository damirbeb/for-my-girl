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
        {/* Media card: centers content and keeps proportions */}
        {item.type === 'photo' ? (
          <div
            className="w-full rounded-2xl shadow-2xl overflow-hidden mx-auto"
            style={{ maxWidth: 720, background: '#0b0b0b', height: 'auto' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8, background: 'transparent' }}>
              <img
                src={getImageUrl(item.src)}
                alt={item.caption}
                className="rounded-2xl transform transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
                style={{ display: 'block', maxWidth: '100%', width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>
          </div>
        ) : (
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl mx-auto"
            style={{ maxWidth: 720, background: '#000' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
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
                style={{ width: '100%', height: 'auto', maxWidth: '720px', display: 'block', objectFit: 'contain' }}
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
          </div>
        )}

        {item.caption && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`p-4 bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-sm rounded-xl border border-white/5 text-center`}
            style={{ maxWidth: 720, margin: '4px auto 0' }}
          >
            <p className="caption" style={{ margin: 0, textAlign: 'center', fontSize: 18 }}>
              {item.caption}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
