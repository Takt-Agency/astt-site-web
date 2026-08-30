import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
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
import iconAstt from '../assets/icon-astt.png'

const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/#a-propos' },
  { label: 'Nos services', href: '/#services' },
  { label: 'Notre expertise', href: '/#expertise' },
  { label: 'Actualités', href: '/#actualites' },
  { label: 'Contact', href: '/contact' },
]

const SERVICES = [
  { label: 'Import', href: '/#service-import' },
  { label: 'Export', href: '/#service-export' },
  { label: 'Traitement de déclaration', href: '/#service-declaration' },
  { label: 'Comptabilité', href: '/#service-comptabilite' },
  { label: 'Suivi', href: '/#service-suivi' },
  { label: 'Digitalisation', href: '/#service-digitalisation' },
]

const SOCIALS = [
  { icon: faLinkedinIn, href: '#', label: 'LinkedIn' },
  { icon: faFacebookF, href: '#', label: 'Facebook' },
  { icon: faInstagram, href: '#', label: 'Instagram' },
]

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      {/* Newsletter band */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start gap-6 px-8 py-10 sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:px-20">
          <div>
            <h3 className="text-2xl font-bold text-white lg:text-3xl">
              Restez informé de nos <span className="text-mint">actualités</span>
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Recevez nos dernières informations sur le transit, la douane et la
              logistique.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-md items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] p-1.5 lg:w-auto"
          >
            <input
              type="email"
              placeholder="Votre adresse email"
              className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
              required
            />
            <button
              type="submit"
              aria-label="S’abonner"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-orange text-white transition-colors hover:bg-orange-600"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="text-sm" />
            </button>
          </form>
        </div>
      </div>

      {/* Main grid */}
      <div className="relative mx-auto max-w-[1280px] px-8 py-16 sm:px-12 lg:px-20 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4"
          >
            <Link to="/" className="inline-flex items-center gap-3">
              <img src={iconAstt} alt="ASTT" className="h-11 w-auto" />
              <div className="leading-none">
                <div className="text-2xl font-extrabold italic tracking-tight text-white">
                  ASTT
                </div>
                <div className="mt-1 text-[11px] font-medium italic tracking-wide text-white/60">
                  Transit &amp; logistics
                </div>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Assistance Service de Transit et de Transport — filiale du{' '}
              <span className="font-semibold text-white/80">Jouni Group</span>,
              spécialisée dans le transit et les opérations douanières.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-white/80 transition-all hover:border-orange hover:bg-orange hover:text-white"
                >
                  <FontAwesomeIcon icon={s.icon} className="text-xs" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <span className="mt-3 block h-0.5 w-8 rounded-full bg-orange" />
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-orange"
                  >
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-[9px] opacity-0 transition-all group-hover:opacity-100"
                    />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Nos services
            </h4>
            <span className="mt-3 block h-0.5 w-8 rounded-full bg-orange" />
            <ul className="mt-5 space-y-3">
              {SERVICES.map((s) => (
                <li key={s.label}>
                  <Link
                    to={s.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-orange"
                  >
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-[9px] opacity-0 transition-all group-hover:opacity-100"
                    />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h4>
            <span className="mt-3 block h-0.5 w-8 rounded-full bg-orange" />
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3 text-white/70">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="mt-1 text-sm text-orange"
                />
                <span>Siège social — Grombalia, Tunisie</span>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="mt-1 text-sm text-orange"
                />
                <a
                  href="tel:+21672256821"
                  className="transition-colors hover:text-white"
                >
                  72 256 821
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <FontAwesomeIcon
                  icon={faMobileScreen}
                  className="mt-1 text-sm text-orange"
                />
                <a
                  href="tel:+21627627527"
                  className="transition-colors hover:text-white"
                >
                  27 627 527
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="mt-1 text-sm text-orange"
                />
                <a
                  href="mailto:contact@astt-group.com"
                  className="break-all transition-colors hover:text-white"
                >
                  contact@astt-group.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <FontAwesomeIcon
                  icon={faClock}
                  className="mt-1 text-sm text-orange"
                />
                <span>
                  Lun&nbsp;–&nbsp;Ven : 08h – 13h / 14h – 17h
                  <br />
                  Samedi : 08h – 14h
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-8 py-6 text-xs text-white/50 sm:px-12 lg:flex-row lg:px-20">
          <p className="text-center lg:text-left">
            © {year} <span className="font-semibold text-white/70">ASTT</span> —
            Membre de{' '}
            <span className="font-semibold text-white/70">Jouni Group</span>.
            Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <a href="#" className="transition-colors hover:text-white">
              Mentions légales
            </a>
            <span className="h-3 w-px bg-white/20" />
            <a href="#" className="transition-colors hover:text-white">
              Politique de confidentialité
            </a>
            <span className="h-3 w-px bg-white/20" />
            <span>
              Développé par{' '}
              <a
                href="https://takt-agency.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-orange transition-colors hover:text-white"
              >
                Takt Agency
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
