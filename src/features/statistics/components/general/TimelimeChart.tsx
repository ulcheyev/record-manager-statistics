import ReactECharts from 'echarts-for-react'
import { useState } from 'react'
import type { StatisticsInterval } from '@/features/statistics/dtoTypes'
import { type Granularity, STYLES } from '@/config/constants'
import { useTimeline } from '@/features/statistics/hooks'
import { GranularityPicker } from '@/features/statistics/components/GranularityPicker'
import { baseAxis, baseTooltip } from '@/shared/utils/chartUtils.ts'
import { ChartCard } from '@/shared/components/ChartCard.tsx'

const buildOption = (
  labels: string[],
  series: Record<string, number[]>,
  totals: number[],
  phaseRates: { open: number; completed: number; rejected: number },
) => ({
  tooltip: {
    ...baseTooltip,
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    formatter: (params: any[]) => {
      const idx = params[0]?.dataIndex ?? 0
      const total = totals[idx] ?? 0
      const rateMap: Record<string, number> = {
        Open: phaseRates.open,
        Completed: phaseRates.completed,
        Rejected: phaseRates.rejected,
      }
      const lines = params.map(
        (p) =>
          `${p.marker} ${p.seriesName}: <b>${p.value} (${(rateMap[p.seriesName] ?? 0).toFixed(1)}%)</b>`,
      )
      return [`<b>${params[0]?.axisValue}</b>`, ...lines, `Total: <b>${total}</b>`].join('<br/>')
    },
  },
  legend: {
    bottom: 0,
    icon: 'circle',
    itemWidth: 8,
    itemHeight: 8,
    textStyle: { color: '#6b7280', fontSize: 12 },
  },
  grid: { top: 16, right: 16, bottom: 48, left: 8, containLabel: true },
  xAxis: {
    ...baseAxis,
    type: 'category',
    data: labels,
    axisLabel: {
      color: '#9ca3af',
      fontSize: 11,
      rotate: labels.length > 12 ? 30 : 0,
      interval: 'auto',
    },
  },
  yAxis: {
    ...baseAxis,
    type: 'value',
    minInterval: 1,
    axisLabel: { color: '#9ca3af', fontSize: 11 },
  },
  series: [
    {
      name: 'Open',
      type: 'bar',
      stack: 'total',
      data: series['open'] ?? [],
      itemStyle: { color: STYLES.COLORS.open },
    },
    {
      name: 'Completed',
      type: 'bar',
      stack: 'total',
      data: series['completed'] ?? [],
      itemStyle: { color: STYLES.COLORS.completed },
    },
    {
      name: 'Rejected',
      type: 'bar',
      stack: 'total',
      data: series['rejected'] ?? [],
      itemStyle: { color: STYLES.COLORS.rejected, borderRadius: [3, 3, 0, 0] },
    },
  ],
})

interface PhaseItem {
  label: string
  count: number
  rate: number
  color: string
}

const SummaryRow = ({ completionRate, rejectionRate, byPhase, total }: SummaryRowProps) => {
  const openRate = parseFloat(Math.max(0, 100 - completionRate - rejectionRate).toFixed(2))

  const items: PhaseItem[] = [
    {
      label: 'Completed',
      count: byPhase.completed,
      rate: completionRate,
      color: STYLES.COLORS.completed,
    },
    { label: 'Open', count: byPhase.open, rate: openRate, color: STYLES.COLORS.open },
    {
      label: 'Rejected',
      count: byPhase.rejected,
      rate: rejectionRate,
      color: STYLES.COLORS.rejected,
    },
  ]

  return (
    <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
      <p className="text-xs text-gray-400">
        Overall for this period — <span className="font-medium text-gray-600">{total}</span> records
        submitted across all phases.
      </p>
      <div className="flex flex-wrap items-center gap-6">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full flex-shrink-0"
              style={{ background: item.color }}
            />
            <span className="text-xs text-gray-500">{item.label}</span>
            <span className="text-xs font-medium text-gray-800">
              {item.count} ({item.rate.toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface SummaryRowProps {
  completionRate: number
  rejectionRate: number
  byPhase: { open: number; completed: number; rejected: number }
  total: number
}

interface Props extends SummaryRowProps {
  interval: StatisticsInterval
}

export const TimelineChart = ({
  interval,
  completionRate,
  rejectionRate,
  byPhase,
  total,
}: Props) => {
  const [granularity, setGranularity] = useState<Granularity>('MONTH')

  const { data, isLoading } = useTimeline(interval, granularity)

  const ts = data?.timeSeries
  const isEmpty = !ts || ts.labels.length === 0

  const phaseRates = {
    open: parseFloat(Math.max(0, 100 - completionRate - rejectionRate).toFixed(2)),
    completed: completionRate,
    rejected: rejectionRate,
  }

  return (
    <ChartCard
      title="Records over time"
      height={288}
      isLoading={isLoading}
      hasData={!isEmpty}
      controls={<GranularityPicker value={granularity} onChange={setGranularity} />}
    >
      {ts && (
        <ReactECharts
          option={buildOption(ts.labels, ts.series, ts.totals, phaseRates)}
          style={{ height: 288 }}
          notMerge
        />
      )}
      {total > 0 && (
        <SummaryRow
          completionRate={completionRate}
          rejectionRate={rejectionRate}
          byPhase={byPhase}
          total={total}
        />
      )}
    </ChartCard>
  )
}
