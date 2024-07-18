import { useEffect } from "react";

export function useTitle(title: string) {
  useEffect(() => {
    const t = document.title
    document.title = title
    return () => {
      document.title = t
    }
  }, [title])
}
