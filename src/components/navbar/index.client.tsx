'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getUid, clearTokens, getToken } from '@/service/token'
import { useState, useEffect } from 'react'

export default function NavbarClient() {
  const router = useRouter()
  const [uid, setUid] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const id = getUid()
    const token = getToken()
    setUid(id)
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    clearTokens()
    setIsLoggedIn(false)
    router.push('/')
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-white">
          Athena
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
            About
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                href={`/users/${uid}`}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
