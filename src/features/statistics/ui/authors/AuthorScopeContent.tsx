import { useMemo, useState } from 'react'
import { SkeletonCard } from '@/shared/components/SkeletonCard'
import type { AuthorsOverviewDto, AuthorWithInstitutionDto } from '@/features/statistics/dtoTypes'
import { AuthorOverviewCards } from '@/features/statistics/components/authors/AuthorOverviewCards.tsx'
import { AuthorRecordsBarChart } from '@/features/statistics/components/authors/AuthorRecordsBarChart.tsx'
import { AuthorScatterChart } from '@/features/statistics/components/authors/AuthorScatterChart.tsx'

type SearchField = 'username' | 'fullName' | 'institutionName'

interface Props {
  authors: AuthorWithInstitutionDto[]
  overview: AuthorsOverviewDto
  searchFields?: SearchField[]
}

const FIELD_LABELS: Record<SearchField, string> = {
  username: 'username',
  fullName: 'name',
  institutionName: 'institution',
}

const DEFAULT_FIELDS: SearchField[] = ['username', 'fullName', 'institutionName']

export const AuthorScopeContent = ({ authors, overview, searchFields = DEFAULT_FIELDS }: Props) => {
  const [search, setSearch] = useState('')

  const placeholder = `Search by ${searchFields.map((f) => FIELD_LABELS[f]).join(', ')}…`

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return authors
    return authors.filter((a) =>
      searchFields.some((field) => (a[field] ?? '').toLowerCase().includes(q)),
    )
  }, [authors, search, searchFields])

  return (
    <>
      <AuthorOverviewCards overview={overview} />

      <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2.5">
        <svg
          className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="6.5" cy="6.5" r="4.5" />
          <line x1="10.5" y1="10.5" x2="14" y2="14" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          className="flex-1 text-sm text-gray-700 bg-transparent outline-none placeholder:text-gray-300"
        />
        {search && (
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] text-gray-400 tabular-nums">
              {filtered.length} / {authors.length}
            </span>
            <button
              onClick={() => setSearch('')}
              className="text-gray-300 hover:text-gray-500 transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
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
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-400">
          No authors matching <span className="font-medium text-gray-600">"{search}"</span>
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <AuthorRecordsBarChart authors={filtered} />
          <AuthorScatterChart authors={filtered} />
        </div>
      )}
    </>
  )
}

export const AuthorScopeSkeleton = () => (
  <>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonCard key={i} h={88} />
      ))}
    </div>
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <SkeletonCard h={280} />
      <SkeletonCard h={280} />
    </div>
  </>
)
