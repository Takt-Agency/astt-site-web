import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBoxOpen,
  faCircleInfo,
  faCircleQuestion,
  faClockRotateLeft,
  faComments,
  faDownload,
  faEye,
  faFileArrowUp,
  faFileInvoiceDollar,
  faFileLines,
  faHourglassHalf,
  faStamp,
  faTriangleExclamation,
  faTruckFast,
} from '@fortawesome/free-solid-svg-icons'
import { api, ouvrirFichier } from '../api'
import { REGLEMENT_LABELS } from '../constants'
import { dateFr, dateHeureFr, nombre, taille, tnd } from '../format'
import { useApi } from '../useApi'
import {
  Alerte,
  Badge,
  Button,
  Card,
  CardHeader,
  DemandeStatut,
  ErrorBox,
  Field,
  FichiersInput,
  InfoRow,
  Loading,
  PageHeader,
  PhaseBadge,
  PhaseStepper,
  TypeBadge,
  inputClass,
} from '../components/ui'

function Documents({ dossier, permissions, onDepose }) {
  const [files, setFiles] = useState([])
  const [categorie, setCategorie] = useState(permissions.categoriesDepot[0]?.key ?? 'autre')
  const [commentaire, setCommentaire] = useState('')
  const [envoi, setEnvoi] = useState(false)
  const [message, setMessage] = useState(null)
  const [erreurFichier, setErreurFichier] = useState('')

  async function ouvrir(doc, telecharger) {
    setErreurFichier('')
    try {
      await ouvrirFichier(`/dossiers/${dossier._id}/documents/${doc._id}${telecharger ? '?download=1' : ''}`, { nom: doc.nom, telecharger })
    } catch (err) {
      setErreurFichier(err.message)
    }
  }

  async function deposer(e) {
    e.preventDefault()
    if (!files.length) return
    setEnvoi(true)
    setMessage(null)
    try {
      const form = new FormData()
      form.append('categorie', categorie)
      form.append('commentaire', commentaire)
      for (const f of files) form.append('files', f)
      await api.post(`/dossiers/${dossier._id}/documents`, form)
      setFiles([])
      setCommentaire('')
      setMessage({ ton: 'succes', texte: `${files.length > 1 ? `${files.length} documents transmis` : 'Document transmis'} à ASTT.` })
      onDepose()
    } catch (err) {
      setMessage({ ton: 'erreur', texte: err.message })
    } finally {
      setEnvoi(false)
    }
  }

  return (
    <Card id="documents">
      <CardHeader titre="Documents" icon={faFileLines} description={`${dossier.documents.length} document${dossier.documents.length > 1 ? 's' : ''}`} />
      {erreurFichier && <p className="px-6 pt-4 text-sm text-red-600">{erreurFichier}</p>}
      {dossier.documents.length === 0 ? (
        <p className="px-6 py-6 text-sm text-ink/50">Aucun document disponible pour le moment.</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {dossier.documents.map((doc) => (
            <li key={doc._id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-6">
              <span className="flex min-w-0 items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-navy/60">
                  <FontAwesomeIcon icon={faFileLines} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-navy">{doc.nom}</span>
                  <span className="block text-xs text-ink/50">
                    {doc.categorieLabel} · {dateFr(doc.createdAt)}
                    {doc.taille ? ` · ${taille(doc.taille)}` : ''}
                    {doc.deposeParClient && ' · déposé par vous'}
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
      )}

      {permissions.deposer && (
        <form onSubmit={deposer} className="border-t border-slate-100 bg-slate-50/50 px-5 py-5 sm:px-6">
          <p className="mb-3 flex items-center gap-2 text-sm font-bold text-navy">
            <FontAwesomeIcon icon={faFileArrowUp} className="text-orange" />
            Transmettre des documents à ASTT
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Type de document">
              <select value={categorie} onChange={(e) => setCategorie(e.target.value)} className={inputClass}>
                {permissions.categoriesDepot.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Commentaire (facultatif)">
              <input value={commentaire} onChange={(e) => setCommentaire(e.target.value)} maxLength={1000} className={inputClass} placeholder="Ex. version corrigée de la facture" />
            </Field>
          </div>
          <div className="mt-4">
            <FichiersInput files={files} onChange={setFiles} compact />
          </div>
          {message && (
            <Alerte ton={message.ton} className="mt-4">
              {message.texte}
            </Alerte>
          )}
          <div className="mt-4 flex justify-end">
            <Button type="submit" variant="primary" icon={faFileArrowUp} loading={envoi} disabled={!files.length}>
              Envoyer
            </Button>
          </div>
        </form>
      )}
    </Card>
  )
}

export default function DossierDetail() {
  const { id } = useParams()
  const { data, error, loading, recharger } = useApi(() => api.get(`/dossiers/${id}`), [id])
  const documentsRef = useRef(null)

  if (loading && !data) return <Loading />
  if (error) {
    return (
      <>
        <PageHeader titre="Dossier" retour={{ to: '/espace-client/dossiers', label: 'Mes dossiers' }} />
        <ErrorBox error={error} onRetry={error.status === 404 ? undefined : recharger} />
      </>
    )
  }
  const { dossier: d, historique, demandes, permissions } = data
  const m = d.marchandise
  const nouvelleDemande = (type) => `/espace-client/demandes/nouvelle?type=${type}&dossier=${d._id}`

  return (
    <>
      <PageHeader
        retour={{ to: '/espace-client/dossiers', label: 'Mes dossiers' }}
        titre={d.reference}
        description={
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <TypeBadge type={d.type} />
            {d.typeOperation && <span>{d.typeOperation}</span>}
            {d.societe && <span>· {d.societe.raisonSociale}</span>}
            {d.references.client && <span>· Votre réf. {d.references.client}</span>}
          </span>
        }
        actions={
          <>
            <Button variant="secondary" icon={faCircleQuestion} to={nouvelleDemande('information')}>
              Poser une question
            </Button>
            <Button variant="secondary" icon={faFileLines} to={nouvelleDemande('document')}>
              Demander un document
            </Button>
          </>
        }
      />

      <div className="space-y-6">
        <Card className="p-5 sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">Étape actuelle</p>
              <p className="mt-1 text-lg font-bold text-navy">{d.termine ? 'Dossier clôturé' : d.phaseLabel}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {d.livraison.dateLivraison && <Badge ton="bg-emerald-50 text-emerald-700">Livré le {dateFr(d.livraison.dateLivraison)}</Badge>}
              <PhaseBadge phase={d.phase} label={d.phaseLabel} termine={d.termine} />
            </div>
          </div>
          <PhaseStepper etape={d.etape} termine={d.termine} />
        </Card>

        {d.complement && (
          <Alerte ton="attention" icon={faTriangleExclamation} titre="ASTT attend des documents pour ce dossier">
            <p>{d.complement.motif || 'Merci de transmettre les pièces manquantes.'}</p>
            {permissions.deposer && (
              <button type="button" onClick={() => documentsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="mt-1.5 font-semibold underline underline-offset-2">
                Déposer les documents
              </button>
            )}
          </Alerte>
        )}
        {d.enAttente && !d.complement && (
          <Alerte ton="info" icon={faHourglassHalf} titre="Dossier momentanément en attente">
            Notre équipe reviendra vers vous. Pour toute question, utilisez « Poser une question ».
          </Alerte>
        )}

        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader titre="Informations du dossier" icon={faBoxOpen} />
              <dl className="divide-y divide-slate-100 px-5 py-2 sm:px-6">
                <InfoRow label="Reçu le">{dateFr(d.dateReception)}</InfoRow>
                <InfoRow label="Votre référence">{d.references.client}</InfoRow>
                <InfoRow label="Réf. fournisseur">{d.references.fournisseur}</InfoRow>
                <InfoRow label="N° BL">{d.references.bl}</InfoRow>
                <InfoRow label="N° AWB">{d.references.awb}</InfoRow>
                <InfoRow label={d.type === 'export' ? 'Destinataire' : 'Fournisseur'}>{d.fournisseur}</InfoRow>
                <InfoRow label="Transporteur">{d.transporteur}</InfoRow>
                <InfoRow label="Marchandise">{m.description}</InfoRow>
                <InfoRow label="Colis / poids">
                  {[m.nbColis !== null && nombre(m.nbColis, 'colis'), m.poidsBrut !== null && `${nombre(m.poidsBrut, 'kg')} brut`, m.poidsNet !== null && `${nombre(m.poidsNet, 'kg')} net`]
                    .filter(Boolean)
                    .join(' · ')}
                </InfoRow>
                <InfoRow label="Valeur">{m.valeur !== null ? `${nombre(m.valeur)} ${m.devise}` : ''}</InfoRow>
              </dl>
            </Card>

            <Card>
              <CardHeader titre="Douane" icon={faStamp} />
              {d.declarations.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/70 text-left text-xs font-semibold uppercase tracking-wide text-ink/45">
                        <th className="py-2.5 pl-6 pr-4">Déclaration</th>
                        <th className="py-2.5 pr-4">Type</th>
                        <th className="py-2.5 pr-4">N° TTN</th>
                        <th className="py-2.5 pr-4">Date</th>
                        <th className="py-2.5 pr-6 text-right">Droits</th>
                      </tr>
                    </thead>
                    <tbody>
                      {d.declarations.map((t) => (
                        <tr key={t._id} className="border-b border-slate-100 last:border-0">
                          <td className="py-3 pl-6 pr-4 font-semibold text-navy">{t.numeroDeclaration || '—'}</td>
                          <td className="py-3 pr-4 text-navy/70">{t.typeDeclaration || '—'}</td>
                          <td className="py-3 pr-4 text-navy/70">{t.numeroTTN}</td>
                          <td className="whitespace-nowrap py-3 pr-4 text-navy/70">{dateFr(t.dateDeclaration)}</td>
                          <td className="whitespace-nowrap py-3 pr-6 text-right text-navy/80">{t.droits !== null ? tnd(t.droits) : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="px-6 pt-5 text-sm text-ink/50">La déclaration en douane est en préparation.</p>
              )}
              <dl className="divide-y divide-slate-100 px-5 py-2 sm:px-6">
                <InfoRow label="Bureau de douane">{d.douane.bureau}</InfoRow>
                <InfoRow label="Régime">{d.douane.regime}</InfoRow>
                <InfoRow label="Arrivée marchandise">{d.douane.dateArrivee && dateFr(d.douane.dateArrivee)}</InfoRow>
                <InfoRow label="Mainlevée">{d.douane.dateMainlevee && dateFr(d.douane.dateMainlevee)}</InfoRow>
                {d.dae && (
                  <InfoRow label="DAE">
                    {d.dae.numero}
                    {d.dae.date && ` du ${dateFr(d.dae.date)}`}
                    {d.dae.destination && ` · ${d.dae.destination}`}
                    {d.dae.totalColis !== null && ` · ${nombre(d.dae.colisTraites ?? 0)} / ${nombre(d.dae.totalColis)} colis`}
                  </InfoRow>
                )}
              </dl>
            </Card>

            <Card>
              <CardHeader titre="Livraison" icon={faTruckFast} />
              {d.livraison.destination || d.livraison.datePrevue || d.livraison.dateLivraison || d.livraison.receptionnaire ? (
                <dl className="divide-y divide-slate-100 px-5 py-2 sm:px-6">
                  <InfoRow label="Lieu de livraison">{d.livraison.destination}</InfoRow>
                  <InfoRow label="Livraison prévue">{d.livraison.datePrevue && dateFr(d.livraison.datePrevue)}</InfoRow>
                  <InfoRow label="Livré le">{d.livraison.dateLivraison && dateHeureFr(d.livraison.dateLivraison)}</InfoRow>
                  <InfoRow label="Réceptionnaire">{d.livraison.receptionnaire}</InfoRow>
                </dl>
              ) : (
                <p className="px-6 py-5 text-sm text-ink/50">Les informations de livraison seront disponibles après le dédouanement.</p>
              )}
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader titre="Historique" icon={faClockRotateLeft} />
              {historique.length === 0 ? (
                <p className="px-6 py-6 text-sm text-ink/50">Aucune étape enregistrée.</p>
              ) : (
                <ol className="relative px-6 py-5">
                  {historique.map((e, i) => (
                    <li key={e.cle} className="relative flex gap-4 pb-5 last:pb-0">
                      {i < historique.length - 1 && <span className="absolute left-[7px] top-4 h-full w-px bg-slate-200" aria-hidden="true" />}
                      <span className={`relative mt-1 h-[15px] w-[15px] shrink-0 rounded-full border-[3px] ${i === 0 ? 'border-orange bg-white' : 'border-emerald-500 bg-emerald-500'}`} />
                      <span>
                        <span className="block text-sm font-semibold text-navy">{e.libelle}</span>
                        <span className="block text-xs text-ink/50">{dateHeureFr(e.date)}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </Card>

            <Card>
              <CardHeader titre="Facturation" icon={faFileInvoiceDollar} />
              {d.facturation ? (
                <dl className="divide-y divide-slate-100 px-5 py-2 sm:px-6">
                  <InfoRow label="Listing">
                    {d.facturation.listing ? (
                      <Link to={`/espace-client/factures/${d.facturation.listing}`} className="text-orange hover:text-orange-600">
                        {d.facturation.numero}
                      </Link>
                    ) : (
                      d.facturation.numero
                    )}
                  </InfoRow>
                  <InfoRow label="Montant du dossier">{d.facturation.montant !== null && tnd(d.facturation.montant)}</InfoRow>
                  <InfoRow label="Règlement">{REGLEMENT_LABELS[d.facturation.statutReglement]}</InfoRow>
                </dl>
              ) : (
                <p className="flex gap-2.5 px-6 py-5 text-sm text-ink/55">
                  <FontAwesomeIcon icon={faCircleInfo} className="mt-0.5 text-navy/40" />
                  Le dossier sera repris dans votre listing mensuel après la livraison.
                </p>
              )}
            </Card>

            <Card>
              <CardHeader
                titre="Mes demandes sur ce dossier"
                icon={faComments}
                action={
                  <Link to={nouvelleDemande('information')} className="text-xs font-semibold text-orange hover:text-orange-600">
                    + Nouvelle
                  </Link>
                }
              />
              {demandes.length === 0 ? (
                <div className="px-6 py-5 text-sm text-ink/50">
                  Aucune demande.{' '}
                  <Link to={nouvelleDemande('reclamation')} className="font-semibold text-navy/70 underline-offset-2 hover:underline">
                    Signaler un problème
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {demandes.map((x) => (
                    <li key={x._id}>
                      <Link to={`/espace-client/demandes/${x._id}`} className="flex items-center justify-between gap-3 px-5 py-3 transition hover:bg-slate-50 sm:px-6">
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-navy">{x.objet}</span>
                          <span className="block text-xs text-ink/50">
                            {x.numero} · {x.typeLabel}
                          </span>
                        </span>
                        <DemandeStatut statut={x.statut} />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        </div>

        <div ref={documentsRef} className="scroll-mt-24">
          <Documents dossier={d} permissions={permissions} onDepose={() => recharger({ silencieux: true })} />
        </div>
      </div>
    </>
  )
}
