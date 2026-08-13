import {
  Heart,
  MapPin,
  Navigation,
  PawPrint,
  X,
  Phone,
  AlertTriangle,
  Loader2,
  Calendar,
  User,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { getReport } from '../services/api'

function AnimalCard({
  id,
  name,
  type,
  image,
  location,
  distance,
  condition,
  raised = 0,
  target = 0,
  urgent = false,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const progress =
    target > 0
      ? Math.min((raised / target) * 100, 100)
      : 0

  const handleViewReport = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getReport(id)

      setReport(data.report)
      setIsOpen(true)
    } catch (error) {
      console.error(
        'Failed to load report:',
        error
      )

      setError(
        error.message ||
          'Unable to load report details'
      )
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date) => {
    if (!date) return 'Unknown'

    return new Date(date).toLocaleDateString(
      'en-IN',
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }
    )
  }

  const getStatusLabel = (status) => {
    if (!status) return 'Reported'

    return status
      .charAt(0)
      .toUpperCase() +
      status.slice(1)
  }

  return (
    <>
      {/* Animal Card */}
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
                  urgent
                    ? 'bg-white'
                    : 'bg-emerald-600'
                }`}
              />

              {urgent
                ? 'URGENT'
                : 'NEEDS HELP'}
            </span>
          </div>

          {/* Animal type */}
          <div className="absolute bottom-4 left-4">
            <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-700 backdrop-blur-md">
              {type === 'cat'
                ? '🐱 Cat'
                : type === 'dog'
                ? '🐕 Dog'
                : '🐾 Animal'}
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
              <MapPin
                size={16}
                className="text-emerald-700"
              />
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
                  ₹{raised.toLocaleString(
                    'en-IN'
                  )}
                </p>
              </div>

              <p className="text-xs font-bold text-slate-400">
                of ₹
                {target.toLocaleString(
                  'en-IN'
                )}
              </p>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                initial={{
                  width: 0,
                }}
                whileInView={{
                  width: `${progress}%`,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 1,
                  ease: 'easeOut',
                }}
                className="h-full rounded-full bg-emerald-600"
              />
            </div>

            <p className="mt-2 text-xs font-bold text-emerald-700">
              {Math.round(progress)}%
              funded
            </p>
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={handleViewReport}
            disabled={loading}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#17211b] px-5 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />
                Loading report...
              </>
            ) : (
              <>
                <Heart size={17} />
                Help {name}
              </>
            )}
          </button>

          {/* Error */}
          {error && (
            <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-center text-xs font-semibold text-red-600">
              {error}
            </p>
          )}
        </div>
      </motion.article>

      {/* Report Details Modal */}
      <AnimatePresence>
        {isOpen && report && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setIsOpen(false)
              }
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              transition={{
                duration: 0.2,
              }}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            >
              {/* Close */}
              <button
                type="button"
                onClick={() =>
                  setIsOpen(false)
                }
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-lg transition hover:bg-white hover:text-slate-900"
                aria-label="Close report"
              >
                <X size={20} />
              </button>

              {/* Report image */}
              <div className="relative h-64 overflow-hidden sm:h-80">
                <img
                  src={
                    report.photos &&
                    report.photos.length > 0
                      ? report.photos[0]
                      : image
                  }
                  alt={report.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                      report.severity ===
                        'high' ||
                      report.severity ===
                        'critical'
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 text-emerald-800'
                    }`}
                  >
                    <AlertTriangle
                      size={14}
                    />
                    {report.severity
                      ?.toUpperCase() ||
                      'UNKNOWN'}{' '}
                    SEVERITY
                  </span>

                  <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                    {report.title}
                  </h2>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 sm:p-8">

                {/* Status */}
                <div className="mb-6 flex flex-wrap gap-2">
                  <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">
                    Status:{' '}
                    {getStatusLabel(
                      report.status
                    )}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700">
                    {report.animalType
                      ?.toUpperCase()}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700">
                    {report.injuryType
                      ?.toUpperCase()}
                  </span>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    About this report
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {report.description}
                  </p>
                </div>

                {/* Information grid */}
                <div className="mt-6 grid gap-3 sm:grid-cols-2">

                  {/* Location */}
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-emerald-700">
                      <MapPin size={18} />

                      <span className="text-xs font-bold uppercase tracking-wide">
                        Location
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-bold text-slate-800">
                      {report.location
                        ?.address ||
                        'Location unavailable'}
                    </p>

                    {report.location
                      ?.latitude !==
                      undefined &&
                      report.location
                        ?.longitude !==
                        undefined && (
                        <p className="mt-1 text-xs text-slate-400">
                          {report.location.latitude.toFixed(
                            4
                          )}
                          ,{' '}
                          {report.location.longitude.toFixed(
                            4
                          )}
                        </p>
                      )}
                  </div>

                  {/* Contact */}
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-emerald-700">
                      <Phone size={18} />

                      <span className="text-xs font-bold uppercase tracking-wide">
                        Contact
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-bold text-slate-800">
                      {report.contactPhone ||
                        report.reporter
                          ?.phone ||
                        'Not provided'}
                    </p>
                  </div>

                  {/* Reporter */}
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-emerald-700">
                      <User size={18} />

                      <span className="text-xs font-bold uppercase tracking-wide">
                        Reported by
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-bold text-slate-800">
                      {report.reporter
                        ?.name ||
                        'DOGGO Community Member'}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-emerald-700">
                      <Calendar size={18} />

                      <span className="text-xs font-bold uppercase tracking-wide">
                        Reported
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-bold text-slate-800">
                      {formatDate(
                        report.createdAt
                      )}
                    </p>
                  </div>
                </div>

                {/* Coordinates */}
                {report.location
                  ?.coordinates && (
                  <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                    <div className="flex items-center gap-2 text-emerald-800">
                      <MapPin size={18} />

                      <span className="text-sm font-bold">
                        Rescue location
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-emerald-700">
                      Coordinates:{' '}
                      {report.location.coordinates[1]}
                      ,{' '}
                      {report.location.coordinates[0]}
                    </p>
                  </div>
                )}

                {/* Photos */}
                {report.photos &&
                  report.photos.length >
                    1 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-black text-slate-900">
                        Report photos
                      </h3>

                      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {report.photos.map(
                          (
                            photo,
                            index
                          ) => (
                            <img
                              key={index}
                              src={photo}
                              alt={`${report.title} ${index + 1}`}
                              className="h-32 w-full rounded-xl object-cover"
                            />
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* Close */}
                <button
                  type="button"
                  onClick={() =>
                    setIsOpen(false)
                  }
                  className="mt-7 w-full rounded-xl bg-[#17211b] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-700"
                >
                  Close report
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AnimalCard