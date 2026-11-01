import { useEffect, useRef } from 'react'
import { Trash2 } from 'lucide-react'

// Dialog konfirmasi hapus: Batal / Hapus Data, sesuai design Admin.
export default function DialogHapus({ pendaftar, onBatal, onKonfirmasi }) {
  const tombolBatal = useRef(null)

  useEffect(() => {
    tombolBatal.current?.focus()
    const tutupDenganEsc = (event) => { if (event.key === 'Escape') onBatal() }
    document.addEventListener('keydown', tutupDenganEsc)
    return () => document.removeEventListener('keydown', tutupDenganEsc)
  }, [onBatal])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 p-4">
      <div role="alertdialog" aria-modal="true" aria-labelledby="judul-hapus" aria-describedby="isi-hapus" className="flex w-full max-w-[420px] flex-col gap-3 rounded-lg bg-white p-6 shadow-lg">
        <span className="flex size-12 items-center justify-center rounded-full bg-bad-100 text-bad-700">
          <Trash2 size={22} aria-hidden="true" />
        </span>
        <h2 id="judul-hapus" className="text-xl">Hapus data pendaftar?</h2>
        <p id="isi-hapus" className="text-ink-700">
          Data <strong className="text-ink-900">{pendaftar.nama} ({pendaftar.noPendaftaran})</strong> akan dihapus dari daftar ini.
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2.5">
          <button ref={tombolBatal} type="button" onClick={onBatal} className="btn btn-outline min-h-12">Batal</button>
          <button type="button" onClick={onKonfirmasi} className="btn btn-danger min-h-12"><Trash2 size={18} aria-hidden="true" />Hapus Data</button>
        </div>
      </div>
    </div>
  )
}
