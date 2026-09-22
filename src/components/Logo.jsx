import { Link } from 'react-router-dom'
import logoDark from '../assets/logo-dark.png'
import logoWhite from '../assets/logo-white.png'

function Logo({ variant = 'dark', className = '' }) {
  const src = variant === 'white' ? logoWhite : logoDark
  return (
    <Link to="/" className={`inline-flex items-center ${className}`}>
      <img
        src={src}
        alt="ASTT — Transitaire et commissionnaire en douane"
        className="h-12 w-auto"
      />
    </Link>
  )
}

export default Logo
