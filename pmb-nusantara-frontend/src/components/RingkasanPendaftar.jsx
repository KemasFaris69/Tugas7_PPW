import { Clock, FileWarning, ShieldCheck, Users } from 'lucide-react'

// Urutan dan warna tile mengikuti Dashboard Admin di design.
const TILE = [
  { label: 'Total pendaftar', Ikon: Users, warna: 'bg-brand-600 text-white', hitung: (data) => data.length },
  { label: 'Menunggu verifikasi', Ikon: Clock, warna: 'bg-sun-400 text-ink-900', hitung: (data) => jumlahStatus(data, 'Menunggu Verifikasi') },
  { label: 'Terverifikasi', Ikon: ShieldCheck, warna: 'bg-info-500 text-white', hitung: (data) => jumlahStatus(data, 'Terverifikasi') },
  { label: 'Berkas kurang', Ikon: FileWarning, warna: 'bg-pink-500 text-white', hitung: (data) => jumlahStatus(data, 'Berkas Tidak Lengkap') },
]

function jumlahStatus(data, status) {
  return data.filter((item) => item.status === status).length
}

export default function RingkasanPendaftar({ pendaftar }) {
  return (
    <section id="ringkasan" className="grid scroll-mt-5 grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Ringkasan pendaftar">
      {TILE.map(({ label, Ikon, warna, hitung }) => (
        <div key={label} className="flex items-center gap-3.5 rounded-sm bg-ink-50 px-4 py-3.5">
          <span className={`flex size-10 shrink-0 items-center justify-center rounded-sm ${warna}`}>
            <Ikon size={20} aria-hidden="true" />
          </span>
          <div>
            <p className="text-[22px] leading-none font-bold text-ink-900">{hitung(pendaftar)}</p>
            <p className="mt-1 text-xs font-medium text-ink-700">{label}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
