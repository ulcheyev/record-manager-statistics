import type { RecordSummaryDto } from '@/features/statistics/dtoTypes'
import { StatCard } from '@/features/statistics/components/StatCard'
import { PhaseBadge } from './PhaseBadge'
import { displayName, fmtDate } from './utils'

interface Props {
  record: RecordSummaryDto | null
  onClose: () => void
}

export const RecordDetailPanel = ({ record, onClose }: Props) => (
  <>
    <div
      className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${
        record ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    />
    <div
      className={`fixed right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
        record ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{ top: 60, bottom: 0 }}
    >
      {record && <PanelContent record={record} onClose={onClose} />}
    </div>
  </>
)

const PanelContent = ({ record, onClose }: { record: RecordSummaryDto; onClose: () => void }) => (
  <>
    <div className="flex items-start justify-between px-6 pt-6 pb-5 border-b border-gray-100">
      <div>
        <p className="text-[15px] font-semibold uppercase tracking-[0.14em] text-blue-500">
          Record detail
        </p>
        <h2 className="mt-1 text-base font-semibold text-gray-800">{displayName(record)}</h2>
        <div className="mt-1.5 flex items-center gap-2">
          <PhaseBadge phase={record.phase} />
          {record.name && record.formTemplateLabel && (
            <span className="text-xs text-gray-400">{record.formTemplateLabel}</span>
          )}
        </div>
      </div>
      <button
        onClick={onClose}
        className="ml-4 flex-shrink-0 rounded-lg p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="3" y1="3" x2="13" y2="13" />
          <line x1="13" y1="3" x2="3" y2="13" />
        </svg>
      </button>
    </div>

    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Questions" value={record.totalQuestions} />
        <StatCard
          label="Answers"
          value={record.totalAnswers}
          hint={`${record.totalEvaluableAnswers} evaluable`}
        />
        {record.totalEvaluableAnswers > 0 && (
          <>
            <StatCard label="Correct" value={record.totalCorrectAnswers} accent="success" />
            <StatCard
              label="Correctness"
              value={`${record.correctnessRate.toFixed(1)}%`}
              accent={record.correctnessRate >= 70 ? 'success' : 'danger'}
            />
          </>
        )}
        {record.certification && (
          <StatCard
            label="Assessment"
            value={record.certification.label}
            accent="assessment"
            hint={record.certification.description ?? undefined}
            small
          />
        )}
      </div>

      {record.totalEvaluableAnswers > 0 && (
        <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400 mb-3">
            Answer breakdown
          </p>
          <div className="flex h-2 rounded-full overflow-hidden bg-gray-200">
            <div className="bg-emerald-500" style={{ width: `${record.correctnessRate}%` }} />
            <div className="bg-rose-400" style={{ width: `${100 - record.correctnessRate}%` }} />
          </div>
          <div className="mt-2.5 flex flex-wrap gap-5">
            {[
              { color: 'bg-emerald-500', label: 'Correct', count: record.totalCorrectAnswers },
              {
                color: 'bg-rose-400',
                label: 'Incorrect',
                count: record.totalEvaluableAnswers - record.totalCorrectAnswers,
              },
              {
                color: 'bg-gray-300',
                label: 'Non-evaluable',
                count: record.totalAnswers - record.totalEvaluableAnswers,
              },
            ].map(({ color, label, count }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
                <span className="text-[11px] text-gray-500">
                  {label} <span className="font-semibold text-gray-800">{count}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
          Metadata
        </p>
        {[
          { label: 'Created', value: fmtDate(record.dateCreated) },
          { label: 'Template', value: record.formTemplateLabel ?? '—' },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between gap-4 text-sm">
            <span className="text-gray-400 flex-shrink-0">{label}</span>
            <span className="text-gray-700 text-right">{value}</span>
          </div>
        ))}
        <div className="flex justify-between gap-4 text-sm">
          <span className="text-gray-400 flex-shrink-0">URI</span>
          <span className="text-gray-700 text-right font-mono text-xs truncate max-w-[220px]">
            {record.uri}
          </span>
        </div>
      </div>
    </div>
  </>
)
