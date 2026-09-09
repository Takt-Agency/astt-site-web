import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import heroImage from '../assets/hero-image.webp'

const STATS = [
  { value: '1980', label: 'Fondation de Jouni Group' },
  { value: '16', label: 'Collaborateurs' },
  { value: '6', label: 'Services spécialisés' },
  { value: '100%', label: 'Société totalement exportatrice' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: i * 0.08 },
  }),
}

function About() {
  return (
    <section
      id="a-propos"
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div
        className="pointer-events-none absolute right-0 top-20 h-40 w-40 opacity-[0.08]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #202b45 1.5px, transparent 1.5px)',
          backgroundSize: '18px 18px',
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl shadow-2xl shadow-navy/20">
              <img
                src={heroImage}
                alt="ASTT — Transit et logistique"
                className="h-[420px] w-full object-cover lg:h-[560px]"
              />
            </div>

            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-navy p-5 shadow-xl shadow-navy/30 sm:block lg:-bottom-8 lg:-right-8 lg:p-6">
              <div className="flex items-center gap-4 text-white">
                <span className="text-4xl font-extrabold leading-none text-orange lg:text-5xl">
                  45+
                </span>
                <span className="h-10 w-px bg-white/20" />
                <span className="text-xs font-medium leading-tight lg:text-sm">
                  Années
                  <br />
                  d’expérience
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — content */}
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="h-[2px] w-8 bg-orange" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-navy">
                À propos d’ASTT
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              custom={1}
              className="mt-3 text-3xl font-bold leading-tight tracking-tight text-navy sm:text-4xl lg:text-[42px]"
            >
              Votre partenaire en{' '}
              <span className="text-orange">transit</span> &amp; logistique
            </motion.h2>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              custom={2}
              className="mt-4 h-1 w-16 rounded-full bg-orange"
            />

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              custom={3}
              className="mt-6 text-sm leading-relaxed text-ink/70 lg:text-base"
            >
              ASTT est une société tunisienne spécialisée dans le{' '}
              <strong className="text-navy">transit</strong> et les opérations
              douanières. Filiale de{' '}
              <strong className="text-navy">Jouni Group</strong>, fondé en 1980,
              elle accompagne les entreprises dans leurs opérations
              d’importation et d’exportation.
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              custom={4}
              className="mt-4 text-sm leading-relaxed text-ink/70 lg:text-base"
            >
              Grâce à une équipe de{' '}
              <strong className="text-navy">16 collaborateurs</strong>, ASTT
              mise sur la fiabilité, la réactivité, la qualité de service et la
              digitalisation.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={5}
              className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-navy/10 bg-white p-4 transition-all hover:border-orange/40 hover:shadow-lg hover:shadow-navy/5"
                >
                  <div className="text-2xl font-extrabold text-orange lg:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[11px] font-medium leading-snug text-navy/70">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              custom={6}
              className="mt-8"
            >
              <a
                href="#services"
                className="group inline-flex items-center gap-4 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange/25 transition-all hover:bg-orange-600"
              >
                Découvrir ASTT
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-sm transition-transform group-hover:translate-x-1"
                />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
