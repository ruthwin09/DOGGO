import { motion } from 'framer-motion'
import {
  Crosshair,
  MapPin,
  Navigation,
  PawPrint,
  ArrowRight,
} from 'lucide-react'

const nearbyAnimals = [
  {
    id: 1,
    name: 'Bruno',
    type: 'Dog',
    distance: '0.7 km',
    position: 'left-[25%] top-[28%]',
    urgent: true,
  },
  {
    id: 2,
    name: 'Luna',
    type: 'Cat',
    distance: '1.2 km',
    position: 'left-[58%] top-[38%]',
    urgent: false,
  },
  {
    id: 3,
    name: 'Rocky',
    type: 'Dog',
    distance: '2.1 km',
    position: 'left-[70%] top-[68%]',
    urgent: true,
  },
]

function NearbyAnimals() {
  return (
    <section
      id="nearby"
      className="bg-[#f7f8f3] px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <Navigation size={13} />
              Find help nearby
            </div>

            <h2 className="text-3xl font-black tracking-tight text-[#17211b] sm:text-4xl md:text-5xl">
              Animals near
              <span className="text-emerald-700"> you.</span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-500 md:text-lg">
              Find animals reported by people around you and discover
              where your help can make the biggest difference.
            </p>
          </div>

          <button className="flex w-fit items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-700/20 transition hover:-translate-y-0.5 hover:bg-emerald-800">
            <Crosshair size={17} />
            Use my location
          </button>
        </motion.div>

        {/* Map area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative mt-12 overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-xl shadow-slate-900/5"
        >
          <div className="relative h-[480px] overflow-hidden bg-[#e9f0e7] sm:h-[560px]">

            {/* Decorative map roads */}
            <div className="absolute left-[-10%] top-[45%] h-12 w-[120%] rotate-[-8deg] rounded-full bg-white/70" />

            <div className="absolute left-[30%] top-[-10%] h-[120%] w-10 rotate-[22deg] rounded-full bg-white/60" />

            <div className="absolute left-[-10%] top-[20%] h-7 w-[120%] rotate-[15deg] rounded-full bg-white/50" />

            <div className="absolute left-[65%] top-[-10%] h-[120%] w-6 rotate-[-35deg] rounded-full bg-white/50" />

            {/* Green areas */}
            <div className="absolute left-[8%] top-[10%] h-28 w-44 rounded-[45%] bg-emerald-100/70 blur-sm" />

            <div className="absolute bottom-[8%] right-[12%] h-36 w-52 rounded-[45%] bg-emerald-100/70 blur-sm" />

            <div className="absolute bottom-[20%] left-[35%] h-20 w-32 rounded-[45%] bg-green-100/60" />

            {/* Water */}
            <div className="absolute right-[-5%] top-[5%] h-48 w-72 rotate-[-18deg] rounded-[50%] bg-sky-100/70" />

            {/* Map labels */}
            <span className="absolute left-[10%] top-[46%] text-xs font-bold uppercase tracking-widest text-slate-400">
              Davanagere
            </span>

            <span className="absolute right-[18%] top-[28%] text-xs font-bold uppercase tracking-widest text-slate-400">
              Nearby
            </span>

            <span className="absolute bottom-[22%] left-[18%] text-xs font-bold uppercase tracking-widest text-slate-400">
              Community
            </span>

            {/* Animal markers */}
            {nearbyAnimals.map((animal) => (
              <motion.button
                key={animal.id}
                type="button"
                whileHover={{ scale: 1.1 }}
                className={`absolute ${animal.position} z-10`}
              >
                <div className="relative">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-4 border-white shadow-xl ${
                      animal.urgent
                        ? 'bg-red-500 text-white'
                        : 'bg-emerald-700 text-white'
                    }`}
                  >
                    <PawPrint size={21} />
                  </span>

                  {animal.urgent && (
                    <span className="absolute -right-1 -top-1 h-4 w-4 animate-ping rounded-full bg-red-400" />
                  )}

                  <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-lg">
                    {animal.name} · {animal.distance}
                  </div>
                </div>
              </motion.button>
            ))}

            {/* User location */}
            <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute -inset-5 rounded-full bg-emerald-400/20"
              />

              <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-emerald-700 text-white shadow-xl">
                <Crosshair size={23} />
              </div>

              <div className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#17211b] px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                You are here
              </div>
            </div>

            {/* Map controls */}
            <div className="absolute right-4 top-4 flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
              <button className="flex h-11 w-11 items-center justify-center border-b border-slate-100 text-lg font-bold text-slate-600 hover:bg-slate-50">
                +
              </button>

              <button className="flex h-11 w-11 items-center justify-center text-lg font-bold text-slate-600 hover:bg-slate-50">
                −
              </button>
            </div>

            {/* Map bottom card */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto">
              <div className="max-w-sm rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
                    <PawPrint size={20} />
                  </div>

                  <div>
                    <p className="font-black text-[#17211b]">
                      3 animals need help
                    </p>

                    <p className="text-xs text-slate-500">
                      Within 3 km of your location
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom action */}
          <div className="flex flex-col gap-4 border-t border-slate-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-bold text-[#17211b]">
                See an animal that needs help?
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Report it and help your community respond faster.
              </p>
            </div>

            <button className="group flex items-center justify-center gap-2 rounded-xl bg-[#17211b] px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">
              Report an animal

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default NearbyAnimals