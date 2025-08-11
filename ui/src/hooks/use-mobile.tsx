import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const getInitial = () => {
    if (typeof window === 'undefined') return true
    return window.innerWidth < MOBILE_BREAKPOINT
  }

  const [isMobile, setIsMobile] = React.useState<boolean>(getInitial)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    // Set immediately in case of resize before listener
    setIsMobile(mql.matches)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile
}
