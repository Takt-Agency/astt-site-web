import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faCalendarDays, faClock, faLink } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { getActualite, imageActualite } from '../services/api'
import ArticleCard, { dateArticle } from '../components/ArticleCard'
import ArticleContenu from '../components/ArticleContenu'

function ActualiteDetail() {
  const { slug } = useParams()
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [copie, setCopie] = useState(false)

  useEffect(() => {
    const ctrl = new AbortController()
    setData(null)
    setError(null)
    getActualite(slug, { signal: ctrl.signal })
      .then(setData)
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err)
      })
    return () => ctrl.abort()
  }, [slug])

  const article = data?.article
  const categories = data?.categories ?? {}

  useEffect(() => {
    if (article) document.title = `${article.titre} — Actualités ASTT`
  }, [article])

  const url = typeof window !== 'undefined' ? window.location.href : ''

  async function copierLien() {
    try {
      await navigator.clipboard.writeText(url)
      setCopie(true)
      setTimeout(() => setCopie(false), 2000)
    } catch {
      /* presse-papiers indisponible : rien à faire */
    }
  }

  const image = imageActualite(article)

  return (
    <>
      <section className="relative overflow-hidden bg-navy pt-32 pb-14 text-white lg:pt-40 lg:pb-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[920px] px-8 sm:px-12">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium text-white/60">
            <Link to="/" className="transition-colors hover:text-white">
              Accueil
            </Link>
            <span className="opacity-40">/</span>
            <Link to="/actualites" className="transition-colors hover:text-white">
              Actualités
            </Link>
            {article && (
              <>
                <span className="opacity-40">/</span>
                <span className="line-clamp-1 text-orange">{article.titre}</span>
              </>
            )}
          </nav>

          {error ? (
            <>
              <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
                {error.status === 404 ? 'Article introuvable' : 'Article indisponible'}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 lg:text-base">
                {error.status === 404
                  ? 'Cet article n’existe pas ou n’est plus publié.'
                  : error.message}
              </p>
              <Link
                to="/actualites"
                className="mt-8 inline-flex items-center gap-3 rounded-md bg-orange px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-orange-600"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="text-[11px]" />
                Toutes les actualités
              </Link>
            </>
          ) : !article ? (
            <div className="space-y-4" aria-hidden="true">
              <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
              <div className="h-10 w-full animate-pulse rounded bg-white/10" />
              <div className="h-10 w-2/3 animate-pulse rounded bg-white/10" />
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="rounded-full bg-orange/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-orange">
                {categories[article.categorie]}
              </span>
              <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                {article.titre}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
                <span className="inline-flex items-center gap-2">
                  <FontAwesomeIcon icon={faCalendarDays} className="text-orange" />
                  {dateArticle(article.datePublication)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <FontAwesomeIcon icon={faClock} className="text-orange" />
                  {article.tempsLecture} min de lecture
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {article && (
        <article className="bg-white pb-16 lg:pb-24">
          <div className="mx-auto max-w-[920px] px-8 sm:px-12">
            {image && (
              <motion.img
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                src={image}
                alt=""
                className="relative -mt-8 aspect-[16/9] w-full rounded-3xl object-cover shadow-2xl shadow-navy/20 lg:-mt-12"
              />
            )}

            <div className={image ? 'pt-12' : 'pt-12 lg:pt-16'}>
              {article.resume && (
                <p className="mb-8 border-l-4 border-orange pl-5 text-lg font-semibold leading-relaxed text-navy lg:text-xl">
                  {article.resume}
                </p>
              )}
              <ArticleContenu contenu={article.contenu} />
            </div>

            {/* Partage */}
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-navy/10 pt-8">
              <Link
                to="/actualites"
                className="group inline-flex items-center gap-2 text-sm font-bold text-navy transition-colors hover:text-orange"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="text-xs transition-transform group-hover:-translate-x-1" />
                Toutes les actualités
              </Link>
              <div className="flex items-center gap-2">
                <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-ink/45">Partager</span>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Partager sur LinkedIn"
                  className="grid h-10 w-10 place-items-center rounded-full border border-navy/15 text-navy transition hover:border-navy hover:bg-navy hover:text-white"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Partager sur Facebook"
                  className="grid h-10 w-10 place-items-center rounded-full border border-navy/15 text-navy transition hover:border-navy hover:bg-navy hover:text-white"
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <button
                  type="button"
                  onClick={copierLien}
                  aria-label="Copier le lien"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-navy/15 px-4 text-xs font-semibold text-navy transition hover:border-navy hover:bg-navy hover:text-white"
                >
                  <FontAwesomeIcon icon={faLink} />
                  {copie ? 'Lien copié' : 'Copier le lien'}
                </button>
              </div>
            </div>
          </div>
        </article>
      )}

      {data?.autres?.length > 0 && (
        <section className="bg-[#f6f8fb] py-16 lg:py-20">
          <div className="mx-auto max-w-[1280px] px-8 sm:px-12 lg:px-20">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-2xl font-bold text-navy lg:text-3xl">
                Autres <span className="text-orange">actualités</span>
              </h2>
              <Link
                to="/actualites"
                className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-navy hover:text-orange"
              >
                Tout voir
                <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {data.autres.map((a) => (
                <ArticleCard key={a._id} article={a} categories={categories} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default ActualiteDetail
