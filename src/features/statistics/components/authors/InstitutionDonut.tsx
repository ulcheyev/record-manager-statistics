import ReactECharts from 'echarts-for-react'
import { useState } from 'react'
import type { InstitutionRecordStatsDto } from '@/features/statistics/dtoTypes'
import { baseLegend, baseTooltip } from '@/shared/utils/chartUtils.ts'
import { ChartCard } from '@/shared/components/ChartCard.tsx'
import { SegmentToggle } from '@/shared/components/SegmentToggle.tsx'

type View = 'records' | 'completion' | 'rejection'

const VIEW_OPTIONS: { value: View; label: string }[] = [
  { value: 'records', label: 'Records' },
  { value: 'completion', label: 'Completion' },
  { value: 'rejection', label: 'Rejection' },
]

const HEIGHT = 420

const sumBy = (
  institutions: InstitutionRecordStatsDto[],
  key: keyof InstitutionRecordStatsDto['byPhase'],
) => institutions.reduce((s, i) => s + i.byPhase[key], 0)

const sliceValue = (inst: InstitutionRecordStatsDto, view: View) =>
  view === 'records'
    ? inst.total
    : view === 'completion'
      ? inst.byPhase.completed
      : inst.byPhase.rejected

const centerValue = (institutions: InstitutionRecordStatsDto[], view: View) =>
  view === 'records'
    ? institutions.reduce((s, i) => s + i.total, 0)
    : view === 'completion'
      ? sumBy(institutions, 'completed')
      : sumBy(institutions, 'rejected')

const centerLabel = (view: View) =>
  view === 'records' ? 'total records' : view === 'completion' ? 'completed' : 'rejected'

const buildData = (institutions: InstitutionRecordStatsDto[], view: View) =>
  institutions.map((inst, _) => ({
    name: inst.name,
    uri: inst.uri,
    value: sliceValue(inst, view),
    byPhase: inst.byPhase,
    completionRate: inst.completionRate,
    rejectionRate: inst.rejectionRate,
    total: inst.total,
  }))

const formatTooltip = (p: any, view: View): string => {
  const d = p.data
  if (!d?.total) return ''

  const header = `<b>${d.name}</b>`

  if (view === 'records')
    return [
      header,
      `Open: <b>${d.byPhase.open}</b>`,
      `Completed: <b>${d.byPhase.completed}</b>`,
      `Rejected: <b>${d.byPhase.rejected}</b>`,
      `Total: <b>${d.total}</b>`,
    ].join('<br/>')

  if (view === 'completion')
    return [
      header,
      `Completed: <b>${d.byPhase.completed}</b>`,
      `Completion rate: <b>${d.completionRate}%</b>`,
      `Share of all completed: <b>${p.percent?.toFixed(1)}%</b>`,
    ].join('<br/>')

  return [
    header,
    `Rejected: <b>${d.byPhase.rejected}</b>`,
    `Rejection rate: <b>${d.rejectionRate}%</b>`,
    `Share of all rejected: <b>${p.percent?.toFixed(1)}%</b>`,
  ].join('<br/>')
}

const buildOption = (institutions: InstitutionRecordStatsDto[], view: View) => {
  const data = buildData(institutions, view)
  const total = institutions.reduce((s, i) => s + i.total, 0)
  const cv = centerValue(institutions, view)
  const cl = centerLabel(view)

  return {
    tooltip: {
      ...baseTooltip,
      trigger: 'item',
      confine: true,
      position: (point: number[]) => [point[0] + 16, point[1] - 16],
      formatter: (p: any) => formatTooltip(p, view),
    },
    legend: {
      ...baseLegend,
      orient: 'vertical',
      right: 8,
      top: 'middle',
      itemGap: 16,
      data: institutions.map((i) => i.name),
      textStyle: {
        rich: {
          name: { fontSize: 12, color: '#374151', fontWeight: 500, lineHeight: 18 },
          detail: { fontSize: 11, color: '#9ca3af', lineHeight: 16 },
        },
      },
      formatter: (name: string) => {
        const inst = institutions.find((i) => i.name === name)
        if (!inst) return name
        const pct = total > 0 ? ((inst.total / total) * 100).toFixed(1) : '0'
        return [`{name|${name}}`, `{detail|${inst.total} records · ${pct}%}`].join('\n')
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['54%', '76%'],
        center: ['36%', '50%'],
        avoidLabelOverlap: true,
        padAngle: 3,
        itemStyle: { borderRadius: 5 },
        labelLine: { show: false },
        label: { show: false },
        emphasis: { scale: true, scaleSize: 6, label: { show: false } },
        data,
      },
      {
        type: 'pie',
        radius: ['0%', '42%'],
        center: ['36%', '50%'],
        silent: true,
        labelLine: { show: false },
        label: {
          show: true,
          position: 'center',
          formatter: () => [`{total|${cv}}`, `{label|${cl}}`].join('\n'),
          rich: {
            total: { fontSize: 26, fontWeight: 600, color: '#111827', lineHeight: 32 },
            label: { fontSize: 11, color: '#9ca3af', lineHeight: 20 },
          },
        },
        data: [{ value: 1, name: 'bg', itemStyle: { color: '#f3f4f6' } }],
      },
    ],
  }
}

interface Props {
  institutions: InstitutionRecordStatsDto[]
}

export const InstitutionDonut = ({ institutions }: Props) => {
  const [view, setView] = useState<View>('records')

  return (
    <ChartCard
      title="Institution breakdown"
      height={HEIGHT}
      hasData={institutions.length > 0}
      controls={<SegmentToggle options={VIEW_OPTIONS} value={view} onChange={setView} />}
    >
      <ReactECharts option={buildOption(institutions, view)} style={{ height: HEIGHT }} notMerge />
    </ChartCard>
  )
}
