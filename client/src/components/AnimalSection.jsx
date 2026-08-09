import { ArrowRight, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import AnimalCard from './AnimalCard'
import { animals } from '../data/animals'

function AnimalSection() {
  return (
    <section
      id="animals"
      className="bg-white px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-red-600">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Animals that need help
            </div>

            <h2 className="text-3xl font-black tracking-tight text-[#17211b] sm:text-4xl md:text-5xl">
              A little help can
              <span className="text-emerald-700"> change a life.</span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-500 md:text-lg">
              Discover animals reported by the DOGGO community and
              help fund the care they need.
            </p>
          </div>

          <button className="group flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-200 hover:text-emerald-700">
            <MapPin size={17} />
            View nearby
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </motion.div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {animals.map((animal, index) => (
            <motion.div
              key={animal.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <AnimalCard {...animal} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AnimalSection