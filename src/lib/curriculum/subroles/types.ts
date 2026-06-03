import type { Lesson } from '../types'

export interface SubRoleModule {
  title: string
  description: string
  lessons: Lesson[]
}

export type SubRoleLessons = Record<string, SubRoleModule>
