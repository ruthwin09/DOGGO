import { useState } from 'react'
import { X, Mail, Lock, Loader2 } from 'lucide-react'
import { loginUser } from '../services/api'

function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) {
    return null
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')

    if (!email.trim() || !password) {
      setError(
        'Email and password are required'
      )
      return
    }

    try {
      setLoading(true)

      const data = await loginUser({
        email: email.trim(),
        password,
      })

      console.log(
        'DOGGO login successful:',
        data
      )

      if (data.user) {
  onLoginSuccess(data.user)

  window.dispatchEvent(
    new Event('doggo-auth-changed')
  )
}

onClose()

      setEmail('')
      setPassword('')
    } catch (error) {
      console.error(
        'DOGGO login failed:',
        error
      )

      setError(
        error.message ||
          'Unable to login. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose()
        }
      }}
    >
      <div className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          aria-label="Close login"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-7">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-white">
            <Lock size={23} />
          </div>

          <h2 className="text-2xl font-black text-slate-900">
            Welcome back
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Sign in to your DOGGO account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* Login form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Email */}
          <div>
            <label
              htmlFor="doggo-login-email"
              className="mb-1.5 block text-sm font-bold text-slate-700"
            >
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="doggo-login-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="doggo-login-password"
              className="mb-1.5 block text-sm font-bold text-slate-700"
            >
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="doggo-login-password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-700/20 transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Signing in...
              </>
            ) : (
              'Sign in to DOGGO'
            )}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-slate-400">
          Your account helps DOGGO connect you
          with animal rescue services.
        </p>
      </div>
    </div>
  )
}

export default LoginModal