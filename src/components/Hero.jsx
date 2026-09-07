import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faFileLines,
  faGlobe,
  faHeadset,
  faShieldHalved,
  faStopwatch,
} from '@fortawesome/free-solid-svg-icons'
import heroImage from '../assets/hero-image.webp'

const FEATURES = [
  {
    icon: faShieldHalved,
    line1: 'Sécurité',
    line2: 'des marchandises',
  },
  {
    icon: faStopwatch,
    line1: 'Respect',
    line2: 'des délais',
  },
  {
    icon: faGlobe,
    line1: 'Solutions sur mesure',
    line2: 'pour votre business',
  },
  {
    icon: faHeadset,
    line1: 'Une équipe',
    line2: 'à votre écoute',
  },
]

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
          backgroundImage: `linear-gradient(180deg, rgba(19,26,43,0.55) 0%, rgba(19,26,43,0.35) 40%, rgba(19,26,43,0.55) 100%), url(${heroImage})`,
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-[1280px] flex-col items-center px-8 pb-14 pt-16 text-center sm:px-12 lg:px-20 lg:pb-20 lg:pt-24">
        {/* Eyebrow with side dashes */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex items-center justify-center gap-4"
        >
          <span className="h-px w-10 bg-orange sm:w-16" />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-orange sm:text-sm">
            Transit <span className="mx-2 text-white/40">•</span> Transport
            <span className="mx-2 text-white/40">•</span> Logistique
          </span>
          <span className="h-px w-10 bg-orange sm:w-16" />
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-6 max-w-6xl font-bold leading-[1.1] tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl"
        >
          Votre partenaire en transit,{' '}
          <span className="text-mint">transport</span>
          <br />
          et <span className="text-orange">logistique</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-6 max-w-2xl text-sm leading-relaxed text-white/85 lg:text-base"
        >
          ASTT accompagne les entreprises dans leurs opérations d&apos;importation
          et d&apos;exportation, les procédures douanières et la gestion des
          flux de marchandises avec des solutions fiables, efficaces et
          adaptées à vos besoins.
        </motion.p>

        {/* CTAs — inline pills */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="/contact"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-orange px-8 py-4 text-sm font-bold text-white shadow-lg shadow-orange/30 transition-all hover:bg-orange-600"
          >
            <FontAwesomeIcon icon={faFileLines} className="text-sm" />
            Devis rapide
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
              <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
            </span>
          </a>
          <a
            href="#services"
            className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/40 bg-white/[0.04] px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/10"
          >
            Découvrir nos services
            <span className="grid h-6 w-6 place-items-center rounded-full border border-white/40 transition-transform group-hover:translate-x-1">
              <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
            </span>
          </a>
        </motion.div>

        {/* Feature strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-14 hidden w-full max-w-4xl grid-cols-2 gap-x-6 gap-y-6 lg:mt-16 lg:grid lg:grid-cols-4 lg:gap-x-4"
        >
          {FEATURES.map((f) => (
            <div
              key={f.line1}
              className="flex items-center justify-center gap-3 text-left"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 bg-white/[0.06] text-orange backdrop-blur-sm">
                <FontAwesomeIcon icon={f.icon} className="text-base" />
              </div>
              <div className="text-sm leading-tight text-white">
                <div className="font-semibold">{f.line1}</div>
                <div className="text-white/70">{f.line2}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
