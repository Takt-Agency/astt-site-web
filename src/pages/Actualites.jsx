import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faArrowRight,
  faScrewdriverWrench,
} from '@fortawesome/free-solid-svg-icons'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.08 },
  }),
}

function Actualites() {
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
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 flex items-center gap-2 text-xs font-medium text-white/60"
          >
            <Link to="/" className="transition-colors hover:text-white">
              Accueil
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-orange">Actualités</span>
          </motion.nav>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-3"
          >
            <span className="h-px w-10 bg-orange" />
            <span className="rounded-full bg-orange/20 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.25em] text-orange">
              Actualités
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            <span className="text-mint">Bientôt disponible</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-5 max-w-2xl text-sm leading-relaxed text-white/70 lg:text-base"
          >
            L’espace <strong className="text-white">Actualités</strong> sera
            développé dans la phase 2 du projet, aux côtés du{' '}
            <strong className="text-white">tableau de bord</strong> de gestion
            interne.
          </motion.p>
        </div>
      </section>

      {/* Coming soon card */}
      <section className="relative bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-[1280px] px-8 sm:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-navy/10 bg-mint/40 p-8 text-center shadow-lg shadow-navy/5 sm:p-12"
          >
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-orange text-white shadow-lg shadow-orange/30">
              <FontAwesomeIcon
                icon={faScrewdriverWrench}
                className="text-3xl"
              />
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-orange shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
              </span>
              Phase 2 — En développement
            </div>

            <h2 className="mt-5 text-2xl font-bold leading-tight text-navy sm:text-3xl">
              Cette section est en cours de{' '}
              <span className="text-orange">développement</span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink/70 lg:text-base">
              La page <strong className="text-navy">Actualités</strong> et son{' '}
              <strong className="text-navy">tableau de bord</strong> associé
              seront livrés dans la phase 2 du projet. En attendant, découvrez
              nos services ou contactez notre équipe pour toute question.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/services"
                className="group inline-flex items-center gap-3 rounded-md bg-orange px-7 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-orange/20 transition-all hover:bg-orange-600"
              >
                Voir nos services
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
                  <FontAwesomeIcon icon={faArrowRight} className="text-[11px]" />
                </span>
              </Link>
              <Link
                to="/"
                className="group inline-flex items-center gap-3 rounded-md border border-navy/20 px-7 py-4 text-sm font-bold uppercase tracking-wider text-navy transition-all hover:border-navy hover:bg-navy hover:text-white"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="text-[11px]" />
                Retour à l’accueil
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </>
  )
}

export default Actualites
