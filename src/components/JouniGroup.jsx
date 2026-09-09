import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faBriefcase,
  faEarthAfrica,
  faShip,
  faSitemap,
} from '@fortawesome/free-solid-svg-icons'

const COMPANIES = [
  {
    icon: faBriefcase,
    name: 'Consulting',
    text: 'Conseil et accompagnement stratégique aux entreprises.',
  },
  {
    icon: faEarthAfrica,
    name: 'Commerce international',
    text: 'Opérations d’import et d’export à l’échelle internationale.',
  },
  {
    icon: faShip,
    name: 'Transit — ASTT',
    text: 'Transit, opérations douanières et logistique.',
    highlight: true,
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

function JouniGroup() {
  return (
    <section
      id="groupe"
      className="relative overflow-hidden bg-mint/30 py-16 lg:py-24"
    >
      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-14">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="inline-flex items-center gap-3"
          >
            <span className="h-[2px] w-8 bg-orange" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-navy">
              ASTT &amp; Jouni Group
            </span>
            <span className="h-[2px] w-8 bg-orange" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            custom={1}
            className="mt-5 text-3xl font-bold leading-tight tracking-tight text-navy sm:text-4xl lg:text-[42px]"
          >
            ASTT, membre du{' '}
            <span className="text-orange">Jouni Group</span> depuis plus de{' '}
            <span className="text-orange">40 ans</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            custom={2}
            className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-ink/70 lg:text-base"
          >
            Fondé en 1980, Jouni Group regroupe plusieurs sociétés intervenant
            dans le consulting, le commerce international et le transit. ASTT
            est la filiale spécialisée dans les opérations douanières et
            logistiques.
          </motion.p>
        </div>

        {/* Group structure diagram */}
        <div className="relative mt-14 lg:mt-16">
          {/* Parent — Jouni Group */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="mx-auto flex w-fit items-center gap-4 rounded-2xl bg-navy px-8 py-5 shadow-xl shadow-navy/20"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-orange text-white">
              <FontAwesomeIcon icon={faSitemap} className="text-lg" />
            </div>
            <div className="text-left">
              <div className="text-xs font-medium uppercase tracking-wider text-orange">
                Groupe parent
              </div>
              <div className="text-xl font-extrabold text-white">
                Jouni Group
              </div>
            </div>
            <div className="ml-4 border-l border-white/20 pl-4 text-xs text-white/60">
              Fondé en
              <div className="text-lg font-bold text-white">1980</div>
            </div>
          </motion.div>

          {/* Vertical trunk */}
          <div className="mx-auto h-10 w-px bg-navy/20 lg:h-12" aria-hidden="true" />

          {/* Horizontal branch (desktop only) */}
          <div className="relative hidden lg:block">
            <div className="mx-auto h-px w-2/3 bg-navy/20" aria-hidden="true" />
            <div className="absolute left-1/6 top-0 h-6 w-px bg-navy/20" />
            <div className="absolute left-1/2 top-0 h-6 w-px -translate-x-1/2 bg-navy/20" />
            <div className="absolute right-1/6 top-0 h-6 w-px bg-navy/20" />
          </div>

          {/* Companies grid */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-6 lg:gap-6">
            {COMPANIES.map((c, i) => (
              <motion.div
                key={c.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
                className={`group relative overflow-hidden rounded-2xl p-6 transition-all hover:-translate-y-1 ${
                  c.highlight
                    ? 'border-2 border-orange bg-orange/5 shadow-lg shadow-orange/10'
                    : 'border border-navy/10 bg-white hover:border-orange/40 hover:shadow-lg hover:shadow-navy/5'
                }`}
              >
                {c.highlight && (
                  <span className="absolute right-4 top-4 rounded-full bg-orange px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    Filiale
                  </span>
                )}
                <div
                  className={`grid h-12 w-12 place-items-center rounded-xl transition-colors ${
                    c.highlight
                      ? 'bg-orange text-white'
                      : 'bg-navy/5 text-navy group-hover:bg-orange group-hover:text-white'
                  }`}
                >
                  <FontAwesomeIcon icon={c.icon} className="text-lg" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  {c.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mt-14 flex justify-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-4 rounded-full border border-navy/20 bg-white px-6 py-3 text-sm font-semibold text-navy transition-all hover:border-navy hover:bg-navy hover:text-white"
          >
            En savoir plus sur le groupe
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-sm transition-transform group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default JouniGroup
