import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import heroImage from '../assets/hero-image.webp'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.1 + i * 0.08 },
  }),
}

function Hero() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-navy pt-20 text-white"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(100deg, rgba(19,26,43,0.95) 0%, rgba(19,26,43,0.8) 35%, rgba(19,26,43,0.35) 65%, rgba(19,26,43,0.15) 100%), url(${heroImage})`,
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1280px] px-8 pb-24 pt-14 sm:px-12 lg:px-20 lg:pb-28 lg:pt-20">
        <div className="max-w-xl">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-orange"
          >
            Transit <span className="mx-2">•</span> Transport
            <span className="mx-2">•</span> Logistique
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-5 font-bold leading-[1.15] tracking-tight text-white text-3xl sm:text-4xl lg:text-5xl"
          >
            Votre partenaire
            <br />
            en transit, transport
            <br />
            et <span className="text-mint">logistique</span>
          </motion.h1>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-5 h-1 w-20 rounded-full bg-orange"
          />

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-6 max-w-lg text-sm leading-relaxed text-white/80 lg:text-base"
          >
            ASTT accompagne les entreprises dans leurs opérations
            d&apos;importation et d&apos;exportation, les procédures douanières
            et la gestion des flux de marchandises avec des solutions fiables,
            efficaces et adaptées à vos besoins.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#services"
              className="group inline-flex items-center justify-center gap-2.5 rounded-md bg-orange px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-orange/20 transition-all hover:bg-orange-600"
            >
              Découvrir nos services
              <span className="grid h-5 w-5 place-items-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
                <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
              </span>
            </a>
            <a
              href="#a-propos"
              className="group inline-flex items-center justify-center gap-2.5 rounded-md border border-white/30 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:border-white hover:bg-white/5"
            >
              En savoir plus sur ASTT
              <span className="grid h-5 w-5 place-items-center rounded-full border border-white/40 transition-transform group-hover:translate-x-1">
                <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      <svg
        className="absolute inset-x-0 bottom-0 h-16 w-full text-white lg:h-24"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0,64 C240,120 480,120 720,80 C960,40 1200,40 1440,80 L1440,120 L0,120 Z"
        />
      </svg>
    </section>
  )
}

export default Hero
