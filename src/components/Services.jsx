import { useRef } from 'react'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faArrowRight,
  faBoxOpen,
  faCalculator,
  faFileInvoice,
  faLaptopCode,
  faShip,
  faTruckFast,
} from '@fortawesome/free-solid-svg-icons'

const SERVICES = [
  {
    number: '01',
    id: 'service-import',
    icon: faShip,
    title: 'Import',
    text: 'Gestion et accompagnement des opérations d’importation, du dédouanement à la livraison.',
  },
  {
    number: '02',
    id: 'service-export',
    icon: faTruckFast,
    title: 'Export',
    text: 'Gestion et accompagnement des opérations d’exportation, avec un suivi complet de vos dossiers.',
  },
  {
    number: '03',
    id: 'service-declaration',
    icon: faFileInvoice,
    title: 'Traitement de déclaration',
    text: 'Traitement des dossiers et déclarations douanières via le système TTN.',
  },
  {
    number: '04',
    id: 'service-comptabilite',
    icon: faCalculator,
    title: 'Comptabilité',
    text: 'Suivi administratif, financier et comptable de vos opérations et de vos règlements.',
  },
  {
    number: '05',
    id: 'service-suivi',
    icon: faBoxOpen,
    title: 'Suivi',
    text: 'Suivi des opérations douanières et gestion des informations relatives à vos dossiers.',
  },
  {
    number: '06',
    id: 'service-digitalisation',
    icon: faLaptopCode,
    title: 'Digitalisation',
    text: 'Solutions digitales développées pour améliorer le suivi et la gestion de vos opérations.',
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

function ServiceCard({ s }) {
  return (
    <a
      href={`#${s.id}`}
      className="group relative flex w-[320px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-orange/40 hover:shadow-2xl hover:shadow-navy/10 sm:w-[360px]"
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
        {s.text}
      </p>

      <div className="relative mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-navy transition-colors group-hover:text-orange">
        En savoir plus
        <span className="grid h-6 w-6 place-items-center rounded-full bg-navy/5 text-navy transition-all group-hover:translate-x-1 group-hover:bg-orange group-hover:text-white">
          <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
        </span>
      </div>
    </a>
  )
}

function Services() {
  const trackRef = useRef(null)

  const scrollBy = (dir) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('a')
    const step = (card?.offsetWidth ?? 320) + 24
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-mint/30 py-12 lg:py-16"
    >
      <div
        className="pointer-events-none absolute left-0 top-24 h-40 w-40 opacity-[0.08]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #202a44 1.5px, transparent 1.5px)',
          backgroundSize: '18px 18px',
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1280px] px-8 sm:px-12 lg:px-20">
        {/* Header row */}
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              className="inline-flex items-center gap-3"
            >
              <span className="h-px w-10 bg-orange" />
              <span className="rounded-full bg-orange/10 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.25em] text-orange">
                Nos services
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              custom={1}
              className="mt-5 text-3xl font-bold leading-tight tracking-tight text-navy sm:text-4xl lg:text-[42px]"
            >
              Des services{' '}
              <span className="text-orange">spécialisés</span> pour accompagner
              vos opérations
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              custom={2}
              className="mt-5 max-w-xl text-sm leading-relaxed text-ink/70 lg:text-base"
            >
              ASTT s’appuie sur plusieurs pôles spécialisés permettant d’assurer
              une gestion structurée des opérations de transit, des procédures
              douanières et du suivi administratif.
            </motion.p>
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Précédent"
              onClick={() => scrollBy(-1)}
              className="grid h-12 w-12 place-items-center rounded-full border border-navy/15 bg-white text-navy transition-all hover:border-orange hover:bg-orange hover:text-white"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
            </button>
            <button
              type="button"
              aria-label="Suivant"
              onClick={() => scrollBy(1)}
              className="grid h-12 w-12 place-items-center rounded-full border border-navy/15 bg-white text-navy transition-all hover:border-orange hover:bg-orange hover:text-white"
            >
              <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="mx-auto mt-8 max-w-[1280px] px-8 sm:px-12 lg:mt-10 lg:px-20">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-gradient-to-l from-mint/30 to-transparent lg:block" />

          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {SERVICES.map((s) => (
              <ServiceCard key={s.id} s={s} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mx-auto mt-8 flex max-w-[1280px] justify-center px-8 sm:px-12 lg:px-20">
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          href="#services-all"
          className="group inline-flex items-center gap-3 rounded-md bg-navy px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-navy/20 transition-all hover:bg-orange"
        >
          Tous les services
          <span className="grid h-6 w-6 place-items-center rounded-full bg-orange text-white transition-transform group-hover:translate-x-1 group-hover:bg-white group-hover:text-orange">
            <FontAwesomeIcon icon={faArrowRight} className="text-[11px]" />
          </span>
        </motion.a>
      </div>
    </section>
  )
}

export default Services
