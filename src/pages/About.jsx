import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faBullseye,
  faCheck,
  faEye,
  faHandshake,
} from '@fortawesome/free-solid-svg-icons'
import heroImage from '../assets/hero-image.webp'
import JouniGroup from '../components/JouniGroup'
import WhyAstt from '../components/WhyAstt'
import Team from '../components/Team'

const PILLARS = [
  {
    icon: faBullseye,
    title: 'Notre mission',
    text: 'Accompagner les entreprises dans la gestion complète de leurs opérations de transit, transport et logistique avec un service fiable et de qualité.',
  },
  {
    icon: faEye,
    title: 'Notre vision',
    text: 'Devenir la référence tunisienne en matière de transit et d’opérations douanières grâce à une expertise reconnue et une approche digitalisée.',
  },
  {
    icon: faHandshake,
    title: 'Nos engagements',
    text: 'Qualité de service, rapidité d’exécution, disponibilité, responsabilité, crédibilité et digitalisation au cœur de chaque opération.',
  },
]

const STATS = [
  { value: '1980', label: 'Fondation de Jouni Group' },
  { value: '16', label: 'Collaborateurs' },
  { value: '6', label: 'Services spécialisés' },
  { value: '100%', label: 'Société totalement exportatrice' },
]

const HIGHLIGHTS = [
  'Filiale du Jouni Group depuis sa création',
  'Équipe expérimentée et dédiée',
  'Approche digitalisée des opérations',
  'Suivi rigoureux de chaque dossier',
  'Processus structurés et fiables',
  'Excellence du service au cœur de nos valeurs',
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.08 },
  }),
}

function About() {
  return (
    <>
      {/* Page hero */}
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
            <span className="text-orange">À propos</span>
          </motion.nav>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-3"
          >
            <span className="h-px w-10 bg-orange" />
            <span className="rounded-full bg-orange/20 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.25em] text-orange">
              À propos d’ASTT
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Votre partenaire de confiance
            <br className="hidden sm:inline" />
            en <span className="text-mint">transit</span> &amp;{' '}
            <span className="text-orange">logistique</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-5 max-w-2xl text-sm leading-relaxed text-white/70 lg:text-base"
          >
            Une équipe expérimentée, un savoir-faire reconnu et une approche
            digitalisée pour accompagner vos opérations de transit, transport
            et logistique en toute sérénité.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="relative bg-white py-12 lg:py-16">
        <div
          className="pointer-events-none absolute right-0 top-20 h-40 w-40 opacity-[0.08]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #202b45 1.5px, transparent 1.5px)',
            backgroundSize: '18px 18px',
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1280px] px-8 sm:px-12 lg:px-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-navy/20">
                <img
                  src={heroImage}
                  alt="ASTT — Notre histoire"
                  className="h-[420px] w-full object-cover lg:h-[560px]"
                />
                <div className="absolute bottom-5 left-5 rounded-xl bg-navy/95 px-4 py-3 shadow-xl shadow-black/40 backdrop-blur-sm sm:bottom-6 sm:left-6">
                  <div className="flex items-center gap-3 text-white">
                    <span className="text-3xl font-extrabold text-mint">45+</span>
                    <span className="h-9 w-px bg-white/20" />
                    <span className="text-xs font-medium leading-tight">
                      Années
                      <br />
                      d’expérience
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <div>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                className="inline-flex items-center gap-3"
              >
                <span className="h-px w-10 bg-orange" />
                <span className="rounded-full bg-orange/10 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.25em] text-orange">
                  Notre histoire
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
                Une expertise construite depuis{' '}
                <span className="text-orange">plus de 40 ans</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                custom={2}
                className="mt-6 text-sm leading-relaxed text-ink/70 lg:text-base"
              >
                ASTT est une société tunisienne spécialisée dans le{' '}
                <strong className="text-navy">transit</strong> et les opérations
                douanières. Filiale de{' '}
                <strong className="text-navy">Jouni Group</strong>, fondé en
                1980, elle accompagne les entreprises dans leurs opérations
                d’importation et d’exportation.
              </motion.p>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                custom={3}
                className="mt-4 text-sm leading-relaxed text-ink/70 lg:text-base"
              >
                Totalement exportatrice, ASTT s’appuie sur une équipe dynamique
                de <strong className="text-navy">16 collaborateurs</strong> et
                mise sur la fiabilité, la réactivité, la qualité de service et
                la digitalisation.
              </motion.p>

              <motion.ul
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                custom={4}
                className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                {HIGHLIGHTS.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-orange text-white">
                      <FontAwesomeIcon icon={faCheck} className="text-[9px]" />
                    </span>
                    <span className="text-sm font-medium text-navy">{h}</span>
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-14 grid grid-cols-2 gap-4 rounded-2xl border border-navy/10 bg-white p-6 shadow-lg shadow-navy/5 sm:grid-cols-4 lg:mt-16 lg:p-8"
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col ${
                  i !== STATS.length - 1
                    ? 'sm:border-r sm:border-navy/10 sm:pr-4'
                    : ''
                }`}
              >
                <div className="text-3xl font-extrabold text-orange lg:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs font-medium leading-snug text-navy/70">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Engagements */}
      <section className="relative bg-mint/30 py-12 lg:py-16">
        <div className="mx-auto max-w-[1280px] px-8 sm:px-12 lg:px-20">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              className="inline-flex items-center gap-3"
            >
              <span className="h-px w-10 bg-orange" />
              <span className="rounded-full bg-orange/10 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.25em] text-orange">
                Notre approche
              </span>
              <span className="h-px w-10 bg-orange" />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              custom={1}
              className="mt-5 text-3xl font-bold leading-tight tracking-tight text-navy sm:text-4xl lg:text-[42px]"
            >
              Ce qui guide notre{' '}
              <span className="text-orange">quotidien</span>
            </motion.h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-7">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
                className="group relative overflow-hidden rounded-2xl border border-navy/10 bg-white p-7 transition-all hover:-translate-y-1 hover:border-orange/40 hover:shadow-2xl hover:shadow-navy/10"
              >
                <div className="grid h-14 w-14 place-items-center rounded-xl bg-orange/10 text-orange transition-colors group-hover:bg-orange group-hover:text-white">
                  <FontAwesomeIcon icon={p.icon} className="text-xl" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-navy transition-colors group-hover:text-orange">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  {p.text}
                </p>
                <span className="mt-5 block h-0.5 w-10 rounded-full bg-orange transition-all group-hover:w-20" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reuse existing sections */}
      <WhyAstt />
      <JouniGroup />
      <Team />

      {/* Final CTA band */}
      <section className="relative bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-[1280px] px-8 sm:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy to-navy-900 px-8 py-12 text-center shadow-2xl shadow-navy/20 sm:px-12 sm:py-14"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
              aria-hidden="true"
            />
            <div className="relative">
              <div className="inline-flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-orange" />
                <span className="rounded-full bg-orange/20 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.25em] text-orange">
                  Passons à l’action
                </span>
                <span className="h-px w-10 bg-orange" />
              </div>
              <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl">
                Discutons de vos{' '}
                <span className="text-mint">projets</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70 lg:text-base">
                Notre équipe est à votre disposition pour étudier vos besoins
                et vous proposer une solution adaptée.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 rounded-md bg-orange px-7 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-orange/20 transition-all hover:bg-orange-600"
                >
                  Nous contacter
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-[11px]"
                    />
                  </span>
                </Link>
                <Link
                  to="/services"
                  className="group inline-flex items-center gap-3 rounded-md border border-white/30 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:border-white hover:bg-white/5"
                >
                  Nos services
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-[11px]"
                  />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default About
