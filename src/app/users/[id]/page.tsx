import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ProfilePageClient from './client'

interface Props {
  params: Promise<{ id: string }>
}

export default async function UserProfilePage({ params }: Props) {
  const { id } = await params
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <ProfilePageClient userId={id} />
      </main>
      <Footer />
    </div>
  )
}
