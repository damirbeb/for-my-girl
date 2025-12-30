import { motion } from 'framer-motion'

export default function Intro({ startSurprise }) {
  return (
    <motion.div
      key="intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{
        background: 'linear-gradient(180deg, #050505 0%, #0b0b0b 60%)',
        minHeight: '100vh'
      }}
    >
      <div className="relative z-10 w-full max-w-xl mx-auto" style={{ padding: 8 }}>
        <div
          className="text-center"
          style={{
            background: 'rgba(0,0,0,0.6)',
            borderRadius: 28,
            padding: '28px 32px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}
        >
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <motion.div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }} animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <div style={{ fontSize: 80 }}>❤️</div>
            </motion.div>

            <h1 style={{ fontSize: 56, margin: '12px auto', fontWeight: 900, background: 'linear-gradient(90deg, #f43f5e, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textAlign: 'center', width: '100%' }}>Для самой любимой</h1>

            <p style={{ color: '#e2e8f0', marginBottom: 24, fontSize: 16, lineHeight: 1.6, textAlign: 'center', width: '100%' }}>Я собрал для тебя галерею наших лучших моментов — аккуратно, с музыкой и всей моей любовью 💕</p>

            <motion.button
              onClick={startSurprise}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '16px 48px',
                background: 'linear-gradient(90deg, #f43f5e, #fb923c)',
                color: '#fff',
                fontWeight: 800,
                fontSize: 18,
                borderRadius: 999,
                boxShadow: '0 20px 40px rgba(251, 146, 60, 0.3)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              ОТКРЫТЬ ГАЛЕРЕЮ
            </motion.button>

            <p style={{ marginTop: 14, color: '#94a3b8', fontSize: 13, letterSpacing: 1.2, textAlign: 'center', width: '100%' }}>Нажми, чтобы открыть коллекцию</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
