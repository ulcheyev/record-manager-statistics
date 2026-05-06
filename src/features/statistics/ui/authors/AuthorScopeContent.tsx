import { useMemo, useState } from 'react'
import { SkeletonCard } from '@/shared/components/SkeletonCard'
import { SearchInput } from '@/shared/components/SearchInput'
import { AuthorOverviewCards } from '@/features/statistics/components/authors/AuthorOverviewCards'
import { AuthorRecordsBarChart } from '@/features/statistics/components/authors/AuthorRecordsBarChart'
import { AuthorScatterChart } from '@/features/statistics/components/authors/AuthorScatterChart'
import type {
  AuthorsOverviewDto,
  AuthorWithInstitutionDto,
} from '@/features/statistics/model/dto/author.dto.ts'

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

      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder={placeholder}
        total={authors.length}
        filtered={filtered.length}
      />

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
