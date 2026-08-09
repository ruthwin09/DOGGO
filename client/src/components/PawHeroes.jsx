import { motion } from 'framer-motion'
import {
  ArrowRight,
  Heart,
  PawPrint,
  Sparkles,
} from 'lucide-react'

const heroes = [
  {
    id: 1,
    name: 'Rahul',
    amount: '₹1,000',
    animal: 'Bruno',
    role: 'Dog Guardian',
    initials: 'R',
    avatarClass: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 2,
    name: 'Ananya',
    amount: '₹500',
    animal: 'Luna',
    role: 'Paw Friend',
    initials: 'A',
    avatarClass: 'bg-orange-100 text-orange-700',
  },
  {
    id: 3,
    name: 'Karthik',
    amount: '₹2,000',
    animal: 'Rocky',
    role: 'Paw Champion',
    initials: 'K',
    avatarClass: 'bg-sky-100 text-sky-700',
  },
]

function PawHeroes() {
  return (
    <section
      id="donate"
      className="overflow-hidden bg-white px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-700">
            <Sparkles size={14} />
            The people behind the paws
          </div>

          <h2 className="text-3xl font-black tracking-tight text-[#17211b] sm:text-4xl md:text-5xl">
            Meet the
            <span className="text-emerald-700"> Paw Heroes.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500 md:text-lg">
            Every donation is a small act of kindness that can become
            someone's second chance.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {heroes.map((hero, index) => (
            <motion.article
              key={hero.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f9faf7] p-6 transition-shadow duration-300 hover:shadow-xl"
            >
              <PawPrint
                size={90}
                strokeWidth={1}
                className="absolute -right-5 -top-5 rotate-12 text-emerald-100"
              />

              <div className="relative">
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-20 w-20 items-center justify-center rounded-[1.5rem] text-2xl font-black ${hero.avatarClass}`}
                  >
                    {hero.initials}
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-500 shadow-sm">
                    <Heart size={18} fill="currentColor" />
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-2xl font-black text-[#17211b]">
                    {hero.name}
                  </p>

                  <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-emerald-700 shadow-sm">
                    <PawPrint size={13} />
                    {hero.role}
                  </div>
                </div>

                <div className="mt-7 rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Donated
                  </p>

                  <div className="mt-1 flex items-end justify-between gap-3">
                    <p className="text-3xl font-black text-[#17211b]">
                      {hero.amount}
                    </p>

                    <p className="text-right text-xs font-medium text-slate-500">
                      Helping
                      <br />
                      <span className="font-bold text-emerald-700">
                        {hero.animal}
                      </span>
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-6 text-slate-500">
                  A little kindness can make a huge difference.
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex flex-col items-center justify-between gap-5 rounded-[2rem] bg-[#17211b] p-6 text-white sm:flex-row sm:p-8"
        >
          <div>
            <div className="flex items-center gap-2">
              <Heart
                size={18}
                fill="currentColor"
                className="text-orange-400"
              />

              <p className="font-bold">
                Want to become a Paw Hero?
              </p>
            </div>

            <p className="mt-2 text-sm text-white/60">
              Your support can help fund food, rescue and treatment.
            </p>
          </div>

          <button className="group flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-[#17211b] transition hover:bg-emerald-50">
            Donate now

            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default PawHeroes