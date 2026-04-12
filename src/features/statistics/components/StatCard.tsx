interface Props {
  label: string
  value: string | number
  accent?: 'success' | 'danger'
  small?: boolean
  icon?: string
}

export const StatCard = ({ label, value, accent, small }: Props) => {
  const valueColor =
    accent === 'success'
      ? 'text-emerald-600'
      : accent === 'danger'
        ? 'text-red-500'
        : 'text-gray-900'

  return (
    <div className="rounded-xl bg-white border border-gray-100 px-5 py-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</p>
      </div>
      <p
        className={`font-semibold leading-none ${small ? 'text-base text-gray-700' : 'text-2xl'} ${valueColor}`}
      >
        {value ?? '—'}
      </p>
    </div>
  )
}
