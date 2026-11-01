// Sidebar putih 232px dengan wordmark "PMB Nusantara." (titik ungu) sesuai design.
export default function Sidebar({ brand, keterangan, menu }) {
  return (
    <aside className="sticky top-5 hidden h-[calc(100vh-40px)] w-[232px] shrink-0 flex-col gap-8 self-start px-6 py-7 md:flex">
      <div>
        <p className="text-[22px] leading-9 font-bold tracking-tight text-ink-900">
          {brand}<span className="text-brand-600">.</span>
        </p>
        <p className="text-xs text-ink-700">{keterangan}</p>
      </div>
      <nav className="flex flex-col gap-1.5" aria-label="Navigasi halaman">
        {menu.map(({ href, label, Ikon }) => (
          <a
            key={href}
            href={href}
            className="flex min-h-11 items-center gap-3.5 rounded-md px-3 text-[13px] font-medium text-ink-700 transition-colors hover:bg-ink-100 hover:text-brand-600"
          >
            <Ikon size={18} aria-hidden="true" />
            {label}
          </a>
        ))}
      </nav>
    </aside>
  )
}
