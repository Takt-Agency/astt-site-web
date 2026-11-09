import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faEye, faFileLines, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { api, ouvrirFichier, qs } from '../api'
import { dateFr, taille } from '../format'
import { useApi } from '../useApi'
import { Alerte, Button, Card, EmptyState, ErrorBox, Loading, PageHeader, Pagination, TypeBadge, inputClass } from '../components/ui'

export default function Documents() {
  const [params, setParams] = useSearchParams()
  const categorie = params.get('categorie') ?? ''
  const q = params.get('q') ?? ''
  const page = Number(params.get('page')) || 1
  const [recherche, setRecherche] = useState(q)
  const [erreurFichier, setErreurFichier] = useState('')

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

  const { data, error, loading, recharger } = useApi(() => api.get(`/documents${qs({ categorie, q, page, pageSize: 20 })}`), [categorie, q, page])

  async function ouvrir(doc, telecharger) {
    setErreurFichier('')
    try {
      await ouvrirFichier(`/dossiers/${doc.dossier._id}/documents/${doc._id}${telecharger ? '?download=1' : ''}`, { nom: doc.nom, telecharger })
    } catch (err) {
      setErreurFichier(err.message)
    }
  }

  return (
    <>
      <PageHeader titre="Documents" description="Tous les documents de vos dossiers : déclarations, DAE, quittances, preuves de livraison et pièces que vous avez transmises." />

      <Card className="p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
          <span className="relative">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-ink/35" />
            <input value={recherche} onChange={(e) => setRecherche(e.target.value)} placeholder="Nom du document ou N° de dossier" className={`${inputClass} pl-10`} aria-label="Rechercher un document" />
          </span>
          <select value={categorie} onChange={(e) => maj({ categorie: e.target.value })} className={inputClass} aria-label="Type de document">
            <option value="">Tous les types</option>
            {(data?.categories ?? []).map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {erreurFichier && (
        <Alerte ton="erreur" className="mt-4">
          {erreurFichier}
        </Alerte>
      )}

      <div className="mt-5">
        {error ? (
          <ErrorBox error={error} onRetry={recharger} />
        ) : (
          <Card className="overflow-hidden">
            {loading && !data ? (
              <Loading />
            ) : data.items.length === 0 ? (
              <EmptyState icon={faFileLines} titre="Aucun document" texte="Les documents de vos dossiers apparaîtront ici." />
            ) : (
              <>
                <ul className={`divide-y divide-slate-100 ${loading ? 'opacity-60' : ''}`}>
                  {data.items.map((doc) => (
                    <li key={`${doc.dossier._id}-${doc._id}`} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 sm:px-6">
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-navy/60">
                          <FontAwesomeIcon icon={faFileLines} />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-navy">{doc.nom}</span>
                          <span className="flex flex-wrap items-center gap-x-2 text-xs text-ink/50">
                            <span>{doc.categorieLabel}</span>
                            <span>·</span>
                            <Link to={`/espace-client/dossiers/${doc.dossier._id}`} className="font-semibold text-orange hover:text-orange-600">
                              {doc.dossier.reference}
                            </Link>
                            <TypeBadge type={doc.dossier.type} />
                            <span>· {dateFr(doc.createdAt)}</span>
                            {doc.taille ? <span>· {taille(doc.taille)}</span> : null}
                            {doc.deposeParClient && <span>· déposé par vous</span>}
                          </span>
                        </span>
                      </span>
                      <span className="flex gap-1.5">
                        <Button variant="ghost" size="sm" icon={faEye} onClick={() => ouvrir(doc, false)}>
                          Voir
                        </Button>
                        <Button variant="secondary" size="sm" icon={faDownload} onClick={() => ouvrir(doc, true)}>
                          Télécharger
                        </Button>
                      </span>
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
