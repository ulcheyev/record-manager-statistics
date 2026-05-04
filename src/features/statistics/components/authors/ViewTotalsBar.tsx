interface TotalItem {
  label: string
  value: number | string
  color?: string
  dim?: boolean
}

interface Props {
  items: TotalItem[]
}

export const ViewTotalsBar = ({ items }: Props) => (
  <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 px-1 pb-3">
    {items.map((item) => (
      <div key={item.label} className="flex items-center gap-1.5">
        {item.color && <span className={`h-2 w-2 rounded-full flex-shrink-0 ${item.color}`} />}
        <span className={`text-[11px] ${item.dim ? 'text-gray-400' : 'text-gray-500'}`}>
          {item.label}
        </span>
        <span
          className={`text-[11px] font-semibold tabular-nums ${item.dim ? 'text-gray-400' : 'text-gray-700'}`}
        >
          {item.value}
        </span>
      </div>
    ))}
  </div>
)
