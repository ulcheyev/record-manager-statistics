import ReactECharts from 'echarts-for-react'
import type { FormTemplateUsageDto } from '@/features/statistics/dtoTypes'
import { ChartCard } from '@/shared/components/ChartCard'
import { baseAxis, baseTooltip } from '@/shared/utils/chartUtils'

const buildOption = (dto: FormTemplateUsageDto) => ({
  tooltip: {
    ...baseTooltip,
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    formatter: (params: any[]) => {
      const t = dto.templates[params[0]?.dataIndex ?? 0]
      return [
        `<b>${t.templateLabel}</b>`,
        `Count: <b>${t.count}</b>`,
        `Share: <b>${t.percentage.toFixed(2)}%</b>`,
      ].join('<br/>')
    },
  },
  grid: { top: 8, right: 64, bottom: 8, left: 8, containLabel: true },
  xAxis: {
    ...baseAxis,
    type: 'value',
    minInterval: 1,
    axisLabel: { color: '#9ca3af', fontSize: 11 },
  },
  yAxis: {
    ...baseAxis,
    type: 'category',
    data: dto.templates.map((t) => t.templateLabel),
    axisLabel: { color: '#6b7280', fontSize: 12 },
  },
  series: [
    {
      type: 'bar',
      barMaxWidth: 36,
      data: dto.templates.map((t, i) => ({
        value: t.count,
        percentage: t.percentage,
        itemStyle: {
          borderRadius: [0, 4, 4, 0],
          color: `hsl(${(i * 360) / dto.templates.length}, 65%, 58%)`,
        },
      })),
      label: {
        show: true,
        position: 'right',
        formatter: (p: any) => `${p.data.percentage.toFixed(2)}%`,
        color: '#9ca3af',
        fontSize: 11,
      },
    },
  ],
})

const chartHeight = (count: number) => Math.max(200, count * 52)

interface Props {
  dto: FormTemplateUsageDto
}

export const FormTemplateChart = ({ dto }: Props) => (
  <ChartCard
    title="Form template usage"
    subtitle={`${dto.templates.length} template${dto.templates.length !== 1 ? 's' : ''} · ${dto.total} total records`}
    height={chartHeight(dto.templates.length)}
    hasData={dto.templates.length > 0}
  >
    <ReactECharts
      option={buildOption(dto)}
      style={{ height: chartHeight(dto.templates.length) }}
      notMerge
    />
  </ChartCard>
)
