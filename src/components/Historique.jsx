import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBriefcase,
  faChartLine,
  faFileInvoice,
  faTruckFast,
} from '@fortawesome/free-solid-svg-icons'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: i * 0.08 },
  }),
}

const METIERS = [
  { icon: faBriefcase, label: 'Consulting' },
  { icon: faChartLine, label: 'Trading' },
  { icon: faTruckFast, label: 'Transit' },
  { icon: faFileInvoice, label: 'Commission en douane' },
]

function Historique() {
  return (
    <section
      id="historique"
      className="relative overflow-hidden bg-[#f7f8fb] pb-16 pt-16 lg:pb-20 lg:pt-24"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-orange/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-navy/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
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
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-navy">
                Historique
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              custom={1}
              className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-navy sm:text-4xl lg:text-[46px]"
            >
              Depuis <span className="text-orange">1980</span>, un savoir-faire
              familial transmis de père en fils.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              custom={2}
              className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink/70"
            >
              Forte de plus de quatre décennies d&apos;expérience, notre famille
              évolue depuis 1980 dans le domaine du transit et du commerce
              international.
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              custom={3}
              className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/70"
            >
              Au fil des générations, nous avons développé notre expertise et
              diversifié nos activités à travers plusieurs métiers
              complémentaires : consulting, trading, transit et commission en
              douane.
            </motion.p>

            {/* Métiers chips */}
            <motion.ul
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              custom={4}
              className="mt-8 flex flex-wrap gap-2"
            >
              {METIERS.map((m) => (
                <li
                  key={m.label}
                  className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-navy shadow-sm"
                >
                  <FontAwesomeIcon icon={m.icon} className="text-[11px] text-orange" />
                  {m.label}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* RIGHT — timeline card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-8 text-white shadow-2xl shadow-navy/25 sm:px-10 sm:py-10">
              {/* Accents */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-orange/20 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-white/5 blur-3xl" />

              <div className="relative">
                <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">
                  Notre parcours
                </div>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-5xl font-extrabold leading-none text-orange sm:text-6xl">
                    +40
                  </span>
                  <span className="text-sm font-medium text-white/80">
                    années d&apos;expérience
                  </span>
                </div>
              </div>

              {/* Timeline */}
              <ol className="relative mt-8 space-y-6 border-l border-white/15 pl-6">
                <TimelineItem year="1980" title="Naissance de l'aventure familiale">
                  Démarrage dans le transit et le commerce international.
                </TimelineItem>
                <TimelineItem year="Années 2000" title="Diversification">
                  Extension vers le consulting et le trading.
                </TimelineItem>
                <TimelineItem year="Aujourd'hui" title="Un groupe intégré">
                  Quatre métiers complémentaires au service de vos échanges.
                </TimelineItem>
              </ol>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ year, title, children }) {
  return (
    <li className="relative">
      <span className="absolute -left-[29px] top-1 grid h-4 w-4 place-items-center rounded-full bg-orange ring-4 ring-navy" />
      <div className="text-xs font-semibold uppercase tracking-wider text-orange">
        {year}
      </div>
      <div className="mt-1 text-base font-bold text-white">{title}</div>
      <p className="mt-1 text-sm leading-relaxed text-white/70">{children}</p>
    </li>
  )
}

export default Historique
