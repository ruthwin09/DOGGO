function Home() {
  return (
    <main className="min-h-screen bg-[#f7f8f3]">
      <section className="flex min-h-screen items-center justify-center px-6 pt-28">
        <div className="max-w-4xl text-center">

          <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-emerald-700">
            Community Powered Animal Rescue
          </p>

          <h1 className="text-5xl font-black leading-tight tracking-tight text-[#17211b] md:text-7xl">
            Every Paw Deserves
            <br />
            <span className="text-emerald-700">
              A Second Chance.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            See an animal in need? Report it, help rescue it, or support
            its journey toward recovery.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-full bg-emerald-700 px-8 py-4 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-emerald-800">
              🚨 Report an Animal
            </button>

            <button className="rounded-full border border-emerald-200 bg-white px-8 py-4 font-bold text-emerald-800 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300">
              ❤️ Help a Paw
            </button>
          </div>

        </div>
      </section>
    </main>
  )
}

export default Home