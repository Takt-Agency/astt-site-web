import Hero from '../components/Hero'
import Mission from '../components/Mission'
import LogoCarousel from '../components/LogoCarousel'
import About from '../components/About'
import Services from '../components/Services'
import WhyAstt from '../components/WhyAstt'
import JouniGroup from '../components/JouniGroup'
import Digitalisation from '../components/Digitalisation'
import Team from '../components/Team'
import CTASection from '../components/CTASection'

function Home() {
  return (
    <>
      <Hero />
      <div className="pt-20 sm:pt-24 lg:pt-28" />
      <Mission />
      <Services />
      <About />
      <WhyAstt />
      <LogoCarousel />
      <JouniGroup />
      <Digitalisation />
      <Team />
      <CTASection />
    </>
  )
}

export default Home
