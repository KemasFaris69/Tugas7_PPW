// Top bar 72px: judul + periode (ungu), avatar inisial di kanan.
export default function TopBar({ judul, periode, keterangan, namaAdmin, peranAdmin }) {
  const inisial = namaAdmin.split(' ').slice(0, 2).map((kata) => kata[0]).join('').toUpperCase()

  return (
    <header className="flex h-[60px] items-center gap-3 border-b border-ink-200 px-4 md:h-[72px] md:border-0 md:px-8">
      <div className="min-w-0">
        <p className="text-base leading-tight font-semibold text-ink-900">
          <span className="md:hidden">PMB Nusantara<span className="text-brand-600">.</span> </span>
          <span className="hidden md:inline">{judul}</span>
        </p>
        <p className="text-xs leading-tight">
          <span className="font-semibold text-brand-600">{periode}</span>{' '}
          <span className="text-ink-700">{keterangan}</span>
        </p>
      </div>
      <div className="ml-auto flex items-center gap-2.5">
        <span className="flex size-[34px] items-center justify-center rounded-sm bg-brand-100 text-xs font-semibold text-brand-600" aria-hidden="true">
          {inisial}
        </span>
        <span className="hidden sm:block">
          <span className="block text-[13px] leading-tight font-semibold text-ink-900">{namaAdmin}</span>
          <span className="block text-xs text-ink-700">{peranAdmin}</span>
        </span>
      </div>
    </header>
  )
}
