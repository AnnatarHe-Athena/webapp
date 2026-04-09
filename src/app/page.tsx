import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-20">
        <div className="text-center">
          <h1 className="mb-6 text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Athena
          </h1>
          <p className="mb-8 text-xl text-gray-400">
            Beauty Image Collection Platform
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/category/1"
              className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-colors"
            >
              Browse Photos
            </Link>
            <Link
              href="/auth"
              className="rounded-lg border border-gray-700 px-6 py-3 text-gray-300 hover:bg-gray-800 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
