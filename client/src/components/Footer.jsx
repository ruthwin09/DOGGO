import {
  Heart,
  Mail,
  MapPin,
  PawPrint,
  Phone,
} from 'lucide-react'

const footerLinks = {
  Platform: [
    ['Animals', '#animals'],
    ['Nearby Help', '#nearby'],
    ['Donate', '#donate'],
    ['Report Animal', '#rescue'],
  ],
  Community: [
    ['Paw Heroes', '#donate'],
    ['Rescue Stories', '#stories'],
    ['Volunteers', '#volunteers'],
    ['About DOGGO', '#about'],
  ],
  Support: [
    ['Help Center', '#help'],
    ['Contact Us', '#contact'],
    ['Privacy Policy', '#privacy'],
    ['Terms of Service', '#terms'],
  ],
}

function Footer() {
  return (
    <footer className="bg-[#17211b] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">

          {/* Brand */}
          <div className="max-w-sm">
            <a href="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600">
                <PawPrint size={25} />
              </span>

              <div>
                <p className="text-2xl font-black tracking-tight">
                  DOGGO
                </p>

                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-emerald-400">
                  See. Report. Rescue.
                </p>
              </div>
            </a>

            <p className="mt-6 text-sm leading-7 text-white/55">
              A community-powered platform helping people report,
              discover and support animals that need care.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-white/60">
              <Heart
                size={16}
                className="text-orange-400"
                fill="currentColor"
              />
              Built for every paw that needs us.
            </div>

            {/* Social links */}
            <div className="mt-7 flex gap-2">

              <a
                href="#facebook"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/60 transition hover:bg-emerald-600 hover:text-white"
              >
                <span className="text-lg font-black">f</span>
              </a>

              <a
                href="#instagram"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/60 transition hover:bg-emerald-600 hover:text-white"
              >
                <span className="text-sm font-black">◎</span>
              </a>

              <a
                href="#twitter"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/60 transition hover:bg-emerald-600 hover:text-white"
              >
                <span className="text-sm font-black">𝕏</span>
              </a>

            </div>
          </div>

          {/* Footer links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-400">
                {title}
              </h3>

              <ul className="mt-5 space-y-3">
                {links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-white/55 transition hover:text-white"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-14 grid gap-3 border-y border-white/10 py-7 sm:grid-cols-3">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-emerald-400">
              <Mail size={17} />
            </div>

            <div>
              <p className="text-xs text-white/35">Email</p>
              <p className="text-sm font-semibold text-white/75">
                hello@doggo.org
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-emerald-400">
              <Phone size={17} />
            </div>

            <div>
              <p className="text-xs text-white/35">Support</p>
              <p className="text-sm font-semibold text-white/75">
                Community support
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-emerald-400">
              <MapPin size={17} />
            </div>

            <div>
              <p className="text-xs text-white/35">Serving</p>
              <p className="text-sm font-semibold text-white/75">
                Communities across India
              </p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 pt-7 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 DOGGO. Made with ❤️ for animals.
          </p>

          <p>
            DOGGO is a community platform, not an emergency veterinary service.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer