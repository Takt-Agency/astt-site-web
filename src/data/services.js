import {
  faBoxOpen,
  faBriefcase,
  faFileInvoice,
  faLaptopCode,
  faShip,
  faTruckFast,
} from '@fortawesome/free-solid-svg-icons'

export const SERVICES = [
  {
    slug: 'consulting',
    number: '01',
    icon: faBriefcase,
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&auto=format&fit=crop',
    title: 'Consulting',
    tagline: 'Étude et accompagnement de vos nouveaux projets',
    short:
      'Étude et accompagnement d’ouverture et de création des nouveaux projets.',
    intro:
      'ASTT vous accompagne dans la conception et le lancement de vos nouveaux projets, de l’étude préalable jusqu’à leur mise en œuvre opérationnelle.',
    features: [
      {
        title: 'Étude de projet',
        text: 'Analyse préalable et cadrage des nouveaux projets.',
      },
      {
        title: 'Accompagnement à l’ouverture',
        text: 'Support à chaque étape de la création et du démarrage.',
      },
      {
        title: 'Conseil stratégique',
        text: 'Recommandations adaptées à vos besoins et à votre marché.',
      },
      {
        title: 'Coordination',
        text: 'Interlocuteur unique pour piloter votre projet.',
      },
    ],
  },
  {
    slug: 'formalite-douaniere',
    number: '02',
    icon: faFileInvoice,
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80&auto=format&fit=crop',
    title: 'Formalité douanière',
    tagline: 'Suivi des démarches administratives de dédouanement',
    short:
      'Suivi des démarches administratives liées au dédouanement auprès des services douaniers.',
    intro:
      'ASTT prend en charge l’ensemble des démarches administratives auprès des services douaniers afin d’assurer un dédouanement fluide et conforme de vos opérations.',
    features: [
      {
        title: 'Déclarations douanières',
        text: 'Constitution et dépôt des déclarations dans le respect de la réglementation.',
      },
      {
        title: 'Interface administration',
        text: 'Interlocution avec les services douaniers pour vos dossiers.',
      },
      {
        title: 'Système TTN',
        text: 'Traitement des dossiers directement sur Tunisie TradeNet.',
      },
      {
        title: 'Suivi administratif',
        text: 'Suivi rigoureux de chaque étape du dédouanement.',
      },
    ],
  },
  {
    slug: 'import',
    number: '03',
    icon: faShip,
    image:
      'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=800&q=80&auto=format&fit=crop',
    title: 'Import',
    tagline: 'Gestion complète de vos opérations d’importation',
    short:
      'Gestion et accompagnement des opérations d’importation, du dédouanement à la livraison.',
    intro:
      'Une équipe dédiée accompagne vos opérations d’importation et assure le traitement complet ainsi que le suivi des différentes démarches nécessaires, du dédouanement à la livraison finale.',
    features: [
      {
        title: 'Équipe dédiée',
        text: 'Une équipe spécialisée uniquement dans les opérations d’importation.',
      },
      {
        title: 'Coursier interne',
        text: 'Prise en charge de la livraison des déclarations d’import par notre coursier.',
      },
      {
        title: 'Véhicule dédié',
        text: 'Un véhicule spécifiquement affecté aux opérations d’import.',
      },
      {
        title: 'Suivi opérationnel',
        text: 'Suivi rigoureux des différentes étapes de l’opération.',
      },
    ],
  },
  {
    slug: 'export',
    number: '04',
    icon: faTruckFast,
    image:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80&auto=format&fit=crop',
    title: 'Export',
    tagline: 'Un accompagnement structuré pour vos exportations',
    short:
      'Gestion et accompagnement des opérations d’exportation, avec un suivi complet de vos dossiers.',
    intro:
      'ASTT dispose d’une équipe dédiée aux opérations d’exportation afin d’assurer une gestion structurée et un suivi efficace de vos dossiers, à chaque étape du processus.',
    features: [
      {
        title: 'Équipe dédiée',
        text: 'Une équipe spécialisée uniquement dans les opérations d’exportation.',
      },
      {
        title: 'Coursier interne',
        text: 'Prise en charge de la livraison des déclarations d’export par notre coursier.',
      },
      {
        title: 'Véhicule dédié',
        text: 'Un véhicule spécifiquement affecté aux opérations d’export.',
      },
      {
        title: 'Suivi opérationnel',
        text: 'Suivi rigoureux des différentes étapes de l’opération.',
      },
    ],
  },
  {
    slug: 'suivi',
    number: '05',
    icon: faBoxOpen,
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80&auto=format&fit=crop',
    title: 'Qualité & Suivi',
    tagline: 'Suivi rigoureux et centralisé de vos opérations',
    short:
      'Suivi des opérations douanières et gestion des informations relatives à vos dossiers.',
    intro:
      'ASTT assure un suivi régulier des opérations douanières afin d’offrir une meilleure visibilité sur l’avancement des dossiers et de faciliter la gestion des différentes étapes.',
    features: [
      {
        title: 'Suivi douanier',
        text: 'Suivi complet des opérations douanières.',
      },
      {
        title: 'Alertes',
        text: 'Notifications sur les différentes étapes des opérations.',
      },
      {
        title: 'Archivage numérique',
        text: 'Archivage sécurisé et centralisation des dossiers.',
      },
      {
        title: 'Plateforme interne',
        text: 'Outil interne développé spécifiquement pour ASTT.',
      },
    ],
  },
  {
    slug: 'digitalisation',
    number: '06',
    icon: faLaptopCode,
    image:
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80&auto=format&fit=crop',
    title: 'Digitalisation',
    tagline: 'La digitalisation au service de vos opérations',
    short:
      'Solutions digitales développées pour améliorer le suivi et la gestion de vos opérations.',
    intro:
      'ASTT intègre progressivement les outils digitaux dans la gestion de ses opérations afin d’améliorer le suivi, l’organisation des informations et l’efficacité des processus.',
    features: [
      {
        title: 'Suivi digitalisé',
        text: 'Visualisation et suivi des opérations en temps réel.',
      },
      {
        title: 'Archivage numérique',
        text: 'Centralisation et conservation sécurisée des documents.',
      },
      {
        title: 'Alertes automatiques',
        text: 'Suivi des différentes étapes des opérations.',
      },
      {
        title: 'Gestion de l’information',
        text: 'Organisation et centralisation des données clés.',
      },
    ],
  },
]

export const getServiceBySlug = (slug) =>
  SERVICES.find((s) => s.slug === slug)
