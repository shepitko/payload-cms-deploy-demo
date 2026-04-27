import Link from 'next/link'

import {
  formatPublishedAt,
  getAuthorLabel,
  getCategoryNames,
  getImageProps,
  getPublishedPosts,
} from '@/lib/blog'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const posts = await getPublishedPosts()

  return (
    <main className="shell">
      <section className="hero">
        <div className="heroCopy">
          <span className="eyebrow">Payload CMS Demo Blog</span>
          <h1>Simple blog, clean content model, practical ETL shape.</h1>
          <p>
            Posts, categories, media, authors, drafts, and stable slugs. Small enough to read in
            one sitting, real enough to use as a migration target.
          </p>
        </div>
        <div className="actions">
          <Link href="/admin">Open Admin</Link>
          <Link href="/api/health">API Health</Link>
        </div>
      </section>

      <section className="sectionHeader">
        <div>
          <h2>Published posts</h2>
          <p>The easiest way to inspect the content model is to create a few posts in Payload.</p>
        </div>
      </section>

      {posts.length > 0 ? (
        <section className="postGrid">
          {posts.map((post) => {
            const image = getImageProps(post.featuredImage)
            const categoryNames = getCategoryNames(post.categories)

            return (
              <article className="postCard" key={post.id}>
                {image ? (
                  <div className="postImageWrap">
                    <img alt={image.alt} className="postImage" src={image.url} />
                  </div>
                ) : (
                  <div className="postImageFallback">No image</div>
                )}

                <div className="postBody">
                  <div className="postMeta">
                    <span>{formatPublishedAt(post.publishedAt)}</span>
                    <span>{getAuthorLabel(post.author)}</span>
                  </div>

                  <h3>
                    <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p>{post.excerpt}</p>

                  {categoryNames.length > 0 ? (
                    <ul className="tagList">
                      {categoryNames.map((name) => (
                        <li key={name}>{name}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            )
          })}
        </section>
      ) : (
        <section className="emptyState">
          <h2>No published posts yet</h2>
          <p>Create categories, upload media, and publish a post in the Payload admin panel.</p>
          <Link className="inlineLink" href="/admin">
            Go to admin
          </Link>
        </section>
      )}
    </main>
  )
}
