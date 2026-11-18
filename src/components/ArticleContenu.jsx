/**
 * Contenu d'un article de la page Actualités, identique à l'aperçu du dashboard
 * (Dashboard/src/components/siteweb/ArticleContenu.tsx). Texte simple, sans HTML :
 *   - paragraphes séparés par une ligne vide
 *   - « ## Intertitre » en début de ligne
 *   - « - élément » pour une liste à puces
 *   - **texte** pour mettre en gras
 */
function decouperContenu(contenu) {
  const blocs = []
  for (const morceau of String(contenu ?? '').replace(/\r\n/g, '\n').split(/\n\s*\n/)) {
    const lignes = morceau.split('\n').map((l) => l.trim()).filter(Boolean)
    let paragraphe = []
    let liste = []
    const vider = () => {
      if (paragraphe.length) blocs.push({ type: 'paragraphe', texte: paragraphe.join(' ') })
      if (liste.length) blocs.push({ type: 'liste', items: liste })
      paragraphe = []
      liste = []
    }
    for (const ligne of lignes) {
      if (ligne.startsWith('## ')) {
        vider()
        blocs.push({ type: 'titre', texte: ligne.slice(3) })
      } else if (/^[-•]\s+/.test(ligne)) {
        if (paragraphe.length) vider()
        liste.push(ligne.replace(/^[-•]\s+/, ''))
      } else {
        if (liste.length) vider()
        paragraphe.push(ligne)
      }
    }
    vider()
  }
  return blocs
}

function Texte({ texte }) {
  return texte.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') && part.length > 4 ? (
      <strong key={i} className="font-semibold text-navy">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  )
}

function ArticleContenu({ contenu }) {
  return (
    <div className="space-y-5 text-base leading-relaxed text-ink/75 lg:text-[17px]">
      {decouperContenu(contenu).map((b, i) =>
        b.type === 'titre' ? (
          <h2 key={i} className="pt-4 text-xl font-bold leading-snug text-navy lg:text-2xl">
            <Texte texte={b.texte} />
          </h2>
        ) : b.type === 'liste' ? (
          <ul key={i} className="list-disc space-y-2 pl-6 marker:text-orange">
            {b.items.map((it, j) => (
              <li key={j}>
                <Texte texte={it} />
              </li>
            ))}
          </ul>
        ) : (
          <p key={i}>
            <Texte texte={b.texte} />
          </p>
        ),
      )}
    </div>
  )
}

export default ArticleContenu
