import ReactECharts from 'echarts-for-react'
import { useRecordStats } from '../hooks'

export const RecordsByCategory = () => {
  const { data, isLoading, isError } = useRecordStats()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading stats</div>
  if (!data) return null

  const option = {
    tooltip: { trigger: 'item' },
    xAxis: {
      type: 'category',
      data: data.byCategory.map((c) => c.category),
    },
    yAxis: { type: 'value' },
    series: [
      {
        type: 'bar',
        data: data.byCategory.map((c) => c.count),
      },
    ],
  }

  return <ReactECharts option={option} style={{ height: 300 }} />
}
