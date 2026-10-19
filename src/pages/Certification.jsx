import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowUpRightFromSquare,
  faClock,
  faDownload,
  faFilePdf,
} from '@fortawesome/free-solid-svg-icons'
import isoImage from '../assets/certification-iso-9001.jpg'

// Déposer le certificat dans Siteweb/public/documents/ sous ce nom
const CERTIFICATE_PDF = '/documents/certificat-iso-9001-2015.pdf'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.05 },
  }),
}

/** Vérifie que le PDF est bien présent (le serveur renvoie sinon la page HTML du site). */
function usePdfAvailable(url) {
  const [status, setStatus] = useState('checking')
  useEffect(() => {
    let cancelled = false
    fetch(url, { method: 'HEAD' })
      .then((res) => {
        const isPdf = res.ok && (res.headers.get('content-type') ?? '').includes('pdf')
        if (!cancelled) setStatus(isPdf ? 'ok' : 'missing')
      })
      .catch(() => {
        if (!cancelled) setStatus('missing')
      })
    return () => {
      cancelled = true
    }
  }, [url])
  return status
}

function Certification() {
  const pdfStatus = usePdfAvailable(CERTIFICATE_PDF)

  return (
    <>
      <section className="relative overflow-hidden bg-navy pt-32 pb-16 text-white lg:pt-40 lg:pb-20">
        <div
          className="pointer-events-none absolute -right-40 top-10 h-72 w-72 rounded-full bg-orange/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-14">
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
            <span className="text-orange">Certification</span>
          </motion.nav>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex items-center gap-3"
          >
            <span className="h-[2px] w-8 bg-orange" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/85">
              Système de management de la qualité
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Certification <span className="text-orange">ISO 9001:2015</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-5 max-w-2xl text-sm leading-relaxed text-white/70 lg:text-base"
          >
            Consultez et téléchargez le certificat ISO 9001:2015 d&apos;ASTT,
            gage de notre engagement envers la qualité, la rigueur et
            l&apos;amélioration continue.
          </motion.p>
        </div>
      </section>

      <section className="relative bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[4fr_8fr] lg:gap-14">
            {/* Visuel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative mx-auto w-full max-w-[420px] lg:sticky lg:top-32"
            >
              <div
                className="pointer-events-none absolute -bottom-4 -left-4 h-2/3 w-2/3 rounded-3xl bg-navy"
                aria-hidden="true"
              />
              <img
                src={isoImage}
                alt="ASTT – Jouini Group, certifié ISO 9001:2015"
                width="1000"
                height="1000"
                className="relative aspect-square w-full rounded-3xl object-cover shadow-2xl shadow-navy/20 ring-1 ring-navy/5"
              />
            </motion.div>

            {/* Certificat PDF */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-xl shadow-navy/5"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 bg-navy px-6 py-4 text-white">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-orange text-white">
                    <FontAwesomeIcon icon={faFilePdf} className="text-base" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-mint">
                      Document officiel
                    </div>
                    <div className="text-sm font-bold">Certificat ISO 9001:2015</div>
                  </div>
                </div>

                {pdfStatus === 'ok' && (
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={CERTIFICATE_PDF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10"
                    >
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[11px]" />
                      Ouvrir
                    </a>
                    <a
                      href={CERTIFICATE_PDF}
                      download="ASTT-certificat-ISO-9001-2015.pdf"
                      className="inline-flex items-center gap-2 rounded-md bg-orange px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-orange-600"
                    >
                      <FontAwesomeIcon icon={faDownload} className="text-[11px]" />
                      Télécharger
                    </a>
                  </div>
                )}
              </div>

              {pdfStatus === 'ok' ? (
                <>
                  {/* L'aperçu intégré n'est pas fiable sur mobile : boutons uniquement */}
                  <iframe
                    title="Certificat ISO 9001:2015 — ASTT"
                    src={`${CERTIFICATE_PDF}#view=FitH`}
                    className="hidden h-[820px] w-full border-0 bg-[#f7f8fb] lg:block"
                  />
                  <p className="px-6 py-8 text-center text-sm text-ink/70 lg:hidden">
                    Utilisez les boutons « Ouvrir » ou « Télécharger » pour
                    consulter le certificat.
                  </p>
                </>
              ) : (
                <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 px-6 py-12 text-center lg:min-h-[560px]">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-mint/60 text-navy">
                    <FontAwesomeIcon
                      icon={pdfStatus === 'checking' ? faFilePdf : faClock}
                      className="text-xl"
                    />
                  </span>
                  <p className="text-base font-semibold text-navy">
                    {pdfStatus === 'checking'
                      ? 'Chargement du certificat…'
                      : 'Le certificat sera bientôt disponible en téléchargement.'}
                  </p>
                  {pdfStatus === 'missing' && (
                    <p className="max-w-md text-sm text-ink/60">
                      Vous pouvez dès à présent en demander une copie auprès de
                      notre équipe.{' '}
                      <Link to="/contact" className="font-semibold text-orange hover:underline">
                        Nous contacter
                      </Link>
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Certification
