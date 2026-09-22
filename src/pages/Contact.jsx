import { useState } from 'react'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faBuilding,
  faCheck,
  faClock,
  faEnvelope,
  faLocationDot,
  faMobileScreen,
  faPaperPlane,
  faPhone,
} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons'

const CONTACT_ITEMS = [
  {
    icon: faLocationDot,
    title: 'Adresse',
    lines: ['Siège social', 'Grombalia, Tunisie'],
  },
  {
    icon: faPhone,
    title: 'Téléphone',
    lines: ['72 25 56 00'],
    href: 'tel:+21672255600',
  },
  {
    icon: faMobileScreen,
    title: 'Mobile',
    lines: ['27 627 527'],
    href: 'tel:+21627627527',
  },
  {
    icon: faEnvelope,
    title: 'Email',
    lines: ['contact@astt.tn'],
    href: 'mailto:contact@astt.tn',
  },
]

const HOURS = [
  { day: 'Lundi – Vendredi', slot: '08h – 13h  /  14h – 17h' },
  { day: 'Samedi', slot: '08h – 14h' },
  { day: 'Dimanche', slot: 'Fermé', closed: true },
]

const SUBJECTS = [
  'Demande de devis',
  'Renseignement Import',
  'Renseignement Export',
  'Suivi de dossier',
  'Autre',
]

const SOCIALS = [
  { icon: faLinkedinIn, href: '#', label: 'LinkedIn' },
  { icon: faFacebookF, href: '#', label: 'Facebook' },
  { icon: faInstagram, href: '#', label: 'Instagram' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.08 },
  }),
}

function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

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
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-3"
          >
            <span className="h-px w-10 bg-orange" />
            <span className="rounded-full bg-orange/20 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.25em] text-orange">
              Contact
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Parlons de vos <span className="text-mint">projets</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-5 max-w-2xl text-sm leading-relaxed text-white/70 lg:text-base"
          >
            Notre équipe est à votre écoute pour étudier vos besoins en
            transit, transport et logistique et vous accompagner à chaque
            étape.
          </motion.p>
        </div>
      </section>

      {/* Contact cards row */}
      <section className="relative bg-white pt-12 lg:pt-16">
        <div className="mx-auto max-w-[1280px] px-8 sm:px-12 lg:px-20">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {CONTACT_ITEMS.map((c, i) => {
              const Wrapper = c.href ? 'a' : 'div'
              return (
                <motion.div
                  key={c.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={i}
                >
                  <Wrapper
                    {...(c.href ? { href: c.href } : {})}
                    className="group flex h-full flex-col gap-3 rounded-2xl border border-navy/10 bg-white p-6 transition-all hover:-translate-y-1 hover:border-orange/40 hover:shadow-lg hover:shadow-navy/5"
                  >
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-mint/60 text-navy transition-colors group-hover:bg-orange group-hover:text-white">
                      <FontAwesomeIcon icon={c.icon} className="text-lg" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-orange">
                        {c.title}
                      </div>
                      {c.lines.map((l, j) => (
                        <div
                          key={j}
                          className="mt-1 text-sm font-semibold text-navy"
                        >
                          {l}
                        </div>
                      ))}
                    </div>
                  </Wrapper>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="relative bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-[1280px] px-8 sm:px-12 lg:px-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-navy/10 bg-white p-8 shadow-xl shadow-navy/5 lg:col-span-3 lg:p-10"
            >
              <div className="inline-flex items-center gap-3">
                <span className="h-px w-8 bg-orange" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange">
                  Envoyez-nous un message
                </span>
              </div>
              <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">
                Comment pouvons-nous vous aider ?
              </h2>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy/70">
                      Nom complet *
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Votre nom"
                      className="w-full rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-ink/40 outline-none transition-colors focus:border-orange"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy/70">
                      Email *
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="vous@email.com"
                      className="w-full rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-ink/40 outline-none transition-colors focus:border-orange"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy/70">
                      Téléphone
                    </span>
                    <input
                      type="tel"
                      placeholder="+216 ..."
                      className="w-full rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-ink/40 outline-none transition-colors focus:border-orange"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy/70">
                      Sujet *
                    </span>
                    <select
                      required
                      defaultValue=""
                      className="w-full rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition-colors focus:border-orange"
                    >
                      <option value="" disabled>
                        Sélectionnez un sujet
                      </option>
                      {SUBJECTS.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy/70">
                    Message *
                  </span>
                  <textarea
                    required
                    rows="5"
                    placeholder="Décrivez brièvement votre besoin..."
                    className="w-full resize-none rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-ink/40 outline-none transition-colors focus:border-orange"
                  />
                </label>

                <label className="flex items-start gap-3 text-xs text-ink/70">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 h-4 w-4 accent-orange"
                  />
                  <span>
                    J&apos;accepte que mes informations soient utilisées pour
                    répondre à ma demande. Consultez notre{' '}
                    <a href="#" className="font-semibold text-orange hover:underline">
                      politique de confidentialité
                    </a>
                    .
                  </span>
                </label>

                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 rounded-md bg-orange px-7 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-orange/20 transition-all hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={sent}
                >
                  {sent ? (
                    <>
                      <FontAwesomeIcon icon={faCheck} className="text-sm" />
                      Message envoyé !
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
                        <FontAwesomeIcon
                          icon={faPaperPlane}
                          className="text-[11px]"
                        />
                      </span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Right column: hours + company + socials */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              {/* Hours */}
              <div className="rounded-3xl bg-navy p-8 text-white shadow-xl shadow-navy/20">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-orange text-white">
                    <FontAwesomeIcon icon={faClock} className="text-base" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Horaires d&apos;ouverture
                  </h3>
                </div>
                <ul className="mt-6 space-y-3">
                  {HOURS.map((h) => (
                    <li
                      key={h.day}
                      className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-sm font-medium text-white/85">
                        {h.day}
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          h.closed ? 'text-orange' : 'text-mint'
                        }`}
                      >
                        {h.slot}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company card */}
              <div className="mt-6 rounded-3xl border border-navy/10 bg-mint/40 p-8">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-orange text-white">
                    <FontAwesomeIcon icon={faBuilding} className="text-base" />
                  </div>
                  <h3 className="text-lg font-bold text-navy">Informations</h3>
                </div>
                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-navy/60">Identifiant unique</dt>
                    <dd className="font-semibold text-navy">1163380 M/A/M 000</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-navy/60">Capital</dt>
                    <dd className="font-semibold text-navy">10 000 DT</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-navy/60">Groupe</dt>
                    <dd className="font-semibold text-navy">Jouni Group</dd>
                  </div>
                </dl>

                <div className="mt-6 flex items-center gap-3 border-t border-navy/10 pt-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-navy/70">
                    Suivez-nous
                  </span>
                  <div className="flex items-center gap-2">
                    {SOCIALS.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        aria-label={s.label}
                        className="grid h-8 w-8 place-items-center rounded-full border border-navy/15 bg-white text-navy transition-all hover:border-orange hover:bg-orange hover:text-white"
                      >
                        <FontAwesomeIcon icon={s.icon} className="text-xs" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="relative bg-white pb-16 lg:pb-20">
        <div className="mx-auto max-w-[1280px] px-8 sm:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-3xl border border-navy/10 shadow-xl shadow-navy/5"
          >
            <div className="flex items-center justify-between gap-4 bg-navy px-6 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-orange text-white">
                  <FontAwesomeIcon icon={faLocationDot} className="text-sm" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-mint">
                    Notre localisation
                  </div>
                  <div className="text-sm font-bold">
                    Grombalia, Tunisie
                  </div>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Grombalia,+Tunisie"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-md bg-orange px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-orange-600"
              >
                Itinéraire
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-[10px] transition-transform group-hover:translate-x-0.5"
                />
              </a>
            </div>
            <iframe
              title="ASTT — Grombalia, Tunisie"
              src="https://www.google.com/maps?q=Grombalia,+Tunisie&hl=fr&z=13&output=embed"
              className="h-[400px] w-full border-0 lg:h-[480px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Contact
