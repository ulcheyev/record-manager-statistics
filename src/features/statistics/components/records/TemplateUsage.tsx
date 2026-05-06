import { TEMPLATE_COLORS } from './constants'
import type { TemplateSliceDto } from '@/features/statistics/model/dto/record.dto.ts'

interface Props {
  templates: TemplateSliceDto[]
  total: number
}

export const TemplateUsage = ({ templates, total }: Props) => (
  <div className="rounded-xl bg-gray-50 border border-gray-100 p-5 space-y-4">
    <div className="flex items-center justify-between">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
        Form template usage
      </p>
      <span className="text-xs text-gray-400 tabular-nums">{total} total</span>
    </div>

    <div className="flex h-3 rounded-full overflow-hidden bg-gray-200 gap-px">
      {templates.map((t, i) => (
        <div
          key={t.templateLabel}
          className={`${TEMPLATE_COLORS[i % TEMPLATE_COLORS.length].bar} transition-all`}
          style={{ width: `${t.percentage}%` }}
          title={`${t.templateLabel}: ${t.count} (${t.percentage.toFixed(1)}%)`}
        />
      ))}
    </div>

    <div className="space-y-2">
      {templates.map((t, i) => {
        const c = TEMPLATE_COLORS[i % TEMPLATE_COLORS.length]
        return (
          <div key={t.templateLabel} className="flex items-center gap-3">
            <span className={`flex-shrink-0 h-2 w-2 rounded-full ${c.bar}`} />
            <span className="flex-1 text-sm text-gray-600 truncate">{t.templateLabel}</span>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-semibold tabular-nums px-2 py-0.5 rounded-full ${c.text} ${c.bg}`}
              >
                {t.count}
              </span>
              <span className="text-xs text-gray-400 tabular-nums w-10 text-right">
                {t.percentage.toFixed(1)}%
              </span>
            </div>
          </div>
        )
      })}
    </div>
  </div>
)
