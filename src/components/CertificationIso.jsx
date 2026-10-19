import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faArrowsRotate,
  faClipboardCheck,
  faDiagramProject,
  faFaceSmile,
  faFilePdf,
} from '@fortawesome/free-solid-svg-icons'
import isoImage from '../assets/certification-iso-9001.jpg'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: i * 0.08 },
  }),
}

const ENGAGEMENTS = [
  { icon: faDiagramProject, label: 'Processus maîtrisés' },
  { icon: faFaceSmile, label: 'Satisfaction client' },
  { icon: faArrowsRotate, label: 'Amélioration continue' },
  { icon: faClipboardCheck, label: 'Traçabilité' },
]

function CertificationIso() {
  return (
    <section
      id="certification"
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          {/* LEFT — visuel de certification */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            {/* Accent décalé derrière l'image */}
            <div
              className="pointer-events-none absolute -bottom-4 -left-4 h-2/3 w-2/3 rounded-3xl bg-navy sm:-bottom-5 sm:-left-5"
              aria-hidden="true"
            />
            <img
              src={isoImage}
              alt="ASTT – Jouini Group, certifié ISO 9001:2015 : la qualité au cœur de notre engagement"
              loading="lazy"
              width="1000"
              height="1000"
              className="relative mx-auto aspect-square w-full max-w-[520px] rounded-3xl object-cover shadow-2xl shadow-navy/20 ring-1 ring-navy/5"
            />
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
                Certification
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              custom={1}
              className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-navy sm:text-4xl lg:text-[46px]"
            >
              Certifiée <span className="text-orange">ISO 9001:2015</span>, la
              qualité au cœur de chaque opération.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              custom={2}
              className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink/70"
            >
              ASTT est certifiée ISO 9001:2015. Cette certification atteste que notre
              système de management de la qualité répond aux exigences de la
              norme internationale et qu&apos;il est régulièrement évalué lors
              d&apos;audits indépendants.
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              custom={3}
              className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink/70"
            >
              Pour nos clients, c&apos;est la garantie d&apos;un service
              structuré, fiable et en constante amélioration, du traitement des
              dossiers jusqu&apos;à la livraison.
            </motion.p>

            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {ENGAGEMENTS.map((e, i) => (
                <motion.li
                  key={e.label}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  custom={4 + i}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-navy/10 bg-[#f7f8fb] px-3 py-5 text-center transition-all hover:-translate-y-0.5 hover:border-orange/30 hover:bg-white hover:shadow-lg hover:shadow-navy/5"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-mint/70 text-navy transition-colors group-hover:bg-orange group-hover:text-white">
                    <FontAwesomeIcon icon={e.icon} className="text-base" />
                  </span>
                  <span className="text-[13px] font-bold leading-tight text-navy">
                    {e.label}
                  </span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              custom={8}
              className="mt-8"
            >
              <Link
                to="/certification"
                className="group inline-flex items-center gap-4 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange/25 transition-all hover:bg-orange-600"
              >
                <FontAwesomeIcon icon={faFilePdf} className="text-base" />
                Voir le certificat
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-sm transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CertificationIso
