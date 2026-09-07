import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'
import { SERVICES, getServiceBySlug } from '../data/services'
import heroImage from '../assets/hero-image.webp'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.08 },
  }),
}

function ServiceDetail() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)

  if (!service) return <Navigate to="/services" replace />

  const others = SERVICES.filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <>
      {/* Hero */}
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
          {/* Breadcrumb */}
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
            <Link
              to="/services"
              className="transition-colors hover:text-white"
            >
              Services
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-orange">{service.title}</span>
          </motion.nav>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="inline-flex items-center gap-3"
              >
                <span className="h-px w-10 bg-orange" />
                <span className="rounded-full bg-orange/20 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.25em] text-orange">
                  Service {service.number}
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={1}
                className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                {service.title}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={2}
                className="mt-5 max-w-2xl text-sm leading-relaxed text-white/70 lg:text-base"
              >
                {service.tagline}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="hidden lg:col-span-4 lg:flex lg:justify-center"
            >
              <div className="grid h-40 w-40 place-items-center rounded-3xl bg-gradient-to-br from-orange to-orange-600 shadow-2xl shadow-orange/40">
                <FontAwesomeIcon
                  icon={service.icon}
                  className="text-6xl text-white"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Description + features */}
      <section className="relative bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-[1280px] px-8 sm:px-12 lg:px-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left — image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-navy/15">
                <img
                  src={heroImage}
                  alt={service.title}
                  className="h-[380px] w-full object-cover lg:h-[520px]"
                />
                <div className="absolute bottom-5 left-5 rounded-xl bg-navy/95 px-4 py-3 shadow-xl shadow-black/40 backdrop-blur-sm sm:bottom-6 sm:left-6">
                  <div className="flex items-center gap-3 text-white">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-orange">
                      <FontAwesomeIcon icon={service.icon} className="text-base" />
                    </div>
                    <div>
                      <div className="text-[10px] font-medium uppercase tracking-wider text-mint">
                        Service {service.number}
                      </div>
                      <div className="text-sm font-bold">{service.title}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — content */}
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
                  Présentation
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                custom={1}
                className="mt-5 text-2xl font-bold leading-tight tracking-tight text-navy sm:text-3xl lg:text-4xl"
              >
                {service.tagline}
              </motion.h2>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                custom={2}
                className="mt-5 text-sm leading-relaxed text-ink/70 lg:text-base"
              >
                {service.intro}
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                custom={3}
                className="mt-8 space-y-4"
              >
                {service.features.map((f) => (
                  <div
                    key={f.title}
                    className="flex items-start gap-4 rounded-xl border border-navy/10 bg-white p-4 transition-all hover:border-orange/40 hover:shadow-md hover:shadow-navy/5"
                  >
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-orange text-white">
                      <FontAwesomeIcon icon={faCheck} className="text-xs" />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-navy">{f.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink/65">
                        {f.text}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                custom={4}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center gap-3 rounded-md bg-orange px-7 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-orange/20 transition-all hover:bg-orange-600"
                >
                  Demander un devis
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
                    <FontAwesomeIcon icon={faArrowRight} className="text-[11px]" />
                  </span>
                </Link>
                <Link
                  to="/services"
                  className="group inline-flex items-center justify-center gap-3 rounded-md border border-navy/20 px-7 py-4 text-sm font-bold uppercase tracking-wider text-navy transition-all hover:border-navy hover:bg-navy hover:text-white"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="text-[11px]" />
                  Tous les services
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="relative bg-mint/30 py-12 lg:py-16">
        <div className="mx-auto max-w-[1280px] px-8 sm:px-12 lg:px-20">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-3">
                <span className="h-px w-10 bg-orange" />
                <span className="rounded-full bg-orange/10 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.25em] text-orange">
                  Autres services
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-navy sm:text-3xl">
                Explorez nos autres pôles
              </h2>
            </div>
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-navy transition-colors hover:text-orange"
            >
              Voir tout
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-xs transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to={`/services/${s.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-orange/40 hover:shadow-xl hover:shadow-navy/10"
                >
                  <span className="absolute right-5 top-4 text-5xl font-extrabold text-navy/[0.04] transition-colors group-hover:text-orange/10">
                    {s.number}
                  </span>
                  <div className="relative grid h-12 w-12 place-items-center rounded-xl bg-mint/60 text-navy transition-colors group-hover:bg-orange group-hover:text-white">
                    <FontAwesomeIcon icon={s.icon} className="text-lg" />
                  </div>
                  <h3 className="relative mt-4 text-lg font-bold text-navy transition-colors group-hover:text-orange">
                    {s.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-ink/65">
                    {s.short}
                  </p>
                  <div className="relative mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange">
                    Découvrir
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-[10px] transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ServiceDetail
