interface Props {
  title: string
  subtitle?: string
  height?: number
  hasData: boolean
  isLoading?: boolean
  controls?: React.ReactNode
  children: React.ReactNode
}

export const ChartCard = ({
  title,
  subtitle,
  height = 300,
  hasData,
  isLoading,
  controls,
  children,
}: Props) => (
  <div className="rounded-xl bg-white border border-gray-100 p-5 shadow-sm">
    <div className="flex items-start justify-between mb-4">
      <div>
        <p className="text-xs font-medium text-gray-400 uppercase">{title}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      {controls && <div>{controls}</div>}
    </div>

    {isLoading ? (
      <div style={{ height }} className="flex items-center justify-center text-sm text-gray-400">
        Loading…
      </div>
    ) : !hasData ? (
      <div style={{ height }} className="flex items-center justify-center text-sm text-gray-400">
        No data available
      </div>
    ) : (
      children
    )}
  </div>
)
