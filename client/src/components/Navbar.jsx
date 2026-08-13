import { useEffect, useState } from 'react'
import LoginModal from './LoginModal'
import {
  Menu,
  X,
  PawPrint,
  Heart,
  MapPin,
  Siren,
  Users,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] =
    useState(false)
  const [user, setUser] = useState(null)

  // Restore logged-in user after refresh
  useEffect(() => {
    const savedUser =
      localStorage.getItem('doggoUser')

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem(
          'doggoUser'
        )
      }
    }
  }, [])

  const links = [
    {
      label: 'Animals',
      icon: PawPrint,
      href: '#animals',
    },
    {
      label: 'Rescue',
      icon: Siren,
      href: '#rescue',
    },
    {
      label: 'Donate',
      icon: Heart,
      href: '#donate',
    },
    {
      label: 'Volunteers',
      icon: Users,
      href: '#volunteers',
    },
  ]

  const handleLogout = () => {
    localStorage.removeItem('doggoToken')
    localStorage.removeItem('doggoUser')

    setUser(null)
  }

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-8">
        <nav className="mx-auto max-w-7xl rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-lg shadow-slate-900/5 backdrop-blur-xl md:px-6">

          <div className="flex items-center justify-between">

            {/* Logo */}
            <a
              href="/"
              className="group flex items-center gap-2.5"
              aria-label="DOGGO Home"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-md transition-transform duration-300 group-hover:rotate-6">
                <PawPrint
                  size={22}
                  strokeWidth={2.5}
                />
              </span>

              <div className="leading-none">
                <span className="block text-xl font-black tracking-tight text-[#17211b]">
                  DOGGO
                </span>

                <span className="hidden text-[9px] font-bold uppercase tracking-[0.22em] text-emerald-700 sm:block">
                  See. Report. Rescue.
                </span>
              </div>
            </a>

            {/* Desktop navigation */}
            <div className="hidden items-center gap-1 lg:flex">
              {links.map((link) => {
                const Icon = link.icon

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <Icon size={16} />
                    {link.label}
                  </a>
                )
              })}
            </div>

            {/* Desktop actions */}
            <div className="hidden items-center gap-2 lg:flex">

              {user ? (
                <>
                  {/* Logged-in user */}
                  <div className="rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-800">
                    Hi, {user.name}
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {/* Login */}
                  <button
                    type="button"
                    onClick={() =>
                      setIsLoginOpen(true)
                    }
                    className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                  >
                    Login
                  </button>

                  {/* Join */}
                  <button
                    type="button"
                    className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-700/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-lg"
                  >
                    Join DOGGO
                  </button>
                </>
              )}

            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() =>
                setIsOpen(!isOpen)
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700 lg:hidden"
              aria-label={
                isOpen
                  ? 'Close menu'
                  : 'Open menu'
              }
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>
          </div>

          {/* Mobile navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: 'auto',
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="overflow-hidden lg:hidden"
              >
                <div className="mt-3 border-t border-slate-100 pt-3">

                  {links.map((link) => {
                    const Icon = link.icon

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() =>
                          setIsOpen(false)
                        }
                        className="flex items-center gap-3 rounded-xl px-3 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <Icon size={18} />
                        {link.label}
                      </a>
                    )
                  })}

                  {/* Mobile actions */}
                  <div className="mt-2 flex gap-2 border-t border-slate-100 pt-3">

                    {user ? (
                      <>
                        <div className="flex-1 rounded-xl bg-emerald-50 px-4 py-3 text-center text-sm font-bold text-emerald-800">
                          Hi, {user.name}
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            handleLogout()
                            setIsOpen(false)
                          }}
                          className="flex-1 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setIsLoginOpen(true)
                            setIsOpen(false)
                          }}
                          className="flex-1 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                        >
                          Login
                        </button>

                        <button
                          type="button"
                          className="flex-1 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
                        >
                          Join DOGGO
                        </button>
                      </>
                    )}

                  </div>

                  <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-3 text-xs font-medium text-emerald-800">
                    <MapPin size={15} />
                    Find animals near you
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </nav>
      </header>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() =>
          setIsLoginOpen(false)
        }
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser)

          localStorage.setItem(
            'doggoUser',
            JSON.stringify(
              loggedInUser
            )
          )
        }}
      />
    </>
  )
}

export default Navbar