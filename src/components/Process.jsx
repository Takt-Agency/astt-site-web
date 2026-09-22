import { motion } from 'motion/react'

const STEPS = [
  {
    number: '01',
    title: 'Maîtrise des procédures',
    text: 'Une bonne connaissance concrète des formalités, des documents et des étapes nécessaires au bon déroulement de l’opération.',
  },
  {
    number: '02',
    title: 'Suivi et coordination',
    text: 'Vous informer, vous assister et intervenir rapidement à chaque étape de l’opération.',
  },
  {
    number: '03',
    title: 'Livraison et accompagnement',
    text: 'Une continuité de suivi et d’accompagnement via',
    link: { label: 'notre plateforme', href: 'https://app.astt.tn' },
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

function StepCard({ s }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-orange/40 hover:shadow-xl hover:shadow-navy/10 lg:p-7">
      <span className="absolute right-4 top-3 text-5xl font-extrabold text-navy/[0.05] transition-colors group-hover:text-orange/20 lg:text-6xl">
        {s.number}
      </span>

      <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-navy text-base font-extrabold text-white shadow-lg shadow-navy/20 transition-all group-hover:bg-orange group-hover:shadow-orange/25">
        {s.number}
      </span>

      <h3 className="relative mt-6 text-lg font-bold text-navy">{s.title}</h3>
      <p className="relative mt-2 flex-1 text-sm leading-relaxed text-ink/65">
        {s.text}
        {s.link && (
          <>
            {' '}
            <a
              href={s.link.href}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-orange hover:underline"
            >
              {s.link.label}
            </a>
            .
          </>
        )}
      </p>

      <span className="relative mt-5 block h-[2px] w-8 rounded-full bg-orange transition-all group-hover:w-16" />
    </div>
  )
}

function Process() {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-14">
        <div className="max-w-3xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="flex items-center gap-3"
          >
            <span className="h-[2px] w-8 bg-orange" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-navy">
              Notre process
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            custom={1}
            className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight text-navy sm:text-4xl lg:text-[42px]"
          >
            Un accompagnement
            <br />à <span className="text-orange">chaque étape.</span>
          </motion.h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-3">
          {STEPS.map((s) => (
            <StepCard key={s.number} s={s} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process
