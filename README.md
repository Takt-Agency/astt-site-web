# astt-site-web

Site vitrine ASTT — Transit, Transport & Logistique. Filiale du Jouni Group.
Comprend l'**espace client** (`/espace-client`) : suivi des dossiers, documents, factures & listings, demandes à ASTT.

## Stack

- React 19 + Vite
- Tailwind CSS v4
- Motion (framer-motion successor)
- FontAwesome
- React Router DOM

## Scripts

```bash
npm install    # install dependencies
npm run dev    # start dev server
npm run build  # production build
npm run preview # preview production build
```

## Configuration

- `VITE_API_URL` : URL de l'API ASTT (même backend que le dashboard). En dev, `/api` est proxifié vers
  `http://localhost:5000` (surcharge : `VITE_PROXY_TARGET=http://localhost:5055 npm run dev`).
- Le backend doit autoriser l'origine du site dans `CORS_ORIGIN`.
- Dashboard : `VITE_SITE_URL` (ex. `https://astt.tn`) sert au lien « Accéder à l'espace client » quand un compte client
  tente de se connecter au tableau de bord.

## Structure

- `src/pages/` — page-level components (Home, Contact)
- `src/components/` — sections & UI (Navbar, Hero, About, Services, WhyAstt, JouniGroup, Digitalisation, Team, CTASection, Footer, Logo, LogoCarousel)
- `src/espace-client/` — espace client, chargé à la demande (n'alourdit pas le site vitrine) :
  - `EspaceClientApp.jsx` — routes `/espace-client/*` (connexion, tableau de bord, dossiers, demandes, factures, documents, notifications, compte)
  - `api.js` — appels `/api/espace-client` avec le jeton du client, téléchargement des fichiers protégés
  - `session.jsx` / `session-storage.js` — session du client (clés `astt.client.*`, distinctes du dashboard)
  - `components/` — gabarit (barre latérale, notifications, menu compte) et composants d'interface
  - `pages/` — écrans du portail
- `src/assets/` — logo, images
- `public/` — favicon and static assets

## Espace client

Les comptes sont créés par ASTT dans le tableau de bord (fiche société → « Accès à l'espace client », rôle `client`).
Un client voit les dossiers de sa société (et de ses filiales si son compte a le périmètre « groupe »), dépose des
documents, télécharge ses listings mensuels (PDF / Excel) et envoie des demandes (nouveau dossier, document, information,
réclamation, facturation) traitées dans le tableau de bord (« Demandes clients »).

---

Développé par [Takt Agency](https://takt-agency.net/).
