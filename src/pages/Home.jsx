import Hero from '../components/Hero'
import LogoCarousel from '../components/LogoCarousel'
import Mission from '../components/Mission'
import Services from '../components/Services'
import About from '../components/About'
import WhyAstt from '../components/WhyAstt'
import Process from '../components/Process'
import JouniGroup from '../components/JouniGroup'
import Digitalisation from '../components/Digitalisation'
import CTASection from '../components/CTASection'

function Home() {
  return (
    <>
      <Hero />
      <div className="pt-20 sm:pt-24 lg:pt-28" />
      <LogoCarousel />
      <Mission />
      <Services />
      <About />
      <WhyAstt />
      <Process />
      <JouniGroup />
      <Digitalisation />
      <CTASection />
    </>
  )
}

export default Home
