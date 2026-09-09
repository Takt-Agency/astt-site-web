import { motion } from 'motion/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const STEPS = [
  {
    number: '01',
    title: 'Analyse de vos besoins',
    text: 'Étude complète de vos flux et de vos contraintes opérationnelles.',
  },
  {
    number: '02',
    title: 'Mise en place des solutions',
    text: 'Définition des procédures et déploiement des outils adaptés.',
  },
  {
    number: '03',
    title: 'Suivi & coordination',
    text: 'Pilotage des opérations avec un point de contact dédié.',
  },
  {
    number: '04',
    title: 'Livraison & accompagnement',
    text: 'Suivi post-livraison et accompagnement long terme.',
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

function StepCard({ s }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-orange/40 hover:shadow-xl hover:shadow-navy/10 lg:p-7">
      <span className="absolute right-4 top-3 text-5xl font-extrabold text-navy/[0.05] transition-colors group-hover:text-orange/20 lg:text-6xl">
        {s.number}
      </span>

      <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-navy text-base font-extrabold text-white shadow-lg shadow-navy/20 transition-all group-hover:bg-orange group-hover:shadow-orange/25">
        {s.number}
      </span>

      <h3 className="relative mt-6 text-lg font-bold text-navy">{s.title}</h3>
      <p className="relative mt-2 flex-1 text-sm leading-relaxed text-ink/65">
        {s.text}
      </p>

      <span className="relative mt-5 block h-[2px] w-8 rounded-full bg-orange transition-all group-hover:w-16" />
    </div>
  )
}

function Process() {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-14">
        <div className="max-w-3xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="flex items-center gap-3"
          >
            <span className="h-[2px] w-8 bg-orange" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-navy">
              Notre process
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
            Un accompagnement
            <br />à <span className="text-orange">chaque étape.</span>
          </motion.h2>
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
            className="process-swiper !pb-14"
          >
            {STEPS.map((s) => (
              <SwiperSlide key={s.number} className="!h-auto">
                <StepCard s={s} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style>{`
        .process-swiper .swiper-pagination-bullet {
          background: #202b45;
          opacity: 0.25;
          transition: all 0.25s ease;
        }
        .process-swiper .swiper-pagination-bullet-active {
          background: #e94a2b;
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  )
}

export default Process
