import { motion } from 'framer-motion'
import {
  ArrowRight,
  Camera,
  Heart,
  MapPin,
  PawPrint,
  Siren,
} from 'lucide-react'

function ReportCTA() {
  return (
    <section
      id="rescue"
      className="overflow-hidden bg-white px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-[#17211b] px-6 py-12 text-white sm:px-10 md:px-14 md:py-16"
        >
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-600/20 blur-2xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-orange-500/10 blur-2xl" />

          {/* Paw decoration */}
          <PawPrint
            size={220}
            strokeWidth={0.7}
            className="pointer-events-none absolute -bottom-16 right-8 rotate-12 text-white/[0.04]"
          />

          <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                <Siren size={14} />
                Be the first responder
              </div>

              <h2 className="mt-6 text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">
                See an animal in trouble?
                <span className="block text-emerald-400">
                  Don't walk past.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-white/60 md:text-lg">
                Report the animal, share its location and help nearby
                rescuers understand what is happening. Your few minutes
                could change an animal's entire life.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
                  <Camera size={16} />
                  Add photos
                </div>

                <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
                  <MapPin size={16} />
                  Share location
                </div>

                <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
                  <Heart size={16} />
                  Request help
                </div>
              </div>
            </div>

            <div className="relative">
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl sm:p-6"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
                  <PawPrint size={30} />
                </div>

                <p className="mt-5 text-lg font-black">
                  One report matters.
                </p>

                <p className="mt-2 max-w-xs text-sm leading-6 text-white/50">
                  Help the right people find the right animal at the right
                  time.
                </p>

                <button className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-400">
                  Report an Animal

                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ReportCTA