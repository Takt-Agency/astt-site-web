import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faEnvelope,
  faHeadset,
  faPhone,
} from '@fortawesome/free-solid-svg-icons'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.08 },
  }),
}

function CTASection() {
  return (
    <section id="contact" className="relative bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy to-navy-900 px-8 py-12 shadow-2xl shadow-navy/20 sm:px-12 sm:py-14 lg:px-16 lg:py-16"
        >
          {/* Decorative bg */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
            aria-hidden="true"
          />

          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
            {/* Content */}
            <div className="lg:col-span-8">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                className="flex items-center gap-3"
              >
                <span className="h-[2px] w-8 bg-orange" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/85">
                  Contactez-nous
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                custom={1}
                className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[44px]"
              >
                Prêt à confier vos opérations
                <br className="hidden sm:inline" /> à{' '}
                <span className="text-orange">un partenaire de confiance</span> ?
              </motion.h2>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                custom={2}
                className="mt-5 max-w-2xl text-sm leading-relaxed text-white/70 lg:text-base"
              >
                Notre équipe est à votre disposition pour étudier vos besoins
                en transit, transport et logistique et vous proposer une
                solution adaptée.
              </motion.p>

              {/* Contact chips */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                custom={3}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <a
                  href="tel:+21672255600"
                  className="group flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 transition-all hover:border-orange/50 hover:bg-white/[0.08]"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-orange text-white">
                    <FontAwesomeIcon icon={faPhone} className="text-xs" />
                  </span>
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider text-white/50">
                      Appelez-nous
                    </div>
                    <div className="text-sm font-bold text-white">
                      72 25 56 00
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:contact@astt.tn"
                  className="group flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 transition-all hover:border-orange/50 hover:bg-white/[0.08]"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-orange text-white">
                    <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
                  </span>
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider text-white/50">
                      Écrivez-nous
                    </div>
                    <div className="text-sm font-bold text-white">
                      contact@astt.tn
                    </div>
                  </div>
                </a>
              </motion.div>
            </div>

            {/* CTAs stack */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              custom={4}
              className="flex flex-col gap-3 lg:col-span-4 lg:items-end"
            >
              <Link
                to="/contact"
                className="group inline-flex w-full items-center justify-center gap-4 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange/25 transition-all hover:bg-orange-600 lg:w-auto"
              >
                Demander un devis
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-sm transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                to="/#services"
                className="group inline-flex w-full items-center justify-center gap-4 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/5 lg:w-auto"
              >
                Voir nos services
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-sm transition-transform group-hover:translate-x-1"
                />
              </Link>
              <div className="mt-2 flex items-center justify-center gap-2 text-xs text-white/50 lg:justify-end">
                <FontAwesomeIcon icon={faHeadset} className="text-orange" />
                Réponse sous 24 h
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection
