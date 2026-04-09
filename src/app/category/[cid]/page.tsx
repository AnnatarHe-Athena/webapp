import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import CategoryPageClient from './client'

interface Props {
  params: Promise<{ cid: string }>
}

export default async function CategoryPage({ params }: Props) {
  const { cid } = await params
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <CategoryPageClient cid={cid} />
      </main>
      <Footer />
    </div>
  )
}
