import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faCircleCheck,
  faClock,
  faComments,
  faFileArrowUp,
  faFileInvoiceDollar,
  faFolderOpen,
  faPlus,
  faReply,
  faTriangleExclamation,
  faTruckFast,
} from '@fortawesome/free-solid-svg-icons'
import { api } from '../api'
import { dateFr, depuis, tnd } from '../format'
import { useSession } from '../session'
import { useApi } from '../useApi'
import { Alerte, Button, Card, CardHeader, EmptyState, ErrorBox, ListingStatut, Loading, PageHeader, PhaseBadge, StatCard, TypeBadge, cx } from '../components/ui'

const BARRES = {
  ouvert: 'bg-slate-400',
  declaration: 'bg-sky-500',
  douane: 'bg-indigo-500',
  dedouane: 'bg-violet-500',
  livraison: 'bg-amber-500',
  livre: 'bg-emerald-500',
}

export default function TableauDeBord() {
  const { user } = useSession()
  const { data, error, loading, recharger } = useApi(() => api.get('/tableau-de-bord'), [], { intervalle: 120_000 })
  const prenom = (user?.name ?? '').split(/\s+/)[0]

  if (loading && !data) return <Loading />
  if (error) return <ErrorBox error={error} onRetry={recharger} />
  const { compteurs, parPhase, phases, listings, demandes, derniersDossiers, evenements } = data
  const enCoursPhases = phases.filter((p) => p.key !== 'livre')
  const maxPhase = Math.max(1, ...enCoursPhases.map((p) => parPhase[p.key] ?? 0))

  return (
    <>
      <PageHeader
        titre={`Bonjour${prenom ? ` ${prenom}` : ''}`}
        description="Voici l’essentiel de vos opérations avec ASTT."
        actions={
          <>
            <Button variant="secondary" icon={faFolderOpen} to="/espace-client/dossiers">
              Mes dossiers
            </Button>
            <Button variant="accent" icon={faPlus} to="/espace-client/demandes/nouvelle">
              Nouvelle demande
            </Button>
          </>
        }
      />

      <div className="space-y-3">
        {compteurs.documentsAttendus > 0 && (
          <Alerte ton="attention" icon={faFileArrowUp} titre={`ASTT attend des documents pour ${compteurs.documentsAttendus} dossier${compteurs.documentsAttendus > 1 ? 's' : ''}`}>
            Déposez les pièces demandées pour ne pas retarder le dédouanement.{' '}
            <Link to="/espace-client/dossiers?etat=documents" className="font-semibold underline underline-offset-2">
              Voir les dossiers
            </Link>
          </Alerte>
        )}
        {listings.enRetard > 0 && (
          <Alerte ton="erreur" icon={faTriangleExclamation} titre={`${listings.enRetard} listing${listings.enRetard > 1 ? 's' : ''} à échéance dépassée`}>
            <Link to="/espace-client/factures?statut=emise" className="font-semibold underline underline-offset-2">
              Consulter mes factures
            </Link>
          </Alerte>
        )}
        {demandes.reponsesNonLues > 0 && (
          <Alerte ton="info" icon={faReply} titre={`${demandes.reponsesNonLues} nouvelle${demandes.reponsesNonLues > 1 ? 's' : ''} réponse${demandes.reponsesNonLues > 1 ? 's' : ''} d’ASTT`}>
            <Link to="/espace-client/demandes" className="font-semibold underline underline-offset-2">
              Lire mes demandes
            </Link>
          </Alerte>
        )}
      </div>

      <div className={cx('grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4', (compteurs.documentsAttendus || listings.enRetard || demandes.reponsesNonLues) && 'mt-6')}>
        <StatCard label="Dossiers en cours" valeur={compteurs.enCours} icon={faFolderOpen} to="/espace-client/dossiers?etat=en_cours" hint={`${compteurs.total} dossier${compteurs.total > 1 ? 's' : ''} au total`} />
        <StatCard label="Livrés ce mois" valeur={compteurs.livresMois} icon={faTruckFast} ton="bg-emerald-50 text-emerald-700" to="/espace-client/dossiers?phase=livre" />
        <StatCard
          label="Reste à régler"
          valeur={tnd(listings.reste, { devise: false })}
          icon={faFileInvoiceDollar}
          ton="bg-orange/10 text-orange"
          accent={listings.reste > 0}
          to="/espace-client/factures"
          hint={listings.aRegler ? `${listings.aRegler} listing${listings.aRegler > 1 ? 's' : ''} à régler · TND` : 'TND · aucun listing en attente'}
        />
        <StatCard label="Demandes ouvertes" valeur={demandes.ouvertes} icon={faComments} ton="bg-sky-50 text-sky-700" to="/espace-client/demandes" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader titre="Avancement de vos dossiers en cours" icon={faClock} description="Répartition par étape" />
          <div className="space-y-3.5 px-5 py-5 sm:px-6">
            {enCoursPhases.map((p) => {
              const n = parPhase[p.key] ?? 0
              return (
                <Link key={p.key} to={`/espace-client/dossiers?phase=${p.key}`} className="group grid grid-cols-[130px_1fr_32px] items-center gap-3 sm:grid-cols-[180px_1fr_40px]">
                  <span className="truncate text-sm font-medium text-navy group-hover:text-orange">{p.label}</span>
                  <span className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <span className={cx('block h-full rounded-full transition-all', BARRES[p.key])} style={{ width: `${(n / maxPhase) * 100}%` }} />
                  </span>
                  <span className="text-right text-sm font-bold text-navy">{n}</span>
                </Link>
              )
            })}
            {compteurs.enCours === 0 && <p className="pt-1 text-sm text-ink/50">Aucun dossier en cours actuellement.</p>}
          </div>
        </Card>

        <Card>
          <CardHeader titre="Activité récente" icon={faCircleCheck} />
          {evenements.length === 0 ? (
            <p className="px-6 py-8 text-sm text-ink/50">Les étapes clés de vos dossiers apparaîtront ici.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {evenements.map((e) => (
                <li key={e._id}>
                  <Link to={`/espace-client/dossiers/${e.dossier}`} className="flex items-start gap-3 px-5 py-3.5 transition hover:bg-slate-50 sm:px-6">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-navy">{e.titre}</span>
                      <span className="block text-xs text-ink/50">
                        {e.reference} · {depuis(e.date)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader
            titre="Derniers dossiers mis à jour"
            icon={faFolderOpen}
            action={
              <Link to="/espace-client/dossiers" className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-navy/60 hover:text-orange">
                Tout voir <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
              </Link>
            }
          />
          {derniersDossiers.length === 0 ? (
            <EmptyState icon={faFolderOpen} titre="Aucun dossier pour le moment" texte="Vos dossiers apparaîtront ici dès leur ouverture par ASTT." />
          ) : (
            <ul className="divide-y divide-slate-100">
              {derniersDossiers.map((d) => (
                <li key={d._id}>
                  <Link to={`/espace-client/dossiers/${d._id}`} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 px-5 py-3.5 transition hover:bg-slate-50 sm:px-6">
                    <span className="min-w-0">
                      <span className="block font-semibold text-navy">{d.reference}</span>
                      <span className="flex flex-wrap items-center gap-x-3 text-xs text-ink/50">
                        <TypeBadge type={d.type} />
                        {d.typeOperation && <span>{d.typeOperation}</span>}
                        {d.referenceClient && <span>Réf. {d.referenceClient}</span>}
                      </span>
                    </span>
                    <span className="flex items-center gap-3">
                      {d.complementDemande && <span className="text-xs font-semibold text-amber-600">Documents attendus</span>}
                      <PhaseBadge phase={d.phase} label={d.phaseLabel} termine={d.termine} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <CardHeader
            titre="Factures & listings"
            icon={faFileInvoiceDollar}
            action={
              <Link to="/espace-client/factures" className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-navy/60 hover:text-orange">
                Tout voir <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
              </Link>
            }
          />
          {listings.derniers.length === 0 ? (
            <p className="px-6 py-8 text-sm text-ink/50">Vos listings mensuels apparaîtront ici dès leur émission.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {listings.derniers.map((l) => (
                <li key={l._id}>
                  <Link to={`/espace-client/factures/${l._id}`} className="flex items-center justify-between gap-3 px-5 py-3.5 transition hover:bg-slate-50 sm:px-6">
                    <span className="min-w-0">
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
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  )
}
