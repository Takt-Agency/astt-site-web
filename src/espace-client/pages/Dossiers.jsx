import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faFileArrowUp, faFolderOpen, faMagnifyingGlass, faPlus, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { api, qs } from '../api'
import { PHASES } from '../constants'
import { dateFr } from '../format'
import { useSession } from '../session'
import { useApi } from '../useApi'
import { Button, Card, EmptyState, ErrorBox, Loading, PageHeader, Pagination, PhaseBadge, Pilule, TypeBadge, inputClass } from '../components/ui'

const ETATS = [
  { key: '', label: 'Tous' },
  { key: 'en_cours', label: 'En cours' },
  { key: 'documents', label: 'Documents attendus' },
  { key: 'termines', label: 'Clôturés' },
]

export default function Dossiers() {
  const { societes } = useSession()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const etat = params.get('etat') ?? ''
  const phase = params.get('phase') ?? ''
  const type = params.get('type') ?? ''
  const societe = params.get('societe') ?? ''
  const q = params.get('q') ?? ''
  const page = Number(params.get('page')) || 1
  const [recherche, setRecherche] = useState(q)

  /** Met à jour les filtres de l'URL ; tout changement de filtre revient à la page 1. */
  function filtrer(changes) {
    const next = new URLSearchParams(params)
    for (const [k, v] of Object.entries(changes)) {
      if (v) next.set(k, v)
      else next.delete(k)
    }
    if (!('page' in changes)) next.delete('page')
    setParams(next, { replace: true })
  }

  // Recherche différée : pas d'appel à chaque frappe
  useEffect(() => {
    const t = setTimeout(() => recherche !== q && filtrer({ q: recherche.trim() }), 350)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recherche])

  const { data, error, loading, recharger } = useApi(
    () => api.get(`/dossiers${qs({ etat, phase, type, societe, q, page, pageSize: 15 })}`),
    [etat, phase, type, societe, q, page],
  )
  const filtre = Boolean(etat || phase || type || societe || q)

  return (
    <>
      <PageHeader
        titre="Mes dossiers"
        description="Suivez l’avancement de vos opérations d’import et d’export, de l’ouverture à la livraison."
        actions={
          <Button variant="accent" icon={faPlus} to="/espace-client/demandes/nouvelle?type=nouveau_dossier">
            Confier un nouveau dossier
          </Button>
        }
      />

      <Card className="p-4 sm:p-5">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {ETATS.map((e) => (
            <Pilule key={e.key} actif={etat === e.key && !phase} onClick={() => filtrer({ etat: e.key, phase: '' })}>
              {e.label}
            </Pilule>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_auto]">
          <span className="relative">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-ink/35" />
            <input
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder="N° de dossier, votre référence, BL, AWB, déclaration…"
              className={`${inputClass} pl-10`}
              aria-label="Rechercher un dossier"
            />
          </span>
          <select value={phase} onChange={(e) => filtrer({ phase: e.target.value, etat: '' })} className={inputClass} aria-label="Étape">
            <option value="">Toutes les étapes</option>
            {PHASES.map((p) => (
              <option key={p.key} value={p.key}>
                {p.label}
              </option>
            ))}
          </select>
          {societes.length > 1 ? (
            <select value={societe} onChange={(e) => filtrer({ societe: e.target.value })} className={inputClass} aria-label="Société">
              <option value="">Toutes les sociétés</option>
              {societes.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.raisonSociale}
                </option>
              ))}
            </select>
          ) : (
            <select value={type} onChange={(e) => filtrer({ type: e.target.value })} className={inputClass} aria-label="Type">
              <option value="">Import et export</option>
              <option value="import">Import</option>
              <option value="export">Export</option>
            </select>
          )}
          <Button
            variant="secondary"
            icon={faRotateRight}
            disabled={!filtre}
            onClick={() => {
              setRecherche('')
              setParams({}, { replace: true })
            }}
          >
            Réinitialiser
          </Button>
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
                icon={faFolderOpen}
                titre={filtre ? 'Aucun dossier ne correspond à ces critères' : 'Aucun dossier pour le moment'}
                texte={filtre ? 'Modifiez ou réinitialisez les filtres.' : 'Vos dossiers apparaîtront ici dès leur ouverture par ASTT.'}
              />
            ) : (
              <>
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/70 text-left text-xs font-semibold uppercase tracking-wide text-ink/45">
                        <th className="py-3 pl-6 pr-4">Dossier</th>
                        <th className="py-3 pr-4">Opération</th>
                        {societes.length > 1 && <th className="py-3 pr-4">Société</th>}
                        <th className="py-3 pr-4">Déclaration</th>
                        <th className="py-3 pr-4">Reçu le</th>
                        <th className="py-3 pr-4">Étape</th>
                        <th className="w-10 py-3 pr-6" />
                      </tr>
                    </thead>
                    <tbody className={loading ? 'opacity-60' : ''}>
                      {data.items.map((d) => (
                        <tr key={d._id} onClick={() => navigate(`/espace-client/dossiers/${d._id}`)} className="cursor-pointer border-b border-slate-100 last:border-0 hover:bg-slate-50/80">
                          <td className="py-3.5 pl-6 pr-4">
                            <Link to={`/espace-client/dossiers/${d._id}`} className="font-semibold text-navy hover:text-orange" onClick={(e) => e.stopPropagation()}>
                              {d.reference}
                            </Link>
                            {d.referenceClient && <span className="block text-xs text-ink/50">Votre réf. {d.referenceClient}</span>}
                          </td>
                          <td className="py-3.5 pr-4">
                            <TypeBadge type={d.type} />
                            <span className="block max-w-[220px] truncate text-xs text-ink/55">{d.typeOperation || '—'}</span>
                          </td>
                          {societes.length > 1 && <td className="max-w-[180px] truncate py-3.5 pr-4 text-navy/80">{d.societe?.raisonSociale}</td>}
                          <td className="py-3.5 pr-4 text-navy/80">{d.declarations.join(', ') || '—'}</td>
                          <td className="whitespace-nowrap py-3.5 pr-4 text-navy/70">{dateFr(d.dateReception)}</td>
                          <td className="py-3.5 pr-4">
                            <span className="flex flex-col items-start gap-1">
                              <PhaseBadge phase={d.phase} label={d.phaseLabel} termine={d.termine} />
                              {d.complementDemande && (
                                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-600">
                                  <FontAwesomeIcon icon={faFileArrowUp} />
                                  Documents attendus
                                </span>
                              )}
                            </span>
                          </td>
                          <td className="py-3.5 pr-6 text-right text-ink/30">
                            <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile : cartes */}
                <ul className="divide-y divide-slate-100 md:hidden">
                  {data.items.map((d) => (
                    <li key={d._id}>
                      <Link to={`/espace-client/dossiers/${d._id}`} className="block px-4 py-4">
                        <span className="flex items-start justify-between gap-3">
                          <span className="font-semibold text-navy">{d.reference}</span>
                          <PhaseBadge phase={d.phase} label={d.phaseLabel} termine={d.termine} />
                        </span>
                        <span className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink/55">
                          <TypeBadge type={d.type} />
                          {d.typeOperation && <span>{d.typeOperation}</span>}
                          <span>Reçu le {dateFr(d.dateReception)}</span>
                        </span>
                        {d.complementDemande && <span className="mt-1.5 block text-xs font-semibold text-amber-600">Documents attendus</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Pagination page={data.page} pageSize={data.pageSize} total={data.total} onChange={(p) => filtrer({ page: String(p) })} />
              </>
            )}
          </Card>
        )}
      </div>
    </>
  )
}
