import { useEffect, useState } from 'react'
import {
  X,
  Loader2,
  MapPin,
  PawPrint,
  Calendar,
  Phone,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'
import { getReport } from '../services/api'

function ReportDetailsModal({
  reportId,
  isOpen,
  onClose,
}) {
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen || !reportId) {
      return
    }

    const loadReport = async () => {
      try {
        setLoading(true)
        setError('')
        setReport(null)

        const data = await getReport(reportId)

        setReport(data.report)
      } catch (error) {
        console.error(
          'Failed to load report details:',
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

    loadReport()
  }, [isOpen, reportId])

  if (!isOpen) {
    return null
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
        month: 'long',
        year: 'numeric',
      }
    )
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

  // Rescue status timeline
  const statusSteps = [
    {
      key: 'reported',
      label: 'Reported',
      description:
        'Your rescue report has been submitted to DOGGO.',
    },
    {
      key: 'verified',
      label: 'Verified',
      description:
        'DOGGO has verified the rescue report.',
    },
    {
      key: 'assigned',
      label: 'Rescue Assigned',
      description:
        'A rescue volunteer or team has been assigned.',
    },
    {
      key: 'rescued',
      label: 'Rescued',
      description:
        'The animal has been rescued and is receiving care.',
    },
    {
      key: 'closed',
      label: 'Closed',
      description:
        'The rescue case has been completed.',
    },
  ]

  const getStatusIndex = (status) => {
    const index = statusSteps.findIndex(
      (step) => step.key === status
    )

    return index === -1 ? 0 : index
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose()
        }
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-slate-500 shadow-sm transition hover:bg-slate-100 hover:text-slate-800"
          aria-label="Close report details"
        >
          <X size={20} />
        </button>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="flex items-center gap-3 text-sm font-bold text-emerald-700">
              <Loader2
                size={22}
                className="animate-spin"
              />
              Loading report...
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="px-6 py-16 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
              <AlertTriangle size={28} />
            </div>

            <h3 className="mt-5 text-xl font-black text-slate-900">
              Unable to load report
            </h3>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700"
            >
              Close
            </button>

          </div>
        )}

        {/* Report */}
        {!loading &&
          !error &&
          report && (
            <>
              {/* Header */}
              <div className="bg-[#17211b] px-6 py-8 text-white sm:px-8">

                <div className="flex items-start gap-4 pr-10">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600">
                    <PawPrint size={28} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                      {report.animalType ||
                        'Animal'}{' '}
                      rescue report
                    </p>

                    <h2 className="mt-1 text-2xl font-black leading-tight sm:text-3xl">
                      {report.title}
                    </h2>
                  </div>

                </div>

                <div className="mt-6 flex flex-wrap gap-2">

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-bold ${getStatusClasses(
                      report.status
                    )}`}
                  >
                    Status:{' '}
                    {formatStatus(
                      report.status
                    )}
                  </span>

                  <span className="rounded-full bg-red-500/15 px-3 py-1.5 text-xs font-bold text-red-300">
                    Severity:{' '}
                    {formatStatus(
                      report.severity
                    )}
                  </span>

                </div>

              </div>

              {/* Content */}
              <div className="space-y-6 p-6 sm:p-8">

                {/* Description */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Description
                  </p>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {report.description}
                  </p>
                </div>

                {/* Details */}
                <div className="grid gap-4 sm:grid-cols-2">

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <PawPrint size={16} />

                      <span className="text-xs font-bold uppercase tracking-wide">
                        Injury type
                      </span>
                    </div>

                    <p className="mt-2 font-black capitalize text-slate-800">
                      {report.injuryType ||
                        'Not specified'}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <AlertTriangle size={16} />

                      <span className="text-xs font-bold uppercase tracking-wide">
                        Severity
                      </span>
                    </div>

                    <p className="mt-2 font-black capitalize text-slate-800">
                      {report.severity ||
                        'Not specified'}
                    </p>
                  </div>

                </div>

                {/* Location */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Location
                  </p>

                  <div className="mt-2 flex items-start gap-3 rounded-2xl bg-slate-50 p-4">

                    <MapPin
                      size={20}
                      className="mt-0.5 shrink-0 text-emerald-700"
                    />

                    <div>
                      <p className="font-bold text-slate-800">
                        {report.location
                          ?.address ||
                          'Address unavailable'}
                      </p>

                      {report.location
                        ?.latitude !==
                        undefined &&
                        report.location
                          ?.longitude !==
                        undefined && (
                          <p className="mt-1 text-xs text-slate-400">
                            {report.location.latitude},{' '}
                            {report.location.longitude}
                          </p>
                        )}
                    </div>

                  </div>
                </div>

                {/* Contact */}
                {report.contactPhone && (
                  <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                      <Phone size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                        Contact
                      </p>

                      <p className="mt-0.5 font-black text-slate-800">
                        {report.contactPhone}
                      </p>
                    </div>

                  </div>
                )}

                {/* Date */}
                <div className="flex items-center gap-3 border-t border-slate-100 pt-5">

                  <Calendar
                    size={18}
                    className="text-slate-400"
                  />

                  <p className="text-sm text-slate-500">
                    Reported on{' '}
                    <span className="font-bold text-slate-700">
                      {formatDate(
                        report.createdAt
                      )}
                    </span>
                  </p>

                </div>

                {/* Rescue Status Timeline */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Rescue progress
                  </p>

                  <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-5">

                    {statusSteps.map(
                      (step, index) => {
                        const currentIndex =
                          getStatusIndex(
                            report.status
                          )

                        const isCompleted =
                          index <=
                          currentIndex

                        const isCurrent =
                          index ===
                          currentIndex

                        return (
                          <div
                            key={step.key}
                            className="relative flex gap-4"
                          >

                            {/* Connecting line */}
                            {index <
                              statusSteps.length -
                                1 && (
                              <div
                                className={`absolute left-[15px] top-8 h-[calc(100%-8px)] w-0.5 ${
                                  index <
                                  currentIndex
                                    ? 'bg-emerald-500'
                                    : 'bg-slate-200'
                                }`}
                              />
                            )}

                            {/* Step icon */}
                            <div
                              className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                                isCompleted
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-white text-slate-300 ring-1 ring-slate-200'
                              } ${
                                isCurrent
                                  ? 'ring-4 ring-emerald-100'
                                  : ''
                              }`}
                            >
                              {isCompleted ? (
                                <CheckCircle
                                  size={17}
                                />
                              ) : (
                                <span className="h-2.5 w-2.5 rounded-full bg-current" />
                              )}
                            </div>

                            {/* Step content */}
                            <div className="pb-7">

                              <div className="flex items-center gap-2">

                                <h4
                                  className={`text-sm font-black ${
                                    isCurrent
                                      ? 'text-emerald-700'
                                      : isCompleted
                                        ? 'text-slate-800'
                                        : 'text-slate-400'
                                  }`}
                                >
                                  {step.label}
                                </h4>

                                {isCurrent && (
                                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                                    Current
                                  </span>
                                )}

                              </div>

                              <p
                                className={`mt-1 text-xs leading-5 ${
                                  isCompleted
                                    ? 'text-slate-500'
                                    : 'text-slate-400'
                                }`}
                              >
                                {step.description}
                              </p>

                            </div>

                          </div>
                        )
                      }
                    )}

                  </div>
                </div>

              </div>
            </>
          )}

      </div>
    </div>
  )
}

export default ReportDetailsModal