import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { SERVICES } from '../data/services'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.08 },
  }),
}

function ServiceCard({ s }) {
  return (
    <div className="group flex h-full flex-col">
      {/* Image area */}
      <div className="relative h-56 overflow-hidden rounded-2xl bg-navy/10">
        {s.image ? (
          <img
            src={s.image}
            alt={s.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <FontAwesomeIcon
            icon={s.icon}
            className="absolute inset-0 m-auto text-6xl text-navy/25"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Overlapping white card */}
      <div className="relative -mt-8 mx-4 flex flex-1 flex-col rounded-2xl bg-white p-6 shadow-lg shadow-navy/5 transition-all group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-navy/10">
        <div className="grid h-10 w-10 place-items-center rounded-lg text-navy transition-colors group-hover:text-orange">
          <FontAwesomeIcon icon={s.icon} className="text-2xl" />
        </div>

        <span className="mt-4 text-[13px] font-medium text-orange">
          {s.number} — Services
        </span>
        <h3 className="mt-1 text-xl font-extrabold uppercase tracking-wide text-navy">
          {s.title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65">
          {s.short}
        </p>

        <Link
          to={`/services/${s.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-orange"
        >
          En savoir plus
          <span className="grid h-6 w-6 place-items-center rounded-full bg-orange text-white transition-transform group-hover:translate-x-1">
            <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
          </span>
        </Link>
      </div>
    </div>
  )
}

function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-navy py-16 text-white lg:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        {/* Header row */}
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[1.15fr_1fr_auto] lg:gap-12">
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="h-[3px] w-10 bg-orange" />
              <span className="text-[13px] font-bold uppercase tracking-[0.28em] text-white/85">
                Nos services
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              custom={1}
              className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[42px]"
            >
              Des services intégrés
              <br />
              pour une logistique maîtrisée
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            custom={2}
            className="max-w-md text-sm leading-relaxed text-white/70 lg:text-[15px]"
          >
            De l&apos;import à la digitalisation, ASTT vous accompagne à chaque
            étape avec des services spécialisés, assurés par des équipes
            dédiées.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            custom={3}
            className="justify-self-start lg:justify-self-end"
          >
            <Link
              to="/services"
              className="group inline-flex items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-orange"
            >
              Voir tous les services
              <span className="grid h-8 w-8 place-items-center rounded-full bg-orange text-white transition-transform group-hover:translate-x-1">
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Swiper carousel */}
        <div className="mt-12 lg:mt-14">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            slidesPerView={1}
            spaceBetween={20}
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              900: { slidesPerView: 3, spaceBetween: 24 },
              1200: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="services-swiper !pb-14"
          >
            {SERVICES.map((s) => (
              <SwiperSlide key={s.slug} className="!h-auto">
                <ServiceCard s={s} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style>{`
        .services-swiper .swiper-pagination-bullet {
          background: #ffffff;
          opacity: 0.35;
          transition: all 0.25s ease;
        }
        .services-swiper .swiper-pagination-bullet-active {
          background: #e94a2b;
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  )
}

export default Services
