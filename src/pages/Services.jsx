import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { SERVICES } from '../data/services'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.08 },
  }),
}

function Services() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-16 text-white lg:pt-40 lg:pb-24">
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
          className="pointer-events-none absolute -right-40 top-10 h-72 w-72 rounded-full bg-orange/15 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1280px] px-8 sm:px-12 lg:px-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-3"
          >
            <span className="h-px w-10 bg-orange" />
            <span className="rounded-full bg-orange/20 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.25em] text-orange">
              Nos services
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Des <span className="text-mint">services spécialisés</span>{' '}
            <br className="hidden sm:inline" />
            pour vos opérations
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-5 max-w-2xl text-sm leading-relaxed text-white/70 lg:text-base"
          >
            ASTT s’appuie sur six pôles spécialisés permettant d’assurer une
            gestion structurée des opérations de transit, des procédures
            douanières et du suivi administratif.
          </motion.p>
        </div>
      </section>

      {/* Grid of services */}
      <section id="services" className="relative bg-mint/30 py-12 lg:py-16">
        <div
          className="pointer-events-none absolute left-0 top-24 h-40 w-40 opacity-[0.08]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #202a44 1.5px, transparent 1.5px)',
            backgroundSize: '18px 18px',
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1280px] px-8 sm:px-12 lg:px-20">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.slug}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                custom={i}
              >
                <Link
                  to={`/services/${s.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-orange/40 hover:shadow-2xl hover:shadow-navy/10"
                >
                  <span className="absolute right-5 top-4 text-6xl font-extrabold text-navy/[0.04] transition-colors group-hover:text-orange/10">
                    {s.number}
                  </span>

                  <div className="relative grid h-14 w-14 place-items-center rounded-xl bg-mint/60 text-navy transition-colors group-hover:bg-orange group-hover:text-white">
                    <FontAwesomeIcon icon={s.icon} className="text-xl" />
                  </div>

                  <div className="relative mt-6 flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange">
                      {s.number}
                    </span>
                    <span className="h-px flex-1 bg-navy/10" />
                  </div>

                  <h3 className="relative mt-3 text-xl font-bold text-navy transition-colors group-hover:text-orange">
                    {s.title}
                  </h3>

                  <p className="relative mt-3 flex-1 text-sm leading-relaxed text-ink/65">
                    {s.short}
                  </p>

                  <div className="relative mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-navy transition-colors group-hover:text-orange">
                    En savoir plus
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-navy/5 text-navy transition-all group-hover:translate-x-1 group-hover:bg-orange group-hover:text-white">
                      <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Services
