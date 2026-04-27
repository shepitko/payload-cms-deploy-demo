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
const databaseURL =
  process.env.DATABASE_URL ||
  [
    'postgresql://',
    process.env.POSTGRES_USER,
    ':',
    process.env.POSTGRES_PASSWORD,
    '@',
    process.env.POSTGRES_HOST,
    ':',
    process.env.POSTGRES_PORT || '5432',
    '/',
    process.env.POSTGRES_DB,
  ].join('')

if (!databaseURL) {
  throw new Error('Missing DATABASE_URL')
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
