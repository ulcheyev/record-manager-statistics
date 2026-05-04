import type { UserStatisticsPermissionsDto } from '@/features/statistics/dtoTypes'

type P = UserStatisticsPermissionsDto

export const canViewStatistics = (p: P) => p.canReadStatistics

export const canViewAuthors = (p: P) =>
  p.canReadStatistics && (p.canReadAllUsers || (p.canReadOrganization && p.canReadOrgUsers))

export const canViewRecords = (p: P) =>
  p.canReadStatistics && (p.canReadAllRecords || (p.canReadOrganization && p.canReadOrgRecords))

export const canViewInstitutions = (p: P) => p.canReadStatistics && p.canReadAllOrganizations

export const canViewInstitutionAuthors = (p: P) =>
  p.canReadStatistics && p.canReadOrganization && p.canReadOrgUsers

export const canViewAllAuthors = (p: P) => p.canReadStatistics && p.canReadAllUsers

export const canViewInstitutionRecords = (p: P) =>
  p.canReadStatistics && p.canReadOrganization && p.canReadOrgRecords

export const canViewAllRecords = (p: P) => p.canReadStatistics && p.canReadAllRecords
