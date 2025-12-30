import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Global state to track which video is currently playing
let currentPlayingVideo = null
let playingVideoIndex = null

export default function MediaCard({ item, index, onVideoPlay, onVideoPause }) {
  const isEven = index % 2 === 0
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const reportedPlaying = useRef(false)
  const hasAutoPlayed = useRef(false)

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

  // Intersection Observer for smart video autoplay
  useEffect(() => {
    if (item.type !== 'video') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current
        if (!v) return

        if (entry.isIntersecting && !hasAutoPlayed.current) {
          hasAutoPlayed.current = true

          // Stop any currently playing video
          if (currentPlayingVideo && currentPlayingVideo !== videoRef.current) {
            currentPlayingVideo.pause()
            currentPlayingVideo.muted = true
            if (playingVideoIndex !== null) {
              onVideoPause()
            }
          }

          // Play this video with sound
          currentPlayingVideo = v
          playingVideoIndex = index
          v.muted = false
          v.play().catch(() => {})
          setIsPlaying(true)
          onVideoPlay()
        } else if (!entry.isIntersecting && hasAutoPlayed.current) {
          // Stop video when scrolled away
          v.pause()
          v.muted = true
          if (currentPlayingVideo === v) {
            currentPlayingVideo = null
            playingVideoIndex = null
            onVideoPause()
          }
          hasAutoPlayed.current = false
        }
      },
      { threshold: 0.5 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [item.type, index, onVideoPlay, onVideoPause])

  useEffect(() => {
    const v = videoRef.current
    if (!v || item.type !== 'video') return

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
  }, [onVideoPlay, onVideoPause, item.type])

  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
      className={`flex flex-col items-center w-full mb-4 px-4`}
      ref={containerRef}
    >
      <div className={`relative group w-full flex flex-col items-center`} style={{maxWidth: 720}}>
        {/* Media card: centers content and keeps proportions */}
        {item.type === 'photo' ? (
          <div
            className="w-full rounded-2xl shadow-2xl overflow-hidden"
            style={{ maxWidth: '100%', background: '#0b0b0b', height: 'auto' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, background: 'transparent' }}>
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
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            style={{ maxWidth: '100%', background: '#000' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
              <video
                ref={videoRef}
                src={resolvePublicPath(item.src)}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={getVideoPoster(item.src)}
                className="bg-black cursor-pointer block"
                style={{ width: '100%', height: 'auto', maxWidth: '100%', display: 'block', objectFit: 'contain', borderRadius: 16 }}
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
        )}}

        {item.caption && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`p-4 bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-sm rounded-xl text-center w-full`}
            style={{ margin: '12px 0 0 0' }}
          >
            <p className="caption" style={{ margin: 0, textAlign: 'center', fontSize: 18, width: '100%' }}>
              {item.caption}
            </p>
          </motion.div>
        )}
        <div style={{ height: 16 }} />
      </div>
    </motion.div>
  )
}
