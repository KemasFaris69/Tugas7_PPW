import { useEffect } from 'react'
import { CircleCheck, X } from 'lucide-react'

// Toast pojok kanan atas, hilang sendiri setelah 3,5 detik (sesuai design).
export default function Toast({ judul, pesan, onTutup }) {
  useEffect(() => {
    const timer = setTimeout(onTutup, 3500)
    return () => clearTimeout(timer)
  }, [judul, pesan, onTutup])

  return (
    <div role="status" className="fixed top-4 right-4 z-[60] flex w-[min(380px,calc(100%-32px))] items-start gap-3 rounded-md border border-ink-200 bg-white py-3.5 pr-3 pl-4 shadow-lg">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ok-100 text-ok-700">
        <CircleCheck size={18} aria-hidden="true" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 pt-1">
        <span className="font-semibold text-ink-900">{judul}</span>
        <span className="text-[13px] text-ink-700">{pesan}</span>
      </div>
      <button type="button" onClick={onTutup} aria-label="Tutup notifikasi" className="-my-1.5 flex size-11 items-center justify-center rounded-sm text-ink-700 hover:bg-ink-100">
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  )
}
