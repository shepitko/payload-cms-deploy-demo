import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const payloadSecret = process.env.PAYLOAD_SECRET
const buildDatabaseURL = () => {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL
  }

  const user = process.env.POSTGRES_USER
  const password = process.env.POSTGRES_PASSWORD
  const host = process.env.POSTGRES_HOST
  const port = process.env.POSTGRES_PORT || '5432'
  const database = process.env.POSTGRES_DB

  if (!user || !password || !host || !database) {
    return null
  }

  const url = new URL(`postgresql://${host}:${port}/${database}`)
  url.username = user
  url.password = password

  return url.toString()
}

const databaseURL = buildDatabaseURL()

if (!databaseURL) {
  throw new Error('Missing database configuration')
}

if (!payloadSecret) {
  throw new Error('Missing PAYLOAD_SECRET')
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Categories, Posts],
  db: postgresAdapter({
    pool: {
      connectionString: databaseURL,
    },
  }),
  editor: lexicalEditor(),
  secret: payloadSecret,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
