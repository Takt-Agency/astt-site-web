import { useRef } from 'react'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faArrowRight,
  faEnvelope,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import {
  faLinkedinIn,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons'

const TEAM = [
  { name: 'Ahmed Ben Salah', role: 'Directeur Général' },
  { name: 'Sonia Trabelsi', role: 'Responsable Opérations' },
  { name: 'Karim Jouini', role: 'Responsable Transit' },
  { name: 'Leila Ferjani', role: 'Responsable Comptabilité' },
  { name: 'Mohamed Trabelsi', role: 'Responsable Import' },
  { name: 'Nadia Khelifi', role: 'Responsable Export' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.08 },
  }),
}

function TeamCard({ m }) {
  const initials = m.name
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')

  return (
    <div className="group relative flex w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-orange/40 hover:shadow-2xl hover:shadow-navy/10 sm:w-[300px]">
      {/* Photo placeholder */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-mint/60 to-mint">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-navy/40">
          <FontAwesomeIcon icon={faUser} className="text-5xl" />
          <span className="text-xl font-bold uppercase tracking-wider">
            {initials}
          </span>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/0 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

        {/* Socials overlay */}
        <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <a
            href="#"
            aria-label={`LinkedIn de ${m.name}`}
            className="grid h-9 w-9 place-items-center rounded-full bg-white text-navy transition-colors hover:bg-orange hover:text-white"
          >
            <FontAwesomeIcon icon={faLinkedinIn} className="text-xs" />
          </a>
          <a
            href="#"
            aria-label={`X de ${m.name}`}
            className="grid h-9 w-9 place-items-center rounded-full bg-white text-navy transition-colors hover:bg-orange hover:text-white"
          >
            <FontAwesomeIcon icon={faXTwitter} className="text-xs" />
          </a>
          <a
            href="#"
            aria-label={`Email de ${m.name}`}
            className="grid h-9 w-9 place-items-center rounded-full bg-white text-navy transition-colors hover:bg-orange hover:text-white"
          >
            <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
          </a>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 text-center">
        <h3 className="text-lg font-bold text-navy transition-colors group-hover:text-orange">
          {m.name}
        </h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-orange">
          {m.role}
        </p>
        <span className="mx-auto mt-3 block h-0.5 w-8 rounded-full bg-navy/15 transition-all group-hover:w-14 group-hover:bg-orange" />
      </div>
    </div>
  )
}

function Team() {
  const trackRef = useRef(null)

  const scrollBy = (dir) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('[data-team-card]')
    const step = (card?.offsetWidth ?? 300) + 24
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section
      id="equipe"
      className="relative overflow-hidden bg-white py-12 lg:py-16"
    >
      <div
        className="pointer-events-none absolute left-0 top-20 h-40 w-40 opacity-[0.08]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #202a44 1.5px, transparent 1.5px)',
          backgroundSize: '18px 18px',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1280px] px-8 sm:px-12 lg:px-20">
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
                Notre équipe
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
              Les <span className="text-orange">experts</span> qui accompagnent
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
              Une équipe expérimentée, dédiée et engagée pour assurer la
              réussite de vos opérations de transit, transport et logistique.
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
      <div className="mx-auto mt-10 max-w-[1280px] px-8 sm:px-12 lg:px-20">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-gradient-to-l from-white to-transparent lg:block" />

          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TEAM.map((m) => (
              <div key={m.name} data-team-card>
                <TeamCard m={m} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Team
