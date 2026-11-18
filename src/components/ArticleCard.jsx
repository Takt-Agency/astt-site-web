import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { imageActualite } from '../services/api'

export const dateArticle = (iso) =>
  iso ? new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : ''

/** Image de couverture, ou motif ASTT quand l'article n'en a pas. */
export function Couverture({ article, className = '', eager = false }) {
  const src = imageActualite(article)
  if (src) {
    return (
      <img
        src={src}
        alt=""
        loading={eager ? 'eager' : 'lazy'}
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }
  return (
    <div className={`relative grid h-full w-full place-items-center bg-navy ${className}`}>
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '22px 22px' }}
        aria-hidden="true"
      />
      <FontAwesomeIcon icon={faNewspaper} className="relative text-4xl text-white/30" />
    </div>
  )
}

function ArticleCard({ article, categories }) {
  return (
    <Link
      to={`/actualites/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm shadow-navy/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <Couverture article={article} className="transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold">
          <span className="uppercase tracking-wider text-orange">{categories?.[article.categorie] ?? ''}</span>
          <span className="text-ink/40">{dateArticle(article.datePublication)}</span>
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug text-navy transition-colors group-hover:text-orange">
          {article.titre}
        </h3>
        {article.resume && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/65">{article.resume}</p>}
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-navy">
          Lire l’article
          <FontAwesomeIcon icon={faArrowRight} className="text-xs transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

export default ArticleCard
