import { useEffect, useRef, type RefObject } from 'react'

type Options = {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  enabled?: boolean
}

export function useIntersectionObserver(
  ref: RefObject<Element | null>,
  callback: () => void,
  options: Options = {}
) {
  const { root = null, rootMargin = '0px', threshold = 0, enabled = true } = options

  // Keep latest callback in a ref so the observer never needs to re-attach
  // just because the callback function reference changed between renders
  const callbackRef = useRef(callback)
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (!enabled || !ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          callbackRef.current()
        }
      },
      { root, rootMargin, threshold }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()

    // callbackRef and ref are intentionally excluded:
    // - callbackRef is a stable ref object, never changes identity
    // - ref (useRef) is also stable and not reactive — ref.current mutations
    //   do not trigger effects. The enabled flag handles re-attachment
    //   when the sentinel DOM node appears.
  }, [root, rootMargin, threshold, enabled])
}
