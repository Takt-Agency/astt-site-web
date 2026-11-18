import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faClock, faNewspaper, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { listActualites } from '../services/api'
import ArticleCard, { Couverture, dateArticle } from '../components/ArticleCard'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.08 },
  }),
}

const PAGE_SIZE = 9

function Actualites() {
  const [categorie, setCategorie] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [essai, setEssai] = useState(0)

  useEffect(() => {
    document.title = 'Actualités — ASTT'
  }, [])

  useEffect(() => {
    const ctrl = new AbortController()
    setLoading(true)
    setError('')
    listActualites({ categorie, page, pageSize: PAGE_SIZE }, { signal: ctrl.signal })
      .then((res) => {
        setData(res)
        // « Voir plus » : les pages suivantes s'ajoutent à la liste
        setItems((prev) => (page === 1 ? res.items : [...prev, ...res.items]))
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!ctrl.signal.aborted) setLoading(false)
      })
    return () => ctrl.abort()
  }, [categorie, page, essai])

  function choisirCategorie(c) {
    if (c === categorie) return
    setItems([])
    setPage(1)
    setCategorie(c)
  }

  const categories = data?.categories ?? {}
  const aLaUne = data?.aLaUne ?? null
  const aucunArticle = !loading && !error && !aLaUne && items.length === 0
  const resteAVoir = data ? data.total - items.length : 0

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-16 text-white lg:pt-40 lg:pb-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-40 top-10 h-72 w-72 rounded-full bg-orange/15 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1280px] px-8 sm:px-12 lg:px-20">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 flex items-center gap-2 text-xs font-medium text-white/60"
          >
            <Link to="/" className="transition-colors hover:text-white">
              Accueil
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-orange">Actualités</span>
          </motion.nav>

          <motion.div variants={fadeUp} initial="hidden" animate="show" className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-orange" />
            <span className="rounded-full bg-orange/20 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.25em] text-orange">
              Actualités
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            L’actualité du <span className="text-mint">transit</span> et de la{' '}
            <span className="text-mint">douane</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-5 max-w-2xl text-sm leading-relaxed text-white/70 lg:text-base"
          >
            Nouveautés réglementaires, événements et vie de l’entreprise : suivez les informations utiles à vos
            opérations d’import et d’export.
          </motion.p>
        </div>
      </section>

      <section className="relative bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-[1280px] px-8 sm:px-12 lg:px-20">
          {/* Filtre par catégorie */}
          {Object.keys(categories).length > 0 && (
            <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Catégories">
              {[['', 'Toutes'], ...Object.entries(categories)].map(([k, v]) => (
                <button
                  key={k || 'toutes'}
                  type="button"
                  role="tab"
                  aria-selected={categorie === k}
                  onClick={() => choisirCategorie(k)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                    categorie === k
                      ? 'bg-navy text-white shadow-md shadow-navy/20'
                      : 'border border-navy/15 text-navy hover:border-navy hover:bg-navy/5'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          )}

          {error && items.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-2xl border border-orange/20 bg-orange/5 p-8 text-center">
              <p className="text-sm text-ink/70">{error}</p>
              <button
                type="button"
                onClick={() => setEssai((n) => n + 1)}
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-navy px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-navy-800"
              >
                <FontAwesomeIcon icon={faRotateRight} />
                Réessayer
              </button>
            </div>
          ) : aucunArticle ? (
            <AucunArticle filtre={Boolean(categorie)} onToutes={() => choisirCategorie('')} />
          ) : (
            <>
              {/* Article à la une */}
              {aLaUne && !categorie && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-12"
                >
                  <Link
                    to={`/actualites/${aLaUne.slug}`}
                    className="group grid overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-lg shadow-navy/5 transition-shadow hover:shadow-2xl hover:shadow-navy/10 lg:grid-cols-[1.25fr_1fr]"
                  >
                    <div className="aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[380px]">
                      <Couverture
                        article={aLaUne}
                        eager
                        className="transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col justify-center p-8 lg:p-12">
                      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                        <span className="rounded-full bg-orange px-3 py-1 uppercase tracking-wider text-white">
                          À la une
                        </span>
                        <span className="uppercase tracking-wider text-orange">{categories[aLaUne.categorie]}</span>
                      </div>
                      <h2 className="mt-5 text-2xl font-bold leading-tight text-navy transition-colors group-hover:text-orange lg:text-3xl">
                        {aLaUne.titre}
                      </h2>
                      {aLaUne.resume && (
                        <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-ink/65 lg:text-base">
                          {aLaUne.resume}
                        </p>
                      )}
                      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-ink/45">
                        <span>{dateArticle(aLaUne.datePublication)}</span>
                        <span className="inline-flex items-center gap-1.5">
                          <FontAwesomeIcon icon={faClock} />
                          {aLaUne.tempsLecture} min de lecture
                        </span>
                      </div>
                      <span className="mt-8 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-navy">
                        Lire l’article
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-orange text-white transition-transform group-hover:translate-x-1">
                          <FontAwesomeIcon icon={faArrowRight} className="text-[11px]" />
                        </span>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )}

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {items.map((a, i) => (
                  <motion.div
                    key={a._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                  >
                    <ArticleCard article={a} categories={categories} />
                  </motion.div>
                ))}
                {loading &&
                  Array.from({ length: items.length ? 3 : 6 }).map((_, i) => <CarteSquelette key={`s${i}`} />)}
              </div>

              {!loading && resteAVoir > 0 && (
                <div className="mt-12 text-center">
                  <button
                    type="button"
                    onClick={() => setPage((p) => p + 1)}
                    className="group inline-flex items-center gap-3 rounded-md border border-navy/20 px-7 py-4 text-sm font-bold uppercase tracking-wider text-navy transition-all hover:border-navy hover:bg-navy hover:text-white"
                  >
                    Voir plus d’articles
                    <FontAwesomeIcon icon={faArrowRight} className="text-[11px] transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              )}
              {error && items.length > 0 && <p className="mt-6 text-center text-sm text-orange">{error}</p>}
            </>
          )}
        </div>
      </section>
    </>
  )
}

function CarteSquelette() {
  return (
    <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white" aria-hidden="true">
      <div className="aspect-[16/10] animate-pulse bg-navy/5" />
      <div className="space-y-3 p-6">
        <div className="h-3 w-1/3 animate-pulse rounded bg-navy/10" />
        <div className="h-5 w-5/6 animate-pulse rounded bg-navy/10" />
        <div className="h-3 w-full animate-pulse rounded bg-navy/5" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-navy/5" />
      </div>
    </div>
  )
}

function AucunArticle({ filtre, onToutes }) {
  return (
    <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-navy/10 bg-mint/40 p-8 text-center shadow-lg shadow-navy/5 sm:p-12">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-orange text-white shadow-lg shadow-orange/30">
        <FontAwesomeIcon icon={faNewspaper} className="text-3xl" />
      </div>
      <h2 className="mt-6 text-2xl font-bold leading-tight text-navy sm:text-3xl">
        {filtre ? 'Aucun article dans cette catégorie' : 'Nos premières actualités arrivent bientôt'}
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink/70 lg:text-base">
        {filtre
          ? 'Consultez les autres catégories ou revenez prochainement.'
          : 'En attendant, découvrez nos services ou contactez notre équipe pour toute question.'}
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        {filtre ? (
          <button
            type="button"
            onClick={onToutes}
            className="inline-flex items-center gap-3 rounded-md bg-orange px-7 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-orange/20 transition-all hover:bg-orange-600"
          >
            Toutes les actualités
          </button>
        ) : (
          <Link
            to="/services"
            className="group inline-flex items-center gap-3 rounded-md bg-orange px-7 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-orange/20 transition-all hover:bg-orange-600"
          >
            Voir nos services
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
              <FontAwesomeIcon icon={faArrowRight} className="text-[11px]" />
            </span>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Actualites
