import { Inbox, Search, SearchX } from 'lucide-react'
import KartuPendaftar from './KartuPendaftar.jsx'

function KeadaanKosong({ Ikon, judul, keterangan }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-md border border-ink-200 px-6 py-12 text-center">
      <span className="mb-1 flex size-16 items-center justify-center rounded-full bg-brand-100 text-brand-600">
        <Ikon size={28} aria-hidden="true" />
      </span>
      <h3 className="text-xl">{judul}</h3>
      <p className="max-w-[360px] text-ink-700">{keterangan}</p>
    </div>
  )
}

export default function DaftarPendaftar({ pendaftar, jumlahTotal, kataKunci, onKataKunciChange, filterStatus, onFilterStatusChange, daftarStatus, onHapus }) {
  return (
    <section id="daftar" className="flex scroll-mt-5 flex-col gap-3" aria-labelledby="judul-daftar">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2 id="judul-daftar" className="text-base">Daftar pendaftar</h2>
        <p className="text-[13px] text-ink-700" aria-live="polite">
          Menampilkan {pendaftar.length} dari {jumlahTotal} pendaftar
        </p>
      </div>

      <div role="search" className="flex flex-wrap items-end gap-3 rounded-md bg-ink-50 p-4">
        <div className="min-w-0 flex-[2_1_260px]">
          <label className="label" htmlFor="cari">Cari</label>
          <div className="relative">
            <Search size={16} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-ink-500" aria-hidden="true" />
            <input
              id="cari"
              type="search"
              value={kataKunci}
              onChange={(event) => onKataKunciChange(event.target.value)}
              placeholder="Nama, nomor pendaftaran, atau prodi"
              className="field pl-10"
            />
          </div>
        </div>
        <div className="min-w-0 flex-[1_1_180px]">
          <label className="label" htmlFor="filter-status">Status</label>
          <select id="filter-status" value={filterStatus} onChange={(event) => onFilterStatusChange(event.target.value)} className="field">
            <option value="">Semua status</option>
            {daftarStatus.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
        </div>
      </div>

      {/* Conditional rendering: daftar kosong, hasil pencarian kosong, atau daftar data */}
      {jumlahTotal === 0 ? (
        <KeadaanKosong Ikon={Inbox} judul="Belum ada data pendaftar" keterangan="Tambahkan pendaftar melalui form di atas. Data akan muncul di sini." />
      ) : pendaftar.length === 0 ? (
        <KeadaanKosong Ikon={SearchX} judul="Tidak ada hasil" keterangan="Coba kata kunci lain atau ubah filter status." />
      ) : (
        <div className="flex flex-col gap-2.5 md:gap-0 md:overflow-hidden md:rounded-md md:border md:border-ink-200">
          <div className="hidden grid-cols-[110px_minmax(0,1.4fr)_minmax(0,1fr)_72px_170px_44px] gap-3 bg-ink-50 px-4 py-2.5 text-xs font-semibold text-ink-700 md:grid" aria-hidden="true">
            <span>No. Pendaftaran</span><span>Nama</span><span>Prodi</span><span>Jalur</span><span>Status</span><span className="sr-only">Aksi</span>
          </div>
          {pendaftar.map((item) => (
            <KartuPendaftar key={item.id} {...item} onHapus={() => onHapus(item)} />
          ))}
        </div>
      )}
    </section>
  )
}
