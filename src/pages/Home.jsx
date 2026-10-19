import Hero from '../components/Hero'
import LogoCarousel from '../components/LogoCarousel'
import Historique from '../components/Historique'
import CertificationIso from '../components/CertificationIso'
import Mission from '../components/Mission'
import Services from '../components/Services'
import About from '../components/About'
import WhyAstt from '../components/WhyAstt'
import Process from '../components/Process'
import Digitalisation from '../components/Digitalisation'
import CTASection from '../components/CTASection'

function Home() {
  return (
    <>
      <Hero />
      <LogoCarousel />
      <Historique />
      <CertificationIso />
      <Mission />
      <Services />
      <About />
      <WhyAstt />
      <Process />
      <Digitalisation />
      <CTASection />
    </>
  )
}

export default Home
