import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faCalendarDays,
  faLayerGroup,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import heroImage from '../assets/image hero.png'
import heroImageMobile from '../assets/hero mobile.png'
import cover2 from '../assets/cover image 2.webp'
import cover2Mobile from '../assets/cover mobile 2.webp'

const SLIDES = [
  {
    eyebrow: 'Transitaire et commissionnaire en douane',
    title: ['Plus loin', 'avec vous'],
    description:
      'Des solutions de transit et de transport fiables pour un monde de nouvelles opportunités.',
    cta: { label: 'Découvrir nos services', href: '/services' },
    image: heroImage,
    imageMobile: heroImageMobile,
  },
  {
    eyebrow: 'Transit & Douane',
    title: ['Vos dossiers,', 'entre expertes mains'],
    description:
      'Une gestion structurée de vos opérations douanières et un suivi rigoureux à chaque étape.',
    cta: { label: 'Nos expertises', href: '/services' },
    image: cover2,
    imageMobile: cover2Mobile,
  },
  {
    eyebrow: 'Logistique intégrée',
    title: ['Un partenaire', 'de confiance'],
    description:
      'Une équipe engagée pour accompagner vos flux du départ à la destination finale.',
    cta: { label: 'Nous contacter', href: '/contact' },
    image: heroImage,
    imageMobile: heroImageMobile,
  },
]

const STATS = [
  { icon: faCalendarDays, value: '2010', label: ['Année de', 'création'] },
  { icon: faUsers, value: '20+', label: ['Experts', 'à votre service'] },
  { icon: faLayerGroup, value: '6', label: ['Pôles d’activité', 'à l’international'] },
]

const AUTOPLAY_MS = 6000

function Hero() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const dragStartX = useRef(null)
  const dragged = useRef(false)

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
      {/* Background image (per slide with fade transition) */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.picture
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <source media="(min-width: 1024px)" srcSet={slide.image} />
            <img
              src={slide.imageMobile}
              alt="Terminal portuaire — logistique ASTT"
              className="h-full w-full object-cover object-center"
            />
          </motion.picture>
        </AnimatePresence>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(19,26,43,0.9) 0%, rgba(19,26,43,0.65) 30%, rgba(19,26,43,0.6) 65%, rgba(19,26,43,0.7) 100%)',
          }}
        />
      </div>

      {/* Main hero content */}
      <div
        className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-[1440px] flex-col px-6 sm:px-10 lg:px-14"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        style={{ touchAction: 'pan-y' }}
      >
        <div className="flex flex-1 items-center justify-center py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="flex w-full flex-col items-center text-center"
            >
              <div className="flex items-center justify-center gap-4 sm:gap-8">
                <span className="h-[2px] w-6 shrink-0 bg-orange sm:w-9" />
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/90 sm:text-sm lg:text-[15px] lg:tracking-[0.35em]">
                  {slide.eyebrow}
                </span>
                <span className="h-[2px] w-6 shrink-0 bg-white/70 sm:w-9" />
              </div>

              <h1 className="mt-5 max-w-4xl font-extrabold leading-[1.02] tracking-tight text-white text-[40px] sm:text-6xl lg:text-[76px]">
                {slide.title[0]}
                <br />
                {slide.title[1]}
              </h1>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/85 sm:max-w-lg sm:text-base lg:text-lg">
                {slide.description}
              </p>

              <div className="mt-8">
                <a
                  href={slide.cta.href}
                  onClick={(e) => {
                    if (dragged.current) e.preventDefault()
                  }}
                  className="group inline-flex items-center gap-5 rounded-full bg-orange px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange/30 transition-all hover:bg-orange-600 lg:text-[15px]"
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
        </div>

        {/* Stats card — pinned at the bottom of the hero */}
        <motion.div
          id="stats"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
          className="relative mx-auto mb-6 w-full max-w-[1260px] rounded-3xl bg-navy-900/90 px-4 py-6 ring-1 ring-white/10 backdrop-blur-sm sm:px-8 lg:mb-8 lg:px-14 lg:py-7"
        >
          <div className="grid grid-cols-3 gap-2 sm:gap-6">
            {STATS.map((s, i) => (
              <div
                key={s.value}
                className={`flex flex-col items-center gap-2 text-center text-white md:flex-row md:items-end md:gap-5 md:text-left lg:gap-10 ${
                  i > 0 ? 'md:border-l md:border-white/10 md:pl-6 lg:pl-20' : ''
                }`}
              >
                <div className="flex flex-col items-center md:items-start">
                  <FontAwesomeIcon
                    icon={s.icon}
                    className="text-base text-white/85 sm:text-xl lg:text-2xl"
                  />
                  <div className="mt-2 text-xl font-extrabold leading-none tracking-tight sm:text-3xl lg:text-[38px]">
                    {s.value}
                  </div>
                </div>
                <div className="text-[10px] leading-snug text-white/70 sm:text-xs lg:text-sm">
                  {s.label[0]} <br className="hidden md:block" />
                  {s.label[1]}
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
