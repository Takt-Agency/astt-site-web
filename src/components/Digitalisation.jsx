import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faBoxArchive,
  faBoxOpen,
  faChartLine,
  faFileInvoice,
  faLaptopCode,
  faShip,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'

const NODES = [
  { icon: faUsers, label: 'Clients', pos: 'top-4 left-6' },
  { icon: faShip, label: 'Transit', pos: 'top-16 right-4' },
  { icon: faFileInvoice, label: 'Factures', pos: 'top-1/2 -translate-y-1/2 left-0' },
  { icon: faBoxOpen, label: 'Dossiers', pos: 'top-1/2 -translate-y-1/2 right-0' },
  { icon: faBoxArchive, label: 'Archivage numérique', pos: 'bottom-16 left-4' },
  { icon: faChartLine, label: 'Suivi', pos: 'bottom-4 right-6' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.08 },
  }),
}

function Digitalisation() {
  return (
    <section
      id="digitalisation"
      className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy to-navy-900 py-16 text-white lg:py-24"
    >
      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — content */}
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="h-[2px] w-8 bg-orange" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/85">
                Digitalisation
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              custom={1}
              className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[42px]"
            >
              Une <span className="text-orange">plateforme interne</span> au
              service de nos clients
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              custom={2}
              className="mt-5 text-sm leading-relaxed text-white/70 lg:text-base"
            >
              ASTT s’appuie sur une plateforme de gestion interne moderne,
              conçue pour centraliser les opérations, accélérer le traitement
              des dossiers et offrir un suivi en temps réel à chaque client.
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              custom={3}
              className="mt-4 text-sm leading-relaxed text-white/70 lg:text-base"
            >
              Garantir la <strong className="text-white">sécurité</strong>, la{' '}
              <strong className="text-white">rapidité</strong>, la{' '}
              <strong className="text-white">fiabilité</strong> et la{' '}
              <strong className="text-white">transparence</strong> de nos services.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              custom={4}
              className="mt-8"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-4 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange/25 transition-all hover:bg-orange-600"
              >
                En temps réel
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-sm transition-transform group-hover:translate-x-1"
                />
              </a>
            </motion.div>
          </div>

          {/* RIGHT — network hub illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative mx-auto aspect-square w-full max-w-md"
          >
            {/* Connection lines (SVG) */}
            <svg
              viewBox="0 0 400 400"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="lineGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#e94a2b" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#e94a2b" stopOpacity="0" />
                </radialGradient>
              </defs>
              {[
                { x: 90, y: 60 },
                { x: 340, y: 100 },
                { x: 40, y: 200 },
                { x: 360, y: 200 },
                { x: 70, y: 340 },
                { x: 320, y: 350 },
              ].map((p, i) => (
                <line
                  key={i}
                  x1="200"
                  y1="200"
                  x2={p.x}
                  y2={p.y}
                  stroke="url(#lineGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              ))}
              {/* Pulsating rings */}
              <circle
                cx="200"
                cy="200"
                r="80"
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.1"
                strokeWidth="1"
              />
              <circle
                cx="200"
                cy="200"
                r="120"
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.08"
                strokeWidth="1"
                strokeDasharray="2 6"
              />
            </svg>

            {/* Floating nodes */}
            {NODES.map((n, i) => (
              <motion.div
                key={n.label}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + i * 0.1,
                  ease: 'easeOut',
                }}
                className={`absolute ${n.pos}`}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3 + i * 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-orange shadow-xl shadow-black/30">
                    <FontAwesomeIcon icon={n.icon} className="text-base" />
                  </div>
                  <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/80">
                    {n.label}
                  </span>
                </motion.div>
              </motion.div>
            ))}

            {/* Center hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative grid h-32 w-32 place-items-center rounded-3xl bg-gradient-to-br from-orange to-orange-600 shadow-2xl shadow-orange/40"
              >
                <div className="absolute inset-0 rounded-3xl bg-orange/40 blur-xl" />
                <FontAwesomeIcon
                  icon={faLaptopCode}
                  className="relative text-4xl text-white"
                />
              </motion.div>
              <div className="mt-4 text-center">
                <div className="text-[10px] font-medium uppercase tracking-[0.25em] text-orange">
                  Plateforme
                </div>
                <div className="mt-0.5 text-sm font-bold text-white">ASTT</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Digitalisation
