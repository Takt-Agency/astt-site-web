import {
  faBoxOpen,
  faCircleQuestion,
  faCoins,
  faEllipsis,
  faFileCirclePlus,
  faFileLines,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'

/** Phases du dossier présentées au client (mêmes clés que le backend, config/espaceClient.js). */
export const PHASES = [
  { key: 'ouvert', label: 'Dossier ouvert', court: 'Ouvert' },
  { key: 'declaration', label: 'Déclaration en douane', court: 'Déclaration' },
  { key: 'douane', label: 'Opérations en douane', court: 'Douane' },
  { key: 'dedouane', label: 'Dédouané', court: 'Dédouané' },
  { key: 'livraison', label: 'En livraison', court: 'Livraison' },
  { key: 'livre', label: 'Livré', court: 'Livré' },
]

export const PHASE_TONS = {
  ouvert: 'bg-slate-100 text-slate-700',
  declaration: 'bg-sky-50 text-sky-700',
  douane: 'bg-indigo-50 text-indigo-700',
  dedouane: 'bg-violet-50 text-violet-700',
  livraison: 'bg-amber-50 text-amber-700',
  livre: 'bg-emerald-50 text-emerald-700',
}

export const TYPE_LABELS = { import: 'Import', export: 'Export' }

export const DEMANDE_TYPES = [
  {
    key: 'nouveau_dossier',
    label: 'Nouveau dossier',
    desc: 'Confiez-nous une nouvelle opération d’import ou d’export.',
    icon: faFileCirclePlus,
  },
  {
    key: 'information',
    label: 'Information',
    desc: 'Une question sur l’avancement d’un dossier.',
    icon: faCircleQuestion,
  },
  {
    key: 'document',
    label: 'Demande de document',
    desc: 'Copie de déclaration, quittance, attestation…',
    icon: faFileLines,
  },
  {
    key: 'facturation',
    label: 'Facturation',
    desc: 'Une question sur un listing ou un règlement.',
    icon: faCoins,
  },
  {
    key: 'reclamation',
    label: 'Réclamation',
    desc: 'Signalez un retard, une erreur ou un problème de service.',
    icon: faTriangleExclamation,
  },
  {
    key: 'autre',
    label: 'Autre demande',
    desc: 'Toute autre demande à l’équipe ASTT.',
    icon: faEllipsis,
  },
]
export const DEMANDE_TYPE_LABELS = Object.fromEntries(DEMANDE_TYPES.map((t) => [t.key, t.label]))
export const DEMANDE_TYPE_ICONS = Object.fromEntries(DEMANDE_TYPES.map((t) => [t.key, t.icon]))
DEMANDE_TYPE_ICONS.nouveau_dossier = DEMANDE_TYPE_ICONS.nouveau_dossier ?? faBoxOpen

export const DEMANDE_STATUTS = {
  nouvelle: { label: 'Envoyée', ton: 'bg-orange/10 text-orange' },
  en_cours: { label: 'En cours de traitement', ton: 'bg-sky-50 text-sky-700' },
  en_attente_client: { label: 'En attente de votre réponse', ton: 'bg-amber-50 text-amber-700' },
  traitee: { label: 'Traitée', ton: 'bg-emerald-50 text-emerald-700' },
  annulee: { label: 'Annulée', ton: 'bg-slate-100 text-slate-500' },
}

export const RECLAMATION_MOTIFS = {
  retard: 'Retard',
  erreur_documentaire: 'Erreur documentaire',
  facturation: 'Facturation',
  service: 'Qualité de service',
  autre: 'Autre',
}

export const LISTING_STATUTS = {
  emise: { label: 'À régler', ton: 'bg-orange/10 text-orange' },
  payee: { label: 'Payé', ton: 'bg-emerald-50 text-emerald-700' },
}

export const REGLEMENT_LABELS = { en_attente: 'En attente', partiel: 'Partiellement réglé', paye: 'Réglé' }

/** Colonnes du listing (modèle papier ASTT) — repli si l'API ne les renvoie pas. */
export const LISTING_COLONNES = [
  { key: 'droitDouane', label: 'Droit Douane' },
  { key: 'fourniture', label: 'Fourniture' },
  { key: 'assistance', label: 'Assistance' },
  { key: 'priseEnCharge', label: 'Prise en charge' },
  { key: 'eur', label: 'EUR' },
  { key: 'fraisTtn', label: 'TTN' },
  { key: 'visa', label: 'Visa' },
  { key: 'visaTtn', label: 'Visa TTN' },
]

export const FORMATS_ACCEPTES = '.pdf,.jpg,.jpeg,.png,.docx,.xlsx'
export const TAILLE_MAX = 15 * 1024 * 1024
