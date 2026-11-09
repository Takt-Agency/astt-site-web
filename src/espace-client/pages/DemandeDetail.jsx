import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useOutletContext, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faCircleCheck, faCircleInfo, faFolderOpen, faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { api, ouvrirFichier } from '../api'
import { DEMANDE_TYPE_ICONS, RECLAMATION_MOTIFS, TYPE_LABELS } from '../constants'
import { dateFr, dateHeureFr, taille } from '../format'
import { useApi } from '../useApi'
import { Alerte, Button, Card, CardHeader, DemandeStatut, ErrorBox, FichiersInput, InfoRow, Loading, PageHeader, cx, inputClass } from '../components/ui'

function Message({ m, demandeId, onErreur }) {
  if (m.systeme) {
    return (
      <li className="flex justify-center">
        <span className="max-w-xl rounded-full bg-slate-100 px-4 py-1.5 text-center text-xs text-ink/60">
          {m.texte} · {dateHeureFr(m.createdAt)}
        </span>
      </li>
    )
  }
  const client = m.cote === 'client'
  return (
    <li className={cx('flex', client ? 'justify-end' : 'justify-start')}>
      <div className={cx('max-w-[min(85%,640px)]', client ? 'items-end' : 'items-start')}>
        <p className={cx('mb-1 px-1 text-[11px] font-semibold', client ? 'text-right text-ink/45' : 'text-orange')}>
          {client ? m.auteurNom : 'Équipe ASTT'} · {dateHeureFr(m.createdAt)}
        </p>
        <div className={cx('rounded-2xl px-4 py-3 text-sm leading-relaxed', client ? 'rounded-tr-md bg-navy text-white' : 'rounded-tl-md border border-slate-200 bg-white text-navy shadow-sm')}>
          {m.texte && <p className="whitespace-pre-wrap break-words">{m.texte}</p>}
          {m.pieces.length > 0 && (
            <ul className={cx('space-y-1.5', m.texte && 'mt-3')}>
              {m.pieces.map((p) => (
                <li key={p._id}>
                  <button
                    type="button"
                    onClick={() => ouvrirFichier(`/demandes/${demandeId}/pieces/${p._id}`, { nom: p.nom }).catch((err) => onErreur(err.message))}
                    className={cx(
                      'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-semibold transition',
                      client ? 'bg-white/10 hover:bg-white/20' : 'bg-slate-50 hover:bg-slate-100',
                    )}
                  >
                    <FontAwesomeIcon icon={faPaperclip} className="opacity-70" />
                    <span className="min-w-0 flex-1 truncate">{p.nom}</span>
                    <span className="opacity-60">{taille(p.taille)}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </li>
  )
}

export default function DemandeDetail() {
  const { id } = useParams()
  const location = useLocation()
  const { rechargerNotifications } = useOutletContext() ?? {}
  const { data, error, loading, recharger, setData } = useApi(() => api.get(`/demandes/${id}`), [id], { intervalle: 45_000 })
  const [texte, setTexte] = useState('')
  const [files, setFiles] = useState([])
  const [envoi, setEnvoi] = useState(false)
  const [erreur, setErreur] = useState('')
  const finFil = useRef(null)
  const nbMessages = data?.demande?.messages?.length ?? 0

  // Ouvrir la demande la marque comme lue : la pastille des notifications se met à jour
  useEffect(() => {
    if (data) rechargerNotifications?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Boolean(data)])

  useEffect(() => {
    if (nbMessages > 1) finFil.current?.scrollIntoView({ block: 'nearest' })
  }, [nbMessages])

  if (loading && !data) return <Loading />
  if (error) {
    return (
      <>
        <PageHeader titre="Demande" retour={{ to: '/espace-client/demandes', label: 'Mes demandes' }} />
        <ErrorBox error={error} onRetry={error.status === 404 ? undefined : recharger} />
      </>
    )
  }
  const d = data.demande
  const det = d.details ?? {}
  const ouverte = d.statut !== 'annulee'

  async function repondre(e) {
    e.preventDefault()
    if (!texte.trim() && !files.length) return
    setEnvoi(true)
    setErreur('')
    try {
      const form = new FormData()
      form.append('texte', texte.trim())
      for (const f of files) form.append('files', f)
      const res = await api.post(`/demandes/${d._id}/messages`, form)
      setData(res)
      setTexte('')
      setFiles([])
    } catch (err) {
      setErreur(err.message)
    } finally {
      setEnvoi(false)
    }
  }

  async function annuler() {
    if (!window.confirm('Annuler cette demande ? L’équipe ASTT ne la traitera pas.')) return
    try {
      setData(await api.post(`/demandes/${d._id}/annuler`))
    } catch (err) {
      setErreur(err.message)
    }
  }

  return (
    <>
      <PageHeader
        retour={{ to: '/espace-client/demandes', label: 'Mes demandes' }}
        titre={d.objet}
        description={
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="inline-flex items-center gap-1.5 font-semibold text-navy/70">
              <FontAwesomeIcon icon={DEMANDE_TYPE_ICONS[d.type]} className="text-orange" />
              {d.typeLabel}
            </span>
            <span>{d.numero}</span>
            <span>· envoyée le {dateFr(d.createdAt)}</span>
            <DemandeStatut statut={d.statut} />
          </span>
        }
        actions={
          d.statut === 'nouvelle' && (
            <Button variant="danger" size="sm" icon={faBan} onClick={annuler}>
              Annuler la demande
            </Button>
          )
        }
      />

      {location.state?.creee && nbMessages === 1 && (
        <Alerte ton="succes" icon={faCircleCheck} titre="Demande envoyée" className="mb-6">
          L’équipe ASTT a été prévenue. Vous serez notifié dès qu’elle vous répondra.
        </Alerte>
      )}
      {d.statut === 'en_attente_client' && (
        <Alerte ton="attention" icon={faCircleInfo} titre="ASTT attend votre réponse" className="mb-6">
          Répondez ci-dessous ou joignez les documents demandés.
        </Alerte>
      )}

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <Card className="flex flex-col overflow-hidden">
          <ul className="flex-1 space-y-5 bg-[#f8fafc] px-4 py-6 sm:px-6">
            {d.messages.map((m) => (
              <Message key={m._id} m={m} demandeId={d._id} onErreur={setErreur} />
            ))}
            <li ref={finFil} aria-hidden="true" />
          </ul>
          {ouverte ? (
            <form onSubmit={repondre} className="border-t border-slate-100 bg-white px-4 py-4 sm:px-6">
              <textarea
                value={texte}
                onChange={(e) => setTexte(e.target.value)}
                rows={3}
                maxLength={5000}
                placeholder="Votre message à l’équipe ASTT…"
                className={`${inputClass} resize-y`}
                aria-label="Votre message"
              />
              <div className="mt-3">
                <FichiersInput files={files} onChange={setFiles} compact />
              </div>
              {erreur && (
                <Alerte ton="erreur" className="mt-3">
                  {erreur}
                </Alerte>
              )}
              <div className="mt-3 flex justify-end">
                <Button type="submit" variant="primary" icon={faPaperPlane} loading={envoi} disabled={!texte.trim() && !files.length}>
                  Envoyer
                </Button>
              </div>
            </form>
          ) : (
            <p className="border-t border-slate-100 px-6 py-4 text-sm text-ink/50">Cette demande est annulée.</p>
          )}
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader titre="Détails" icon={faFolderOpen} />
            <dl className="divide-y divide-slate-100 px-5 py-2">
              {d.societe && <InfoRow label="Société">{d.societe.raisonSociale}</InfoRow>}
              {d.dossier && (
                <InfoRow label="Dossier">
                  <Link to={`/espace-client/dossiers/${d.dossier._id}`} className="text-orange hover:text-orange-600">
                    {d.dossier.reference}
                  </Link>
                </InfoRow>
              )}
              {d.facture && (
                <InfoRow label="Listing">
                  <Link to={`/espace-client/factures/${d.facture._id}`} className="text-orange hover:text-orange-600">
                    {d.facture.numero}
                  </Link>
                </InfoRow>
              )}
              {det.sens && <InfoRow label="Opération">{TYPE_LABELS[det.sens]}</InfoRow>}
              {det.typeOperation && <InfoRow label="Type d’opération">{det.typeOperation}</InfoRow>}
              {det.marchandise && <InfoRow label="Marchandise">{det.marchandise}</InfoRow>}
              {det.fournisseur && <InfoRow label={det.sens === 'export' ? 'Destinataire' : 'Fournisseur'}>{det.fournisseur}</InfoRow>}
              {det.references && <InfoRow label="Références">{det.references}</InfoRow>}
              {det.dateArriveePrevue && <InfoRow label="Date prévue">{dateFr(det.dateArriveePrevue)}</InfoRow>}
              {det.documentDemande && <InfoRow label="Document souhaité">{det.documentDemande}</InfoRow>}
              {det.motifReclamation && <InfoRow label="Motif">{RECLAMATION_MOTIFS[det.motifReclamation]}</InfoRow>}
              {d.dossierCree && (
                <InfoRow label="Dossier ouvert">
                  <Link to={`/espace-client/dossiers/${d.dossierCree._id}`} className="text-orange hover:text-orange-600">
                    {d.dossierCree.reference}
                  </Link>
                </InfoRow>
              )}
              {d.dateTraitement && <InfoRow label="Traitée le">{dateFr(d.dateTraitement)}</InfoRow>}
            </dl>
          </Card>
          <p className="px-1 text-xs leading-relaxed text-ink/45">
            Les réponses d’ASTT vous sont signalées par une notification. Pour une urgence : 72 25 56 00.
          </p>
        </div>
      </div>
    </>
  )
}
