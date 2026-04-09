'use client'

import { useState, useCallback } from 'react'
import { ApolloProvider, useQuery } from '@apollo/client'
import { makeClient } from '@/service/apollo.client'
import PhotoGrid from '@/components/photos/photo-grid'
import CategoryTabs from '@/components/category/category-tabs'
import ImagePreview from '@/components/preview/image-preview'
import Loading from '@/components/ui/loading'
import { gql } from '@apollo/client'

const FETCH_GIRLS = gql`
  query FetchGirls($from: Int, $take: Int!, $hideOnly: Boolean!, $last: ID) {
    girls(from: $from, take: $take, hideOnly: $hideOnly, last: $last) {
      id
      img
      text
      cate
      permission
      createdAt
      fromURL
      content
      isCollected
    }
  }
`

const FETCH_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
      src
      count
    }
  }
`

const client = makeClient()

function CategoryContent({ cid }: { cid: string }) {
  const [previewImg, setPreviewImg] = useState<string | null>(null)

  const categoriesQuery = useQuery(FETCH_CATEGORIES)

  const girlsQuery = useQuery(FETCH_GIRLS, {
    variables: {
      from: parseInt(cid) || 1,
      take: 20,
      hideOnly: false,
      last: String(1 << 30),
    },
  })

  const loadMore = useCallback(() => {
    const cells = girlsQuery.data?.girls ?? []
    if (cells.length === 0) return
    const lastId = cells[cells.length - 1].id
    girlsQuery.fetchMore({
      variables: {
        from: parseInt(cid) || 1,
        take: 20,
        hideOnly: false,
        last: lastId,
      },
      updateQuery(prev: any, { fetchMoreResult }: any) {
        if (!fetchMoreResult) return prev
        return {
          girls: [...prev.girls, ...fetchMoreResult.girls],
        }
      },
    })
  }, [girlsQuery, cid])

  const categories = (categoriesQuery.data?.categories ?? []).map((c: any) => ({
    id: c.id,
    name: c.name,
    count: c.count,
  }))

  const cells = (girlsQuery.data?.girls ?? []).map((g: any) => ({
    id: g.id,
    img: g.img,
    text: g.text,
    isCollected: g.isCollected,
    fromURL: g.fromURL,
    content: g.content,
  }))

  return (
    <div className="space-y-6">
      <CategoryTabs categories={categories} activeId={cid} />
      <PhotoGrid
        cells={cells}
        loading={girlsQuery.loading}
        loadMore={loadMore}
        onPhotoClick={(cell) => setPreviewImg(cell.img)}
      />
      {previewImg && (
        <ImagePreview
          img={previewImg}
          onClose={() => setPreviewImg(null)}
        />
      )}
    </div>
  )
}

export default function CategoryPageClient({ cid }: { cid: string }) {
  return (
    <ApolloProvider client={client}>
      <CategoryContent cid={cid} />
    </ApolloProvider>
  )
}
