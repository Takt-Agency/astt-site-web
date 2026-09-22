import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: i * 0.08 },
  }),
}

function Mission() {
  return (
    <section
      id="mission"
      className="relative overflow-hidden bg-white pb-16 pt-8 lg:pb-24 lg:pt-12"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-14">
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
                Notre mission
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
              Faciliter vos échanges,
              <br />
              au-delà des <span className="text-orange">frontières.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              custom={2}
              className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink/70"
            >
              Notre mission est de simplifier et sécuriser les opérations de
              nos clients en leur apportant une expertise professionnelle, une
              communication transparente et un suivi rigoureux à chaque étape.
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              custom={3}
              className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/70"
            >
              Nous plaçons la satisfaction client, la conformité réglementaire
              et l&apos;amélioration continue au cœur de notre activité.
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
                href="#services"
                className="group inline-flex items-center gap-3 text-sm font-semibold text-navy transition-colors hover:text-orange"
              >
                Découvrir nos services
                <span className="grid h-9 w-9 place-items-center rounded-full bg-orange text-white transition-transform group-hover:translate-x-1">
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </span>
              </a>
            </motion.div>
          </div>

          {/* RIGHT — image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-navy/15">
              <img
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&q=80&auto=format&fit=crop"
                alt="Cargo ship — opérations internationales ASTT"
                loading="lazy"
                className="h-[420px] w-full object-cover lg:h-[540px]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-navy/25 via-transparent to-transparent" />
            </div>

            {/* Floating accent card */}
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-navy px-5 py-4 shadow-xl shadow-navy/25 sm:block">
              <div className="flex items-center gap-3 text-white">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-orange text-sm font-bold">
                  →
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/60">
                    Depuis
                  </div>
                  <div className="text-lg font-bold leading-none">2010</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Mission
