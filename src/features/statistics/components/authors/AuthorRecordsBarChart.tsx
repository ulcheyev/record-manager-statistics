import { useState } from 'react'
import ReactECharts from 'echarts-for-react'
import type { AuthorWithInstitutionDto } from '@/features/statistics/dtoTypes'
import { STYLES } from '@/config/constants'
import { ViewTotalsBar } from './ViewTotalsBar'
import {
  getEvaluationTotals,
  getInformativeTotals,
  getRecordsTotals,
} from '@/features/statistics/model/author.aggregates'

const VISIBLE_COLS = 8

interface BarSeriesDef {
  name: string
  stack: string
  color: string
  isTop?: boolean
  getData: (a: AuthorWithInstitutionDto) => number
}

interface BarViewDef {
  key: string
  label: string
  title: string
  barMaxWidth: number
  series: BarSeriesDef[]
  getTotals: (authors: AuthorWithInstitutionDto[]) => {
    label: string
    value: number | string
    color?: string
    dim?: boolean
  }[]
  getAuthorTotal: (a: AuthorWithInstitutionDto) => number
}

const BAR_VIEWS: BarViewDef[] = [
  {
    key: 'informative',
    label: 'Informative',
    title: 'Informative questions per author',
    barMaxWidth: 28,
    getTotals: getInformativeTotals,
    getAuthorTotal: (a) => a.totalInformativeQuestions ?? 0,
    series: [
      {
        name: 'Answered',
        stack: 'info',
        color: STYLES.COLORS.open,
        getData: (a) => Math.max(0, a.totalAnswers - a.evaluableAnswers),
      },
      {
        name: 'Unanswered',
        stack: 'info',
        color: STYLES.COLORS.infoUnanswered,
        isTop: true,
        getData: (a) =>
          Math.max(
            0,
            (a.totalInformativeQuestions ?? 0) - Math.max(0, a.totalAnswers - a.evaluableAnswers),
          ),
      },
    ],
  },
  {
    key: 'evaluation',
    label: 'Evaluation',
    title: 'Evaluation questions per author',
    barMaxWidth: 28,
    getTotals: getEvaluationTotals,
    getAuthorTotal: (a) => a.totalEvaluableQuestions ?? 0,
    series: [
      {
        name: 'Correct',
        stack: 'eval',
        color: STYLES.COLORS.completed,
        getData: (a) => a.totalCorrectAnswers,
      },
      {
        name: 'Incorrect',
        stack: 'eval',
        color: STYLES.COLORS.rejected,
        getData: (a) => Math.max(0, a.evaluableAnswers - a.totalCorrectAnswers),
      },
      {
        name: 'Unanswered',
        stack: 'eval',
        color: STYLES.COLORS.unanswered,
        isTop: true,
        getData: (a) => Math.max(0, (a.totalEvaluableQuestions ?? 0) - a.evaluableAnswers),
      },
    ],
  },
  {
    key: 'records',
    label: 'Records',
    title: 'Records per author',
    barMaxWidth: 28,
    getTotals: getRecordsTotals,
    getAuthorTotal: (a) => a.totalRecords,
    series: [
      {
        name: 'Completed',
        stack: 'phase',
        color: STYLES.COLORS.completed,
        getData: (a) => a.byPhase.completed,
      },
      {
        name: 'Rejected',
        stack: 'phase',
        color: STYLES.COLORS.rejected,
        getData: (a) => a.byPhase.rejected,
      },
      {
        name: 'Open',
        stack: 'phase',
        color: STYLES.COLORS.open,
        isTop: true,
        getData: (a) => a.byPhase.open,
      },
    ],
  },
]

const BarChart = ({
  authors,
  viewDef,
}: {
  authors: AuthorWithInstitutionDto[]
  viewDef: BarViewDef
}) => {
  const sorted = [...authors].sort((a, b) => b.totalRecords - a.totalRecords)
  const total = sorted.length
  const names = sorted.map((a) => a.fullName || a.username)
  const scrollable = total > VISIBLE_COLS
  const endPct = scrollable ? Math.round((VISIBLE_COLS / total) * 100) : 100

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: any[]) => {
        const idx = params[0].dataIndex as number
        const author = sorted[idx]
        const name = names[idx]
        const total = viewDef.getAuthorTotal(author)
        const rows = params
          .filter((p: any) => (p.value as number) > 0)
          .map(
            (p: any) =>
              `<span style="color:${p.color as string}">●</span> ${p.seriesName as string}: <b>${p.value as number}</b>`,
          )
          .join('<br/>')
        return `<b>${name}</b><br/>${rows}<br/><span style="color:#9ca3af">Total: <b style="color:#374151">${total}</b></span>`
      },
    },
    legend: {
      data: viewDef.series.map((s) => s.name),
      top: 4,
      textStyle: { fontSize: 10, color: STYLES.CHART.labelColor },
      itemWidth: 10,
      itemHeight: 10,
    },
    grid: { left: 16, right: 16, top: 44, bottom: scrollable ? 48 : 28, containLabel: true },
    ...(scrollable
      ? {
          dataZoom: [
            {
              type: 'inside',
              xAxisIndex: 0,
              start: 0,
              end: endPct,
              zoomLock: true,
              moveOnMouseWheel: true,
            },
            {
              type: 'slider',
              xAxisIndex: 0,
              start: 0,
              end: endPct,
              height: 16,
              bottom: 4,
              fillerColor: STYLES.CHART.scrollFillColor,
              borderColor: STYLES.CHART.scrollBorderColor,
              handleStyle: {
                color: STYLES.CHART.scrollHandleColor,
                borderColor: STYLES.CHART.scrollHandleColor,
              },
              handleSize: '80%',
              showDetail: false,
              brushSelect: false,
            },
          ],
        }
      : {}),
    xAxis: {
      type: 'category',
      data: names,
      axisLabel: {
        fontSize: 10,
        color: STYLES.CHART.labelColor,
        interval: 0,
        rotate: 30,
        width: 80,
        overflow: 'truncate',
      },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLabel: { fontSize: 11, color: STYLES.CHART.axisLabelColor },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: STYLES.CHART.splitLineColor } },
    },
    series: viewDef.series.map((s) => ({
      name: s.name,
      type: 'bar',
      stack: s.stack,
      barMaxWidth: viewDef.barMaxWidth,
      data: sorted.map((a) => s.getData(a)),
      itemStyle: {
        color: s.color,
        ...(s.isTop ? { borderRadius: [3, 3, 0, 0] } : {}),
      },
    })),
  }

  return (
    <ReactECharts
      key={names.join(',')}
      option={option}
      style={{ height: `${Math.max(260, Math.min(total, VISIBLE_COLS) * 38 + 100)}px` }}
      notMerge
    />
  )
}

interface Props {
  authors: AuthorWithInstitutionDto[]
}

export const AuthorRecordsBarChart = ({ authors }: Props) => {
  const [viewKey, setViewKey] = useState(BAR_VIEWS[0].key)
  const viewDef = BAR_VIEWS.find((v) => v.key === viewKey)!

  return (
    <div className="rounded-xl bg-white border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
          {viewDef.title}
        </p>
        <div className="flex overflow-hidden rounded-lg border border-gray-200 text-[11px] font-medium">
          {BAR_VIEWS.map((v, i) => (
            <button
              key={v.key}
              onClick={() => setViewKey(v.key)}
              className={`px-3 py-1.5 transition-colors ${i > 0 ? 'border-l border-gray-200' : ''} ${
                viewKey === v.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {authors.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-400">No data</p>
      ) : (
        <>
          <ViewTotalsBar items={viewDef.getTotals(authors)} />
          <BarChart authors={authors} viewDef={viewDef} />
        </>
      )}
    </div>
  )
}
