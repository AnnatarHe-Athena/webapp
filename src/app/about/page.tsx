import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-20">
        <div className="rounded-xl bg-gray-900 p-8 border border-gray-800">
          <h1 className="mb-6 text-3xl font-bold text-white">About Athena</h1>
          <div className="space-y-4 text-gray-300">
            <p>
              Athena is a beauty image collection and curation platform.
              Browse, collect, and organize beautiful images from across the web.
            </p>
            <p>Built with love by AnnatarHe.</p>
            <div className="mt-8 rounded-lg bg-gray-800 p-4">
              <h3 className="mb-2 font-semibold text-white">Contact</h3>
              <p className="text-sm">Email: iamhele1994@gmail.com</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
