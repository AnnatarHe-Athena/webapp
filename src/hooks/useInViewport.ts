import { useEffect, useState, type RefObject } from 'react'

export function useInViewport(ref: RefObject<HTMLElement | null>) {
  const [isInViewport, setIsInViewport] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { threshold: 0.1 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])

  return isInViewport
}
