'use client'

import type { TranscriptLine } from '../../lib/transcripts'

interface TranscriptProps {
  prev: TranscriptLine | null
  cur: TranscriptLine | null
  enterKey: number
}

export default function Transcript({ prev, cur, enterKey }: TranscriptProps) {
  if (!prev && !cur) return <div className="transcript" id="transcript" aria-hidden="true" />

  return (
    <div className="transcript" id="transcript" aria-hidden="true">
      {prev && (
        <div className={`tline tline--${prev.r} tline--prev`}>
          <span className="tline__label">
            {prev.r === 'ai' && <span className="dot" style={{ width: '6px', height: '6px' }} />}
            {prev.r === 'ai' ? 'AI' : 'YOU'}
          </span>
          <span className="tline__text">{prev.t}</span>
        </div>
      )}
      {cur && (
        <div key={enterKey} className={`tline tline--${cur.r} enter`}>
          <span className="tline__label">
            {cur.r === 'ai' && <span className="dot" style={{ width: '6px', height: '6px' }} />}
            {cur.r === 'ai' ? 'AI' : 'YOU'}
          </span>
          <span className="tline__text">{cur.t}</span>
        </div>
      )}
    </div>
  )
}
