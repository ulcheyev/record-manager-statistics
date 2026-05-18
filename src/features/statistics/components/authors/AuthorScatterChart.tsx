import { useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { STYLES } from '@/config/constants'
import { ViewTotalsBar } from './ViewTotalsBar'
import { toAuthorViewModel } from '@/features/statistics/model/author.viewmodel'
import {
  getCorrectnessTotals,
  getCompletionTotals,
  getAnsweredTotals,
  getUnansweredTotals,
} from '@/features/statistics/model/author.aggregates'
import type { AuthorWithInstitutionDto } from '@/features/statistics/model/dto/author.dto.ts'

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
    getAuthorLabel: (a) => {
      const vm = toAuthorViewModel(a)
      return vm.answers.hasCorrectness
        ? `${vm.answers.correct}/${vm.answers.evaluableAnswered}`
        : '—'
    },
    yField: (a) => toAuthorViewModel(a).answers.correctnessRate,
    tooltipLines: (a) => {
      const vm = toAuthorViewModel(a)
      return [
        `Records: <b>${vm.totalRecords}</b>`,
        `Correctness: <b>${vm.answers.correctnessRateFmt}</b>`,
        `Correct answers: <b>${vm.answers.correct}</b> / <b>${vm.answers.evaluableAnswered}</b>`,
      ]
    },
  },
  {
    key: 'completion',
    label: 'Completion',
    title: 'Records vs Completion Rate',
    yName: 'Completion (%)',
    yFmt: '{value}%',
    yMax: 100,
    getTotals: getCompletionTotals,
    getAuthorLabel: (a) => {
      const vm = toAuthorViewModel(a)
      return `${vm.byPhase.completed}/${vm.totalRecords}`
    },
    yField: (a) => a.completionRate,
    tooltipLines: (a) => {
      const vm = toAuthorViewModel(a)
      return [
        `Records: <b>${vm.totalRecords}</b>`,
        `Completed: <b>${vm.byPhase.completed}</b>`,
        `Open: <b>${vm.byPhase.open}</b>`,
        `Rejected: <b>${vm.byPhase.rejected}</b>`,
        `Completion: <b>${vm.completionRateFmt}</b>`,
      ]
    },
  },
  {
    key: 'answered',
    label: 'Answered',
    title: 'Records vs Answers Given',
    yName: 'Answers given',
    yFmt: '{value}',
    getTotals: getAnsweredTotals,
    getAuthorLabel: (a) => `${toAuthorViewModel(a).answers.totalAnswers}`,
    yField: (a) => toAuthorViewModel(a).answers.totalAnswers,
    tooltipLines: (a) => {
      const vm = toAuthorViewModel(a)
      return [
        `Records: <b>${vm.totalRecords}</b>`,
        `Answered questions: <b>${vm.answers.totalAnswers}</b>`,
        `Evaluable: <b>${vm.answers.evaluableAnswered}</b>`,
        `Informative: <b>${vm.answers.informativeAnswered}</b>`,
        `Answer rate: <b>${vm.answers.answerRateFmt}</b>`,
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
      const vm = toAuthorViewModel(a)
      return `${vm.answers.totalUnanswered}/${vm.answers.totalQuestions}`
    },
    yField: (a) => toAuthorViewModel(a).answers.totalUnanswered,
    tooltipLines: (a) => {
      const vm = toAuthorViewModel(a)
      return [
        `Records: <b>${vm.totalRecords}</b>`,
        `Unanswered questions: <b>${vm.answers.totalUnanswered}</b> / <b>${vm.answers.totalQuestions}</b>`,
        `Answered questions: <b>${vm.answers.totalAnswers}</b>`,
        `Answer rate: <b>${vm.answers.answerRateFmt}</b>`,
      ]
    },
  },
]

const ALL_VIEWS = SCATTER_VIEWS.map((v) => ({ key: v.key, label: v.label }))

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
    symbolSize: STYLES.CHART.SCATTER_SYMBOL_SIZE,
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
        return [`<b>${vm.displayName}</b>`, vm.institutionName, ...viewDef.tooltipLines(a)]
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider sm:tracking-[0.14em] text-gray-400">
          {scatterDef ? scatterDef.title : 'Author details'}
        </p>
        <div className="flex overflow-x-auto rounded-lg border border-gray-200 text-[11px] font-medium self-stretch sm:self-auto scrollbar-hide">
          {ALL_VIEWS.map((v, i) => (
            <button
              key={v.key}
              onClick={() => setViewKey(v.key)}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 transition-colors whitespace-nowrap ${i > 0 ? 'border-l border-gray-200' : ''} ${
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
