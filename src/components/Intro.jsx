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
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 44 }}>❤️</div>
            </div>

            <h1 style={{ fontSize: 32, margin: '6px 0', fontWeight: 800, color: '#fff' }}>Для самой любимой</h1>

            <p style={{ color: '#cbd5e1', marginBottom: 18 }}>Я собрал для тебя галерею любимых моментов — аккуратно, с музыкой и любовью.</p>

            <button
              onClick={startSurprise}
              style={{
                padding: '12px 34px',
                background: 'linear-gradient(90deg,#fb7185,#fb923c)',
                color: '#fff',
                fontWeight: 700,
                borderRadius: 999,
                boxShadow: '0 10px 30px rgba(251,146,60,0.2)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              НАЧАТЬ
            </button>

            <p style={{ marginTop: 14, color: '#94a3b8', fontSize: 13, letterSpacing: 1.2 }}>Нажми, чтобы открыть коллекцию</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
