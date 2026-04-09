import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import CreatePageClient from './client'

interface Props {
  params: Promise<{ id: string }>
}

export default async function CreateCellPage({ params }: Props) {
  const { id } = await params
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-xl px-4 py-6">
        <h1 className="mb-6 text-2xl font-bold text-white">Add Photos</h1>
        <CreatePageClient userId={id} />
      </main>
      <Footer />
    </div>
  )
}
