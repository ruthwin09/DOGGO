import { motion } from 'framer-motion'
import {
  ArrowRight,
  Heart,
  MapPin,
  PawPrint,
  ShieldCheck,
} from 'lucide-react'
import heroImage from '../assets/hero.png'

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f7f8f3] pt-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-[-120px] top-40 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-[-100px] h-80 w-80 rounded-full bg-orange-100/50 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28">

        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-bold text-emerald-800 shadow-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
              <PawPrint size={14} />
            </span>

            Community powered animal rescue
          </div>

          <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-[-0.04em] text-[#17211b] sm:text-6xl lg:text-7xl">
            Every paw deserves
            <span className="mt-2 block text-emerald-700">
              a second chance.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
            See an animal in need? Report it, help rescue it, or support
            its journey toward recovery. Together, we can turn moments
            of helplessness into stories of hope.
          </p>

          {/* CTA buttons */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button className="group flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-6 py-4 font-bold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-800 hover:shadow-xl">
              🚨 Report an Animal

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <button className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-white px-6 py-4 font-bold text-emerald-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md">
              <Heart size={18} />
              Help a Paw
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck size={17} className="text-emerald-700" />
              Verified rescue cases
            </div>

            <div className="flex items-center gap-2">
              <PawPrint size={17} className="text-emerald-700" />
              Community powered
            </div>
          </div>
        </motion.div>

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto w-full max-w-xl"
        >
          {/* Image container */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-emerald-100 p-2 shadow-2xl shadow-slate-900/10">
            <div className="relative overflow-hidden rounded-[2rem]">
              <img
                src={heroImage}
                alt="Dog waiting for care and support"
                className="h-[480px] w-full object-cover sm:h-[560px]"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Image label */}
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-md">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Together we can help
                    </p>

                    <p className="mt-1 font-bold text-[#17211b]">
                      One report can change a life.
                    </p>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white">
                    <Heart size={20} fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating location card */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -left-5 top-16 hidden rounded-2xl border border-white bg-white p-4 shadow-xl sm:block"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <MapPin size={20} />
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400">
                  Nearby
                </p>
                <p className="font-bold text-[#17211b]">
                  Animals need help
                </p>
              </div>
            </div>
          </motion.div>

          {/* Floating paw card */}
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -bottom-5 -right-4 hidden rounded-2xl border border-white bg-white p-4 shadow-xl sm:block"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <PawPrint size={20} />
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400">
                  DOGGO community
                </p>
                <p className="font-bold text-[#17211b]">
                  Every paw matters
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero