import { motion } from 'motion/react'
import safranLogo from '../assets/safran-logo.png'

const PARTNERS = Array.from({ length: 10 }, (_, i) => ({
  name: `Safran ${i + 1}`,
  src: safranLogo,
}))

function LogoItem({ name, src }) {
  return (
    <div className="flex h-16 w-44 shrink-0 items-center justify-center rounded-lg border border-navy/10 bg-white px-6 grayscale opacity-70 transition-all hover:opacity-100 hover:grayscale-0 hover:border-orange/40">
      <img
        src={src}
        alt={name}
        loading="lazy"
        className="max-h-10 w-auto object-contain"
      />
    </div>
  )
}

function LogoCarousel() {
  const loop = [...PARTNERS, ...PARTNERS]

  return (
    <section className="relative overflow-hidden bg-white py-6 lg:py-8">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

        <motion.div
          className="flex w-max gap-6"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 35,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {loop.map((p, i) => (
            <LogoItem key={`${p.name}-${i}`} name={p.name} src={p.src} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default LogoCarousel
