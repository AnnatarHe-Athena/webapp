'use client'

import { useState } from 'react'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'

interface UserInfo {
  id: string
  name: string
  email: string
  avatar: string
  bio: string
  role: number
}

interface InformationProps {
  user: UserInfo
  isMe: boolean
  onUpdate?: (data: { username?: string; avatar?: string; bio?: string }) => void
}

export default function Information({ user, isMe, onUpdate }: InformationProps) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user.name)
  const [bio, setBio] = useState(user.bio)

  const handleSave = () => {
    onUpdate?.({ username: name, bio })
    setEditing(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="h-16 w-16 rounded-full object-cover" />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xl font-bold text-white">
            {user.name[0]?.toUpperCase() || '?'}
          </div>
        )}
        <div>
          {editing ? (
            <Input value={name} onChange={(e) => setName(e.target.value)} className="mb-1" />
          ) : (
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
          )}
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>
      </div>
      {editing ? (
        <div className="space-y-2">
          <Input value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave}>Save</Button>
            <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-gray-300">{user.bio || 'No bio yet'}</p>
          {isMe && (
            <Button size="sm" variant="ghost" onClick={() => setEditing(true)}>
              Edit Profile
            </Button>
          )}
        </>
      )}
    </div>
  )
}
