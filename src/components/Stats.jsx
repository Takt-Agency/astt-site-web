import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarDays,
  faEarthAfrica,
  faLayerGroup,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'

const STATS = [
  { icon: faCalendarDays, value: '1980', label: 'Création du groupe' },
  { icon: faUsers, value: '16', label: 'Collaborateurs' },
  { icon: faEarthAfrica, value: '100%', label: 'Activité exportatrice' },
  { icon: faLayerGroup, value: '6', label: 'Domaines de services' },
]

function Stats() {
  return (
    <section
      aria-label="ASTT en chiffres"
      className="relative bg-white pb-12 lg:pb-20"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative -mt-14 overflow-hidden rounded-3xl bg-navy px-4 py-8 shadow-2xl shadow-navy/20 sm:-mt-20 sm:px-8 sm:py-10 lg:-mt-24 lg:px-14 lg:py-12"
        >
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange/15 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative grid grid-cols-4 gap-2 sm:gap-6 lg:gap-10">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + i * 0.08,
                  ease: 'easeOut',
                }}
                className={`flex flex-col items-center text-center text-white sm:items-start sm:text-left ${
                  i > 0 ? 'sm:border-l sm:border-white/10 sm:pl-6 lg:pl-10' : ''
                }`}
              >
                <FontAwesomeIcon
                  icon={s.icon}
                  className="text-base text-white/85 sm:text-xl lg:text-2xl"
                />
                <div className="mt-2 text-lg font-extrabold leading-none tracking-tight sm:mt-4 sm:text-3xl lg:text-[40px]">
                  {s.value}
                </div>
                <div className="mt-1.5 max-w-[140px] text-[10px] leading-tight text-white/70 sm:mt-2 sm:max-w-none sm:text-sm">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Stats
