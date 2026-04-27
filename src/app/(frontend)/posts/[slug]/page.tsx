import Link from 'next/link'
import { notFound } from 'next/navigation'

import {
  formatPublishedAt,
  getAuthorLabel,
  getCategoryNames,
  getImageProps,
  getPostBySlug,
} from '@/lib/blog'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const image = getImageProps(post.featuredImage)
  const categoryNames = getCategoryNames(post.categories)

  return (
    <main className="shell">
      <div className="backLink">
        <Link href="/">Back to posts</Link>
      </div>

      <article className="postPage">
        <header className="postPageHeader">
          <span className="eyebrow">Blog post</span>
          <h1>{post.title}</h1>
          <div className="postMeta">
            <span>{formatPublishedAt(post.publishedAt)}</span>
            <span>{getAuthorLabel(post.author)}</span>
          </div>
          {categoryNames.length > 0 ? (
            <ul className="tagList">
              {categoryNames.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          ) : null}
        </header>

        {image ? <img alt={image.alt} className="postPageImage" src={image.url} /> : null}

        <div className="prose">
          {post.content.split('\n').filter(Boolean).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  )
}
