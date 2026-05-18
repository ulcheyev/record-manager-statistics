interface Props {
  label: string
  value: string | number
  accent?: 'success' | 'danger' | 'info' | 'assessment'
  small?: boolean
  hint?: string
}

const ACCENT_STYLES: Record<
  NonNullable<Props['accent']>,
  { value: string; bar: string; bg: string; border: string }
> = {
  success: {
    value: 'text-emerald-600',
    bar: 'bg-gradient-to-r from-emerald-400 to-emerald-200',
    bg: 'bg-white',
    border: 'border-gray-100',
  },
  danger: {
    value: 'text-rose-500',
    bar: 'bg-gradient-to-r from-rose-400 to-rose-200',
    bg: 'bg-white',
    border: 'border-gray-100',
  },
  info: {
    value: 'text-blue-600',
    bar: 'bg-gradient-to-r from-blue-400 to-blue-200',
    bg: 'bg-white',
    border: 'border-gray-100',
  },
  assessment: {
    value: 'text-amber-700',
    bar: 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200',
    bg: 'bg-gradient-to-br from-amber-50 to-white',
    border: 'border-amber-200',
  },
}

export const StatCard = ({ label, value, accent, small, hint }: Props) => {
  const styles = accent ? ACCENT_STYLES[accent] : null

  return (
    <div
      className={`group relative rounded-xl border px-3 py-3 sm:px-5 sm:py-4 overflow-hidden transition-all duration-200
      ${styles?.bg ?? 'bg-white'}
      ${styles?.border ?? 'border-gray-100'}
      shadow-[0_1px_2px_rgba(0,0,0,0.02)]
      hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)]
      hover:border-opacity-80
    `}
    >
      {styles && <div className={`absolute left-0 right-0 top-0 h-[2px] ${styles.bar}`} />}
      <p className="text-[10px] sm:text-[12px] font-semibold text-gray-400 uppercase tracking-wider sm:tracking-[0.12em] mb-1.5 sm:mb-2.5">
        {label}
      </p>
      <p
        className={`font-semibold leading-tight tabular-nums ${
          small ? 'text-xs sm:text-base text-gray-700' : 'text-base sm:text-2xl'
        } ${styles?.value ?? 'text-gray-900'}`}
      >
        {value === null || value === undefined || value === '' ? '—' : value}
      </p>

      {hint && <p className="mt-1 text-[11px] sm:text-[14px] text-gray-500 leading-snug">{hint}</p>}
    </div>
  )
}
