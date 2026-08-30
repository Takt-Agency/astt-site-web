import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faAward,
  faBolt,
  faShieldHalved,
  faUserGraduate,
} from '@fortawesome/free-solid-svg-icons'

const PILLARS = [
  {
    number: '01',
    icon: faShieldHalved,
    title: 'Fiabilité',
    text: 'Des processus structurés et un accompagnement professionnel pour chaque opération.',
  },
  {
    number: '02',
    icon: faBolt,
    title: 'Réactivité',
    text: 'Une équipe disponible pour assurer un suivi rapide et efficace de vos dossiers.',
  },
  {
    number: '03',
    icon: faUserGraduate,
    title: 'Expertise',
    text: 'Une équipe spécialisée dans le transit et les opérations douanières depuis 1980.',
  },
  {
    number: '04',
    icon: faAward,
    title: 'Qualité',
    text: 'Une exigence permanente pour garantir la satisfaction de nos clients.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.08 },
  }),
}

function WhyAstt() {
  return (
    <section
      id="expertise"
      className="relative overflow-hidden bg-navy py-12 text-white lg:py-16"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-orange/[0.06] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1280px] px-8 sm:px-12 lg:px-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT — Header */}
          <div className="lg:col-span-5">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              className="inline-flex items-center gap-3"
            >
              <span className="h-px w-10 bg-orange" />
              <span className="rounded-full bg-orange/15 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.25em] text-orange">
                Pourquoi ASTT ?
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
              Un partenaire{' '}
              <span className="text-mint">de confiance</span> pour vos
              opérations
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              custom={2}
              className="mt-5 max-w-md text-sm leading-relaxed text-white/70 lg:text-base"
            >
              Notre philosophie repose sur quatre piliers essentiels qui
              guident notre approche au quotidien et notre engagement envers
              chaque client.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              custom={3}
              className="mt-8"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-md bg-orange px-7 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-orange/20 transition-all hover:bg-orange-600"
              >
                Travaillons ensemble
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
                  <FontAwesomeIcon icon={faArrowRight} className="text-[11px]" />
                </span>
              </a>
            </motion.div>
          </div>

          {/* RIGHT — 2x2 grid of pillars */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={i}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-orange/40 hover:bg-white/[0.06]"
                >
                  <span className="absolute right-4 top-3 text-5xl font-extrabold text-white/[0.05] transition-colors group-hover:text-orange/20">
                    {p.number}
                  </span>

                  <div className="relative grid h-12 w-12 place-items-center rounded-xl bg-orange/15 text-orange transition-colors group-hover:bg-orange group-hover:text-white">
                    <FontAwesomeIcon icon={p.icon} className="text-lg" />
                  </div>

                  <h3 className="relative mt-5 text-lg font-bold text-white transition-colors group-hover:text-mint">
                    {p.title}
                  </h3>

                  <p className="relative mt-2 text-sm leading-relaxed text-white/65">
                    {p.text}
                  </p>

                  <span className="relative mt-4 block h-0.5 w-8 rounded-full bg-orange transition-all group-hover:w-16" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyAstt
