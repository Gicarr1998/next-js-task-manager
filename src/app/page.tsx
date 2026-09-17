import Link from "next/link";

const features = [
  { title: "Stay focused", description: "Keep every task in one quiet, organized workspace.", icon: "✓" },
  { title: "See what matters", description: "Filter your list and give important work your full attention.", icon: "⌁" },
  { title: "Finish with momentum", description: "A clear view of progress makes it easier to keep moving.", icon: "↗" },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbfaf8] text-[#1e2933]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <header className="flex h-24 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-lg font-semibold tracking-tight">
            <span className="grid size-9 place-items-center rounded-xl bg-[#1e2933] text-sm font-bold text-white shadow-sm">T</span>
            Taskflow
          </Link>
          <nav className="flex items-center gap-3 text-sm font-medium">
            <Link href="/login" className="hidden px-4 py-2 text-slate-600 transition hover:text-[#1e2933] sm:inline-flex">Log in</Link>
            <Link href="/signup" className="rounded-full bg-[#1e2933] px-5 py-2.5 text-white shadow-sm transition hover:bg-[#33414c]">Get started</Link>
          </nav>
        </header>

        <section className="relative grid items-center gap-14 pb-24 pt-14 lg:grid-cols-[1fr_0.92fr] lg:pb-32 lg:pt-24">
          <div className="relative z-10 max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#dce5df] bg-[#f1f6f2] px-3 py-1.5 text-xs font-semibold text-[#476553]">
              <span className="size-1.5 rounded-full bg-[#629174]" /> A calmer way to get things done
            </div>
            <h1 className="text-5xl font-semibold tracking-[-0.055em] text-[#1e2933] sm:text-6xl lg:text-7xl">Plan less.<br /><span className="text-[#63816d]">Finish more.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">Taskflow is the simple task manager for turning a busy mind into a clear, focused day.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/signup" className="inline-flex items-center justify-center rounded-full bg-[#1e2933] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-[#33414c]">Create your free account <span className="ml-2 text-lg leading-none">→</span></Link>
              <Link href="/login" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">I already have an account</Link>
            </div>
            <p className="mt-5 text-sm text-slate-500">Free to use. No credit card required.</p>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="absolute -right-16 -top-16 size-64 rounded-full bg-[#d9eadc] blur-3xl" />
            <div className="relative rounded-[2rem] border border-slate-200/80 bg-white p-4 shadow-2xl shadow-slate-900/10 sm:p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5"><div><p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">Tuesday, May 14</p><h2 className="mt-1 text-xl font-semibold">Today&apos;s focus</h2></div><span className="rounded-full bg-[#e8f1e9] px-3 py-1.5 text-xs font-semibold text-[#52735e]">3 of 5 done</span></div>
              <div className="mt-5 space-y-3"><TaskCard title="Review project brief" done /><TaskCard title="Prepare client presentation" /><TaskCard title="Block time for deep work" /><TaskCard title="Send weekly update" done /></div>
              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#f7f8f7] px-4 py-3 text-sm text-slate-500"><span className="grid size-6 place-items-center rounded-full border border-slate-300 text-base leading-none">+</span>Add a task for today</div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl sm:block"><p className="text-xs text-slate-500">Weekly progress</p><p className="mt-1 text-lg font-semibold">12 tasks completed <span className="text-[#64836f]">↑</span></p></div>
          </div>
        </section>

        <section className="border-t border-slate-200 py-20 lg:py-24">
          <div className="max-w-xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#63816d]">Built for your real work</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Everything you need. Nothing you don&apos;t.</h2></div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">{features.map((feature) => <article key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5"><span className="grid size-10 place-items-center rounded-xl bg-[#e9f1eb] text-lg font-semibold text-[#52735e]">{feature.icon}</span><h3 className="mt-5 text-lg font-semibold">{feature.title}</h3><p className="mt-2 leading-7 text-slate-600">{feature.description}</p></article>)}</div>
        </section>
      </div>
      <section className="bg-[#1e2933] px-6 py-20 text-center text-white lg:py-24"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#b8cfbd]">Your next clear day starts here</p><h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Make space for the work that matters.</h2><Link href="/signup" className="mt-8 inline-flex rounded-full bg-[#dcece0] px-6 py-3.5 text-sm font-semibold text-[#274032] transition hover:bg-white">Start organizing for free →</Link></section>
      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8"><p>© {new Date().getFullYear()} Taskflow</p><Link href="/login" className="font-medium text-slate-600 hover:text-[#1e2933]">Log in to your workspace</Link></footer>
    </main>
  );
}

function TaskCard({ title, done = false }: { title: string; done?: boolean }) {
  return <div className="flex items-center gap-3 rounded-xl border border-slate-100 px-4 py-3.5"><span className={`grid size-5 shrink-0 place-items-center rounded-full border text-xs ${done ? "border-[#6a9077] bg-[#6a9077] text-white" : "border-slate-300"}`}>{done && "✓"}</span><span className={`text-sm font-medium ${done ? "text-slate-400 line-through" : "text-slate-700"}`}>{title}</span></div>;
}
