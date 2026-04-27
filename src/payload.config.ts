import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import type { PoolConfig } from 'pg'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { migrations } from './migrations'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isBuildPhase =
  process.env.NEXT_PHASE === 'phase-production-build' || process.env.npm_lifecycle_event === 'build'

const payloadSecret = process.env.PAYLOAD_SECRET || (isBuildPhase ? 'payload-build-placeholder-secret' : undefined)
const buildPoolConfig = (): PoolConfig | null => {
  if (process.env.DATABASE_URL) {
    const url = new URL(process.env.DATABASE_URL)
    const database = url.pathname.replace(/^\//, '')

    return {
      database,
      host: url.hostname,
      password: decodeURIComponent(url.password),
      port: Number(url.port || '5432'),
      ssl: process.env.DATABASE_CA_CERT
        ? {
            ca: process.env.DATABASE_CA_CERT,
            rejectUnauthorized: true,
          }
        : undefined,
      user: decodeURIComponent(url.username),
    }
  }

  const user = process.env.POSTGRES_USER
  const password = process.env.POSTGRES_PASSWORD
  const host = process.env.POSTGRES_HOST
  const port = process.env.POSTGRES_PORT || '5432'
  const database = process.env.POSTGRES_DB

  if (!user || !password || !host || !database) {
    return null
  }

  return {
    database,
    host,
    password,
    port: Number(port),
    user,
  }
}

const poolConfig =
  buildPoolConfig() ||
  (isBuildPhase
    ? {
        database: 'placeholder',
        host: '127.0.0.1',
        password: 'placeholder',
        port: 5432,
        user: 'placeholder',
      }
    : null)

if (!poolConfig) {
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
    pool: poolConfig,
    prodMigrations: migrations,
  }),
  editor: lexicalEditor(),
  secret: payloadSecret,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
