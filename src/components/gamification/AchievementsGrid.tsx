'use client'

import { useGame } from '@/context/GameContext'
import { BADGES, BadgeId } from '@/lib/gamification'

const ALL_BADGES: BadgeId[] = [
  'first_lesson', 'dedicated', 'perfect_score',
  'streak_7', 'streak_30', 'early_bird',
  'module_complete', 'track_complete', 'three_tracks',
]

export function AchievementsGrid() {
  const { state } = useGame()

  return (
    <div className="grid grid-cols-3 gap-3">
      {ALL_BADGES.map(id => {
        const badge = BADGES[id]
        const earned = state.earnedBadges.includes(id)
        return (
          <div
            key={id}
            className="flex flex-col items-center gap-2 p-3 rounded-xl text-center"
            style={{
              background: earned ? 'rgba(139,92,246,0.08)' : 'rgba(255,255,255,0.02)',
              border: earned ? '1px solid rgba(139,92,246,0.2)' : '1px solid rgba(255,255,255,0.05)',
              opacity: earned ? 1 : 0.4,
            }}
          >
            <span className="text-2xl" style={{ filter: earned ? 'none' : 'grayscale(1)' }}>
              {badge.icon}
            </span>
            <div>
              <p
                className="text-xs font-bold leading-tight"
                style={{ color: earned ? '#F1F5F9' : '#475569', fontFamily: 'var(--font-sans)' }}
              >
                {badge.name}
              </p>
              <p
                className="text-xs leading-tight mt-0.5"
                style={{ color: '#334155', fontFamily: 'var(--font-sans)' }}
              >
                {badge.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
