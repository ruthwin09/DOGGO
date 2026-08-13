import { useEffect, useState } from 'react'
import {
  Calendar,
  Loader2,
  MapPin,
  PawPrint,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { getMyReports } from '../services/api'
import ReportDetailsModal from './ReportDetailsModal'

function MyReports() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem('doggoToken'))
  )

  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedReportId, setSelectedReportId] =
    useState(null)

  const loadReports = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getMyReports()

      setReports(data.reports || [])
    } catch (error) {
      console.error(
        'Failed to load my reports:',
        error
      )

      setError(
        error.message ||
          'Unable to load your reports'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const checkAuthentication = () => {
      const loggedIn = Boolean(
        localStorage.getItem('doggoToken')
      )

      setIsLoggedIn(loggedIn)

      if (loggedIn) {
        loadReports()
      } else {
        setReports([])
        setLoading(false)
      }
    }

    checkAuthentication()

    const handleAuthChange = () => {
      checkAuthentication()
    }

    const handleReportCreated = () => {
      checkAuthentication()
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

  // Hide My Reports when logged out
  if (!isLoggedIn) {
    return null
  }

  const getStatusClasses = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-blue-50 text-blue-700'

      case 'assigned':
        return 'bg-purple-50 text-purple-700'

      case 'rescued':
        return 'bg-emerald-50 text-emerald-700'

      case 'closed':
        return 'bg-slate-100 text-slate-700'

      default:
        return 'bg-orange-50 text-orange-700'
    }
  }

  const formatStatus = (status) => {
    if (!status) {
      return 'Reported'
    }

    return (
      status.charAt(0).toUpperCase() +
      status.slice(1)
    )
  }

  const formatDate = (date) => {
    if (!date) {
      return 'Unknown date'
    }

    return new Date(date).toLocaleDateString(
      'en-IN',
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }
    )
  }

  return (
    <>
      <section
        id="my-reports"
        className="bg-slate-50 px-6 py-20 md:py-28"
      >
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                <PawPrint size={14} />
                Your activity
              </div>

              <h2 className="text-3xl font-black tracking-tight text-[#17211b] sm:text-4xl">
                My Reports
              </h2>

              <p className="mt-3 max-w-xl text-base leading-7 text-slate-500">
                Track the animal rescue reports
                you have submitted to DOGGO.
              </p>
            </div>

            <button
              type="button"
              onClick={loadReports}
              disabled={loading}
              className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-200 hover:text-emerald-700 disabled:opacity-60"
            >
              <RefreshCw
                size={16}
                className={
                  loading
                    ? 'animate-spin'
                    : ''
                }
              />
              Refresh
            </button>

          </div>

          {/* Loading */}
          {loading && (
            <div className="mt-10 flex min-h-48 items-center justify-center rounded-3xl border border-slate-200 bg-white">
              <div className="flex items-center gap-3 text-sm font-bold text-emerald-700">
                <Loader2
                  size={20}
                  className="animate-spin"
                />
                Loading your reports...
              </div>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="mt-10 rounded-3xl border border-red-200 bg-red-50 p-8 text-center">

              <AlertTriangle
                size={30}
                className="mx-auto text-red-500"
              />

              <h3 className="mt-3 font-black text-red-800">
                Unable to load reports
              </h3>

              <p className="mt-2 text-sm text-red-600">
                {error}
              </p>

              <button
                type="button"
                onClick={loadReports}
                className="mt-5 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
              >
                Try again
              </button>

            </div>
          )}

          {/* Empty */}
          {!loading &&
            !error &&
            reports.length === 0 && (
              <div className="mt-10 rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                  <PawPrint size={28} />
                </div>

                <h3 className="mt-5 text-xl font-black text-slate-800">
                  No reports yet
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Reports you submit will appear
                  here so you can track their rescue
                  status.
                </p>

              </div>
            )}

          {/* Reports */}
          {!loading &&
            !error &&
            reports.length > 0 && (
              <>
                <div className="mt-8 mb-5 text-sm font-bold text-slate-500">
                  {reports.length}{' '}
                  {reports.length === 1
                    ? 'report'
                    : 'reports'}{' '}
                  submitted
                </div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                  {reports.map(
                    (report, index) => (
                      <motion.article
                        key={report._id}
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.4,
                          delay:
                            index * 0.08,
                        }}
                        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                      >

                        {/* Card content */}
                        <div className="p-5">

                          <div className="flex items-start justify-between gap-3">

                            <div className="flex items-center gap-3">

                              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                                <PawPrint
                                  size={21}
                                />
                              </div>

                              <div>
                                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                  {report.animalType ||
                                    'Animal'}
                                </p>

                                <h3 className="mt-0.5 text-lg font-black text-slate-900">
                                  {report.title}
                                </h3>
                              </div>

                            </div>

                            <span
                              className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${getStatusClasses(
                                report.status
                              )}`}
                            >
                              {formatStatus(
                                report.status
                              )}
                            </span>

                          </div>

                          {/* Description */}
                          <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-500">
                            {report.description}
                          </p>

                          {/* Location */}
                          <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-600">

                            <MapPin
                              size={16}
                              className="shrink-0 text-emerald-700"
                            />

                            <span className="truncate">
                              {report.location
                                ?.address ||
                                'Location unavailable'}
                            </span>

                          </div>

                          {/* Severity + Injury */}
                          <div className="mt-4 grid grid-cols-2 gap-3">

                            <div className="rounded-xl bg-slate-50 p-3">

                              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                                Severity
                              </p>

                              <p
                                className={`mt-1 text-sm font-black ${
                                  report.severity ===
                                    'high' ||
                                  report.severity ===
                                    'critical'
                                    ? 'text-red-600'
                                    : 'text-slate-700'
                                }`}
                              >
                                {report.severity
                                  ? report.severity
                                      .charAt(0)
                                      .toUpperCase() +
                                    report.severity.slice(
                                      1
                                    )
                                  : 'Unknown'}
                              </p>

                            </div>

                            <div className="rounded-xl bg-slate-50 p-3">

                              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                                Injury
                              </p>

                              <p className="mt-1 truncate text-sm font-black capitalize text-slate-700">
                                {report.injuryType ||
                                  'Other'}
                              </p>

                            </div>

                          </div>

                          {/* Date */}
                          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-400">
                            <Calendar size={14} />

                            Reported on{' '}
                            {formatDate(
                              report.createdAt
                            )}
                          </div>

                        </div>

                        {/* Card footer */}
                        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">

                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">

                            {report.status ===
                              'rescued' ||
                            report.status ===
                              'closed' ? (
                              <CheckCircle
                                size={15}
                                className="text-emerald-600"
                              />
                            ) : (
                              <PawPrint
                                size={15}
                                className="text-emerald-600"
                              />
                            )}

                            DOGGO Rescue

                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedReportId(
                                report._id
                              )
                            }
                            className="rounded-lg px-3 py-2 text-xs font-bold text-emerald-700 transition hover:bg-emerald-50"
                          >
                            View Report →
                          </button>

                        </div>

                      </motion.article>
                    )
                  )}

                </div>
              </>
            )}

        </div>
      </section>

      {/* Report Details Modal */}
      <ReportDetailsModal
        reportId={selectedReportId}
        isOpen={Boolean(
          selectedReportId
        )}
        onClose={() =>
          setSelectedReportId(null)
        }
      />
    </>
  )
}

export default MyReports