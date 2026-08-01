import { useEffect, useRef, useState } from 'react'

// The narration channel: one <audio> for the app's lifetime. Loading a beat's clip keeps
// the play state (if narration is on, the next clip auto-plays), and a clip that finishes
// calls `onEnded` so playback auto-advances to the next BEAT. Timing comes from the clip
// length itself — no timestamp anchors, so regenerated audio never drifts. A missing clip
// (not yet generated) fails silently — paging still works, just no audio.
//
// This is the same "clip ended → next" logic render-app uses for section→section, one
// level deeper: here it drives beat→beat. Section rollover composes on top in slice 7.
export function useNarration(src: string | undefined, onEnded: () => void) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const endedRef = useRef(onEnded)
  endedRef.current = onEnded
  const [playing, setPlaying] = useState(false)
  const playingRef = useRef(playing)
  playingRef.current = playing

  useEffect(() => {
    const a = new Audio()
    a.addEventListener('ended', () => endedRef.current())
    audioRef.current = a
    return () => a.pause()
  }, [])

  // Load the current beat's clip; resume playing if narration was on. Because playback is
  // gesture-initiated (SPACE), the browser lets the auto-advance chain keep playing.
  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    a.pause()
    if (src) {
      a.src = src
      a.currentTime = 0
      if (playingRef.current) a.play().catch(() => {})
    } else {
      // Fully unload so a later play() doesn't resume a stale buffered clip.
      a.removeAttribute('src')
      a.load()
    }
  }, [src])

  const toggle = () => {
    const a = audioRef.current
    if (!a || !a.getAttribute('src')) return // nothing loaded (a beat with no clip)
    if (playingRef.current) {
      a.pause()
      setPlaying(false)
    } else {
      a.play().catch(() => {})
      setPlaying(true)
    }
  }

  /** Hard stop — pause and clear the play state (used when leaving the player). */
  const stop = () => {
    audioRef.current?.pause()
    setPlaying(false)
  }

  return { playing, toggle, stop }
}
