import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
  outputFileTracingRoot: process.cwd(),
}

export default withPayload(nextConfig)
