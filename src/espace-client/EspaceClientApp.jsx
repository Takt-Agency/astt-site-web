import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ClientSessionProvider, useSession } from './session'
import EspaceLayout from './components/EspaceLayout'
import { PageHeader } from './components/ui'
import Connexion from './pages/Connexion'
import TableauDeBord from './pages/TableauDeBord'
import Dossiers from './pages/Dossiers'
import DossierDetail from './pages/DossierDetail'
import Demandes from './pages/Demandes'
import NouvelleDemande from './pages/NouvelleDemande'
import DemandeDetail from './pages/DemandeDetail'
import Factures from './pages/Factures'
import FactureDetail from './pages/FactureDetail'
import Documents from './pages/Documents'
import Notifications from './pages/Notifications'
import Profil from './pages/Profil'

/** Pages protégées : sans session, retour à la connexion avec la page demandée. */
function RequireClient({ children }) {
  const { connecte } = useSession()
  const location = useLocation()
  if (!connecte) {
    const retour = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/espace-client/connexion?retour=${retour}`} replace />
  }
  return children
}

function Introuvable() {
  return <PageHeader titre="Page introuvable" description="Cette page n’existe pas dans votre espace client." retour={{ to: '/espace-client', label: 'Tableau de bord' }} />
}

/** Espace client du site web (chargé à la demande : n'alourdit pas le site vitrine). */
export default function EspaceClientApp() {
  return (
    <ClientSessionProvider>
      <Routes>
        <Route path="connexion" element={<Connexion />} />
        <Route
          element={
            <RequireClient>
              <EspaceLayout />
            </RequireClient>
          }
        >
          <Route index element={<TableauDeBord />} />
          <Route path="dossiers" element={<Dossiers />} />
          <Route path="dossiers/:id" element={<DossierDetail />} />
          <Route path="demandes" element={<Demandes />} />
          <Route path="demandes/nouvelle" element={<NouvelleDemande />} />
          <Route path="demandes/:id" element={<DemandeDetail />} />
          <Route path="factures" element={<Factures />} />
          <Route path="factures/:id" element={<FactureDetail />} />
          <Route path="documents" element={<Documents />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profil" element={<Profil />} />
          <Route path="*" element={<Introuvable />} />
        </Route>
      </Routes>
    </ClientSessionProvider>
  )
}
