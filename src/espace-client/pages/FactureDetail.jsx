import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { faCircleQuestion, faCoins, faDownload, faFileCsv, faFilePdf, faListCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { api, ouvrirFichier } from '../api'
import { LISTING_COLONNES } from '../constants'
import { dateFr, tnd } from '../format'
import { useApi } from '../useApi'
import { Alerte, Button, Card, CardHeader, ErrorBox, ListingStatut, Loading, PageHeader, StatCard, cx } from '../components/ui'

const num = (n) => (n ? tnd(n, { devise: false }) : '')

export default function FactureDetail() {
  const { id } = useParams()
  const { data, error, loading, recharger } = useApi(() => api.get(`/listings/${id}`), [id])
  const [erreurFichier, setErreurFichier] = useState('')

  if (loading && !data) return <Loading />
  if (error) {
    return (
      <>
        <PageHeader titre="Listing" retour={{ to: '/espace-client/factures', label: 'Factures & listings' }} />
        <ErrorBox error={error} onRetry={error.status === 404 ? undefined : recharger} />
      </>
    )
  }
  const l = data.listing
  const colonnes = data.colonnes?.length ? data.colonnes : LISTING_COLONNES

  async function fichier(format, telecharger) {
    setErreurFichier('')
    try {
      await ouvrirFichier(`/listings/${l._id}/${format}${telecharger ? '?download=1' : ''}`, { nom: `Listing ${l.numero}.${format === 'csv' ? 'csv' : 'pdf'}`, telecharger })
    } catch (err) {
      setErreurFichier(err.message)
    }
  }

  return (
    <>
      <PageHeader
        retour={{ to: '/espace-client/factures', label: 'Factures & listings' }}
        titre={<span className="capitalize">Listing {l.libellePeriode}</span>}
        description={
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="font-semibold text-navy/70">{l.numero}</span>
            {l.societe && <span>{l.societe.raisonSociale}</span>}
            <span>
              · du {dateFr(l.dateDu)} au {dateFr(l.dateAu)}
            </span>
            <ListingStatut statut={l.statut} enRetard={l.enRetard} />
          </span>
        }
        actions={
          <>
            <Button variant="primary" icon={faFilePdf} onClick={() => fichier('pdf', false)}>
              Voir le PDF
            </Button>
            <Button variant="secondary" icon={faDownload} onClick={() => fichier('pdf', true)} aria-label="Télécharger le PDF" />
            <Button variant="secondary" icon={faFileCsv} onClick={() => fichier('csv', true)}>
              Excel
            </Button>
          </>
        }
      />

      {erreurFichier && (
        <Alerte ton="erreur" className="mb-5">
          {erreurFichier}
        </Alerte>
      )}
      {l.enRetard && (
        <Alerte ton="erreur" icon={faTriangleExclamation} titre="Échéance dépassée" className="mb-5">
          Ce listing était à régler avant le {dateFr(l.dateEcheance)}. Reste à payer : {tnd(l.reste)}.
        </Alerte>
      )}

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <StatCard
          label={l.totalTVA > 0 || l.totalTimbres > 0 ? 'Total à payer' : 'Total du listing'}
          valeur={tnd(l.total, { devise: false })}
          hint={
            l.totalTVA > 0 || l.totalTimbres > 0
              ? `TND · dont TVA ${tnd(l.totalTVA, { devise: false })} et timbres ${tnd(l.totalTimbres, { devise: false })}`
              : `TND · ${l.nbLignes} déclaration${l.nbLignes > 1 ? 's' : ''}`
          }
        />
        <StatCard label="Débours" valeur={tnd(l.totalDebours, { devise: false })} hint="TND · droits, TTN, visas…" />
        <StatCard label="Assistance ASTT" valeur={tnd(l.totalAssistance, { devise: false })} hint="TND" />
        <StatCard label="Reste à régler" valeur={tnd(l.reste, { devise: false })} hint={`TND · échéance ${dateFr(l.dateEcheance)}`} accent={l.reste > 0} />
      </div>

      <Card className="mt-6 overflow-hidden">
        <CardHeader titre="Détail par déclaration" icon={faListCheck} description="+ : débours · * : assistance" />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-[13px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-left text-[11px] font-semibold uppercase tracking-wide text-ink/45">
                <th className="py-3 pl-6 pr-3">Date</th>
                <th className="py-3 pr-3">Type</th>
                <th className="py-3 pr-3">Déclaration</th>
                {colonnes.map((c) => (
                  <th key={c.key} className="py-3 pr-3 text-right">
                    {c.label}
                  </th>
                ))}
                <th className="py-3 pr-3">N° Visa</th>
                <th className="py-3 pr-6 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {l.lignes.map((ligne) => (
                <tr key={ligne._id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60">
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 text-navy/70">{dateFr(ligne.date, { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                  <td className="py-3 pr-3 font-semibold text-navy/80">{ligne.typeDeclaration}</td>
                  <td className="py-3 pr-3">
                    <span className="font-semibold text-navy">{ligne.declaration || '—'}</span>
                    {ligne.reference &&
                      (ligne.dossier ? (
                        <Link to={`/espace-client/dossiers/${ligne.dossier}`} className="block text-[11px] text-orange hover:text-orange-600">
                          {ligne.reference}
                        </Link>
                      ) : (
                        <span className="block text-[11px] text-ink/45">{ligne.reference}</span>
                      ))}
                  </td>
                  {colonnes.map((c) => (
                    <td key={c.key} className="whitespace-nowrap py-3 pr-3 text-right tabular-nums text-navy/80">
                      {num(ligne[c.key])}
                    </td>
                  ))}
                  <td className="py-3 pr-3 text-navy/70">{ligne.numeroVisa}</td>
                  <td className="whitespace-nowrap py-3 pr-6 text-right font-semibold tabular-nums text-navy">{tnd(ligne.total, { devise: false })}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-200 bg-slate-50 font-bold text-navy">
                <td className="py-3.5 pl-6 pr-3" colSpan={3}>
                  Total
                </td>
                {colonnes.map((c) => (
                  <td key={c.key} className="whitespace-nowrap py-3.5 pr-3 text-right tabular-nums">
                    {num(l.totaux?.[c.key])}
                  </td>
                ))}
                <td />
                <td className="whitespace-nowrap py-3.5 pr-6 text-right tabular-nums">{tnd(l.totalLignes ?? l.total)}</td>
              </tr>
              {(l.totalTVA > 0 || l.totalTimbres > 0) && (
                <>
                  <tr className="bg-slate-50 text-sm text-navy">
                    <td className="py-2 pl-6 pr-3" colSpan={colonnes.length + 4}>
                      TVA sur l’assistance (factures de dossier)
                    </td>
                    <td className="whitespace-nowrap py-2 pr-6 text-right tabular-nums">{tnd(l.totalTVA)}</td>
                  </tr>
                  <tr className="bg-slate-50 text-sm text-navy">
                    <td className="py-2 pl-6 pr-3" colSpan={colonnes.length + 4}>
                      Timbres fiscaux
                    </td>
                    <td className="whitespace-nowrap py-2 pr-6 text-right tabular-nums">{tnd(l.totalTimbres)}</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50 font-bold text-navy">
                    <td className="py-3 pl-6 pr-3" colSpan={colonnes.length + 4}>
                      Total à payer
                    </td>
                    <td className="whitespace-nowrap py-3 pr-6 text-right tabular-nums">{tnd(l.total)}</td>
                  </tr>
                </>
              )}
            </tfoot>
          </table>
        </div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader titre="Règlements" icon={faCoins} description={`${tnd(l.montantRegle)} réglé sur ${tnd(l.total)}`} />
          {l.reglements.length === 0 ? (
            <p className="px-6 py-5 text-sm text-ink/50">Aucun règlement enregistré pour ce listing.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {l.reglements.map((r) => (
                <li key={r._id} className="flex items-center justify-between gap-3 px-5 py-3 sm:px-6">
                  <span>
                    <span className="block text-sm font-semibold text-navy">{dateFr(r.date)}</span>
                    <span className="block text-xs text-ink/50">{[r.mode, r.reference].filter(Boolean).join(' · ') || 'Règlement'}</span>
                  </span>
                  <span className="text-sm font-bold text-emerald-700">{tnd(r.montant)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card className="p-5 sm:p-6">
          <p className="text-sm font-bold text-navy">Une question sur ce listing ?</p>
          <p className="mt-1 text-sm text-ink/55">Montant, ligne, règlement : envoyez votre question au service comptabilité d’ASTT.</p>
          {l.notes && <p className={cx('mt-4 whitespace-pre-wrap rounded-xl bg-slate-50 px-4 py-3 text-sm text-navy/80')}>{l.notes}</p>}
          <Button variant="secondary" icon={faCircleQuestion} to={`/espace-client/demandes/nouvelle?type=facturation&facture=${l._id}`} className="mt-4">
            Poser une question
          </Button>
        </Card>
      </div>
    </>
  )
}
