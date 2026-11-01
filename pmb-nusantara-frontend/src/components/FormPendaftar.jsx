import { useState } from 'react'
import { CircleAlert, Plus } from 'lucide-react'

const FORM_KOSONG = { nama: '', nik: '', prodi: '', jalur: '' }

function validasi(form) {
  const error = {}
  if (!form.nama.trim()) error.nama = 'Nama lengkap wajib diisi'
  if (!/^\d{16}$/.test(form.nik)) error.nik = 'NIK harus 16 digit angka'
  if (!form.prodi) error.prodi = 'Pilih program studi'
  if (!form.jalur) error.jalur = 'Pilih jalur masuk'
  return error
}

function PesanError({ id, pesan }) {
  if (!pesan) return null
  return (
    <span id={id} className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-bad-700">
      <CircleAlert size={14} aria-hidden="true" />{pesan}
    </span>
  )
}

// Controlled component: setiap input membaca dan menulis state `form`.
export default function FormPendaftar({ daftarProdi, daftarJalur, onTambah }) {
  const [form, setForm] = useState(FORM_KOSONG)
  const [error, setError] = useState({})

  function ubah(event) {
    const { name, value } = event.target
    setForm({ ...form, [name]: name === 'nik' ? value.replace(/\D/g, '').slice(0, 16) : value })
    if (error[name]) setError({ ...error, [name]: undefined })
  }

  function kirim(event) {
    event.preventDefault()
    const hasil = validasi(form)
    if (Object.keys(hasil).length > 0) {
      setError(hasil)
      return
    }
    onTambah({ ...form, nama: form.nama.trim() })
    setForm(FORM_KOSONG)
    setError({})
  }

  const atributField = (nama) => ({
    id: nama,
    name: nama,
    value: form[nama],
    onChange: ubah,
    'aria-invalid': Boolean(error[nama]),
    'aria-describedby': error[nama] ? `${nama}-error` : undefined,
    className: `field ${error[nama] ? 'field-error' : ''}`,
  })

  return (
    <section id="tambah" className="scroll-mt-5 rounded-md bg-ink-50 p-4 md:p-5" aria-labelledby="judul-form">
      <h2 id="judul-form" className="text-base">Tambah pendaftar</h2>
      <p className="text-[13px] text-ink-700">
        Kolom bertanda <span className="font-bold text-pink-600">*</span> wajib diisi. Pendaftar baru berstatus Menunggu Verifikasi.
      </p>

      <form onSubmit={kirim} noValidate className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="label" htmlFor="nama">Nama lengkap <span className="text-pink-600">*</span></label>
          <input {...atributField('nama')} type="text" autoComplete="off" placeholder="Sesuai KTP" />
          <PesanError id="nama-error" pesan={error.nama} />
        </div>
        <div>
          <label className="label" htmlFor="nik">NIK <span className="text-pink-600">*</span></label>
          <input {...atributField('nik')} type="text" inputMode="numeric" placeholder="16 digit angka" />
          <PesanError id="nik-error" pesan={error.nik} />
        </div>
        <div>
          <label className="label" htmlFor="prodi">Program studi <span className="text-pink-600">*</span></label>
          <select {...atributField('prodi')}>
            <option value="">Pilih program studi</option>
            {daftarProdi.map((prodi) => <option key={prodi} value={prodi}>{prodi}</option>)}
          </select>
          <PesanError id="prodi-error" pesan={error.prodi} />
        </div>
        <div>
          <label className="label" htmlFor="jalur">Jalur masuk <span className="text-pink-600">*</span></label>
          <select {...atributField('jalur')}>
            <option value="">Pilih jalur</option>
            {daftarJalur.map((jalur) => <option key={jalur} value={jalur}>{jalur}</option>)}
          </select>
          <PesanError id="jalur-error" pesan={error.jalur} />
        </div>
        <div className="flex flex-wrap gap-2 sm:col-span-2 lg:col-span-4">
          <button type="submit" className="btn btn-primary"><Plus size={16} aria-hidden="true" />Tambah</button>
          <button type="button" className="btn btn-outline" onClick={() => { setForm(FORM_KOSONG); setError({}) }}>Kosongkan</button>
        </div>
      </form>
    </section>
  )
}
