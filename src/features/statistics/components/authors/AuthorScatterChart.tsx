import ReactECharts from 'echarts-for-react'
import { useState } from 'react'
import type { AuthorRecordStatsDto } from '@/features/statistics/dtoTypes'
import { STYLES } from '@/config/constants'
import { baseAxis, baseTooltip } from '@/shared/utils/chartUtils.ts'
import { SegmentToggle } from '@/shared/components/SegmentToggle.tsx'
import { ChartCard } from '@/shared/components/ChartCard.tsx'

type YAxisKey = 'completionRate' | 'rejectionRate'

const HEIGHT = 400

const Y_OPTIONS: { value: YAxisKey; label: string }[] = [
  { value: 'completionRate', label: 'Completion rate' },
  { value: 'rejectionRate', label: 'Rejection rate' },
]

const resolveColor = (a: AuthorRecordStatsDto, yAxis: YAxisKey): string => {
  const isGood =
    yAxis === 'completionRate'
      ? a.completionRate >= a.rejectionRate
      : a.rejectionRate <= a.completionRate

  return isGood ? STYLES.COLORS.completed : STYLES.COLORS.rejected
}

const applyStackOffset = (authors: AuthorRecordStatsDto[], yAxis: YAxisKey) => {
  const seen = new Map<string, number>()
  return authors.map((a) => {
    // Group by x (total) and y (rate) value to stack overlapping points
    const key = `${a.total}-${a[yAxis].toFixed(1)}`
    const count = seen.get(key) ?? 0
    seen.set(key, count + 1)
    return {
      // Second param in value is adjusted y to create a stack effect for points with same x and y
      value: [a.total, parseFloat(a[yAxis].toFixed(1)) - count * 5],
      name: `${a.username}`,
      uri: a.uri,
      itemStyle: { color: resolveColor(a, yAxis), opacity: 0.85 },
    }
  })
}

const buildOption = (authors: AuthorRecordStatsDto[], yAxis: YAxisKey) => {
  const maxTotal = Math.max(...authors.map((a) => a.total), 1)
  const yLabel = Y_OPTIONS.find((o) => o.value === yAxis)?.label ?? yAxis

  return {
    tooltip: {
      ...baseTooltip,
      trigger: 'item',
      formatter: (p: any) => {
        const a = authors.find((x) => x.uri === p.data.uri)
        if (!a) return ''
        return [
          `<b>${a.username}</b>`,
          `Total: <b>${a.total}</b>`,
          `Completed: <b>${a.byPhase.completed}</b>`,
          `Open: <b>${a.byPhase.open}</b>`,
          `Rejected: <b>${a.byPhase.rejected}</b>`,
          `Completion: <b>${a.completionRate.toFixed(1)}%</b>`,
          `Rejection: <b>${a.rejectionRate.toFixed(1)}%</b>`,
        ].join('<br/>')
      },
    },
    grid: { top: 24, right: 24, bottom: 48, left: 24, containLabel: true },
    xAxis: {
      ...baseAxis,
      name: 'Total records',
      nameLocation: 'middle',
      nameGap: 28,
      nameTextStyle: { color: '#9ca3af', fontSize: 11 },
      type: 'value',
      minInterval: 1,
    },
    yAxis: {
      ...baseAxis,
      name: yLabel,
      nameLocation: 'middle',
      nameRotate: 90,
      nameGap: 40,
      nameTextStyle: { color: '#9ca3af', fontSize: 11 },
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: { color: '#9ca3af', fontSize: 11, formatter: (v: number) => `${v}%` },
    },
    series: [
      {
        type: 'scatter',
        symbolSize: (_val: number[], params: any) => {
          const a = authors[params.dataIndex]
          return a ? 16 + (a.total / maxTotal) * 32 : 16
        },
        data: applyStackOffset(authors, yAxis),
        label: {
          show: true,
          position: 'top',
          color: '#6b7280',
          fontSize: 10,
          formatter: (p: any) => p.data.name,
        },
      },
    ],
  }
}

interface Props {
  authors: AuthorRecordStatsDto[]
}

export const AuthorScatterChart = ({ authors }: Props) => {
  const [yAxis, setYAxis] = useState<YAxisKey>('completionRate')

  return (
    <ChartCard
      title="Author performance"
      subtitle="Bubble size = total records"
      height={HEIGHT}
      hasData={authors.length > 0}
      controls={<SegmentToggle options={Y_OPTIONS} value={yAxis} onChange={setYAxis} />}
    >
      <ReactECharts option={buildOption(authors, yAxis)} style={{ height: HEIGHT }} notMerge />
    </ChartCard>
  )
}
