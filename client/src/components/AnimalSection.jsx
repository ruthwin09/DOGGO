import {
  ArrowRight,
  MapPin,
  Loader2,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import AnimalCard from './AnimalCard'
import { getReports } from '../services/api'

function AnimalSection() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadReports = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getReports(
        '?limit=6'
      )

      setReports(data.reports || [])
    } catch (error) {
      console.error(
        'Failed to load animal reports:',
        error
      )

      setError(
        error.message ||
          'Unable to load animal reports'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
  // Load reports when the page opens
  loadReports()

  // Reload after login/logout
  const handleAuthChange = () => {
    loadReports()
  }

  // Reload after a new rescue report is created
  const handleReportCreated = () => {
    loadReports()
  }

  window.addEventListener(
    'doggo-auth-changed',
    handleAuthChange
  )

  window.addEventListener(
    'doggo-report-created',
    handleReportCreated
  )

  return () => {
    window.removeEventListener(
      'doggo-auth-changed',
      handleAuthChange
    )

    window.removeEventListener(
      'doggo-report-created',
      handleReportCreated
    )
  }
}, [])

  // Convert backend reports into
  // the format expected by AnimalCard
  const animals = reports.map(
    (report) => {
      const severity =
        report.severity?.toLowerCase()

      const animalType =
        report.animalType?.toLowerCase()

      const isUrgent =
        severity === 'high' ||
        severity === 'critical'

      return {
        id: report._id,

        name:
          report.title ||
          `${animalType || 'Animal'} rescue case`,

        type: animalType || 'other',

        image:
          report.photos &&
          report.photos.length > 0
            ? report.photos[0]
            : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=80',

        location:
          report.location?.address ||
          'Location unavailable',

        distance: 'Nearby',

        condition:
          report.description ||
          'Needs medical attention',

        raised: 0,

        target: 0,

        urgent: isUrgent,

        status:
          report.status || 'reported',
      }
    }
  )

  return (
    <section
      id="animals"
      className="bg-white px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-red-600">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Animals that need help
            </div>

            <h2 className="text-3xl font-black tracking-tight text-[#17211b] sm:text-4xl md:text-5xl">
              A little help can
              <span className="text-emerald-700">
                {' '}
                change a life.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-500 md:text-lg">
              Discover animals reported by
              the DOGGO community and help
              them get the care they need.
            </p>
          </div>

          <button
            type="button"
            className="group flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-200 hover:text-emerald-700"
          >
            <MapPin size={17} />
            View nearby
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="mt-12 flex min-h-48 items-center justify-center">
            <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-6 py-4 text-sm font-bold text-emerald-800">
              <Loader2
                size={20}
                className="animate-spin"
              />
              Loading animal reports...
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-12 rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-center">
            <p className="font-bold text-red-700">
              Unable to load animal reports
            </p>

            <p className="mt-1 text-sm text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* Empty state */}
        {!loading &&
          !error &&
          animals.length === 0 && (
            <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-12 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <MapPin size={24} />
              </div>

              <h3 className="text-lg font-black text-slate-800">
                No animal reports yet
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                New rescue reports from the
                DOGGO community will appear here.
              </p>
            </div>
          )}

        {/* Real MongoDB reports */}
        {!loading &&
          !error &&
          animals.length > 0 && (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {animals.map(
                (animal, index) => (
                  <motion.div
                    key={animal.id}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.15,
                    }}
                    transition={{
                      duration: 0.5,
                      delay:
                        index * 0.1,
                    }}
                  >
                    <AnimalCard
                      {...animal}
                    />
                  </motion.div>
                )
              )}
            </div>
          )}
      </div>
    </section>
  )
}

export default AnimalSection