import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const STEPS = [
  {
    number: '01',
    title: 'Analyse de vos besoins',
    text: 'Étude complète de vos flux et de vos contraintes opérationnelles.',
  },
  {
    number: '02',
    title: 'Mise en place des solutions',
    text: 'Définition des procédures et déploiement des outils adaptés.',
  },
  {
    number: '03',
    title: 'Suivi & coordination',
    text: 'Pilotage des opérations avec un point de contact dédié.',
  },
  {
    number: '04',
    title: 'Livraison & accompagnement',
    text: 'Suivi post-livraison et accompagnement long terme.',
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

function Process() {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-14">
        <div className="max-w-3xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="flex items-center gap-3"
          >
            <span className="h-[2px] w-8 bg-orange" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-navy">
              Notre process
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            custom={1}
            className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight text-navy sm:text-4xl lg:text-[42px]"
          >
            Un accompagnement
            <br />à <span className="text-orange">chaque étape.</span>
          </motion.h2>
        </div>

        <div className="relative mt-14">
          {/* Horizontal connector (desktop) */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-[38px] hidden h-[2px] bg-navy/10 lg:block"
            aria-hidden="true"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
            className="pointer-events-none absolute left-0 right-0 top-[38px] hidden h-[2px] bg-orange lg:block"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.number}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
                className="group relative flex flex-col"
              >
                <div className="flex items-center gap-3 lg:block">
                  <span className="relative z-10 grid h-[76px] w-[76px] shrink-0 place-items-center rounded-full border-4 border-white bg-navy text-xl font-extrabold text-white shadow-lg shadow-navy/20 transition-all group-hover:bg-orange group-hover:shadow-orange/25">
                    {s.number}
                  </span>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="hidden text-orange lg:hidden"
                  />
                </div>

                <h3 className="mt-5 text-lg font-bold text-navy lg:mt-7">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  {s.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process
