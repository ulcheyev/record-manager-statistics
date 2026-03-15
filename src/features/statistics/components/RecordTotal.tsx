import { useRecordStats } from '../hooks'

export const RecordTotal = () => {
  const { data, isLoading, isError } = useRecordStats()

  // TODO query guard
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading stats</div>
  if (!data) return null

  return (
    <div>
      <span>Total records </span>
      <strong>{data.total.toLocaleString()}</strong>
    </div>
  )
}
