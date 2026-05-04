import { useState } from 'react'
import ReactECharts from 'echarts-for-react'
import type { AuthorWithInstitutionDto } from '@/features/statistics/dtoTypes'
import { STYLES } from '@/config/constants'
import { ViewTotalsBar } from './ViewTotalsBar'
import { toAuthorViewModel } from '@/features/statistics/model/author.viewmodel'
import {
  getCorrectnessTotals,
  getCompletionTotals,
  getAnsweredTotals,
  getUnansweredTotals,
} from '@/features/statistics/model/author.aggregates'

interface ScatterViewDef {
  key: string
  label: string
  title: string
  yName: string
  yFmt: string
  yMax?: number
  yField: (a: AuthorWithInstitutionDto) => number
  tooltipLines: (a: AuthorWithInstitutionDto) => string[]
  getTotals: (
    authors: AuthorWithInstitutionDto[],
  ) => { label: string; value: number | string; color?: string; dim?: boolean }[]
  getAuthorLabel: (a: AuthorWithInstitutionDto) => string
}

const SCATTER_VIEWS: ScatterViewDef[] = [
  {
    key: 'correctness',
    label: 'Correctness',
    title: 'Records vs Correctness Rate',
    yName: 'Correctness (%)',
    yFmt: '{value}%',
    yMax: 100,
    getTotals: getCorrectnessTotals,
    getAuthorLabel: (a) => `${a.totalCorrectAnswers}/${a.evaluableAnswers}`,
    yField: (a) => a.correctnessRate,
    tooltipLines: (a) => [
      `Records: <b>${a.totalRecords}</b>`,
      `Correctness: <b>${a.correctnessRate.toFixed(1)}%</b>`,
      `Correct / evaluable: <b>${a.totalCorrectAnswers}</b> / <b>${a.evaluableAnswers}</b>`,
    ],
  },
  {
    key: 'completion',
    label: 'Completion',
    title: 'Records vs Completion Rate',
    yName: 'Completion (%)',
    yFmt: '{value}%',
    yMax: 100,
    getTotals: getCompletionTotals,
    getAuthorLabel: (a) => `${a.byPhase.completed}/${a.totalRecords}`,
    yField: (a) => a.completionRate,
    tooltipLines: (a) => [
      `Records: <b>${a.totalRecords}</b>`,
      `Completion: <b>${a.completionRate.toFixed(1)}%</b>`,
      `Rejection: <b>${a.rejectionRate.toFixed(1)}%</b>`,
    ],
  },
  {
    key: 'answered',
    label: 'Answered',
    title: 'Records vs Answers Given',
    yName: 'Answers given',
    yFmt: '{value}',
    getTotals: getAnsweredTotals,
    getAuthorLabel: (a) => `${a.totalAnswers}`,
    yField: (a) => a.totalAnswers,
    tooltipLines: (a) => {
      const totalQ = (a.totalEvaluableQuestions ?? 0) + (a.totalInformativeQuestions ?? 0)
      const unans = totalQ > 0 ? totalQ - a.totalAnswers : null
      return [
        `Records: <b>${a.totalRecords}</b>`,
        `Answered: <b>${a.totalAnswers}</b>`,
        ...(unans !== null ? [`Unanswered: <b>${unans}</b>`] : []),
        `Evaluable answered: <b>${a.evaluableAnswers}</b>`,
      ]
    },
  },
  {
    key: 'unanswered',
    label: 'Unanswered',
    title: 'Records vs Unanswered Questions',
    yName: 'Unanswered questions',
    yFmt: '{value}',
    getTotals: getUnansweredTotals,
    getAuthorLabel: (a) => {
      const totalQ = (a.totalEvaluableQuestions ?? 0) + (a.totalInformativeQuestions ?? 0)
      return `${Math.max(0, totalQ - a.totalAnswers)}/${totalQ}`
    },
    yField: (a) => {
      const totalQ = (a.totalEvaluableQuestions ?? 0) + (a.totalInformativeQuestions ?? 0)
      return totalQ > 0 ? Math.max(0, totalQ - a.totalAnswers) : 0
    },
    tooltipLines: (a) => {
      const totalQ = (a.totalEvaluableQuestions ?? 0) + (a.totalInformativeQuestions ?? 0)
      const unans = Math.max(0, totalQ - a.totalAnswers)
      return [
        `Records: <b>${a.totalRecords}</b>`,
        `Unanswered: <b>${unans}</b> of ${totalQ}`,
        `Answered: <b>${a.totalAnswers}</b>`,
      ]
    },
  },
]

const ALL_VIEWS = [...SCATTER_VIEWS.map((v) => ({ key: v.key, label: v.label }))]

const ScatterView = ({
  authors,
  viewDef,
}: {
  authors: AuthorWithInstitutionDto[]
  viewDef: ScatterViewDef
}) => {
  const groups = new Map<string, AuthorWithInstitutionDto[]>()
  for (const a of authors) {
    const key = toAuthorViewModel(a).institutionName || 'Unknown'
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(a)
  }

  const maxX = Math.max(...authors.map((a) => a.totalRecords), 1)
  const maxY = Math.max(...authors.map((a) => viewDef.yField(a)), 1)

  const series = [...groups.entries()].map(([instName, instAuthors], idx) => ({
    name: instName,
    type: 'scatter',
    data: instAuthors.map((a) => ({
      value: [a.totalRecords, viewDef.yField(a)],
      name: toAuthorViewModel(a).displayName,
      author: a,
    })),
    symbolSize: 9,
    itemStyle: {
      color: STYLES.INSTITUTION_PALETTE[idx % STYLES.INSTITUTION_PALETTE.length],
      opacity: 0.85,
      borderColor: '#fff',
      borderWidth: 1.5,
    },
    emphasis: {
      scale: 2,
      label: {
        show: true,
        formatter: (p: any) => p.name as string,
        position: 'top',
        fontSize: 10,
        color: STYLES.CHART.emphasisLabelColor,
        backgroundColor: STYLES.CHART.tooltipBgColor,
        padding: [2, 4],
        borderRadius: 3,
      },
    },
  }))

  const option = {
    legend: {
      data: [...groups.keys()],
      top: 4,
      textStyle: { fontSize: 10, color: STYLES.CHART.labelColor },
      itemWidth: 10,
      itemHeight: 10,
    },
    tooltip: {
      trigger: 'item',
      formatter: (p: any) => {
        const a = p.data.author as AuthorWithInstitutionDto
        const vm = toAuthorViewModel(a)
        return [
          `<b>${vm.displayName}</b>`,
          vm.institutionName,
          ...viewDef.tooltipLines(a),
          `<span style="color:#9ca3af">Total: <b style="color:#374151">${viewDef.getAuthorLabel(a)}</b></span>`,
        ]
          .filter(Boolean)
          .join('<br/>')
      },
    },
    grid: { left: 56, right: 16, top: 44, bottom: 36 },
    xAxis: {
      type: 'value',
      name: 'Total Records',
      nameLocation: 'middle',
      nameGap: 24,
      nameTextStyle: { fontSize: 11, color: STYLES.CHART.axisLabelColor },
      min: 0,
      max: Math.ceil(maxX * 1.08),
      axisLabel: { fontSize: 11, color: STYLES.CHART.axisLabelColor },
      splitLine: { lineStyle: { color: STYLES.CHART.splitLineColor } },
      axisLine: { show: false },
    },
    yAxis: {
      type: 'value',
      name: viewDef.yName,
      nameLocation: 'middle',
      nameGap: 44,
      nameTextStyle: { fontSize: 11, color: STYLES.CHART.axisLabelColor },
      min: 0,
      ...(viewDef.yMax !== undefined ? { max: viewDef.yMax } : { max: Math.ceil(maxY * 1.1) }),
      axisLabel: { fontSize: 11, color: STYLES.CHART.axisLabelColor, formatter: viewDef.yFmt },
      splitLine: { lineStyle: { color: STYLES.CHART.splitLineColor } },
      axisLine: { show: false },
    },
    series,
  }

  const authorKey = authors.map((a) => a.username).join(',')

  return <ReactECharts key={authorKey} option={option} style={{ height: '300px' }} notMerge />
}

interface Props {
  authors: AuthorWithInstitutionDto[]
}

export const AuthorScatterChart = ({ authors }: Props) => {
  const [viewKey, setViewKey] = useState(SCATTER_VIEWS[0].key)
  const scatterDef = SCATTER_VIEWS.find((v) => v.key === viewKey)

  return (
    <div className="rounded-xl bg-white border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
          {scatterDef ? scatterDef.title : 'Author details'}
        </p>
        <div className="flex overflow-hidden rounded-lg border border-gray-200 text-[11px] font-medium">
          {ALL_VIEWS.map((v, i) => (
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
        <p className="py-8 text-center text-sm text-gray-400">No author data</p>
      ) : scatterDef ? (
        <>
          <ViewTotalsBar items={scatterDef.getTotals(authors)} />
          <ScatterView authors={authors} viewDef={scatterDef} />
        </>
      ) : null}
    </div>
  )
}
