import { Heart, MapPin, Navigation, PawPrint } from 'lucide-react'
import { motion } from 'framer-motion'

function AnimalCard({
  name,
  type,
  image,
  location,
  distance,
  condition,
  raised,
  target,
  urgent = false,
}) {
  const progress = Math.min((raised / target) * 100, 100)

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-900/10"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={`${name} - animal needing help`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        {/* Status */}
        <div className="absolute left-4 top-4">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold shadow-lg backdrop-blur-md ${
              urgent
                ? 'bg-red-500 text-white'
                : 'bg-white/90 text-emerald-800'
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                urgent ? 'bg-white' : 'bg-emerald-600'
              }`}
            />

            {urgent ? 'URGENT' : 'NEEDS HELP'}
          </span>
        </div>

        {/* Animal type */}
        <div className="absolute bottom-4 left-4">
          <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-700 backdrop-blur-md">
            {type === 'cat' ? '🐈 Cat' : '🐕 Dog'}
          </span>
        </div>

        {/* Favorite */}
        <button
          type="button"
          aria-label={`Support ${name}`}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-lg backdrop-blur-md transition hover:scale-110 hover:bg-white hover:text-red-500"
        >
          <Heart size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-black tracking-tight text-[#17211b]">
              {name}
            </h3>

            <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
              <PawPrint size={14} />
              {condition}
            </p>
          </div>

          <div className="rounded-xl bg-emerald-50 p-2 text-emerald-700">
            <PawPrint size={19} />
          </div>
        </div>

        {/* Location */}
        <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <MapPin size={16} className="text-emerald-700" />
            {location}
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-slate-400">
            <Navigation size={13} />
            {distance}
          </div>
        </div>

        {/* Funding */}
        <div className="mt-5">
          <div className="mb-2 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400">
                Treatment fund
              </p>

              <p className="mt-0.5 text-lg font-black text-[#17211b]">
                ₹{raised.toLocaleString('en-IN')}
              </p>
            </div>

            <p className="text-xs font-bold text-slate-400">
              of ₹{target.toLocaleString('en-IN')}
            </p>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full rounded-full bg-emerald-600"
            />
          </div>

          <p className="mt-2 text-xs font-bold text-emerald-700">
            {Math.round(progress)}% funded
          </p>
        </div>

        {/* CTA */}
        <button
          type="button"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#17211b] px-5 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700"
        >
          <Heart size={17} />
          Help {name}
        </button>
      </div>
    </motion.article>
  )
}

export default AnimalCard