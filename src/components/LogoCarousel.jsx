import safranLogo from '../assets/safran-logo.png'
import naniLogo from '../assets/Nani logo.jpg'
import boudjebelLogo from '../assets/boudjebel logo.png'

const BASE_PARTNERS = [
  { name: 'Safran', src: safranLogo },
  { name: 'Nani', src: naniLogo },
  { name: 'Boudjebel', src: boudjebelLogo },
]

// Répète les partenaires pour un défilement fluide et suffisamment long
const PARTNERS = Array.from({ length: 4 }, () => BASE_PARTNERS).flat()

function LogoItem({ name, src }) {
  return (
    <div className="group grid h-20 w-40 shrink-0 place-items-center px-6 sm:h-24 sm:w-48">
      <img
        src={src}
        alt={name}
        loading="lazy"
        className="max-h-10 w-auto object-contain grayscale opacity-60 transition-opacity duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:max-h-12"
      />
    </div>
  )
}

function LogoCarousel() {
  const loop = [...PARTNERS, ...PARTNERS]

  return (
    <section className="relative overflow-hidden bg-white py-6 lg:py-8">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-14">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent sm:w-32" />

          <div className="logo-track flex w-max items-center">
            {loop.map((p, i) => (
              <LogoItem key={`${p.name}-${i}`} name={p.name} src={p.src} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes logo-scroll {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        .logo-track {
          animation: logo-scroll 35s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-track { animation: none; }
        }
      `}</style>
    </section>
  )
}

export default LogoCarousel
