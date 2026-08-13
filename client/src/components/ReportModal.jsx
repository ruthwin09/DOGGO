import { useState } from 'react'
import {
  X,
  PawPrint,
  MapPin,
  Phone,
  FileText,
  Loader2,
  CheckCircle,
} from 'lucide-react'
import { createReport } from '../services/api'

function ReportModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    animalType: 'dog',
    title: '',
    description: '',
    injuryType: 'injury',
    severity: 'medium',
    address: '',
    latitude: '',
    longitude: '',
    contactPhone: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  if (!isOpen) {
    return null
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleGetLocation = () => {
    setError('')

    if (!navigator.geolocation) {
      setError(
        'Geolocation is not supported by your browser'
      )
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm((previous) => ({
          ...previous,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        }))
      },
      () => {
        setError(
          'Unable to get your location. Please allow location access.'
        )
      }
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')

    if (
      !form.animalType ||
      !form.title.trim() ||
      !form.description.trim() ||
      !form.injuryType ||
      !form.severity
    ) {
      setError(
        'Please fill in all required fields'
      )
      return
    }

    if (
      form.latitude === '' ||
      form.longitude === ''
    ) {
      setError(
        'Please provide the animal location'
      )
      return
    }

    try {
      setLoading(true)

      const reportData = {
        animalType: form.animalType,
        title: form.title.trim(),
        description: form.description.trim(),
        injuryType: form.injuryType,
        severity: form.severity,
        photos: [],
        location: {
          address: form.address.trim(),
          latitude: Number(form.latitude),
          longitude: Number(form.longitude),
        },
        contactPhone:
          form.contactPhone.trim(),
      }

      await createReport(reportData)

      setSuccess(true)

      window.dispatchEvent(
        new Event('doggo-report-created')
      )
    } catch (error) {
      console.error(
        'DOGGO report creation failed:',
        error
      )

      setError(
        error.message ||
          'Unable to create rescue report'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (loading) {
      return
    }

    setSuccess(false)
    setError('')

    setForm({
      animalType: 'dog',
      title: '',
      description: '',
      injuryType: 'injury',
      severity: 'medium',
      address: '',
      latitude: '',
      longitude: '',
      contactPhone: '',
    })

    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget
        ) {
          handleClose()
        }
      }}
    >
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Close */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 shadow-md transition hover:text-slate-900"
          aria-label="Close report form"
        >
          <X size={20} />
        </button>

        {success ? (
          <div className="px-6 py-16 text-center sm:px-10">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle size={42} />
            </div>

            <h2 className="mt-6 text-3xl font-black text-slate-900">
              Report submitted!
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              Thank you for helping an animal in
              need. Your rescue report has been
              successfully submitted to DOGGO.
            </p>

            <button
              type="button"
              onClick={handleClose}
              className="mt-8 rounded-xl bg-emerald-700 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-800"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-[#17211b] px-6 py-8 text-white sm:px-8">

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600">
                  <PawPrint size={24} />
                </div>

                <div>
                  <h2 className="text-2xl font-black">
                    Report an Animal
                  </h2>

                  <p className="mt-1 text-sm text-white/60">
                    Help DOGGO respond faster.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6 sm:p-8"
            >
              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {error}
                </div>
              )}

              {/* Animal type */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Animal type *
                </label>

                <select
                  name="animalType"
                  value={form.animalType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
                >
                  <option value="dog">
                    Dog
                  </option>

                  <option value="cat">
                    Cat
                  </option>

                  <option value="cow">
                    Cow
                  </option>

                  <option value="bird">
                    Bird
                  </option>

                  <option value="other">
                    Other
                  </option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Report title *
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Example: Injured stray dog"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  What happened? *
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe the animal's condition and what you observed..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
                />
              </div>

              {/* Injury + severity */}
              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Injury type *
                  </label>

                  <select
                    name="injuryType"
                    value={form.injuryType}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600"
                  >
                    <option value="injury">
                      Injury
                    </option>

                    <option value="accident">
                      Accident
                    </option>

                    <option value="sick">
                      Sick
                    </option>

                    <option value="abandoned">
                      Abandoned
                    </option>

                    <option value="trapped">
                      Trapped
                    </option>

                    <option value="other">
                      Other
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Severity *
                  </label>

                  <select
                    name="severity"
                    value={form.severity}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600"
                  >
                    <option value="low">
                      Low
                    </option>

                    <option value="medium">
                      Medium
                    </option>

                    <option value="high">
                      High
                    </option>

                    <option value="critical">
                      Critical
                    </option>
                  </select>
                </div>
              </div>

              {/* Location */}
              <div className="rounded-2xl border border-slate-200 p-4">

                <div className="flex items-center gap-2">
                  <MapPin
                    size={19}
                    className="text-emerald-700"
                  />

                  <h3 className="font-black text-slate-800">
                    Animal location
                  </h3>
                </div>

                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Address / area name"
                  className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-600"
                />

                <button
                  type="button"
                  onClick={handleGetLocation}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800 transition hover:bg-emerald-100"
                >
                  <MapPin size={17} />
                  Use my current location
                </button>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">

                  <input
                    type="number"
                    step="any"
                    name="latitude"
                    value={form.latitude}
                    onChange={handleChange}
                    placeholder="Latitude"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-600"
                  />

                  <input
                    type="number"
                    step="any"
                    name="longitude"
                    value={form.longitude}
                    onChange={handleChange}
                    placeholder="Longitude"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-600"
                  />

                </div>
              </div>

              {/* Contact */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Contact phone
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="tel"
                    name="contactPhone"
                    value={form.contactPhone}
                    onChange={handleChange}
                    placeholder="Phone number for rescuers"
                    className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              {/* Photos placeholder */}
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <FileText size={18} />

                  <span className="text-sm font-bold">
                    Photos
                  </span>
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  Photo upload will be connected in
                  the next step.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={19}
                      className="animate-spin"
                    />
                    Submitting report...
                  </>
                ) : (
                  <>
                    <PawPrint size={19} />
                    Submit rescue report
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-400">
                By submitting this report, you
                help DOGGO connect the case with
                people who can help.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default ReportModal