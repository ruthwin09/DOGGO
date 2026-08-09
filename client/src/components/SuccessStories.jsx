import { motion } from 'framer-motion'
import {
  ArrowRight,
  Heart,
  PawPrint,
  Sparkles,
} from 'lucide-react'
import heroImage from '../assets/hero.png'

const stories = [
  {
    id: 1,
    name: 'Bruno',
    type: 'Dog',
    title: 'From the roadside to recovery.',
    description:
      'Bruno was found injured after an accident. A nearby volunteer reported him, a vet treated him, and the DOGGO community helped fund his recovery.',
    image: heroImage,
    category: 'Road accident',
  },
  {
    id: 2,
    name: 'Luna',
    type: 'Cat',
    title: 'A second chance for Luna.',
    description:
      'Luna needed urgent medical attention. Local animal lovers came together to make sure she received the care she needed.',
    image: heroImage,
    category: 'Medical care',
  },
]

function SuccessStories() {
  return (
    <section className="bg-[#f7f8f3] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
            <Sparkles size={14} />
            Stories of hope
          </div>

          <h2 className="text-3xl font-black tracking-tight text-[#17211b] sm:text-4xl md:text-5xl">
            Every rescue has
            <span className="text-emerald-700"> a story.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500 md:text-lg">
            Behind every donation is an animal, a person who cared,
            and a community that chose to help.
          </p>
        </motion.div>

        <div className="mt-12 space-y-8">
          {stories.map((story, index) => (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm"
            >
              <div
                className={`grid lg:grid-cols-2 ${
                  index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Image */}
                <div className="relative min-h-[360px] overflow-hidden bg-emerald-100">
                  <img
                    src={story.image}
                    alt={`${story.name} rescue story`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <div className="absolute left-5 top-5">
                    <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-emerald-800 shadow-lg backdrop-blur-md">
                      {story.category}
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-white/20 bg-black/30 px-4 py-3 text-white backdrop-blur-md">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                      <PawPrint size={19} />
                    </div>

                    <div>
                      <p className="text-xs text-white/70">
                        Rescue story
                      </p>

                      <p className="font-bold">
                        {story.name} · {story.type}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                    <Heart size={22} fill="currentColor" />
                  </div>

                  <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
                    {story.name}'s journey
                  </p>

                  <h3 className="mt-3 text-3xl font-black tracking-tight text-[#17211b] md:text-4xl">
                    {story.title}
                  </h3>

                  <p className="mt-5 text-base leading-8 text-slate-500">
                    {story.description}
                  </p>

                  <div className="mt-8 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <PawPrint size={16} />
                    </div>

                    <p className="text-sm font-bold text-slate-600">
                      One community. One life changed.
                    </p>
                  </div>

                  <button className="group mt-8 flex w-fit items-center gap-2 rounded-xl bg-[#17211b] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-700">
                    Read the full story

                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SuccessStories