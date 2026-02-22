import { useRef, useEffect } from 'react'

export function useDebounceCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  return (...args: Parameters<T>) => {
    if (timer.current) clearTimeout(timer.current)

    timer.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}