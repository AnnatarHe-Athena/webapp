import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-20">
        <div className="rounded-xl bg-gray-900 p-8 border border-gray-800">
          <h1 className="mb-6 text-3xl font-bold text-white">Privacy Policy</h1>
          <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <p>Last updated: 2024</p>
            <h2 className="text-xl font-semibold text-white mt-6">1. Information We Collect</h2>
            <p>We collect information you provide when creating an account, including email address and profile information.</p>
            <h2 className="text-xl font-semibold text-white mt-6">2. How We Use Information</h2>
            <p>We use your information to provide and improve our services, authenticate your identity, and communicate with you.</p>
            <h2 className="text-xl font-semibold text-white mt-6">3. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information.</p>
            <h2 className="text-xl font-semibold text-white mt-6">4. Contact</h2>
            <p>For privacy concerns, contact us at iamhele1994@gmail.com</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
