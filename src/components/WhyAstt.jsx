import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBolt,
  faLaptopCode,
  faLocationCrosshairs,
  faUserGraduate,
} from '@fortawesome/free-solid-svg-icons'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const PILLARS = [
  {
    number: '01',
    icon: faUserGraduate,
    title: 'Expertise',
    text: 'Une connaissance approfondie du secteur du transit, du transport et des opérations douanières.',
  },
  {
    number: '02',
    icon: faBolt,
    title: 'Réactivité',
    text: 'Des équipes engagées et disponibles pour un suivi rapide de chaque opération.',
  },
  {
    number: '03',
    icon: faLocationCrosshairs,
    title: 'Traçabilité',
    text: 'Un suivi précis des opérations et une visibilité complète sur vos dossiers.',
  },
  {
    number: '04',
    icon: faLaptopCode,
    title: 'Digitalisation',
    text: 'Des solutions modernes pour optimiser vos processus logistiques et administratifs.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.08 },
  }),
}

function PillarCard({ p }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-orange/40 hover:shadow-xl hover:shadow-navy/10 lg:p-7">
      <span className="absolute right-4 top-4 text-4xl font-extrabold text-navy/[0.05] transition-colors group-hover:text-orange/20 lg:text-5xl">
        {p.number}
      </span>

      <div className="relative grid h-11 w-11 place-items-center rounded-xl bg-navy text-white transition-colors group-hover:bg-orange lg:h-12 lg:w-12">
        <FontAwesomeIcon icon={p.icon} className="text-base lg:text-lg" />
      </div>

      <h3 className="relative mt-4 text-base font-bold uppercase tracking-wide text-navy lg:mt-5 lg:text-lg">
        {p.title}
      </h3>

      <p className="relative mt-2 flex-1 text-[13px] leading-relaxed text-ink/65 lg:text-sm">
        {p.text}
      </p>

      <span className="relative mt-4 block h-[2px] w-6 rounded-full bg-orange transition-all group-hover:w-12" />
    </div>
  )
}

function WhyAstt() {
  return (
    <section
      id="atouts"
      className="relative overflow-hidden bg-mint/40 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-14">
        <div className="max-w-2xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="flex items-center gap-3"
          >
            <span className="h-[2px] w-8 bg-orange" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-navy">
              Nos atouts
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            custom={1}
            className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight text-navy sm:text-4xl lg:text-[42px]"
          >
            Une approche pensée
            <br />
            pour <span className="text-orange">votre performance.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            custom={2}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink/70"
          >
            Quatre piliers guident notre engagement au quotidien et garantissent
            un accompagnement structuré, fiable et orienté résultats.
          </motion.p>
        </div>

        <div className="mt-12 lg:mt-14">
          <Swiper
            modules={[Pagination]}
            slidesPerView={1.15}
            spaceBetween={16}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              900: { slidesPerView: 3, spaceBetween: 24 },
              1200: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="atouts-swiper !pb-14"
          >
            {PILLARS.map((p) => (
              <SwiperSlide key={p.number} className="!h-auto">
                <PillarCard p={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style>{`
        .atouts-swiper .swiper-pagination-bullet {
          background: #202b45;
          opacity: 0.25;
          transition: all 0.25s ease;
        }
        .atouts-swiper .swiper-pagination-bullet-active {
          background: #e94a2b;
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  )
}

export default WhyAstt
