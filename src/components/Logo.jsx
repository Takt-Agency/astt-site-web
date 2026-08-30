import { Link } from 'react-router-dom'
import logoAstt from '../assets/logo-astt.png'

function Logo({ className = '' }) {
  return (
    <Link to="/" className={`inline-flex items-center ${className}`}>
      <img src={logoAstt} alt="ASTT — Transit & logistics" className="h-12 w-auto" />
    </Link>
  )
}

export default Logo
