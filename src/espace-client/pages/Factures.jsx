import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { faCircleCheck, faFileCsv, faFileInvoiceDollar, faFilePdf, faHourglassHalf, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { api, ouvrirFichier, qs } from '../api'
import { dateFr, tnd } from '../format'
import { useSession } from '../session'
import { useApi } from '../useApi'
import { Alerte, Button, Card, EmptyState, ErrorBox, ListingStatut, Loading, PageHeader, Pilule, StatCard, cx, inputClass } from '../components/ui'

export default function Factures() {
  const { societes } = useSession()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const statut = params.get('statut') ?? ''
  const annee = params.get('annee') ?? ''
  const societe = params.get('societe') ?? ''
  const [erreurFichier, setErreurFichier] = useState('')

  const maj = (k, v) => {
    const next = new URLSearchParams(params)
    if (v) next.set(k, v)
    else next.delete(k)
    setParams(next, { replace: true })
  }

  const { data, error, loading, recharger } = useApi(() => api.get(`/listings${qs({ statut, annee, societe })}`), [statut, annee, societe])

  async function fichier(l, format, telecharger) {
    setErreurFichier('')
    try {
      const nom = `Listing ${l.numero}.${format === 'csv' ? 'csv' : 'pdf'}`
      await ouvrirFichier(`/listings/${l._id}/${format}${telecharger ? '?download=1' : ''}`, { nom, telecharger })
    } catch (err) {
      setErreurFichier(err.message)
    }
  }

  return (
    <>
      <PageHeader
        titre="Factures & listings"
        description="Votre listing mensuel reprend, déclaration par déclaration, les débours (droits, TTN, visas…) et l’assistance ASTT de vos dossiers."
      />

      {error ? (
        <ErrorBox error={error} onRetry={recharger} />
      ) : loading && !data ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
            <StatCard label="Total facturé" valeur={tnd(data.synthese.total, { devise: false })} hint={`TND · ${data.synthese.nombre} listing${data.synthese.nombre > 1 ? 's' : ''}`} icon={faFileInvoiceDollar} />
            <StatCard label="Déjà réglé" valeur={tnd(data.synthese.regle, { devise: false })} hint="TND" icon={faCircleCheck} ton="bg-emerald-50 text-emerald-700" />
            <StatCard
              label="Reste à régler"
              valeur={tnd(data.synthese.reste, { devise: false })}
              hint={`TND · ${data.synthese.aRegler} listing${data.synthese.aRegler > 1 ? 's' : ''}`}
              icon={faHourglassHalf}
              ton="bg-orange/10 text-orange"
              accent={data.synthese.reste > 0}
            />
            <StatCard label="Échéance dépassée" valeur={data.synthese.enRetard} icon={faTriangleExclamation} ton="bg-red-50 text-red-600" accent={data.synthese.enRetard > 0} />
          </div>

          <Card className="mt-6 p-4 sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {[
                  ['', 'Tous'],
                  ['emise', 'À régler'],
                  ['payee', 'Payés'],
                ].map(([k, label]) => (
                  <Pilule key={k} actif={statut === k} onClick={() => maj('statut', k)}>
                    {label}
                  </Pilule>
                ))}
              </div>
              <div className="flex gap-3">
                {societes.length > 1 && (
                  <select value={societe} onChange={(e) => maj('societe', e.target.value)} className={`${inputClass} lg:w-56`} aria-label="Société">
                    <option value="">Toutes les sociétés</option>
                    {societes.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.raisonSociale}
                      </option>
                    ))}
                  </select>
                )}
                <select value={annee} onChange={(e) => maj('annee', e.target.value)} className={`${inputClass} lg:w-40`} aria-label="Année">
                  <option value="">Toutes les années</option>
                  {data.annees.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>

          {erreurFichier && (
            <Alerte ton="erreur" className="mt-4">
              {erreurFichier}
            </Alerte>
          )}

          <Card className="mt-5 overflow-hidden">
            {data.items.length === 0 ? (
              <EmptyState icon={faFileInvoiceDollar} titre="Aucun listing" texte="Vos listings mensuels apparaîtront ici dès leur émission par ASTT." />
            ) : (
              <>
                <div className="hidden overflow-x-auto lg:block">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/70 text-left text-xs font-semibold uppercase tracking-wide text-ink/45">
                        <th className="py-3 pl-6 pr-4">Période</th>
                        {societes.length > 1 && <th className="py-3 pr-4">Société</th>}
                        <th className="py-3 pr-4 text-right">Dossiers</th>
                        <th className="py-3 pr-4 text-right">Total</th>
                        <th className="py-3 pr-4 text-right">Reste</th>
                        <th className="py-3 pr-4">Échéance</th>
                        <th className="py-3 pr-4">Statut</th>
                        <th className="py-3 pr-6 text-right">Fichiers</th>
                      </tr>
                    </thead>
                    <tbody className={loading ? 'opacity-60' : ''}>
                      {data.items.map((l) => (
                        <tr key={l._id} onClick={() => navigate(`/espace-client/factures/${l._id}`)} className="cursor-pointer border-b border-slate-100 last:border-0 hover:bg-slate-50/80">
                          <td className="py-3.5 pl-6 pr-4">
                            <Link to={`/espace-client/factures/${l._id}`} onClick={(e) => e.stopPropagation()} className="font-semibold capitalize text-navy hover:text-orange">
                              {l.libellePeriode}
                            </Link>
                            <span className="block text-xs text-ink/50">
                              {l.numero} · émis le {dateFr(l.dateEmission)}
                            </span>
                          </td>
                          {societes.length > 1 && <td className="max-w-[180px] truncate py-3.5 pr-4 text-navy/80">{l.societe?.raisonSociale}</td>}
                          <td className="py-3.5 pr-4 text-right text-navy/80">{l.nbDossiers}</td>
                          <td className="whitespace-nowrap py-3.5 pr-4 text-right font-semibold text-navy">{tnd(l.total)}</td>
                          <td className={cx('whitespace-nowrap py-3.5 pr-4 text-right', l.reste > 0 ? 'font-semibold text-orange' : 'text-ink/40')}>{tnd(l.reste)}</td>
                          <td className={cx('whitespace-nowrap py-3.5 pr-4', l.enRetard ? 'font-semibold text-red-600' : 'text-navy/70')}>{dateFr(l.dateEcheance)}</td>
                          <td className="py-3.5 pr-4">
                            <ListingStatut statut={l.statut} enRetard={l.enRetard} />
                          </td>
                          <td className="py-3.5 pr-6" onClick={(e) => e.stopPropagation()}>
                            <span className="flex justify-end gap-1.5">
                              <Button variant="secondary" size="sm" icon={faFilePdf} onClick={() => fichier(l, 'pdf', false)} aria-label={`PDF du listing ${l.numero}`}>
                                PDF
                              </Button>
                              <Button variant="ghost" size="sm" icon={faFileCsv} onClick={() => fichier(l, 'csv', true)} aria-label={`Excel du listing ${l.numero}`}>
                                Excel
                              </Button>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ul className="divide-y divide-slate-100 lg:hidden">
                  {data.items.map((l) => (
                    <li key={l._id} className="px-4 py-4">
                      <Link to={`/espace-client/factures/${l._id}`} className="flex items-start justify-between gap-3">
                        <span>
                          <span className="block font-semibold capitalize text-navy">{l.libellePeriode}</span>
                          <span className="block text-xs text-ink/50">
                            {l.numero} · échéance {dateFr(l.dateEcheance)}
                          </span>
                        </span>
                        <span className="text-right">
                          <span className="block text-sm font-bold text-navy">{tnd(l.total)}</span>
                          <ListingStatut statut={l.statut} enRetard={l.enRetard} />
                        </span>
                      </Link>
                      <span className="mt-3 flex gap-2">
                        <Button variant="secondary" size="sm" icon={faFilePdf} onClick={() => fichier(l, 'pdf', false)}>
                          PDF
                        </Button>
                        <Button variant="ghost" size="sm" icon={faFileCsv} onClick={() => fichier(l, 'csv', true)}>
                          Excel
                        </Button>
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Card>
        </>
      )}
    </>
  )
}
