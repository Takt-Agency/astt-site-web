import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faComments, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import { api, qs } from '../api'
import { DEMANDE_TYPE_ICONS, DEMANDE_TYPE_LABELS } from '../constants'
import { depuis } from '../format'
import { useApi } from '../useApi'
import { Button, Card, DemandeStatut, EmptyState, ErrorBox, Loading, PageHeader, Pagination, Pilule, cx, inputClass } from '../components/ui'

const FILTRES = [
  { key: '', label: 'Toutes' },
  { key: 'ouvertes', label: 'En cours' },
  { key: 'en_attente_client', label: 'À compléter' },
  { key: 'traitee', label: 'Traitées' },
]

export default function Demandes() {
  const [params, setParams] = useSearchParams()
  const filtre = params.get('filtre') ?? ''
  const q = params.get('q') ?? ''
  const page = Number(params.get('page')) || 1
  const [recherche, setRecherche] = useState(q)

  function maj(changes) {
    const next = new URLSearchParams(params)
    for (const [k, v] of Object.entries(changes)) {
      if (v) next.set(k, v)
      else next.delete(k)
    }
    if (!('page' in changes)) next.delete('page')
    setParams(next, { replace: true })
  }

  useEffect(() => {
    const t = setTimeout(() => recherche !== q && maj({ q: recherche.trim() }), 350)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recherche])

  const { data, error, loading, recharger } = useApi(
    () =>
      api.get(
        `/demandes${qs({
          etat: filtre === 'ouvertes' ? 'ouvertes' : '',
          statut: ['en_attente_client', 'traitee'].includes(filtre) ? filtre : '',
          q,
          page,
          pageSize: 15,
        })}`,
      ),
    [filtre, q, page],
    { intervalle: 60_000 },
  )

  return (
    <>
      <PageHeader
        titre="Mes demandes"
        description="Nouveau dossier, demande de document, question ou réclamation : suivez vos échanges avec l’équipe ASTT."
        actions={
          <Button variant="accent" icon={faPlus} to="/espace-client/demandes/nouvelle">
            Nouvelle demande
          </Button>
        }
      />

      <Card className="p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {FILTRES.map((f) => (
              <Pilule key={f.key} actif={filtre === f.key} onClick={() => maj({ filtre: f.key })}>
                {f.label}
              </Pilule>
            ))}
          </div>
          <span className="relative lg:w-80">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-ink/35" />
            <input value={recherche} onChange={(e) => setRecherche(e.target.value)} placeholder="N° ou objet de la demande" className={`${inputClass} pl-10`} aria-label="Rechercher une demande" />
          </span>
        </div>
      </Card>

      <div className="mt-5">
        {error ? (
          <ErrorBox error={error} onRetry={recharger} />
        ) : (
          <Card className="overflow-hidden">
            {loading && !data ? (
              <Loading />
            ) : data.items.length === 0 ? (
              <EmptyState
                icon={faComments}
                titre={filtre || q ? 'Aucune demande ne correspond' : 'Aucune demande pour le moment'}
                texte="Une question, un document, un nouveau dossier ? Écrivez-nous, l’équipe ASTT vous répond ici."
                action={
                  <Button variant="primary" icon={faPlus} to="/espace-client/demandes/nouvelle">
                    Nouvelle demande
                  </Button>
                }
              />
            ) : (
              <>
                <ul className={cx('divide-y divide-slate-100', loading && 'opacity-60')}>
                  {data.items.map((d) => (
                    <li key={d._id}>
                      <Link to={`/espace-client/demandes/${d._id}`} className={cx('flex items-center gap-4 px-5 py-4 transition hover:bg-slate-50 sm:px-6', d.nonLuClient && 'bg-orange/[0.04]')}>
                        <span className={cx('grid h-10 w-10 shrink-0 place-items-center rounded-xl', d.nonLuClient ? 'bg-orange text-white' : 'bg-mint/60 text-navy')}>
                          <FontAwesomeIcon icon={DEMANDE_TYPE_ICONS[d.type] ?? faComments} className="text-sm" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                            <span className={cx('truncate text-[15px] text-navy', d.nonLuClient ? 'font-bold' : 'font-semibold')}>{d.objet}</span>
                            {d.nonLuClient && <span className="rounded-full bg-orange px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">Nouvelle réponse</span>}
                          </span>
                          <span className="mt-0.5 block truncate text-xs text-ink/50">
                            {d.numero} · {DEMANDE_TYPE_LABELS[d.type] ?? d.typeLabel}
                            {d.dossier && ` · ${d.dossier.reference}`}
                            {' · '}mise à jour {depuis(d.updatedAt)}
                          </span>
                        </span>
                        <span className="hidden sm:block">
                          <DemandeStatut statut={d.statut} />
                        </span>
                        <FontAwesomeIcon icon={faChevronRight} className="text-xs text-ink/30" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Pagination page={data.page} pageSize={data.pageSize} total={data.total} onChange={(p) => maj({ page: String(p) })} />
              </>
            )}
          </Card>
        )}
      </div>
    </>
  )
}
