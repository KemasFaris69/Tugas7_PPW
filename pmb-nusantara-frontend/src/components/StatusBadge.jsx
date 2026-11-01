import { CircleCheck, CircleX, Clock, FilePenLine, FileWarning, ShieldCheck } from 'lucide-react'

// Status selalu tampil sebagai ikon + teks, tidak hanya warna (sesuai StatusBadge di design).
const GAYA_STATUS = {
  'Draf': { Ikon: FilePenLine, kelas: 'bg-ink-100 text-ink-800', ikon: 'text-ink-700' },
  'Menunggu Verifikasi': { Ikon: Clock, kelas: 'bg-sun-100 text-ink-900', ikon: 'text-sun-700' },
  'Berkas Tidak Lengkap': { Ikon: FileWarning, kelas: 'bg-pink-100 text-ink-900', ikon: 'text-pink-600' },
  'Terverifikasi': { Ikon: ShieldCheck, kelas: 'bg-info-100 text-ink-900', ikon: 'text-info-500' },
  'Lulus': { Ikon: CircleCheck, kelas: 'bg-ok-100 text-ok-700', ikon: 'text-ok-700' },
  'Tidak Lulus': { Ikon: CircleX, kelas: 'bg-bad-700 text-white', ikon: 'text-white' },
}

export default function StatusBadge({ status }) {
  const { Ikon, kelas, ikon } = GAYA_STATUS[status] ?? GAYA_STATUS['Draf']
  return (
    <span className={`inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-full pr-2.5 pl-2 text-xs font-semibold ${kelas}`}>
      <Ikon size={14} className={ikon} aria-hidden="true" />
      {status}
    </span>
  )
}
