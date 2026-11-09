import { useState } from 'react'
import { faBuilding, faFloppyDisk, faKey, faUser } from '@fortawesome/free-solid-svg-icons'
import { COMMUN, api } from '../api'
import { dateHeureFr } from '../format'
import { useSession } from '../session'
import { Alerte, Button, Card, CardHeader, Field, InfoRow, PageHeader, inputClass } from '../components/ui'

function Coordonnees() {
  const { user, majProfil } = useSession()
  const [form, setForm] = useState({ name: user?.name ?? '', email: user?.email ?? '', phone: user?.phone ?? '' })
  const [envoi, setEnvoi] = useState(false)
  const [message, setMessage] = useState(null)

  async function enregistrer(e) {
    e.preventDefault()
    setEnvoi(true)
    setMessage(null)
    try {
      await majProfil({ name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() })
      setMessage({ ton: 'succes', texte: 'Vos coordonnées sont enregistrées.' })
    } catch (err) {
      setMessage({ ton: 'erreur', texte: err.message })
    } finally {
      setEnvoi(false)
    }
  }

  return (
    <Card>
      <CardHeader titre="Mes coordonnées" icon={faUser} description={user?.lastLoginAt ? `Dernière connexion : ${dateHeureFr(user.lastLoginAt)}` : undefined} />
      <form onSubmit={enregistrer} className="space-y-4 px-5 py-5 sm:px-6">
        <Field label="Nom complet" required>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} required />
        </Field>
        <Field label="Email (identifiant de connexion)" required>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} required />
        </Field>
        <Field label="Téléphone">
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
        </Field>
        {message && <Alerte ton={message.ton}>{message.texte}</Alerte>}
        <div className="flex justify-end">
          <Button type="submit" icon={faFloppyDisk} loading={envoi}>
            Enregistrer
          </Button>
        </div>
      </form>
    </Card>
  )
}

function MotDePasse() {
  const [form, setForm] = useState({ actuel: '', nouveau: '', confirmation: '' })
  const [envoi, setEnvoi] = useState(false)
  const [message, setMessage] = useState(null)

  async function changer(e) {
    e.preventDefault()
    setMessage(null)
    if (form.nouveau.length < 8) return setMessage({ ton: 'erreur', texte: 'Le nouveau mot de passe doit contenir au moins 8 caractères.' })
    if (form.nouveau !== form.confirmation) return setMessage({ ton: 'erreur', texte: 'La confirmation ne correspond pas au nouveau mot de passe.' })
    setEnvoi(true)
    try {
      await api.post('/auth/change-password', { currentPassword: form.actuel, newPassword: form.nouveau }, COMMUN)
      setForm({ actuel: '', nouveau: '', confirmation: '' })
      setMessage({ ton: 'succes', texte: 'Votre mot de passe a été modifié.' })
    } catch (err) {
      setMessage({ ton: 'erreur', texte: err.message })
    } finally {
      setEnvoi(false)
    }
  }

  return (
    <Card>
      <CardHeader titre="Mot de passe" icon={faKey} />
      <form onSubmit={changer} className="space-y-4 px-5 py-5 sm:px-6">
        <Field label="Mot de passe actuel" required>
          <input type="password" autoComplete="current-password" value={form.actuel} onChange={(e) => setForm({ ...form, actuel: e.target.value })} className={inputClass} />
        </Field>
        <Field label="Nouveau mot de passe" hint="8 caractères minimum." required>
          <input type="password" autoComplete="new-password" value={form.nouveau} onChange={(e) => setForm({ ...form, nouveau: e.target.value })} className={inputClass} />
        </Field>
        <Field label="Confirmation" required>
          <input type="password" autoComplete="new-password" value={form.confirmation} onChange={(e) => setForm({ ...form, confirmation: e.target.value })} className={inputClass} />
        </Field>
        {message && <Alerte ton={message.ton}>{message.texte}</Alerte>}
        <div className="flex justify-end">
          <Button type="submit" variant="secondary" icon={faKey} loading={envoi} disabled={!form.actuel || !form.nouveau}>
            Changer le mot de passe
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default function Profil() {
  const { societes, user } = useSession()
  return (
    <>
      <PageHeader titre="Mon compte" description="Vos coordonnées, votre mot de passe et les sociétés auxquelles vous avez accès." />
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <Coordonnees />
          <MotDePasse />
        </div>
        <Card className="self-start">
          <CardHeader titre={societes.length > 1 ? 'Mes sociétés' : 'Ma société'} icon={faBuilding} description="Pour modifier ces informations, contactez ASTT." />
          <ul className="divide-y divide-slate-100">
            {societes.map((s) => (
              <li key={s._id} className="px-5 py-3 sm:px-6">
                <p className="font-bold text-navy">
                  {s.raisonSociale}
                  {String(s._id) === String(user?.tiers) && societes.length > 1 && <span className="ml-2 text-xs font-semibold text-orange">compte principal</span>}
                </p>
                <dl className="mt-1 divide-y divide-slate-50">
                  <InfoRow label="Code client">{s.code}</InfoRow>
                  <InfoRow label="Matricule fiscal">{s.matriculeFiscal}</InfoRow>
                  <InfoRow label="Adresse">{s.adresse}</InfoRow>
                  <InfoRow label="Téléphone">{s.telephone}</InfoRow>
                  <InfoRow label="Email">{s.email}</InfoRow>
                </dl>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  )
}
