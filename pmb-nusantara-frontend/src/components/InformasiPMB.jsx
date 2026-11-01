import { useEffect, useState } from 'react'

const ENDPOINT = `${import.meta.env.BASE_URL}data/informasi-pmb.json`

export default function InformasiPMB() {
  const [informasi, setInformasi] = useState([])
  const [status, setStatus] = useState('loading')

  async function muatInformasi(signal) {
    try {
      const response = await fetch(ENDPOINT, { signal })
      // fetch tidak otomatis gagal untuk respons HTTP 4xx/5xx.
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = await response.json()
      if (!Array.isArray(data) || !data.every((item) =>
        item && ['id', 'kategori', 'judul', 'isi'].every((key) => typeof item[key] === 'string'),
      )) throw new Error('Format informasi tidak sesuai')
      setInformasi(data)
      setStatus('success')
    } catch (error) {
      if (error.name !== 'AbortError') setStatus('error')
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    // State diperbarui setelah await fetch; effect ini menyinkronkan data HTTP.
    // oxlint-disable-next-line react/set-state-in-effect
    muatInformasi(controller.signal)
    return () => controller.abort()
  }, [])

  return (
    <section id="informasi" className="scroll-mt-5 rounded-lg border border-ink-200 p-5 md:p-6" aria-labelledby="judul-informasi">
      <h2 id="judul-informasi" className="text-lg">Informasi PMB</h2>
      <p className="mt-1 text-sm text-ink-700">Panduan singkat untuk proses penerimaan. Data simulasi dari mock API.</p>

      {status === 'loading' && (
        <p role="status" className="mt-4 flex items-center gap-2 text-sm text-ink-700">
          <span aria-hidden="true" className="size-4 rounded-full border-2 border-brand-200 border-t-brand-600 motion-safe:animate-spin" />
          Memuat informasi PMB…
        </p>
      )}

      {status === 'error' && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-4">
          <p role="alert" className="text-sm text-red-800">Informasi PMB belum dapat dimuat. Periksa koneksi atau coba beberapa saat lagi.</p>
          <button type="button" className="btn btn-primary mt-3" onClick={() => { setStatus('loading'); muatInformasi() }}>Coba Lagi</button>
        </div>
      )}

      {status === 'success' && informasi.length === 0 && <p className="mt-4 text-sm text-ink-700">Belum ada informasi PMB.</p>}

      {status === 'success' && (
        <ul className="mt-4 divide-y divide-ink-200">
          {informasi.map((item) => (
            <li key={item.id} className="py-4 first:pt-0 last:pb-0">
              <p className="text-xs font-semibold text-brand-700">{item.kategori}</p>
              <h3 className="mt-1 text-base">{item.judul}</h3>
              <p className="mt-1 max-w-2xl text-sm text-ink-700">{item.isi}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
