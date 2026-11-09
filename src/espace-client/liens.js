/** Page du portail ouverte depuis une notification. */
export function lienNotification(n) {
  if (n.lien?.startsWith('/espace-client')) return n.lien
  if (n.dossier) return `/espace-client/dossiers/${n.dossier}`
  return '/espace-client/notifications'
}
