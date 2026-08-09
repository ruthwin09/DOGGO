import { motion } from 'framer-motion'
import {
  Heart,
  PawPrint,
  ShieldCheck,
  Users,
} from 'lucide-react'

const stats = [
  {
    value: '1,248+',
    label: 'Animals Helped',
    description: 'Dogs and cats supported',
    icon: PawPrint,
  },
  {
    value: '912+',
    label: 'Rescued',
    description: 'Animals reached safety',
    icon: ShieldCheck,
  },
  {
    value: '₹8.4L+',
    label: 'Raised',
    description: 'Community contributions',
    icon: Heart,
  },
  {
    value: '6,842+',
    label: 'Paw Heroes',
    description: 'People making a difference',
    icon: Users,
  },
]

function ImpactStats() {
  return (
    <section className="relative px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-700">
            Our growing impact
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#17211b] md:text-4xl">
            Together, we can do more.
          </h2>
        </motion.div>

        <div className="grid overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-xl shadow-slate-900/5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className={`group relative p-7 text-center transition-colors duration-300 hover:bg-emerald-50/60 ${
                  index !== stats.length - 1
                    ? 'border-b border-emerald-100 lg:border-b-0 lg:border-r'
                    : ''
                } ${
                  index === 1
                    ? 'sm:border-r-0 lg:border-r'
                    : ''
                }`}
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={22} />
                </div>

                <p className="mt-5 text-3xl font-black tracking-tight text-[#17211b] md:text-4xl">
                  {stat.value}
                </p>

                <p className="mt-2 font-bold text-emerald-700">
                  {stat.label}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {stat.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-5 text-center text-xs font-medium text-slate-400"
        >
          Impact numbers will become live data once the DOGGO backend is connected.
        </motion.p>
      </div>
    </section>
  )
}

export default ImpactStats