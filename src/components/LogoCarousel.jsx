import { motion } from 'motion/react'

const PARTNERS = Array.from({ length: 10 }, (_, i) => ({
  name: `Logo ${i + 1}`,
}))

function LogoItem({ name }) {
  return (
    <div className="flex h-16 w-44 shrink-0 items-center justify-center rounded-lg border border-navy/10 bg-white px-6 grayscale opacity-70 transition-all hover:opacity-100 hover:grayscale-0 hover:border-orange/40">
      <span className="text-lg font-bold uppercase tracking-wider text-navy/60 whitespace-nowrap">
        {name}
      </span>
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
            <LogoItem key={`${p.name}-${i}`} name={p.name} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default LogoCarousel
