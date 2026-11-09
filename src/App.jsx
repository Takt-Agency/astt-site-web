import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Certification from './pages/Certification'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Actualites from './pages/Actualites'
import MentionsLegales from './pages/MentionsLegales'
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite'

// Espace client : chargé seulement quand un client l'ouvre
const EspaceClientApp = lazy(() => import('./espace-client/EspaceClientApp'))

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 50)
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash])
  return null
}

/** Site vitrine : barre de navigation et pied de page communs. */
function SiteLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function ChargementEspace() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#f4f6fa] text-sm text-ink/50">
      Chargement de votre espace…
    </div>
  )
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/espace-client/*"
          element={
            <Suspense fallback={<ChargementEspace />}>
              <EspaceClientApp />
            </Suspense>
          }
        />
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/actualites" element={<Actualites />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/certification" element={<Certification />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route
            path="/politique-confidentialite"
            element={<PolitiqueConfidentialite />}
          />
        </Route>
      </Routes>
    </>
  )
}

export default App
