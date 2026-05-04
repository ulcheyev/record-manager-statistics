import ReactECharts from 'echarts-for-react'
import { StatCard } from '@/features/statistics/components/StatCard'
import type { InstitutionsStatisticsDto } from '@/features/statistics/dtoTypes'
import {
  toInstitutionRowViewModel,
  toInstitutionsOverviewViewModel,
} from '@/features/statistics/model/institution.viewmodel'

interface Props {
  data: InstitutionsStatisticsDto
}

export const InstitutionBreakdown = ({ data }: Props) => {
  const overview = toInstitutionsOverviewViewModel(data)
  const rows = [...data.institutions]
    .sort((a, b) => b.totalRecords - a.totalRecords)
    .map(toInstitutionRowViewModel)

  const height = Math.max(220, rows.length * 44)

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: any[]) => {
        const vm = rows[rows.length - 1 - params[0].dataIndex]
        return [
          `<b>${params[0].axisValue}</b>`,
          `Records: <b>${vm.totalRecords}</b>`,
          `Authors: <b>${vm.authorCount}</b>`,
          `Completion: <b>${vm.completionRateFmt}</b>`,
          `Correctness: <b>${vm.correctnessRateFmt}</b>`,
        ].join('<br/>')
      },
    },
    grid: { left: 10, right: 60, top: 8, bottom: 8, containLabel: true },
    xAxis: {
      type: 'value',
      axisLabel: { fontSize: 11, color: '#9ca3af' },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f3f4f6' } },
    },
    yAxis: {
      type: 'category',
      data: [...rows].reverse().map((vm) => vm.name),
      axisLabel: { fontSize: 11, color: '#6b7280', width: 130, overflow: 'truncate' },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        name: 'Records',
        type: 'bar',
        data: [...rows].reverse().map((vm) => ({
          value: vm.totalRecords,
          label: {
            show: true,
            position: 'right',
            fontSize: 11,
            color: '#6b7280',
            formatter: '{c}',
          },
        })),
        itemStyle: { color: '#2dd4bf', borderRadius: [0, 4, 4, 0] },
        barMaxWidth: 28,
      },
    ],
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Institutions" value={overview.totalInstitutions} accent="info" />
        <StatCard label="Most records" value={overview.mostRecordsInfo} small />
        <StatCard label="Most answers" value={overview.mostAnswersInfo} small />
        <StatCard
          label="Best completion"
          value={overview.bestCompletionInfo}
          accent="success"
          small
        />
        <StatCard
          label="Best correctness"
          value={overview.bestCorrectnessInfo}
          accent="success"
          small
        />
      </div>

      <div className="rounded-xl bg-white border border-gray-100 p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400 mb-4">
          Records by institution
        </p>
        {rows.length === 0 ? (
          <p className="text-sm text-gray-400 py-8 text-center">No institution data</p>
        ) : (
          <ReactECharts option={option} style={{ height: `${height}px` }} notMerge />
        )}
      </div>
    </div>
  )
}
