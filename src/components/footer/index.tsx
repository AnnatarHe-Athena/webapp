import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 py-8">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500">
        <div className="flex justify-center gap-6 mb-4">
          <Link href="/about" className="hover:text-gray-300 transition-colors">About</Link>
          <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} AnnatarHe. All rights reserved.</p>
      </div>
    </footer>
  )
}
