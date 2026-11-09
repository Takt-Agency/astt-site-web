import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircleInfo, faPaperPlane, faPlaneDeparture, faShip } from '@fortawesome/free-solid-svg-icons'
import { api } from '../api'
import { DEMANDE_TYPES, RECLAMATION_MOTIFS } from '../constants'
import { useSession } from '../session'
import { useApi } from '../useApi'
import { Alerte, Button, Card, Field, FichiersInput, PageHeader, cx, inputClass } from '../components/ui'

const OPERATIONS = ['Mise à la consommation', 'Admission temporaire', 'Transit', 'Entrepôt sous douane', 'Export définitif', 'Réexportation']
const DOCUMENTS = ['Copie de la déclaration en douane', 'Quittance douanière', 'DAE', 'Décharge / preuve de livraison', 'Attestation', 'Autre document']

/** Objet proposé selon le type et le dossier choisi (modifiable). */
function objetPropose(type, dossier) {
  const ref = dossier ? ` — ${dossier.reference}` : ''
  switch (type) {
    case 'information':
      return `Point sur l’avancement${ref}`
    case 'document':
      return `Demande de document${ref}`
    case 'reclamation':
      return `Réclamation${ref}`
    default:
      return ''
  }
}

export default function NouvelleDemande() {
  const navigate = useNavigate()
  const { societes } = useSession()
  const [params] = useSearchParams()
  const typeInitial = DEMANDE_TYPES.some((t) => t.key === params.get('type')) ? params.get('type') : ''
  const [type, setType] = useState(typeInitial)
  const [form, setForm] = useState({
    objet: '',
    message: '',
    dossier: params.get('dossier') ?? '',
    facture: params.get('facture') ?? '',
    societe: '',
    sens: '',
    typeOperation: '',
    marchandise: '',
    references: '',
    fournisseur: '',
    dateArriveePrevue: '',
    documentDemande: '',
    motifReclamation: 'retard',
  })
  const [files, setFiles] = useState([])
  const [envoi, setEnvoi] = useState(false)
  const [erreur, setErreur] = useState('')

  const dossiers = useApi(() => api.get('/dossiers?pageSize=100&tri=maj'), [])
  const listings = useApi(() => api.get('/listings'), [])
  const dossierChoisi = useMemo(() => dossiers.data?.items.find((d) => d._id === form.dossier), [dossiers.data, form.dossier])

  const set = (champ) => (e) => setForm((f) => ({ ...f, [champ]: e.target.value }))
  const avecDossier = ['information', 'document', 'reclamation', 'autre'].includes(type)

  async function envoyer(e) {
    e.preventDefault()
    setErreur('')
    const objet = form.objet.trim() || objetPropose(type, dossierChoisi)
    if (!objet) return setErreur('Indiquez l’objet de votre demande.')
    if (!form.message.trim()) return setErreur('Décrivez votre demande.')
    if (type === 'nouveau_dossier' && !form.sens) return setErreur('Précisez s’il s’agit d’une importation ou d’une exportation.')
    setEnvoi(true)
    try {
      const data = new FormData()
      data.append('type', type)
      data.append('objet', objet)
      data.append('message', form.message.trim())
      if (avecDossier && form.dossier) data.append('dossier', form.dossier)
      if (type === 'facturation' && form.facture) data.append('facture', form.facture)
      if (form.societe) data.append('societe', form.societe)
      if (type === 'nouveau_dossier') {
        for (const k of ['sens', 'typeOperation', 'marchandise', 'references', 'fournisseur', 'dateArriveePrevue']) data.append(k, form[k])
      }
      if (type === 'document') data.append('documentDemande', form.documentDemande)
      if (type === 'reclamation') data.append('motifReclamation', form.motifReclamation)
      for (const f of files) data.append('files', f)
      const res = await api.post('/demandes', data)
      navigate(`/espace-client/demandes/${res.demande._id}`, { replace: true, state: { creee: true } })
    } catch (err) {
      setErreur(err.message)
      setEnvoi(false)
    }
  }

  return (
    <>
      <PageHeader
        retour={{ to: '/espace-client/demandes', label: 'Mes demandes' }}
        titre="Nouvelle demande"
        description="Choisissez le type de demande : elle est transmise directement à l’équipe ASTT concernée."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {DEMANDE_TYPES.map((t) => {
          const actif = type === t.key
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setType(t.key)}
              aria-pressed={actif}
              className={cx(
                'relative flex items-start gap-3.5 rounded-2xl border bg-white p-4 text-left transition',
                actif ? 'border-navy ring-2 ring-navy/10' : 'border-slate-200 hover:border-navy/30',
              )}
            >
              <span className={cx('grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors', actif ? 'bg-orange text-white' : 'bg-mint/60 text-navy')}>
                <FontAwesomeIcon icon={t.icon} />
              </span>
              <span className="min-w-0">
                <span className="block font-semibold text-navy">{t.label}</span>
                <span className="mt-0.5 block text-xs leading-relaxed text-ink/55">{t.desc}</span>
              </span>
              {actif && (
                <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-navy text-[10px] text-white">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              )}
            </button>
          )
        })}
      </div>

      {type && (
        <form onSubmit={envoyer} noValidate>
          <Card className="mt-6 p-5 sm:p-7">
            <div className="grid gap-5 md:grid-cols-2">
              {type === 'nouveau_dossier' && (
                <>
                  <div className="md:col-span-2">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/70">
                      Opération<span className="ml-0.5 text-orange">*</span>
                    </span>
                    <div className="grid grid-cols-2 gap-3 sm:max-w-md">
                      {[
                        { key: 'import', label: 'Importation', icon: faShip },
                        { key: 'export', label: 'Exportation', icon: faPlaneDeparture },
                      ].map((s) => (
                        <button
                          key={s.key}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, sens: s.key }))}
                          aria-pressed={form.sens === s.key}
                          className={cx(
                            'flex items-center justify-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-semibold transition',
                            form.sens === s.key ? 'border-navy bg-navy text-white' : 'border-slate-200 text-navy hover:border-navy/30',
                          )}
                        >
                          <FontAwesomeIcon icon={s.icon} />
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Field label="Type d’opération">
                    <input list="operations" value={form.typeOperation} onChange={set('typeOperation')} maxLength={120} className={inputClass} placeholder="Ex. Mise à la consommation" />
                    <datalist id="operations">
                      {OPERATIONS.map((o) => (
                        <option key={o} value={o} />
                      ))}
                    </datalist>
                  </Field>
                  <Field label={form.sens === 'export' ? 'Date d’expédition prévue' : 'Date d’arrivée prévue'}>
                    <input type="date" value={form.dateArriveePrevue} onChange={set('dateArriveePrevue')} className={inputClass} />
                  </Field>
                  <Field label="Marchandise" className="md:col-span-2">
                    <input value={form.marchandise} onChange={set('marchandise')} maxLength={1000} className={inputClass} placeholder="Nature, quantité, nombre de colis…" />
                  </Field>
                  <Field label={form.sens === 'export' ? 'Destinataire' : 'Fournisseur'}>
                    <input value={form.fournisseur} onChange={set('fournisseur')} maxLength={200} className={inputClass} />
                  </Field>
                  <Field label="Références" hint="N° BL / AWB, n° de commande…">
                    <input value={form.references} onChange={set('references')} maxLength={300} className={inputClass} />
                  </Field>
                </>
              )}

              {avecDossier && (
                <Field label="Dossier concerné" hint={type === 'autre' ? 'Facultatif' : 'Facultatif, mais recommandé'}>
                  <select value={form.dossier} onChange={set('dossier')} className={inputClass}>
                    <option value="">— Aucun dossier en particulier —</option>
                    {(dossiers.data?.items ?? []).map((d) => (
                      <option key={d._id} value={d._id}>
                        {d.reference}
                        {d.referenceClient ? ` (réf. ${d.referenceClient})` : ''}
                        {d.typeOperation ? ` — ${d.typeOperation}` : ''}
                      </option>
                    ))}
                  </select>
                </Field>
              )}

              {type === 'facturation' && (
                <Field label="Listing concerné" hint="Facultatif">
                  <select value={form.facture} onChange={set('facture')} className={inputClass}>
                    <option value="">— Aucun listing en particulier —</option>
                    {(listings.data?.items ?? []).map((l) => (
                      <option key={l._id} value={l._id}>
                        {l.numero} — {l.libellePeriode}
                      </option>
                    ))}
                  </select>
                </Field>
              )}

              {type === 'document' && (
                <Field label="Document souhaité">
                  <input list="documents" value={form.documentDemande} onChange={set('documentDemande')} maxLength={200} className={inputClass} placeholder="Ex. Copie de la déclaration en douane" />
                  <datalist id="documents">
                    {DOCUMENTS.map((o) => (
                      <option key={o} value={o} />
                    ))}
                  </datalist>
                </Field>
              )}

              {type === 'reclamation' && (
                <Field label="Motif">
                  <select value={form.motifReclamation} onChange={set('motifReclamation')} className={inputClass}>
                    {Object.entries(RECLAMATION_MOTIFS).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v}
                      </option>
                    ))}
                  </select>
                </Field>
              )}

              {societes.length > 1 && !(avecDossier && form.dossier) && !(type === 'facturation' && form.facture) && (
                <Field label="Société concernée">
                  <select value={form.societe} onChange={set('societe')} className={inputClass}>
                    <option value="">Ma société</option>
                    {societes.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.raisonSociale}
                      </option>
                    ))}
                  </select>
                </Field>
              )}

              <Field label="Objet" required className="md:col-span-2">
                <input value={form.objet} onChange={set('objet')} maxLength={200} className={inputClass} placeholder={objetPropose(type, dossierChoisi) || 'Résumez votre demande en quelques mots'} />
              </Field>
              <Field label="Message" required className="md:col-span-2">
                <textarea
                  value={form.message}
                  onChange={set('message')}
                  rows={6}
                  maxLength={5000}
                  className={`${inputClass} resize-y`}
                  placeholder={
                    type === 'nouveau_dossier'
                      ? 'Décrivez l’opération : incoterm, port ou aéroport, contraintes de délai…'
                      : 'Décrivez votre demande. Plus elle est précise, plus nous pourrons vous répondre rapidement.'
                  }
                />
              </Field>
              <div className="md:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/70">Pièces jointes</span>
                <FichiersInput files={files} onChange={setFiles} />
                {type === 'nouveau_dossier' && (
                  <p className="mt-2 flex gap-2 text-xs text-ink/55">
                    <FontAwesomeIcon icon={faCircleInfo} className="mt-0.5 text-navy/40" />
                    Joignez si possible la facture commerciale, la packing list et le BL / AWB : ils seront repris dans votre dossier.
                  </p>
                )}
              </div>
            </div>

            {erreur && (
              <Alerte ton="erreur" className="mt-5">
                {erreur}
              </Alerte>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <Button variant="secondary" to="/espace-client/demandes">
                Annuler
              </Button>
              <Button type="submit" variant="accent" icon={faPaperPlane} loading={envoi}>
                Envoyer la demande
              </Button>
            </div>
          </Card>
        </form>
      )}
    </>
  )
}
