import {
  faBoxOpen,
  faCalculator,
  faFileInvoice,
  faLaptopCode,
  faShip,
  faTruckFast,
} from '@fortawesome/free-solid-svg-icons'

export const SERVICES = [
  {
    slug: 'import',
    number: '01',
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
    number: '02',
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
    slug: 'traitement-declaration',
    number: '03',
    icon: faFileInvoice,
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80&auto=format&fit=crop',
    title: 'Déclaration',
    tagline: 'Traitement des dossiers et déclarations douanières',
    short:
      'Traitement des dossiers et déclarations douanières via le système TTN.',
    intro:
      'ASTT assure le traitement des dossiers et des déclarations douanières à travers des processus structurés et adaptés aux opérations de ses clients.',
    features: [
      {
        title: 'Système TTN',
        text: 'Traitement des dossiers directement sur le système TTN (Tunisie TradeNet).',
      },
      {
        title: 'Fiches & répertoires',
        text: 'Remplissage des fiches et gestion des répertoires liés aux dossiers.',
      },
      {
        title: 'Gestion documentaire',
        text: 'Organisation des informations nécessaires au traitement des dossiers.',
      },
      {
        title: 'Suivi administratif',
        text: 'Un suivi administratif rigoureux de chaque opération.',
      },
    ],
  },
  {
    slug: 'comptabilite',
    number: '04',
    icon: faCalculator,
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop',
    title: 'Comptabilité',
    tagline: 'Suivi administratif, financier et comptable',
    short:
      'Suivi administratif, financier et comptable de vos opérations et de vos règlements.',
    intro:
      'Le service comptabilité assure le suivi administratif et financier des opérations ainsi que la gestion des différents éléments liés aux règlements et à la facturation.',
    features: [
      {
        title: 'Suivi des chèques douane',
        text: 'Suivi journalier des chèques avec la douane et des quittances.',
      },
      {
        title: 'Gestion des achats',
        text: 'Prise en charge et suivi des achats liés aux opérations.',
      },
      {
        title: 'Facturation',
        text: 'Émission et suivi des factures pour chaque opération.',
      },
      {
        title: 'Suivi des règlements',
        text: 'Suivi rigoureux des règlements clients et fournisseurs.',
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
