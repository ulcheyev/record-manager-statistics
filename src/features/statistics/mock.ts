import type { StatisticsProvider } from './provider'
import type { StatisticsInterval } from '@/features/statistics/dtoTypes'

export const mockStatisticsProvider: StatisticsProvider = {
  async getGeneral(_interval: StatisticsInterval) {
    return {
      totalRecords: 247,
      completionRate: 61.9,
      rejectionRate: 14.2,
      participatingInstitutions: 8,
      entryClerks: 23,
      periodFrom: '2024-01-05T08:00:00Z',
      periodTo: '2024-11-28T17:00:00Z',
      avgRecordsPerInstitution: 30.9,
      avgRecordsPerAuthor: 10.7,
      byPhase: {
        open: 59,
        completed: 153,
        rejected: 35,
      },
      interval: { from: null, to: null, empty: true },
    }
  },

  async getTimeline(_interval: StatisticsInterval, _granularity: string) {
    return {
      granularity: 'MONTH',
      interval: { from: null, to: null, empty: true },
      timeSeries: {
        granularity: 'MONTH',
        interval: { from: null, to: null, empty: true },
        labels: [
          '2024-01',
          '2024-02',
          '2024-03',
          '2024-04',
          '2024-05',
          '2024-06',
          '2024-07',
          '2024-08',
          '2024-09',
          '2024-10',
          '2024-11',
          '2024-12',
        ],
        series: {
          open: [8, 12, 7, 15, 10, 18, 14, 20, 9, 11, 16, 13],
          completed: [20, 25, 30, 22, 35, 28, 40, 33, 27, 38, 31, 45],
          rejected: [3, 5, 4, 6, 4, 7, 5, 8, 4, 6, 5, 9],
        },
        totals: [31, 42, 41, 43, 49, 53, 59, 61, 40, 55, 52, 67],
      },
    }
  },

  async getByInstitution(_interval: StatisticsInterval) {
    return {
      interval: { from: null, to: null, empty: true },
      institutions: [
        {
          uri: 'http://example.org/institution/1',
          name: 'General Hospital',
          total: 89,
          completionRate: 68.5,
          rejectionRate: 11.2,
          byPhase: { open: 18, completed: 61, rejected: 10 },
        },
        {
          uri: 'http://example.org/institution/2',
          name: 'City Clinic',
          total: 72,
          completionRate: 58.3,
          rejectionRate: 16.7,
          byPhase: { open: 18, completed: 42, rejected: 12 },
        },
        {
          uri: 'http://example.org/institution/3',
          name: 'University Medical Center',
          total: 54,
          completionRate: 64.8,
          rejectionRate: 13.0,
          byPhase: { open: 12, completed: 35, rejected: 7 },
        },
        {
          uri: 'http://example.org/institution/4',
          name: 'Regional Health Institute',
          total: 32,
          completionRate: 53.1,
          rejectionRate: 18.8,
          byPhase: { open: 9, completed: 17, rejected: 6 },
        },
      ],
    }
  },

  async getByAuthor(_interval: StatisticsInterval) {
    const institutions = [
      'General Hospital',
      'City Clinic',
      'University Medical Center',
      'Regional Health Institute',
    ]

    const authors = Array.from({ length: 10 }, (_, i) => {
      const open = Math.floor(Math.random() * 10)
      const completed = Math.floor(Math.random() * 20)
      const rejected = Math.floor(Math.random() * 8)
      const total = open + completed + rejected
      const completionRate = total > 0 ? parseFloat(((completed / total) * 100).toFixed(1)) : 0
      const rejectionRate = total > 0 ? parseFloat(((rejected / total) * 100).toFixed(1)) : 0

      return {
        uri: `http://example.org/user/${i + 1}`,
        fullName: `Author ${i + 1}`,
        username: `author${i + 1}`,
        institutionName: institutions[i % institutions.length],
        total,
        completionRate,
        rejectionRate,
        byPhase: { open, completed, rejected },
      }
    })

    return {
      interval: { from: null, to: null, empty: true },
      authors,
    }
  },

  async getByFormTemplate(_interval: StatisticsInterval) {
    return {
      total: 247,
      interval: { from: null, to: null, empty: true },
      templates: [
        {
          templateUri: 'http://example.org/form/admission',
          templateLabel: 'example 1',
          count: 98,
          percentage: 39.7,
        },
        {
          templateUri: 'http://example.org/form/discharge',
          templateLabel: 'example 2',
          count: 74,
          percentage: 30.0,
        },
        {
          templateUri: 'http://example.org/form/followup',
          templateLabel: 'example 3',
          count: 45,
          percentage: 18.2,
        },
        {
          templateUri: 'http://example.org/form/emergency',
          templateLabel: 'example 4',
          count: 30,
          percentage: 12.1,
        },
      ],
    }
  },
}
