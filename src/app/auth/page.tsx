import Navbar from '@/components/navbar'
import AuthPageClient from './client'

export default function AuthPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="flex items-center justify-center px-4 py-20">
        <AuthPageClient />
      </main>
    </div>
  )
}
