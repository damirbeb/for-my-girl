import { motion } from 'framer-motion'

export default function ProgressBar({ scaleX }) {
  return (
    <motion.div className="fixed top-0 left-0 right-0 h-2 bg-red-600 origin-left z-[100]" style={{ scaleX }} />
  )
}
