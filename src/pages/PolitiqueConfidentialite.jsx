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
    title: '1. Introduction',
    body: [
      'ASTT — Assistance Service de Transit et de Transport (filiale du Jouni Group) attache une grande importance à la protection de la vie privée et des données personnelles de ses clients et visiteurs.',
      'La présente politique de confidentialité a pour objet d’informer les utilisateurs du site sur les données collectées, leur utilisation et les droits dont ils disposent.',
    ],
  },
  {
    title: '2. Données collectées',
    body: [
      'Nous collectons uniquement les données nécessaires à la fourniture de nos services et à la gestion de la relation client :',
      '• Données d’identification : nom, prénom, société, fonction ;',
      '• Coordonnées : adresse email, numéro de téléphone, adresse postale ;',
      '• Informations relatives à vos opérations : demandes de devis, dossiers de transit, documents douaniers ;',
      '• Données techniques : adresse IP, type de navigateur, pages visitées (via cookies).',
    ],
  },
  {
    title: '3. Finalités du traitement',
    body: [
      'Vos données sont traitées pour les finalités suivantes :',
      '• Répondre à vos demandes de contact et de devis ;',
      '• Assurer la gestion et le suivi de vos dossiers ;',
      '• Améliorer nos services et l’expérience utilisateur du site ;',
      '• Respecter nos obligations légales et réglementaires.',
    ],
  },
  {
    title: '4. Base légale',
    body: [
      'Le traitement de vos données repose sur les bases légales suivantes : votre consentement, l’exécution d’un contrat, le respect d’une obligation légale, ou l’intérêt légitime d’ASTT.',
    ],
  },
  {
    title: '5. Destinataires des données',
    body: [
      'Vos données sont destinées aux services internes d’ASTT et, le cas échéant, à ses partenaires ou prestataires techniques (hébergement, maintenance, transport, douane) soumis à des obligations de confidentialité.',
      'Aucune donnée n’est transmise à des tiers à des fins commerciales sans votre consentement préalable.',
    ],
  },
  {
    title: '6. Durée de conservation',
    body: [
      'Vos données sont conservées pendant la durée strictement nécessaire aux finalités du traitement, dans le respect des obligations légales de conservation (notamment fiscales et douanières).',
    ],
  },
  {
    title: '7. Vos droits',
    body: [
      'Conformément à la réglementation applicable, vous disposez des droits suivants :',
      '• Droit d’accès à vos données ;',
      '• Droit de rectification des données inexactes ;',
      '• Droit à l’effacement (« droit à l’oubli ») ;',
      '• Droit à la limitation ou à l’opposition du traitement ;',
      '• Droit à la portabilité de vos données ;',
      '• Droit de retirer votre consentement à tout moment.',
      'Pour exercer ces droits, adressez votre demande à : contact@astt.tn.',
    ],
  },
  {
    title: '8. Cookies',
    body: [
      'Le site peut utiliser des cookies techniques nécessaires à son bon fonctionnement, ainsi que des cookies d’analyse d’audience pour améliorer l’expérience de navigation.',
      'Vous pouvez configurer votre navigateur pour refuser tout ou partie des cookies.',
    ],
  },
  {
    title: '9. Sécurité',
    body: [
      'ASTT met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, altération, divulgation ou destruction.',
    ],
  },
  {
    title: '10. Contact',
    body: [
      'Pour toute question concernant la présente politique de confidentialité ou le traitement de vos données personnelles, vous pouvez nous contacter :',
      '• Par email : contact@astt.tn',
      '• Par courrier : ASTT — Grombalia, Tunisie',
    ],
  },
]

function PolitiqueConfidentialite() {
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
            <span className="text-orange">Politique de confidentialité</span>
          </motion.nav>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex items-center gap-3"
          >
            <span className="h-[2px] w-8 bg-orange" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/85">
              Vie privée &amp; données
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Politique de confidentialité
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-5 max-w-2xl text-sm leading-relaxed text-white/70 lg:text-base"
          >
            La protection de vos données personnelles est une priorité. Cette
            page décrit comment nous collectons, utilisons et protégeons vos
            informations.
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

export default PolitiqueConfidentialite
