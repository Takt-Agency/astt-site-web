import { useNavigate, useOutletContext } from 'react-router-dom'
import { faBell, faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import { COMMUN, api } from '../api'
import { dateHeureFr, depuis } from '../format'
import { useApi } from '../useApi'
import { lienNotification } from '../liens'
import { Button, Card, EmptyState, ErrorBox, Loading, PageHeader, cx } from '../components/ui'

export default function Notifications() {
  const navigate = useNavigate()
  const { rechargerNotifications } = useOutletContext() ?? {}
  const { data, error, loading, recharger } = useApi(() => api.get('/notifications?limit=50', COMMUN), [])

  async function ouvrir(n) {
    if (!n.lu) await api.post(`/notifications/${n._id}/lire`, null, COMMUN).catch(() => {})
    rechargerNotifications?.()
    navigate(lienNotification(n))
  }

  async function toutLire() {
    await api.post('/notifications/lire-tout', null, COMMUN).catch(() => {})
    rechargerNotifications?.()
    recharger({ silencieux: true })
  }

  return (
    <>
      <PageHeader
        titre="Notifications"
        description="Étapes clés de vos dossiers, nouveaux listings et réponses d’ASTT à vos demandes."
        actions={
          data?.unread > 0 && (
            <Button variant="secondary" icon={faCheckDouble} onClick={toutLire}>
              Tout marquer comme lu
            </Button>
          )
        }
      />
      {error ? (
        <ErrorBox error={error} onRetry={recharger} />
      ) : (
        <Card className="overflow-hidden">
          {loading && !data ? (
            <Loading />
          ) : data.items.length === 0 ? (
            <EmptyState icon={faBell} titre="Aucune notification" texte="Vous serez prévenu ici de chaque étape importante de vos dossiers." />
          ) : (
            <ul className="divide-y divide-slate-100">
              {data.items.map((n) => (
                <li key={n._id}>
                  <button type="button" onClick={() => ouvrir(n)} className={cx('flex w-full items-start gap-4 px-5 py-4 text-left transition hover:bg-slate-50 sm:px-6', !n.lu && 'bg-orange/[0.04]')}>
                    <span className={cx('mt-2 h-2.5 w-2.5 shrink-0 rounded-full', n.lu ? 'bg-slate-200' : 'bg-orange')} />
                    <span className="min-w-0 flex-1">
                      <span className={cx('block text-[15px] text-navy', !n.lu && 'font-bold')}>{n.titre}</span>
                      {n.message && <span className="mt-0.5 block text-sm text-ink/60">{n.message}</span>}
                    </span>
                    <span className="shrink-0 text-right text-xs text-ink/45" title={dateHeureFr(n.createdAt)}>
                      {depuis(n.createdAt)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}
    </>
  )
}
