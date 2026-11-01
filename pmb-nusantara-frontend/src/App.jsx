import { useCallback, useRef, useState } from 'react'
import { ChartPie, Info, List, Plus } from 'lucide-react'
import InformasiPMB from './components/InformasiPMB.jsx'
import Sidebar from './components/Sidebar.jsx'
import TopBar from './components/TopBar.jsx'
import RingkasanPendaftar from './components/RingkasanPendaftar.jsx'
import FormPendaftar from './components/FormPendaftar.jsx'
import DaftarPendaftar from './components/DaftarPendaftar.jsx'
import DialogHapus from './components/DialogHapus.jsx'
import Toast from './components/Toast.jsx'
import ilustrasiHero from './assets/ilustrasi-hero.svg'

const DAFTAR_PRODI = ['Teknik Informatika', 'Sistem Informasi', 'Manajemen']
const DAFTAR_JALUR = ['Reguler', 'Prestasi']
const DAFTAR_STATUS = ['Draf', 'Menunggu Verifikasi', 'Berkas Tidak Lengkap', 'Terverifikasi', 'Lulus', 'Tidak Lulus']

const MENU = [
  { href: '#ringkasan', label: 'Ringkasan', Ikon: ChartPie },
  { href: '#tambah', label: 'Tambah Pendaftar', Ikon: Plus },
  { href: '#daftar', label: 'Daftar Pendaftar', Ikon: List },
  { href: '#informasi', label: 'Informasi PMB', Ikon: Info },
]

// Data contoh PMB gelombang 1 periode 2026/2027 (belum terhubung backend).
const PENDAFTAR_AWAL = [
  { id: 1, noPendaftaran: 'PMB-26001', nama: 'Rizky Pratama', nik: '3273011204080001', prodi: 'Teknik Informatika', jalur: 'Reguler', status: 'Menunggu Verifikasi', tanggalDaftar: '18 Okt 2026' },
  { id: 2, noPendaftaran: 'PMB-26002', nama: 'Nadia Putri Ramadhani', nik: '3171045507080002', prodi: 'Sistem Informasi', jalur: 'Prestasi', status: 'Terverifikasi', tanggalDaftar: '16 Okt 2026' },
  { id: 3, noPendaftaran: 'PMB-26003', nama: 'Budi Santoso', nik: '3374020903070003', prodi: 'Manajemen', jalur: 'Reguler', status: 'Berkas Tidak Lengkap', tanggalDaftar: '15 Okt 2026' },
  { id: 4, noPendaftaran: 'PMB-26004', nama: 'Siti Aisyah Nurhaliza', nik: '3578016102080004', prodi: 'Teknik Informatika', jalur: 'Prestasi', status: 'Lulus', tanggalDaftar: '9 Okt 2026' },
  { id: 5, noPendaftaran: 'PMB-26005', nama: 'Dimas Ardiansyah', nik: '3205121711070005', prodi: 'Manajemen', jalur: 'Reguler', status: 'Tidak Lulus', tanggalDaftar: '8 Okt 2026' },
  { id: 6, noPendaftaran: 'PMB-26006', nama: 'Putri Lestari Wulandari', nik: '3201086403080006', prodi: 'Sistem Informasi', jalur: 'Reguler', status: 'Menunggu Verifikasi', tanggalDaftar: '19 Okt 2026' },
]

export default function App() {
  const [pendaftar, setPendaftar] = useState(PENDAFTAR_AWAL)
  const [kataKunci, setKataKunci] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [kandidatHapus, setKandidatHapus] = useState(null)
  const [toast, setToast] = useState(null)
  const nomorBerikutnya = useRef(PENDAFTAR_AWAL.length + 1)

  const tutupToast = useCallback(() => setToast(null), [])
  const batalHapus = useCallback(() => setKandidatHapus(null), [])

  function tambahPendaftar(data) {
    const nomor = nomorBerikutnya.current++
    const baru = {
      id: nomor,
      noPendaftaran: 'PMB-26' + String(nomor).padStart(3, '0'),
      ...data,
      status: 'Menunggu Verifikasi',
      tanggalDaftar: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
    }
    setPendaftar([baru, ...pendaftar])
    setToast({ judul: 'Pendaftar ditambahkan', pesan: `${baru.nama} terdaftar sebagai ${baru.noPendaftaran}.` })
  }

  function hapusPendaftar() {
    setPendaftar(pendaftar.filter((item) => item.id !== kandidatHapus.id))
    setToast({ judul: 'Data pendaftar dihapus', pesan: `${kandidatHapus.nama} (${kandidatHapus.noPendaftaran}) telah dihapus.` })
    setKandidatHapus(null)
  }

  const kata = kataKunci.trim().toLowerCase()
  const pendaftarTampil = pendaftar.filter((item) =>
    (!filterStatus || item.status === filterStatus) &&
    [item.nama, item.noPendaftaran, item.prodi].some((nilai) => nilai.toLowerCase().includes(kata)),
  )

  return (
    <div className="md:p-5">
      <div className="flex min-h-screen bg-white md:min-h-[calc(100vh-40px)] md:rounded-xl md:shadow-frame">
        <Sidebar brand="PMB Nusantara" keterangan="Panel Admin · 2026/2027" menu={MENU} />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar
            judul="Data Pendaftar"
            periode="Gelombang 1"
            keterangan="Periode 2026/2027"
            namaAdmin="Kemas Faris Rahadiansyah"
            peranAdmin="Admin PMB · 103022300040"
          />

          <main className="flex w-full max-w-[1080px] flex-1 flex-col gap-5 px-4 pt-5 pb-8 md:px-8">
            <section className="grid items-center gap-6 rounded-lg bg-brand-100 p-6 md:grid-cols-[1fr_minmax(0,280px)] md:px-10 md:py-8">
              <div className="flex flex-col items-start gap-2">
                <h1 className="text-2xl leading-tight text-balance md:text-[32px]">Hai, Kemas</h1>
                <p className="max-w-md text-base text-ink-700">
                  Ada {pendaftar.filter((item) => item.status === 'Menunggu Verifikasi').length} pendaftar yang menunggu verifikasi berkas.
                </p>
              </div>
              <img src={ilustrasiHero} alt="Ilustrasi calon mahasiswa mengisi formulir pendaftaran di laptop" className="mx-auto hidden h-auto w-full max-w-[280px] sm:block" />
            </section>

            <RingkasanPendaftar pendaftar={pendaftar} />

            <InformasiPMB />

            <FormPendaftar daftarProdi={DAFTAR_PRODI} daftarJalur={DAFTAR_JALUR} onTambah={tambahPendaftar} />

            <DaftarPendaftar
              pendaftar={pendaftarTampil}
              jumlahTotal={pendaftar.length}
              kataKunci={kataKunci}
              onKataKunciChange={setKataKunci}
              filterStatus={filterStatus}
              onFilterStatusChange={setFilterStatus}
              daftarStatus={DAFTAR_STATUS}
              onHapus={setKandidatHapus}
            />
          </main>

          <footer className="border-t border-ink-200 px-4 py-4 text-xs text-ink-700 md:px-8">
            &copy; 2026 PMB Nusantara · Kemas Faris Rahadiansyah (103022300040) · Data pendaftar lokal · Informasi PMB dari mock API.
          </footer>
        </div>
      </div>

      {kandidatHapus && <DialogHapus pendaftar={kandidatHapus} onBatal={batalHapus} onKonfirmasi={hapusPendaftar} />}
      {toast && <Toast judul={toast.judul} pesan={toast.pesan} onTutup={tutupToast} />}
    </div>
  )
}
