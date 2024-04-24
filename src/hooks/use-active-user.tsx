import { useEffect, useState } from 'react'

export function useActiveUser(groupId: string) {
  const [activeUser, setActiveUser] = useState<string | null>(null)

  useEffect(() => {
    const activeUser = localStorage.getItem(`${groupId}-activeUser`)
    if (activeUser) setActiveUser(activeUser)
  }, [groupId])

  return activeUser
}
