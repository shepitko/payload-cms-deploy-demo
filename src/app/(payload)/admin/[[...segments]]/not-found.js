/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import { NotFoundPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

const params = Promise.resolve({ segments: [] })
const searchParams = Promise.resolve({})

export const generateMetadata = async () => generatePageMetadata({ config, importMap, params, searchParams })

export default function NotFound() {
  return NotFoundPage({ config, importMap, params, searchParams })
}
