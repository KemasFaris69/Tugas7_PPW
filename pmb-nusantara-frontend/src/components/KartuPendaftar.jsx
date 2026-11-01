import { Trash2 } from 'lucide-react'
import StatusBadge from './StatusBadge.jsx'

// Satu pendaftar: kartu di HP, baris tabel di laptop (layout mengikuti Data Pendaftar di design).
export default function KartuPendaftar({ noPendaftaran, nama, nik, prodi, jalur, status, tanggalDaftar, onHapus }) {
  return (
    <article className="flex flex-col gap-2.5 rounded-md border border-ink-200 bg-white p-4 md:grid md:grid-cols-[110px_minmax(0,1.4fr)_minmax(0,1fr)_72px_170px_44px] md:items-center md:gap-3 md:rounded-none md:border-0 md:border-t md:px-4 md:py-2 md:hover:bg-brand-50">
      <span className="order-2 text-xs font-semibold text-ink-700 md:order-none md:text-[13px] md:text-ink-900">{noPendaftaran}</span>
      <div className="order-1 min-w-0 md:order-none">
        <p className="font-semibold text-ink-900">{nama}</p>
        <p className="text-xs text-ink-700">NIK {nik} · {tanggalDaftar}</p>
      </div>
      <span className="order-4 text-[13px] text-ink-700 md:order-none">
        {prodi}<span className="md:hidden"> · Jalur {jalur}</span>
      </span>
      <span className="hidden text-[13px] text-ink-700 md:inline">{jalur}</span>
      <span className="order-3 md:order-none"><StatusBadge status={status} /></span>
      <button
        type="button"
        onClick={onHapus}
        aria-label={`Hapus ${nama}`}
        title="Hapus"
        className="order-5 flex min-h-11 items-center justify-center gap-2 rounded-md border border-ink-200 text-ink-700 transition-colors hover:bg-bad-100 hover:text-bad-700 md:order-none md:size-11 md:border-0"
      >
        <Trash2 size={18} aria-hidden="true" />
        <span className="text-sm font-semibold md:hidden">Hapus</span>
      </button>
    </article>
  )
}
