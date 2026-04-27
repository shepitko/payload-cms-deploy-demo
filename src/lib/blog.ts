import { cache } from 'react'

import { getPayloadClient } from '@/lib/getPayloadClient'

export type BlogCategory = {
  id: number | string
  name: string
  slug: string
}

export type BlogMedia = {
  alt?: string | null
  url?: string | null
}

export type BlogAuthor = {
  id: number | string
  email: string
}

export type BlogPost = {
  id: number | string
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt?: string | null
  author?: BlogAuthor | number | string | null
  featuredImage?: BlogMedia | number | string | null
  categories?: Array<BlogCategory | number | string> | null
}

export const getPublishedPosts = cache(async () => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 12,
    sort: '-publishedAt',
  })

  return result.docs as BlogPost[]
})

export const getPostBySlug = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return (result.docs[0] as BlogPost | undefined) || null
})

export const getCategoryNames = (categories: BlogPost['categories']) =>
  (categories || [])
    .map((category) => {
      if (category && typeof category === 'object' && 'name' in category) {
        return category.name
      }

      return null
    })
    .filter((value): value is string => Boolean(value))

export const getImageProps = (image: BlogPost['featuredImage']) => {
  if (!image || typeof image !== 'object' || !('url' in image) || !image.url) {
    return null
  }

  return {
    alt: image.alt || 'Post image',
    url: image.url,
  }
}

export const getAuthorLabel = (author: BlogPost['author']) => {
  if (author && typeof author === 'object' && 'email' in author) {
    return author.email
  }

  return 'Editorial team'
}

export const formatPublishedAt = (value?: string | null) => {
  if (!value) {
    return 'Draft'
  }

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}
