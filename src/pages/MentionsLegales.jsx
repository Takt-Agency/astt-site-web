import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.05 },
  }),
}

const SECTIONS = [
  {
    title: '1. Éditeur du site',
    body: [
      'Le présent site est édité par la société ASTT — Assistance Service de Transit et de Transport, filiale du Jouni Group.',
      'Forme juridique : Société à Responsabilité Limitée (SARL).',
      'Siège social : Grombalia, Tunisie.',
      'Téléphone : +216 72 256 821.',
      'Email : contact@astt-group.com.',
    ],
  },
  {
    title: '2. Directeur de la publication',
    body: [
      'Le directeur de la publication du site est le représentant légal de la société ASTT.',
    ],
  },
  {
    title: '3. Hébergement',
    body: [
      'Le site est hébergé par un prestataire d’hébergement web professionnel. Les coordonnées de l’hébergeur peuvent être communiquées sur simple demande écrite adressée à contact@astt-group.com.',
    ],
  },
  {
    title: '4. Propriété intellectuelle',
    body: [
      'L’ensemble du contenu du site (textes, images, graphismes, logos, icônes, sons, logiciels) est la propriété exclusive d’ASTT ou de ses partenaires, et est protégé par les lois nationales et internationales relatives à la propriété intellectuelle.',
      'Toute reproduction, représentation, modification, publication, adaptation, totale ou partielle des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sauf autorisation écrite préalable d’ASTT.',
    ],
  },
  {
    title: '5. Responsabilité',
    body: [
      'ASTT s’efforce d’assurer au mieux de ses possibilités l’exactitude et la mise à jour des informations diffusées sur le site, mais ne saurait garantir l’exhaustivité ou l’absence d’erreurs.',
      'ASTT décline toute responsabilité pour tout dommage direct ou indirect résultant de l’accès ou de l’utilisation du site, y compris l’inaccessibilité, les pertes de données, ou la présence de virus.',
    ],
  },
  {
    title: '6. Liens hypertextes',
    body: [
      'Le site peut contenir des liens vers des sites externes. ASTT n’exerce aucun contrôle sur ces sites et ne saurait être tenue responsable de leur contenu.',
    ],
  },
  {
    title: '7. Droit applicable',
    body: [
      'Les présentes mentions légales sont soumises au droit tunisien. En cas de litige, les tribunaux tunisiens seront seuls compétents.',
    ],
  },
]

function MentionsLegales() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy pt-32 pb-16 text-white lg:pt-40 lg:pb-20">
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
            <span className="text-orange">Mentions légales</span>
          </motion.nav>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex items-center gap-3"
          >
            <span className="h-[2px] w-8 bg-orange" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/85">
              Informations légales
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Mentions légales
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-5 max-w-2xl text-sm leading-relaxed text-white/70 lg:text-base"
          >
            Retrouvez ici les informations légales concernant l&apos;éditeur du
            site ASTT, ses conditions d&apos;utilisation et la protection de
            vos droits.
          </motion.p>
        </div>
      </section>

      <section className="relative bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[900px] px-6 sm:px-10 lg:px-14">
          <div className="space-y-10">
            {SECTIONS.map((s, i) => (
              <motion.article
                key={s.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
              >
                <h2 className="text-xl font-bold text-navy sm:text-2xl">
                  {s.title}
                </h2>
                <span className="mt-3 block h-[2px] w-8 bg-orange" />
                <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-ink/75">
                  {s.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </motion.article>
            ))}

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="border-t border-navy/10 pt-6 text-xs text-ink/50"
            >
              Dernière mise à jour : {new Date().getFullYear()}.
            </motion.p>
          </div>
        </div>
      </section>
    </>
  )
}

export default MentionsLegales
