import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowDown,
  faArrowRight,
  faCalendarDays,
  faLayerGroup,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import heroImage from '../assets/image hero.png'
import heroImageMobile from '../assets/hero mobile.png'

const SLIDES = [
  {
    eyebrow: 'Transitaire et commissionnaire en douane',
    title: ['Plus loin', 'avec vous'],
    description:
      'Des solutions de transit et de transport fiables pour un monde de nouvelles opportunités.',
    cta: { label: 'Découvrir nos services', href: '/services' },
  },
  {
    eyebrow: 'Transit & Douane',
    title: ['Vos dossiers,', 'entre expertes mains'],
    description:
      'Une gestion structurée de vos opérations douanières et un suivi rigoureux à chaque étape.',
    cta: { label: 'Nos expertises', href: '/services' },
  },
  {
    eyebrow: 'Logistique intégrée',
    title: ['Un partenaire', 'de confiance'],
    description:
      'Une équipe engagée pour accompagner vos flux du départ à la destination finale.',
    cta: { label: 'Nous contacter', href: '/contact' },
  },
]

const STATS = [
  { icon: faCalendarDays, value: '2010', label: 'Fondation' },
  { icon: faUsers, value: '20', label: 'Collaborateurs' },
  { icon: faLayerGroup, value: '6', label: 'Métiers' },
]

const AUTOPLAY_MS = 6000

function Hero() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const dragStartX = useRef(null)
  const dragged = useRef(false)

  const goTo = (i) =>
    setActive(((i % SLIDES.length) + SLIDES.length) % SLIDES.length)
  const next = () => setActive((p) => (p + 1) % SLIDES.length)
  const prev = () => setActive((p) => (p - 1 + SLIDES.length) % SLIDES.length)

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, active])

  const onPointerDown = (e) => {
    dragStartX.current = e.clientX
    dragged.current = false
    setPaused(true)
  }
  const onPointerMove = (e) => {
    if (dragStartX.current == null) return
    if (Math.abs(e.clientX - dragStartX.current) > 8) dragged.current = true
  }
  const onPointerUp = (e) => {
    if (dragStartX.current == null) return
    const dx = e.clientX - dragStartX.current
    dragStartX.current = null
    if (Math.abs(dx) > 50) {
      if (dx < 0) next()
      else prev()
    }
    setTimeout(() => setPaused(false), 800)
  }
  const onPointerCancel = () => {
    dragStartX.current = null
    setPaused(false)
  }

  const slide = SLIDES[active]

  return (
    <section
      id="accueil"
      className="relative min-h-screen bg-navy pt-24 text-white"
    >
      {/* Background image (same across slides) */}
      <div className="absolute inset-0 overflow-hidden">
        <picture>
          <source media="(min-width: 1024px)" srcSet={heroImage} />
          <img
            src={heroImageMobile}
            alt="Terminal portuaire — logistique ASTT"
            className="h-full w-full object-cover object-center"
          />
        </picture>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(19,26,43,0.9) 0%, rgba(19,26,43,0.75) 20%, rgba(19,26,43,0.4) 40%, rgba(19,26,43,0) 55%)',
          }}
        />
      </div>

      {/* Main hero content */}
      <div
        className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-[1440px] flex-col px-6 pt-8 sm:px-10 lg:px-14 lg:pt-16"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        style={{ touchAction: 'pan-y' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-orange" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/85 sm:text-[11px]">
                {slide.eyebrow}
              </span>
            </div>

            <h1 className="mt-4 max-w-[600px] font-extrabold leading-[0.95] tracking-tight text-white text-[44px] sm:text-5xl lg:text-[72px]">
              {slide.title[0]}
              <br />
              {slide.title[1]}
            </h1>

            <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-white/80 sm:text-sm lg:text-[15px]">
              {slide.description}
            </p>

            <div className="mt-7">
              <a
                href={slide.cta.href}
                onClick={(e) => {
                  if (dragged.current) e.preventDefault()
                }}
                className="group inline-flex items-center gap-4 rounded-full bg-orange px-6 py-3 text-[13px] font-semibold text-white shadow-lg shadow-orange/30 transition-all hover:bg-orange-600 sm:text-sm"
              >
                {slide.cta.label}
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-sm transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators + scroll cue */}
        <div className="mt-auto flex items-end justify-between pt-10">
          <div className="flex items-end gap-5 text-[13px] font-semibold">
            {SLIDES.map((_, i) => {
              const isActive = i === active
              const label = String(i + 1).padStart(2, '0')
              return (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    if (dragged.current) {
                      e.preventDefault()
                      return
                    }
                    goTo(i)
                  }}
                  className={`flex flex-col items-start transition-colors ${
                    isActive ? 'text-orange' : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="hero-slide-underline"
                      className="mt-1 h-[2px] w-5 bg-orange"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          <a
            href="#stats"
            className="group flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/80 transition-colors hover:text-white"
          >
            <span className="hidden text-right leading-tight sm:block">
              Scroll
              <br />
              pour explorer
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/40 transition-all group-hover:border-white group-hover:bg-white/10">
              <FontAwesomeIcon icon={faArrowDown} className="text-xs" />
            </span>
          </a>
        </div>

        {/* Stats card — floats at the bottom of the hero */}
        <motion.div
          id="stats"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
          className="relative mt-8 -mb-14 overflow-hidden rounded-3xl bg-navy-900 px-4 py-6 ring-1 ring-white/5 sm:-mb-16 sm:px-8 sm:py-8 lg:-mb-20 lg:px-12 lg:py-10"
        >
          <div className="relative grid grid-cols-3 gap-2 sm:gap-6 lg:gap-10">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col items-center text-center text-white sm:items-start sm:text-left ${
                  i > 0 ? 'sm:border-l sm:border-white/10 sm:pl-6 lg:pl-10' : ''
                }`}
              >
                <FontAwesomeIcon
                  icon={s.icon}
                  className="text-base text-white/85 sm:text-xl lg:text-2xl"
                />
                <div className="mt-2 text-lg font-extrabold leading-none tracking-tight sm:mt-3 sm:text-3xl lg:text-[36px]">
                  {s.value}
                </div>
                <div className="mt-1.5 max-w-[130px] text-[10px] leading-tight text-white/70 sm:mt-2 sm:max-w-none sm:text-sm">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
