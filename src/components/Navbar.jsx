import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faBars,
  faBoxOpen,
  faChevronDown,
  faFileInvoice,
  faLaptopCode,
  faCalculator,
  faShip,
  faTruckFast,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import Logo from './Logo'

const SERVICES = [
  {
    label: 'Import',
    to: '/#service-import',
    icon: faShip,
    desc: 'Gestion des opérations d’importation.',
  },
  {
    label: 'Export',
    to: '/#service-export',
    icon: faTruckFast,
    desc: 'Gestion des opérations d’exportation.',
  },
  {
    label: 'Traitement de déclaration',
    to: '/#service-declaration',
    icon: faFileInvoice,
    desc: 'Traitement des dossiers et déclarations douanières.',
  },
  {
    label: 'Comptabilité',
    to: '/#service-comptabilite',
    icon: faCalculator,
    desc: 'Suivi administratif, financier et comptable.',
  },
  {
    label: 'Suivi',
    to: '/#service-suivi',
    icon: faBoxOpen,
    desc: 'Suivi des opérations et des dossiers.',
  },
  {
    label: 'Digitalisation',
    to: '/#service-digitalisation',
    icon: faLaptopCode,
    desc: 'Solutions digitales pour vos opérations.',
  },
]

const NAV_ITEMS = [
  { label: 'Accueil', to: '/' },
  { label: 'À propos', to: '/#a-propos' },
  { label: 'Nos services', to: '/#services', dropdown: SERVICES },
  { label: 'Notre expertise', to: '/#expertise' },
  { label: 'Actualités', to: '/#actualites' },
  { label: 'Contact', to: '/contact' },
]

function Navbar() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

  const activeItem =
    pathname === '/contact'
      ? 'Contact'
      : pathname === '/'
        ? 'Accueil'
        : ''

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-black/5 shadow-lg shadow-navy/5'
          : 'bg-white border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-8 sm:px-12 lg:px-20">
        <Logo />

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeItem === item.label
            const hasDropdown = Array.isArray(item.dropdown)
            return (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => hasDropdown && setOpenDropdown(item.label)}
                onMouseLeave={() => hasDropdown && setOpenDropdown(null)}
              >
                <Link
                  to={item.to}
                  className={`flex items-center gap-1.5 py-6 text-[15px] font-medium transition-colors ${
                    isActive ? 'text-orange' : 'text-navy hover:text-orange'
                  }`}
                >
                  {item.label}
                  {hasDropdown && (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`text-[10px] opacity-70 transition-transform ${
                        openDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </Link>
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-4 left-0 right-0 h-0.5 bg-orange"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}

                <AnimatePresence>
                  {hasDropdown && openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-2"
                    >
                      <div className="overflow-hidden rounded-xl border border-black/5 bg-white shadow-2xl shadow-navy/15">
                        <div className="grid grid-cols-2 gap-1 p-3">
                          {item.dropdown.map((s) => (
                            <Link
                              key={s.label}
                              to={s.to}
                              onClick={() => setOpenDropdown(null)}
                              className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-mint/40"
                            >
                              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-md bg-mint/60 text-navy transition-colors group-hover:bg-orange group-hover:text-white">
                                <FontAwesomeIcon
                                  icon={s.icon}
                                  className="text-sm"
                                />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-semibold text-navy group-hover:text-orange">
                                  {s.label}
                                </span>
                                <span className="mt-0.5 block text-xs leading-snug text-ink/60">
                                  {s.desc}
                                </span>
                              </span>
                            </Link>
                          ))}
                        </div>
                        <Link
                          to="/#services"
                          onClick={() => setOpenDropdown(null)}
                          className="flex items-center justify-between border-t border-black/5 bg-navy/[0.03] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-navy transition-colors hover:bg-navy hover:text-white"
                        >
                          Voir tous nos services
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className="text-xs"
                          />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="hidden items-center gap-2.5 rounded-full bg-navy px-5 py-2.5 text-[13px] font-semibold uppercase tracking-wider text-white transition-all hover:bg-orange lg:inline-flex"
          >
            Nous contacter
            <span className="grid h-6 w-6 place-items-center rounded-full bg-orange text-white transition-colors">
              <FontAwesomeIcon icon={faArrowRight} className="text-[11px]" />
            </span>
          </Link>

          <button
            type="button"
            aria-label="Ouvrir le menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-md text-navy transition-colors hover:bg-navy/5 lg:hidden"
          >
            <FontAwesomeIcon
              icon={mobileOpen ? faXmark : faBars}
              className="text-lg"
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-black/5 bg-white lg:hidden"
          >
            <ul className="mx-auto flex max-w-[1280px] flex-col gap-1 px-8 py-4 sm:px-12">
              {NAV_ITEMS.map((item) => {
                const hasDropdown = Array.isArray(item.dropdown)
                if (hasDropdown) {
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        className={`flex w-full items-center justify-between rounded-md px-3 py-3 text-base font-medium transition-colors ${
                          mobileServicesOpen
                            ? 'bg-mint/40 text-orange'
                            : 'text-navy hover:bg-navy/5 hover:text-orange'
                        }`}
                      >
                        {item.label}
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className={`text-xs opacity-70 transition-transform ${
                            mobileServicesOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-2 mt-1 space-y-0.5 overflow-hidden border-l-2 border-mint pl-3"
                          >
                            {item.dropdown.map((s) => (
                              <li key={s.label}>
                                <Link
                                  to={s.to}
                                  onClick={() => {
                                    setMobileOpen(false)
                                    setMobileServicesOpen(false)
                                  }}
                                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-navy transition-colors hover:bg-navy/5 hover:text-orange"
                                >
                                  <FontAwesomeIcon
                                    icon={s.icon}
                                    className="w-4 text-orange"
                                  />
                                  {s.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  )
                }
                return (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between rounded-md px-3 py-3 text-base font-medium transition-colors ${
                        activeItem === item.label
                          ? 'bg-mint/40 text-orange'
                          : 'text-navy hover:bg-navy/5 hover:text-orange'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
              <li className="pt-2">
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2.5 rounded-full bg-orange px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white"
                >
                  Nous contacter
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
