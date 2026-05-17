'use client'

import { motion } from 'framer-motion'
import { useGame } from '@/context/GameContext'
import { getLevelForXP, getProgressToNextLevel, LEVELS } from '@/lib/gamification'
import { Flame } from 'lucide-react'

export function LevelBar() {
  const { state } = useGame()
  const level = getLevelForXP(state.xp)
  const progress = getProgressToNextLevel(state.xp)
  const isMax = level.level === LEVELS.length

  return (
    <div
      className="flex items-center gap-4 px-4 py-2.5 rounded-xl"
      style={{
        background: 'rgba(13,17,23,0.7)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Level badge */}
      <div
        className="px-2.5 py-1 rounded-lg text-xs font-black whitespace-nowrap"
        style={{
          background: `${level.color}18`,
          color: level.color,
          border: `1px solid ${level.color}30`,
          fontFamily: 'var(--font-sans)',
        }}
      >
        Lv.{level.level} {level.title}
      </div>

      {/* XP bar */}
      <div className="flex-1 min-w-[80px]">
        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${level.color}, ${level.color}aa)` }}
          />
        </div>
        <p
          className="text-xs mt-0.5"
          style={{ color: '#334155', fontFamily: 'var(--font-sans)' }}
        >
          {isMax ? `${state.xp} XP` : `${state.xp} XP`}
        </p>
      </div>

      {/* Streak */}
      {state.streak > 0 && (
        <div
          className="flex items-center gap-1 text-xs font-semibold whitespace-nowrap"
          style={{ color: '#F59E0B', fontFamily: 'var(--font-sans)' }}
        >
          <Flame size={13} />
          {state.streak}d
        </div>
      )}
    </div>
  )
}
