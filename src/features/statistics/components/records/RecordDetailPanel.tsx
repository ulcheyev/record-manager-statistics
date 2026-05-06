import { LAYOUT } from '@/config/constants'
import {
  toRecordDetailViewModel,
  type RecordDetailViewModel,
} from '@/features/statistics/model/record.viewmodel'
import { StatCard } from '@/features/statistics/components/StatCard'
import { PhaseBadge } from './PhaseBadge'
import type { RecordSummaryDto } from '@/features/statistics/model/dto/record.dto.ts'

interface Props {
  record: RecordSummaryDto | null
  onClose: () => void
}

export const RecordDetailPanel = ({ record, onClose }: Props) => (
  <>
    {/* Backdrop */}
    <div
      className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${
        record ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    />

    {/* Slide-in shell */}
    <div
      className={`fixed right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
        record ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{ top: LAYOUT.HEADER_HEIGHT, bottom: 0 }}
    >
      {record && <RecordDetailContent vm={toRecordDetailViewModel(record)} onClose={onClose} />}
    </div>
  </>
)

interface ContentProps {
  vm: RecordDetailViewModel
  onClose: () => void
}

const RecordDetailContent = ({ vm, onClose }: ContentProps) => (
  <>
    <div className="flex items-start justify-between px-6 pt-6 pb-5 border-b border-gray-100">
      <div>
        <p className="text-[15px] font-semibold uppercase tracking-[0.14em] text-blue-500">
          Record detail
        </p>
        <h2 className="mt-1 text-base font-semibold text-gray-800">{vm.displayName}</h2>
        <div className="mt-1.5 flex items-center gap-2">
          <PhaseBadge phase={vm.phase} />
          {vm.formTemplateLabel && (
            <span className="text-xs text-gray-400">{vm.formTemplateLabel}</span>
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
        <StatCard label="Questions" value={vm.answers.totalQuestions} />

        <StatCard
          label="Answers"
          value={vm.answers.totalAnswers}
          hint={`${vm.answers.evaluableAnswered} evaluable`}
        />

        {vm.answers.hasCorrectness && (
          <>
            <StatCard
              label="Evaluable correctness rate"
              value={vm.answers.correctnessRateFmt}
              accent={vm.answers.correctnessGood ? 'success' : 'danger'}
            />
          </>
        )}
      </div>

      {vm.phase === 'COMPLETED' && <RecordAnswerBreakdown vm={vm} />}

      <RecordMetadataBlock vm={vm} />
    </div>
  </>
)

interface BreakdownSegment {
  color: string
  label: string
  count: number
  width: number
}

const BreakdownSection = ({ title, segments }: { title: string; segments: BreakdownSegment[] }) => (
  <div>
    <p className="mb-2 text-[11px] font-medium text-gray-500">{title}</p>

    <div className="flex h-2 rounded-full overflow-hidden bg-gray-200">
      {segments
        .filter((segment) => segment.count > 0)
        .map((segment) => (
          <div
            key={segment.label}
            className={segment.color}
            style={{ width: `${segment.width}%` }}
          />
        ))}
    </div>

    <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-2">
      {segments
        .filter((segment) => segment.count > 0)
        .map(({ color, label, count }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
            <span className="text-[11px] text-gray-500">
              {label} <span className="font-semibold text-gray-800">{count}</span>
            </span>
          </div>
        ))}
    </div>
  </div>
)

const RecordAnswerBreakdown = ({ vm }: { vm: RecordDetailViewModel }) => (
  <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 space-y-5">
    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
      Answer breakdown
    </p>

    <BreakdownSection
      title="Answered / Unanswered"
      segments={[
        {
          color: 'bg-blue-500',
          label: 'Evaluable answered',
          count: vm.answers.evaluableAnswered,
          width: vm.answers.evaluableAnsweredRate,
        },
        {
          color: 'bg-purple-500',
          label: 'Informative answered',
          count: vm.answers.informativeAnswered,
          width: vm.answers.informativeAnsweredRate,
        },
        {
          color: 'bg-sky-300',
          label: 'Evaluable unanswered',
          count: vm.answers.evaluableUnanswered,
          width: vm.answers.evaluableUnansweredRate,
        },
        {
          color: 'bg-purple-300',
          label: 'Informative unanswered',
          count: vm.answers.informativeUnanswered,
          width: vm.answers.informativeUnansweredRate,
        },
      ]}
    />

    {vm.answers.hasCorrectness && (
      <BreakdownSection
        title="Evaluable correctness"
        segments={[
          {
            color: 'bg-emerald-500',
            label: 'Correct',
            count: vm.answers.correct,
            width: vm.answers.correctnessRate,
          },
          {
            color: 'bg-rose-400',
            label: 'Incorrect',
            count: vm.answers.incorrect,
            width: 100 - vm.answers.correctnessRate,
          },
        ]}
      />
    )}
  </div>
)

const RecordMetadataBlock = ({ vm }: { vm: RecordDetailViewModel }) => (
  <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 space-y-3">
    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">Metadata</p>
    {[
      { label: 'Created', value: vm.dateCreatedFmt },
      { label: 'Template', value: vm.formTemplateLabel ?? '—' },
    ].map(({ label, value }) => (
      <div key={label} className="flex justify-between gap-4 text-sm">
        <span className="text-gray-400 flex-shrink-0">{label}</span>
        <span className="text-gray-700 text-right">{value}</span>
      </div>
    ))}
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-gray-400 flex-shrink-0">URI</span>
      <span className="text-gray-700 text-right font-mono text-xs truncate max-w-[220px]">
        {vm.uri}
      </span>
    </div>
  </div>
)
